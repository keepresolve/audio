import JsSIP from 'jssip';
import Logger from './Logger';
import { xmlToJs, jsToXml } from './xmljs'

const EventEmitter = require('events').EventEmitter;
const logger = new Logger('index');

module.exports = class JsSipWrapper extends EventEmitter {

    constructor() {
        super();
        this._ua = null;
    }

    // 登录
    async login(param, cb) {

        var userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) this.emit('registrationFailed');
        if (param) {
            userData.loginGid = param.gid;
            userData.socketUri = param.socketUri;
            userData.status = param.status;
            localStorage.setItem("userData", JSON.stringify(userData));
        }

        logger.debug('准备sip注册')

        this.registerSip(userData)

        this.registerEvents(cb);

        this.receiveNewMsg();
        //如何进一步保障这个值一定能取到？
        var audioId = (param && param.remoteAudio) || localStorage.getItem('audioId')
        // 此处接受 audio 元素 播放声音
        this.newSessionEvent(document.getElementById(audioId));

    }


    registerSip(userData) {
        // 直接注册sip
        let sipServer = `${userData.serverIp}:${userData.sipPort}`;
        let sipUser = `${userData.userInfo.number}_${userData.eid16}`;
        let socket = new JsSIP.WebSocketInterface(userData.socketUri);
        socket.via_transport = 'auto'
        this._ua = new JsSIP.UA({
            uri: `sip:${sipUser}@${sipServer}`,
            password: userData.clearPwd.slice(8, userData.clearPwd.length - 6),
            display_name: userData.userInfo.displayname,
            sockets: [socket],
            registrar_server: sipServer,
            contact_uri: `sip:${sipUser}@${sipServer}`,
            authorization_user: sipUser,
            user_agent: 'callcenter_webrtc',
            use_preloaded_route: false,
            session_timers: true
        });
        this._ua.start();

    }

    receiveNewMsg(cb) {
        this._ua.on('newMessage', (data) => {
            var msgXml = data.request.body
            var result = xmlToJs(msgXml)
            logger.debug(`receive message:${JSON.stringify(result)}`);
            let top = Object.keys(result)[0];
            if (top == 'cc') {
                let eventType = result.cc.a;
                switch (eventType) {
                    case '1':
                    case '2':
                        // 修改状态
                        this.emit('statusChanged', { status: eventType });
                        break;
                    case '38':
                        // 电话转接成功
                        this.emit('transferCallSuccess', result.cc);
                        break
                    case '39':
                        // 电话转接失败
                        this.emit('transferCallFaild', result.cc);
                        break
                    case '201':
                        // 座席外呼响应
                        this.emit('calloutResponse', result.cc);
                        break
                    case '301':
                        // 座席外呼响应(内线)
                        this.emit('callinResponse', result.cc);
                        break
                    case '100':
                        // 来电呼入
                        // this.emit('newPBXCall', result.cc);
                        // 尝试自己发送接听
                        this.answerPBXCall(result.cc.c);
                        break;
                    case '104':
                        // 通话建立,对方接听了电话,需要打开转接,3方通话.
                        this.emit('answeredPBXCall', result.cc);
                        break;
                    case '105':
                        // 通话断开
                        this.emit('endPBXCall', result.cc);
                        break;
                }
            } else if (top == 'o') {
                // o 应该是踢下线的消息
                /**
                    * <o> <a>  <u n="1006_00010078" a="o" nm="fengchunyan" r="895" /> </a></o>
                    * 895 被踢下线
                    * 897 注册超时被踢下线 
                    * 898 账号过期/账号被删/账号修改被踢下线
                    * 899 企业停止后被踢下线
                */
                //  通话建立，也会发这个消息，，不处理 <o> <m>  <c n="1534396656524476conf_1534396661189" a="i" /> </m></o>
                if (result.o.a && result.o.a.u)
                    this.emit('kickedOffLine', result.o.a.u[0]);
            } else if (top == 'mn') {
                // mn 应该是总机的离线同步消息
            }
            // this.emit('newMessage', data);
        });

    }

    registerEvents(cb) {
        this._ua.on('connecting', (data) => {
            cb({ code: 'connecting', data: data })
        });

        this._ua.on('connected', (data) => {
            cb({ code: 'connected', data: data })
        });

        this._ua.on('disconnected', (data) => {

            cb({ code: 'disconnected', data: data })
        });

        this._ua.on('registered', (data) => {

            let userData = JSON.parse(localStorage.getItem('userData'));
            this.changeStaus(userData.status.toString());
            // 默认设置 坐席模式为固定坐席模式,
            if (userData.seatMode) {

                this.setSeatMode(userData.seatMode == 1 ? 51 : 52, true);
            } else {
                this.setSeatMode(52, true);
            }
            this.logonWithGroup(userData.loginGid, userData.eid);
            cb({ code: 'registered', data: data })
        });

        this._ua.on('unregistered', (data) => {
            cb({ code: 'unregistered', data: data })

        });

        this._ua.on('registrationFailed', (data) => {
            logger.debug('sip注册失败')
            cb({ code: 'registrationFailed', data: data })
        });
        this._ua.on('registrationExpiring', (data) => {
            cb({ code: 'registrationExpiring', data: data })
        });

    }

    newSessionEvent(remoteAudio) {
        /******************* 通话相关事件 ******************/
        // 收到INVITE 消息后调用.
        this._ua.on('newRTCSession', (data) => {
            logger.debug('UA "newRTCSession" event');
            let session = data.session;
            // 此处设置音频流
            session.answer({ 'mediaConstraints': { 'audio': true, 'video': false } })
            let peerconnection = session.connection;
            peerconnection.addEventListener('addstream', (event) => {
                // 设置音频
                remoteAudio.srcObject = event.stream;
                event.stream.addEventListener('addtrack', (event) => {
                    let track = event.track;
                    if (remoteAudio.srcObject !== event.stream)
                        return;
                    remoteAudio.srcObject = event.stream;
                    track.addEventListener('ended', () => {
                    });
                });
                event.stream.addEventListener('removetrack', () => {
                    if (remoteAudio.srcObject !== event.stream)
                        return;
                    remoteAudio.srcObject = event.stream;
                });
            });
            this.emit('incomingCall', data);
            this.setSessionInfo(session);
        });
    }

    setSessionInfo(session) {
        session.on('newInfo', (sessionData) => {
            logger.debug('UA "newInfo" event');
            if (session.ccNumber) return;
            // 解析ccNumber
            var msgXml = sessionData.request.body
            session.ccNumber = xmlToJs(msgXml).i.n
        });
    }
    // send sip msg to PBX helper
    sendMsgHelper(content, event, eventHandlers) {
        var sendXml = jsToXml(content);
        if (!eventHandlers) {
            eventHandlers = {
                "succeeded": function (e) {
                    logger.debug(`${event} success!`)
                },
                "failed": function (e) {
                    logger.debug(e);
                }
            }
        }
        this.sendMessage('PBX', sendXml, eventHandlers);
    }

    answerPBXCall(ccNumber) {
        var content = {
            a: '102',
            c: ccNumber
        }
        this.sendMsgHelper(content, 'answerPBXCall')
    }

    hangUpPBXCall(ccNumber) {
        var content = {
            a: '106',
            c: ccNumber
        }
        this.sendMsgHelper(content, 'hangUpPBXCall')
    }

    // 拨打电话
    call(target, type, eventHandlers) {
        // type = 1 外线拨号  type = 2 回拨  type = 3 内线互拨
        logger.debug('call others [uri:"%s"]', target);
        var userData = JSON.parse(localStorage.getItem('userData'));
        var randkey = Math.random().toString().split('.')[1].substr(0, 3);//3位随机串
        switch (type) {
            case 1:
                let session = this._ua.call(target, {
                    mediaConstraints: {
                        audio: true,
                    },
                    rtcOfferConstraints: {
                        offerToReceiveAudio: 1,
                    },
                    'eventHandlers': eventHandlers,
                });
                this.setSessionInfo(session);
                return session;
                break;
            case 2:
                // p 是总机号,应该要从登陆的参数获得 ,i 是时间戳,随机生成
                var content = {
                    a: '200',
                    p: userData.switchNumber,
                    i: Date.now().toString() + randkey,
                    t: target

                }
                this.sendMsgHelper(content, 'call-回拨', eventHandlers)
                break;
            case 3:
                var content = {
                    a: '300',
                    p: userData.switchNumber,
                    i: Date.now().toString() + randkey,
                    t: `${target}_${userData.eid16}`
                }
                this.sendMsgHelper(content, 'call-内线互拨', eventHandlers)
                break;
            default:

        }
    }

    stop(cb) {
        this._ua.stop();
        this._ua.once('unregistered', (data) => {
            var res = data.response
            if (res.reason_phrase == 'OK' && res.status_code == 200 && res.method == "REGISTER") {
                // 注销需要清除localstorege
                localStorage.removeItem('userData');
                cb({ code: res.status_code, info: res.reason_phrase, })
            } else {
                cb({ code: res.status_code, info: res.reason_phrase })
            }
        });

    }

    // 发送xml消息
    sendMessage(target, text, eventHandlers) {
        logger.debug(`send message!!!,content:${text} target:${target}`);
        let options = {
            'eventHandlers': eventHandlers,
            'contentType': 'application/pidf+xml'
        };
        return this._ua.sendMessage(target, text, options);
    }

    isConnected() {
        return this._ua.isConnected;
    }

    // 修改坐席状态 0 离线  1 空闲  2暂离
    changeStaus(status) {
        let that = this
        var eventHandlers = {
            "succeeded": function (e) {
                logger.debug(`changeStaus success!`)
                that.emit('statusChanged', { status: status });
            },
            "failed": function (e) {
                logger.debug(e);
                that.emit('changeStausFailed')
            }
        }
        // var xml = `<?xml version="1.0" encoding="utf-8"?><cc a="1" />`
        return this.sendMsgHelper({
            a: status.toString()
        }, 'changeStaus', eventHandlers);
    }

    // 发送登录时所选组的消息
    logonWithGroup(gid, eid) {
        // <?xml version="1.0" encoding="utf-8"?><cc a="53" g="580_65656" />
        return this.sendMsgHelper({
            a: '53',
            g: `${gid}_${eid}`
        }, 'logonWithGroup');
    }
    /**
     * 设置座席模式 
     * seatMode 51 移动模式  52 固定模式
     * 对应 localStorage 值存储为  1 移动模式 2 固定模式
     */
    // 设置座席模式  
    setSeatMode(seatMode, isLogin) {
        //<?xml version="1.0" encoding="utf-8"?><cc a="52" />
        if (!isLogin && seatMode == 52) this.changeStaus('1');//登录后设置成固定模式时，必须置闲

        var mode = (seatMode == 52) ? 2 : 1  // 1 移动模式 2 固定模式
        var userData = JSON.parse(localStorage.getItem('userData'));
        userData.seatMode = mode;
        localStorage.setItem("userData", JSON.stringify(userData));

        return this.sendMsgHelper({
            a: seatMode.toString(),
        }, 'setSeatMode');
    }
    // 通话转接给坐席
    transferPBXCall(ccNumber, gid, tranNumber) {
        //<?xml version="1.0" encoding="utf-8"?><cc a="31" c="1522722042196121conf_1522721954556" g="0_65656" n="1008_00010078" />
        if (!ccNumber || !gid || !tranNumber) {
            let err = new Error('缺少参数');
            return err;
        }
        var userData = JSON.parse(localStorage.getItem('userData'));
        var content = {
            a: '31',
            c: ccNumber,
            g: `${gid}_${userData.eid}`,
            n: `${tranNumber}_${userData.eid16}`
        }
        return this.sendMsgHelper(content, 'transferPBXCall')
    }
}