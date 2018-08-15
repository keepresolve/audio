
import { log, setting, state } from './store'
import sipWrapper from '../lib/index'
// import audioPlayer from './audioPlayer'
class Phone {
    constructor() {
        this._ua = null  //jssipwrapper实例 ._ua==UA实例
        this._session = null //当前会话
        this._sipStatus = false //注册状态
        this._socketStatus = false //socket状态
        this._kefuStatus = '1' //会话状态   0 离线  1 空闲  2暂离
        this.callType = "2"  // type = 1 外线拨号  type = 2 回拨  type = 3 内线互拨
        //可能需要有一个标识当前会话是呼入还是呼出的设置，但不需要保存incomingSession
        this.log = log("phone")
    }
    // 注册
    register(params, cb) {
        this._ua = new sipWrapper();
        var loginParam = params ? {
            un: params.seatnumber,
            pwd: params.password,
            switchNumber: params.switchnumber,
            callintype: params.callintype,
            socketUri: params.socketUri,
            gid: params.gid,
            audioId: params.audioId,
            status: this._kefuStatus
        } : undefined
        this.log(`login param :${loginParam}`);
        this._ua.login(loginParam);
        //登录状态的回调，可去重
        this.eventLogin(cb)
        //状态，置忙置闲
        this.eventStatus()
        //呼入会话监听
        this.eventIncoming(cb)
        this.log("call register");
    }
    eventLogin(cb) {

        this._ua.on('connecting', () => {

            this.log('UA "connecting" event');
            this.socketStatus = false
        });

        this._ua.on('connected', () => {

            this.log('UA "connected" event');
            this.socketStatus = true
        });

        this._ua.on('disconnected', () => {

            this.log('UA "disconnected" event');
            this.socketStatus = false
        });

        this._ua.on('registered', (data) => {

            this.log("registered: ", data.response.status_code, ",", data.response.reason_phrase, { data });
            if (data.response.status_code == 200) {
                cb({ code: data.response.status_code, info: "登陆成功", data })
            }
        });

        this._ua.on('unregistered', (data) => {
            this.log("unregistered", { data })
        });

        this._ua.on('registrationFailed', (data) => {

            this.log("registrationFailed, ", { data });
            cb({ code: 301, info: "登录失败", data })

        });

        this._ua.on('registrationExpiring', (data) => {

            this.log("registrationExpiring", { data });
            // cb({ code: 401, info: "registrationExpiring", data })
            if (this._ua.isConnected())
                this.socketStatus = true
            else
                this.socketStatus = false

        });
         // 被踢下线
        this._ua.on("kickedOffLine", (data) => {
            this.log("kickedOffLine, ", { data });
            cb({ code: 300, data })
        });
    }
    //状态   0 离线  1 空闲  2暂离
    eventStatus() {
        //状态
        this._ua.on("statusChanged", (data) => {
            var toggleStatus = document.querySelector("li[data-phone-type='register'] span")
            var bgList = ["#19C583", "rgb(254, 211, 0)"]
            if (data.status == "0") {  //等jsswrapper 没有返回状态

                this.sipStatus = false

            }
            if (data.status == "1") {

                this.sipStatus = true
                toggleStatus.dataset.hide = '1'
                toggleStatus.style.background = bgList[0]

            }
            if (data.status == "2") {

                this.sipStatus = true
                toggleStatus.dataset.hide = '1'
                toggleStatus.style.background = bgList[1]

            }
            this._kefuStatus = data.status
            // 状态改变，修改localStorage里的值
            var obj = JSON.parse(localStorage.userData)
            obj.status = data.status
            localStorage.setItem("userData", JSON.stringify(obj))
            this.log("statusChanged:", data)
        })
    }
    eventIncoming(cb) {
        //会话
        this._ua.on('incomingCall', (data) => {


            this.log('incomingCall: ', data.originator + ":", { data });

            if (data.originator === 'local')

                return;

            let session = data.session;

            // 这个判断可能还是需要
            // if (this.session || this.incomingSession) {
            //     that.log('"Busy Here"');
            //     session.terminate(
            //         {
            //             status_code: 486,
            //             reason_phrase: 'Busy Here'
            //         });
            //     return;
            // }
    
            data.session.on("progress", (data) => { //呼叫接通等待接听

                this.session = session;
                cb({ code: 100, type: "progress", data })
            })

            data.session.on("connecting", (data) => { //接受会话正在连接

                cb({ code: 100, type: "connecting", data })
            })
            //本地接听会话
            data.session.on("accepted", (data) => {

                cb({ code: 100, type: "accepted", res })
            })

            data.session.on("failed", (data) => { //未接听

                this.session = null
                cb({ code: 100, type: "failed", data })
            })

            data.session.on('ended', (data) => { //结束会

                this.log('ended', { data })
                this.session = null
                cb({ code: 100, type: "ended", data })
            });

            data.session.on("hold", (data) => {

                this.log("hold", data)
                cb({ code: 100, type: "hold", data })
            })

            data.session.on("unhold", (data) => {

                this.log("unhold", data)
                cb({ code: 100, type: "unhold", data })

            })

            data.session.on("newDTMF", (data) => {

                this.log("newDTMF", data.originator, data)
            })
        });

        // 座席外呼响应'201'
        this._ua.on("calloutResponse", (data) => {

            this.log("calloutResponse座席外呼响应201", data)
            cb({ code: 100, type: "calloutResponse", data })
        })

        // 座席外呼响应(内线)'301':
        this._ua.on("callinResponse", (data) => {

            this.log("callinResponse座席外呼响应(内线)301", data)
            cb({ code: 100, type: "callinResponse", data })

        })

        this._ua.on('answeredPBXCall', (data) => {

            this.log("answeredPBXCall", data)
            cb({ code: 100, type: "answeredPBXCall", data })

        })
        this._ua.on("endPBXCall", (data) => {

            this.log("endPBXCall", data)
            cb({ code: 100, type: "endPBXCall", data })
        })
    }
    //打电话
    call(params) {
        var session = null
        this.callType = params.callType
        this._ua.call(params.peerID, this.callType, {})
        this.log("call to:", { peerID: this.callType })
    }
    //会话接听
    // incomingCall(isAnswer) {
    //     if (isAnswer) {
    //         this.log("incomingSession, answer the call");
    //         this.session.answer({ 'mediaConstraints': { 'audio': true, 'video': false } });
    //         let peerconnection = this.session.connection;
    //         peerconnection.addEventListener('addstream', (event) => {
    //             this.log('peerconnection instance addstream event');
    //             this._RemoteStream(event.stream);
    //         });
    //     }
    // }
    sendDTMF(num) {
        var extraHeaders = ['X-Foo: foo', 'X-Bar: bar'];
        var options = {
            'duration': 160,
            'interToneGap': 1200,
            'extraHeaders': extraHeaders
        };
        if (this.session)
            this.session.sendDTMF(num)
        this.log("sendDTMF", num + '')
    }
    //挂断 需要发送给pbx 挂断状态处理消息
    terminate() {

        if (!this.session) return
        this._ua.hangUpPBXCall(this.session.ccNumber)
        this.session.terminate();
    }
    // 注销
    stop(cb) {
        if (!this._ua._ua.isRegistered()) return
        this._ua.stop()
        this._ua.once('unregistered', (data) => {
            this.log("unregistered", { data })
            var res = data.response
            if (res.reason_phrase == 'OK' && res.status_code == 200 && res.method == "REGISTER") {
                this.sipStatus = false
                cb({ code: res.status_code, info: res.reason_phrase, res })
            } else {
                cb({ code: res.status_code, info: res.reason_phrase, res })
            }
        });
    }
    //呼叫保持
    hold() {
        if (!this.session) return
        this.session.hold()
    }
    unhold() {
        if (!this.session) return
        this.session.unhold()
    }
    //转接
    /**
     * ccNumber
     * gid
     * tranNumber
     */
    transferPBXCall(gid, tranNumber, cb) {
        // gid = '2059'
        // tranNumber = '1023'
        if (this.session) {
            this._ua.transferPBXCall(this.session.ccNumber, gid, tranNumber)
            // this._ua.on("")
            this._ua.once("transferCallSuccess", (data) => {
                this.log('transferCallSuccess(电话转接成功)', data)
                cb({ type: "transferCallSuccess", data })
            })
            this._ua.once("transferCallFaild", (data) => {
                this.log('transferCallFaild(电话转接失败)', data)
                cb({ type: "transferCallFaild", data })
            })
        }
    }
    //修改坐席状态  
    changeStaus(status) {
        this._ua.changeStaus(status)
        this.log("setchangeStaus:", status)
    }
    //发送meessage消息
    sendMessage(callId, content, cb) {
        var that = this
        var msgEventHandlers = {
            'succeeded': function (data) {
                that.log("send message succeeded", { data })
                cb({ type: "success", content, data })
            },
            'failed': function (data) {
                console.error("send message error", { data })
                cb({ type: "failed", content, data })
            }
        };

        var msgOptions = {
            'eventHandlers': msgEventHandlers
        };
        this._ua.sendMessage(callId + "_00013093", content, msgOptions);
    }

    // 修改坐席模式
    setSeatMode(seatMode) {
        this._ua.setSeatMode(seatMode, false)
        this.log("setSeatMode:", seatMode)
    }
    // _RemoteStream(stream) {
    //     this.log("stream", stream, stream.getTracks());
    //     let remoteAudio = document.getElementById("peeraideo")

    //     // Display remote stream
    //     remoteAudio.srcObject = stream;

    //     stream.addEventListener('addtrack', (event) => {
    //         let track = event.track;

    //         if (remoteAudio.srcObject !== stream)
    //             return;

    //         this.log('remote stream "addtrack" event [track:%o]', track);

    //         // // Refresh remote video
    //         remoteAudio.srcObject = stream;

    //         track.addEventListener('ended', () => {
    //             this.log('remote track "ended" event [track:%o]', track);
    //         });
    //     });

    //     stream.addEventListener('removetrack', () => {
    //         if (remoteAudio.srcObject !== stream)
    //             return;

    //         this.log('remote stream "removetrack" event');

    //         // // Refresh remote video
    //         remoteAudio.srcObject = stream;
    //     });
    // }
    //刷新页面挂断会话
    _beforeunload(event) {
        if (this.session) {
            this.session.terminate();
            this._ua.hangUpPBXCall(this.session.ccNumber)
        }
    }
    get socketStatus() {
        return this._socketStatus
    }
    set socketStatus(value) {
        if (this._ua._ua && value && this._ua._ua.isRegistered()) {
            this.sipStatus = true
        } else {
            this.sipStatus = false
        }
        this._socketStatus = value
    }
    get sipStatus() {
        return this._sipStatus
    }
    set sipStatus(value) {
        // var callStatus = document.getElementById("callStatus")
        // callStatus.innerText = value ? "已连接" : '未连接'
        this._sipStatus = value
    }
    get session() {
        return this._session
    }
    set session(session) {

        this._session = session
        this.log("session change:", session)
    }

}
export default new Phone()