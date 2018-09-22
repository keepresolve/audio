import debug from 'debug'
import sipWrapper from '../lib/index'

class Phone {
    constructor() {
        this._session = null //当前会话
        //0 就是sip没注册，一旦register成功我们会再马上发一条消息把自己状态设置为空闲
        this.kefuStatus = 0 //会话状态   0 离线  1 空闲  2暂离
        this.callType = '2' // type = 1 外线拨号  type = 2 回拨  type = 3 内线互拨
        //接口多挂载在类上面
        this.getLoginData = sipWrapper.getLoginData
        this.webApiHandler = sipWrapper.webApiHandler
        this.debug = debug
        this.log = this.debug('phone')
    }
    // 注册,各种回调设置
    init(params, cb) {
        this.log('login param :', params)
        this._ua = null
        this._ua = new sipWrapper() //jssipwrapper实例 ._ua==UA实例
        //登录状态的回调
        let register = cb['register']
        this._ua.login(params, result => {
            this.loginResult(result, register)
        })
        //状态，置忙置闲
        this.kefuStatusChange()
        //呼入会话监听
        this.callEvent(cb['callEvent'])
        //发送message回调
        this.methodCb(cb['methodCb'])
        // 被踢下线
        let kickoff = cb['kickedOffLine']
        this._ua.on('kickedOffLine', data => {
            this.log('kickedOffLine, ', {
                data
            })
            kickoff(data)
        })
    }
    loginResult(result, cb) {
        var code = result.code
        this.log(result.code, {
            result: result.data
        })
        //try-it示例里有connected但未registered的状态，但目前对我们不太适用，如果没有注册，什么都干不了
        //所以kefuStatus不维护 connected但未registered的状态的状态，0就是未注册
        //registered后我们会马上发changeStaus(1)
        switch (code) {
            case 'connecting':
                break
            case 'disconnected':
                if (
                    localStorage.userData &&
                    JSON.parse(localStorage.userData).status == undefined
                ) {
                    this.kefuStatus = 0
                    cb({
                        code: 500,
                        info: '登录失败',
                        data: result.data
                    })
                }
                break
            case 'connected':
                // var userData = localStorage.userData ? JSON.parse(localStorage.userData) : undefined
                // if (userData && userData.status)
                //     this.kefuStatus = userData.status
                break
            case 'registered':
                this.log(
                    'registered: ',
                    result.data.response.status_code,
                    ',',
                    result.data.response.reason_phrase,
                    {
                        data: result.data
                    }
                )
                cb({
                    code: result.data.response.status_code,
                    data: result.data
                })
                break
            case 'registrationFailed':
                this.kefuStatus = 0
                //原来给的301不对，301不是这个意思。另可参见jssip.js的 REASON_PHRASE
                //我暂时用500
                cb({
                    code: 500,
                    info: '登录失败:' + result.info,
                    data: result.data
                })
                break
        }
    }
    //修改坐席状态，需要等服务器确认才能真正改变
    changeStaus(status) {
        this._ua.changeStaus(status)
        this.log(`setchangeStaus:${status}, waiting for statusChanged callback`)
    }
    //状态   0 离线  1 空闲  2忙碌
    kefuStatusChange(cb) {
        //修改成功的回调 失败的统一处理了
        this._ua.on('statusChanged', data => {
            var toggleStatus = document.querySelector(
                "li[data-phone-type='register'] span"
            )
            var bgList = ['#4bd966', '#fed300']
            if (data.status == '0') {
                //等jsswrapper 没有返回状态
            }
            if (data.status == '1') {
                toggleStatus.dataset.hide = '1'
                toggleStatus.style.background = bgList[0]
            }
            if (data.status == '2') {
                toggleStatus.dataset.hide = '1'
                toggleStatus.style.background = bgList[1]
            }
            this.kefuStatus = parseInt(data.status)
            // 状态改变，修改localStorage里的值
            var obj = JSON.parse(localStorage.userData)

            obj.status = data.status
            localStorage.setItem('userData', JSON.stringify(obj))
            this.log('statusChanged:', data)
        })
    }
    callEvent(cb) {
        /*
            newPBXCall 来电 100
            cancelPBXCall 非voip 来电取消 任意一方主动挂断 未接 101
            calloutResponse 座席外呼响应'201'
            callinResponse 座席外呼响应(内线)'301'
            callinFaildResponse 座席外呼响应(内线) 被叫超时未接听，，给主叫发 309  被叫发101
            answeredPBXCall
        */

        let calltypes = [
            'newPBXCall',
            'cancelPBXCall',
            'calloutResponse',
            'callinFaildResponse',
            'answeredPBXCall',
            'endPBXCall',
            'callinResponse'
        ]
        for (let type of calltypes) {
            this._ua.on(type, data => {
                //呼叫接通等待接听
                //cb => phoneStatus
                if (type == 'endPBXCall') this.session = null
                cb(type, data)
            })
        }
        let incomingEvent = [
            'progress',
            'connecting',
            'accepted',
            'failed',
            'ended',
            'newDTMF'
        ]
        this._ua.on('incomingCall', data => {
            this.log('incomingCall: ', data.originator + ':', {
                data
            })
            if (data.originator === 'local') return
            let session = data.session
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
            this.session = session //只有呼入的会话
            for (let type of incomingEvent) {
                this.session.on(type, data => {
                    //呼叫接通等待接听
                    cb(type, data)
                })
            }
        })
    }
    methodCb(cb) {
        //需要消息回调的事件
        this._ua.on('sendMessageSucccess', data => {
            cb(data, 'success')
        })
        this._ua.on('sendMessageFaild', data => {
            cb(data, 'faild')
        })
    }
    //打电话
    call(params) {
        this.callType = params.callType
        this._ua.callOut(params.peerID, this.callType, {})
        this.log('call to:', {
            peerID: params.peerID,
            callType: this.callType
        })
    }
    //会话接听
    answerPBXCall(ccNumber) {
        this._ua.answerPBXCall(ccNumber)
    }
    sendDTMF(num) {
        //示例，sip服务器未实现
        var extraHeaders = ['X-Foo: foo', 'X-Bar: bar']
        var options = {
            duration: 160,
            interToneGap: 1200,
            extraHeaders: extraHeaders
        }
        // if (this.session )
        this.session.sendDTMF(num)
        this.log('sendDTMF', num + '')
    }

    //挂断 需要发送给pbx 挂断状态处理消息
    terminate(c) {
        var userData = localStorage.userData
            ? JSON.parse(localStorage.getItem('userData'))
            : undefined
        var ccNumber = c || (userData ? userData.ccNumber : undefined)
        if (ccNumber) {
            this._ua.hangUpPBXCall(ccNumber)
        }
        this.log('terminate')
    }
    // 注销
    stop(cb) {
        //在回调里才设置 kefuStatus=0 保证是服务器确认下线
        //但我的担心是如果因为网络原因（最大可能），没有收到回调，这时候其实就应该是下线了
        this.kefuStatus = 0
        if (!this._ua || !this._ua._ua.isRegistered()) return
        this._ua.logOut(res => {
            if (res.code == 200) {
                var registerTitle = document.querySelector(
                    "#EphoneBar li[data-phone-type='register']"
                )
                registerTitle.title = '注册'
            }
            cb && cb(res)
        })
    }
    //呼叫保持
    hold(ccNumber) {
        if (!ccNumber) return
        this._ua.holdPBXCall(ccNumber)
        this.log('hold', ccNumber)
        // if (!this.session) return
        // this.session.hold()
    }
    unhold(ccNumber) {
        if (!ccNumber) return
        this._ua.unholdPBXCall(ccNumber)
        this.log('unhold', ccNumber)
        // if (!this.session) return
        // this.session.unhold()
    }
    //转接
    /**
     * ccNumber
     * gid
     * tranNumber
     */
    transferPBXCall(gid, tranNumber, ccNumber, cb) {
        // gid = '2059'
        // tranNumber = '1023'
        if (ccNumber) {
            this._ua.transferPBXCall(ccNumber, gid, tranNumber)
            // this._ua.on("")
            this._ua.once('transferCallSuccess', data => {
                this.log('transferCallSuccess(电话转接成功)', data)
                cb({
                    type: 'transferCallSuccess',
                    data
                })
            })
            this._ua.once('transferCallFaild', data => {
                this.log('transferCallFaild(电话转接失败)', data)
                cb({
                    type: 'transferCallFaild',
                    data
                })
            })
        }
    }
    preSetStatus(params) {
        this._ua.preSetStatus(params.ccNumber)
        this.log('preSetStatus:', params)
        //通话中设置状态 87
        // this._ua.once('preSetStatusResponse', data => {
        //     if (data.a == '87' && data.r) {
        //         cb({ code: data.r })
        //     } else {
        //         //非收到PBX的远程消息
        //         cb({ code: 50006 })
        //     }
        //     this.log('preSetStatusResponse', data)
        // })
    }
    preSetStatusCancle(params) {
        this._ua.preSetStatusCancle(params.ccNumber)
        this.log('preSetStatusCancle:', params)
    }
    // 修改坐席模式
    setSeatMode(seatMode) {
        this._ua.setSeatMode(seatMode, false)
        this.log('setSeatMode:', seatMode)
    }

    get session() {
        return this._session
    }
    set session(session) {
        this._session = session
        this.log('session change:', session)
    }
}
export default new Phone()
