import JsSIP from 'jssip';
import webApi from './getLoginInfo'
import Logger from './Logger';
import {
    xmlToJs,
    jsToXml
} from './xmljs'

const EventEmitter = require('events').EventEmitter;
const logger = new Logger('index');

module.exports = class JsSipWrap extends EventEmitter {

    constructor() {
        super();
        this._ua = null;
    }

    // 登录
    async login(param) {

        var userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) this.emit('registrationFailed');
        if (param) {
            userData.loginGid = param.gid;
            userData.socketUri = param.socketUri;
            localStorage.setItem("userData", JSON.stringify(userData));
        }

        logger.debug('准备sip注册')

        this.registerSip(userData)

        this.registerEvents();

        this.receiveNewMsg();

        var audioId =  param ? param.audioId:localStorage.getItem('audioId')
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

    receiveNewMsg() {
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
            } else if (top == 'mn') {
                // mn 应该是总机的离线同步消息
            }
            this.emit('newMessage', data);
        });

    }

    registerEvents() {
        this._ua.on('connecting', (data) => {
            this.emit('connecting', data);
        });

        this._ua.on('connected', (data) => {
            this.emit('connected', data);
        });

        this._ua.on('disconnected', (data) => {
            this.emit('disconnected', data);
        });

        this._ua.on('registered', (data) => {
            this.emit('registered', data);
            // 默认设置 坐席模式为固定坐席模式,
            this.setSeatMode(52);
            let userData = JSON.parse(localStorage.getItem('userData'));
            this.logonWithGroup(userData.loginGid, userData.eid);
        });

        this._ua.on('unregistered', (data) => {
            this.emit('unregistered', data);
        });

        this._ua.on('registrationFailed', (data) => {
            logger.debug('sip注册失败')
            this.emit('registrationFailed', data);
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
                  if (remoteAudio.srcObject !==  event.stream)   
                   return;
                  remoteAudio.srcObject =  event.stream;
                  track.addEventListener('ended', () => {
                  });
              });
              event.stream.addEventListener('removetrack', () => {
                  if (remoteAudio.srcObject !==  event.stream)  
                   return;
                  remoteAudio.srcObject =  event.stream;
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

    stop() {
        this._ua.stop();
        // 注销需要清除localstorege
        localStorage.removeItem('userData');
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
    setSeatMode(seatMode) {
        //<?xml version="1.0" encoding="utf-8"?><cc a="52" />
        if (seatMode == 52) this.changeStaus('1');
        
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