import JsSIP from 'jssip'
import Logger from './Logger'
import convertXml from './xmljs'
import webApi from './getLoginInfo'
import events from 'events'

const EventEmitter = events.EventEmitter
const logger = new Logger('index')

export default class JsSipWrapper extends EventEmitter {
    constructor() {
        super()
        this._ua = null
    }

    // 登录
    async login(param, cb) {
        var userData = JSON.parse(localStorage.userData)
        if (!userData) this.emit('registrationFailed')
        if (param) {
            userData.loginGid = param.gid
            userData.socketUri = param.socketUri
            userData.remoteAudio = param.remoteAudio
            localStorage.setItem('userData', JSON.stringify(userData))
        }
        //服务器确认了才写到 localStorage
        logger.debug('准备sip注册')

        this.registerSip(userData)

        this.registerEvents(cb)

        this.receiveNewMsg()
        //如何进一步保障这个值一定能取到？
        var audioId = (param && param.remoteAudio) || userData.remoteAudio
        // 此处接受 audio 元素 播放声音
        this.newSessionEvent(document.getElementById(audioId))
    }
    registerSip(userData) {
        // 直接注册sip
        let sipServer = userData.socketUri
            .split('://')[1]
            .startsWith('s01.vsbc.com')
            ? `${userData.serverIp}:${userData.sipPort}`
            : `${userData.serverIp}`
        let sipUser = `${userData.userInfo.number}_${userData.eid16}`
        let socket = new JsSIP.WebSocketInterface(userData.socketUri)
        // socket.via_transport = 'auto'
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
        })
        this._ua.start()
    }

    receiveNewMsg() {
        this._ua.on('newMessage', data => {
            if (data.originator == 'local') return
            var msgXml = data.request.body
            var result = convertXml.xmlToJs(msgXml)
            logger.debug(`receive message:${JSON.stringify(result)}`)
            let top = Object.keys(result)[0]
            var userData = JSON.parse(localStorage.userData)
            if (top == 'cc' && Number(userData.seatMode) !== 1) {
                //移动模式时不发消息
                let eventType = result.cc.a
                switch (eventType) {
                    case '1':
                    case '2':
                        // 修改状态
                        this.emit('statusChanged', {
                            status: eventType
                        })
                        break
                    case '87':
                        // 通话中预设状态响应,r=200表示成功,挂断电话就会收到状态值是2的消息
                        this.emit('preSetStatusResponse', result.cc)
                        break
                    case '38':
                        // 电话转接成功
                        this.emit('transferCallSuccess', result.cc)
                        break
                    case '39':
                        // 电话转接失败
                        this.emit('transferCallFaild', result.cc)
                        break
                    case '201':
                        // 座席外呼响应(外线)
                        this.emit('calloutResponse', result.cc)
                        break
                    case '301':
                        // 座席外呼响应(内线) r:200 成功 ;502 状态不对 503 非工作时间
                        this.emit('callinResponse', result.cc)
                        break
                    case '309':
                        // 座席外呼响应(内线) 被叫超时未接听，，给主叫发 309  被叫发101
                        this.emit('callinFaildResponse', result.cc)
                        break
                    case '100':
                        // 来电呼入
                        this.emit('newPBXCall', result.cc)
                        break
                    case '101':
                        // 来电取消 主叫方挂断; 被叫方挂断; 被叫超时未应答
                        this.emit('cancelPBXCall', result.cc)
                        break
                    case '104':
                        // 通话建立,对方接听了电话,需要打开转接,3方通话.
                        this.emit('answeredPBXCall', result.cc)
                        break
                    case '105':
                        // 通话断开
                        this.emit('endPBXCall', result.cc)
                        break
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
                    this.emit('kickedOffLine', result.o.a.u[0])
            } else if (top == 'mn') {
                // mn 应该是总机的离线同步消息
            }
            // this.emit('newMessage', data);
        })
    }

    registerEvents(cb) {
        this._ua.on('connecting', data => {
            cb({
                code: 'connecting',
                data: data
            })
        })

        this._ua.on('connected', data => {
            cb({
                code: 'connected',
                data: data
            })
        })

        this._ua.on('disconnected', data => {
            var userData = localStorage.userData
                ? JSON.parse(localStorage.userData)
                : undefined
            if (userData && userData.status == undefined) {
                this._ua.removeAllListeners()
                this._ua.stop()
                localStorage.removeItem('userData')
                cb({
                    code: 'registrationFailed',
                    data: data,
                    info: 'wss连接失败',
                    status: 51001
                })
            } else {
                cb({
                    code: 'disconnected',
                    data: data
                })
            }
        })

        this._ua.on('registered', data => {
            //注册后需要马上发三条消息
            let userData = JSON.parse(localStorage.userData)
            //设置在线,考虑刷页面、续注册情况
            let preferedStatus =
                userData.status || userData.preferredStatus || '1'
            this.preLoginStatus(preferedStatus)
            //默认设置 坐席模式为固定坐席模式,
            if (!userData.seatMode) this.setSeatMode(52, true)
            //设置gid
            this.logonWithGroup(userData.loginGid, userData.eid)
            cb({
                code: 'registered',
                data: data,
                status: 200
            })
        })

        this._ua.on('registrationFailed', data => {
            logger.debug('sip注册失败')
            localStorage.removeItem('userData')
            this._ua.stop()
            cb({
                code: 'registrationFailed',
                data: data,
                info: 'sip注册失败',
                status: 51000
            })
        })
        //http://jssip.net/documentation/3.1.x/api/ua/#event_registrationExpiring   windows 没有走续注册 mac 触发几率很高
        // this._ua.on('registrationExpiring', (data) => {
        //     cb({ code: 'registrationExpiring', data: data })
        // });
    }

    newSessionEvent(remoteAudio) {
        /******************* 通话相关事件 ******************/
        // 收到INVITE 消息后调用.
        this._ua.on('newRTCSession', data => {
            logger.debug('UA "newRTCSession" event')
            let session = data.session
            // 此处设置音频流
            session.answer({
                mediaConstraints: {
                    audio: true,
                    video: false
                }
            })
            let peerconnection = session.connection
            peerconnection.addEventListener('addstream', event => {
                // 设置音频
                remoteAudio.srcObject = event.stream
                event.stream.addEventListener('addtrack', event => {
                    let track = event.track
                    if (remoteAudio.srcObject !== event.stream) return
                    remoteAudio.srcObject = event.stream
                    track.addEventListener('ended', () => {})
                })
                event.stream.addEventListener('removetrack', () => {
                    if (remoteAudio.srcObject !== event.stream) return
                    remoteAudio.srcObject = event.stream
                })
            })
            this.emit('incomingCall', data)
            this.setSessionInfo(session)
        })
    }

    setSessionInfo(session) {
        session.on('newInfo', sessionData => {
            logger.debug('UA "newInfo" event')
            if (session.ccNumber) return
            // 解析ccNumber
            var msgXml = sessionData.request.body
            session.ccNumber = convertXml.xmlToJs(msgXml).i.n
        })
    }
    // send sip msg to PBX helper
    sendMsgHelper(content, event, tagName, dataInfo) {
        var sendXml = convertXml.jsToXml(content, tagName)
        if (event == 'preSetStatus' || event == 'preSetStatusCancle') {
            this.once('preSetStatusResponse', data => {
                console.log(data)
                //消息发送成功，监听服务器推送消息，看最终响应结果
                if (data.r == 200)
                    this.emit('sendMessageSucccess', {
                        callbacktype: event,
                        info: '调用成功',
                        data: '预设状态成功',
                        status: 200
                    })
                else
                    this.emit('sendMessageFaild', {
                        callbacktype: event,
                        info: '预设状态失败',
                        status: event == 'preSetStatus' ? 52006 : 52007
                    })
            })
        }
        var eventHandlers = {
            succeeded: data => {
                logger.debug(`${event} success!`)
                switch (event) {
                    case 'preLoginStatus':
                    case 'changeStaus':
                        this.emit('statusChanged', {
                            status: content.a
                        })
                        break
                    case 'preSetStatus':
                    case 'preSetStatusCancle':
                        return
                    case 'setSeatMode':
                        var userData = JSON.parse(localStorage.userData)
                        userData.seatMode = dataInfo.seatMode
                        if (dataInfo.callintype)
                            userData.callintype = dataInfo.callintype
                        localStorage.setItem(
                            'userData',
                            JSON.stringify(userData)
                        )
                    default:
                        this.emit('sendMessageSucccess', {
                            callbacktype: event,
                            info: '调用成功',
                            data: data,
                            dataInfo: dataInfo,
                            status: 200
                        })
                        break
                }
            },
            failed: error => {
                logger.debug(event + error)
                var status = 0
                switch (event) {
                    case 'preLoginStatus': //登录时预设状态
                        status = 52000
                        break
                    case 'logonWithGroup': //预设登录技能组
                        status = 52001
                        break
                    case 'setSeatMode': //设置坐席模式
                        status = 52002
                        break
                    case 'changeStaus': //坐席修改状态 示忙 & 示闲
                        status = 52003
                        break
                    case 'holdPBXCall': //呼叫保持
                        status = 52004
                        break
                    case 'unholdPBXCall': //呼叫恢复
                        status = 52005
                        break
                    case 'preSetStatus': //通话中预设话后状态
                        status = 52006
                        break
                    case 'preSetStatusCancle': //取消预设话后状态
                        status = 52007
                        break
                    case 'answerPBXCall': //来电接听
                        status = 52008
                        break
                    case 'hangUpPBXCall': //挂断电话
                        status = 52009
                        break
                    case 'callOutWithNumber': //外呼内线
                        status = 52010
                        break
                    case 'callOutWithPhone': //外呼外线
                        status = 52011
                        break
                    case 'transferPBXCall': //转接
                        status = 52012
                        break
                    default:
                        status = 50000
                        break
                }
                this.emit('sendMessageFaild', {
                    callbacktype: event,
                    info: error,
                    status: status,
                    dataInfo: dataInfo
                })
            }
        }
        this.sendMessage('PBX', sendXml, eventHandlers)
    }
    /**
     * 来电接听
     */
    answerPBXCall(ccNumber) {
        var content = {
            a: '102',
            c: ccNumber
        }
        this.sendMsgHelper(content, 'answerPBXCall', 'cc')
    }
    // 呼叫保持
    holdPBXCall(ccNumber) {
        var userData = JSON.parse(localStorage.getItem('userData'))
        var number = ''
        if (userData.callintype == 2 || userData.callintype == 5)
            number = `${userData.userInfo.number}_${userData.eid16}`
        if (userData.callintype == 4) number = '9' + userData.phoneNumber

        var content = {
            a: '1',
            number: number,
            cc: ccNumber
        }
        this.sendMsgHelper(content, 'holdPBXCall', 'ch')
    }

    // 呼叫恢复
    unholdPBXCall(ccNumber) {
        var userData = JSON.parse(localStorage.getItem('userData'))
        var number = ''
        if (userData.callintype == 2 || userData.callintype == 5)
            number = `${userData.userInfo.number}_${userData.eid16}`
        if (userData.callintype == 4) number = '9' + userData.phoneNumber
        var content = {
            a: '2',
            number: number,
            cc: ccNumber
        }
        this.sendMsgHelper(content, 'unholdPBXCall', 'ch')
    }

    /**
     * 通话中预设坐席状态 这边只能是休息状态
     */
    preSetStatus(ccNumber) {
        var content = {
            a: '87',
            s: '2',
            c: ccNumber
        }
        this.sendMsgHelper(content, 'preSetStatus', 'cc')
    }
    /**
     * 取消通话中预设坐席状态
     */
    preSetStatusCancle(ccNumber) {
        var content = {
            a: '87',
            s: '-1',
            c: ccNumber
        }
        this.sendMsgHelper(content, 'preSetStatusCancle', 'cc')
    }
    /**
     * 挂断电话
     */
    hangUpPBXCall(ccNumber) {
        var content = {
            a: '106',
            c: ccNumber
        }
        this.sendMsgHelper(content, 'hangUpPBXCall', 'cc')
    }

    // 拨打电话
    callOut(target, type, eventHandlers) {
        // type = 1 外线拨号  type = 2 回拨  type = 3 内线互拨
        logger.debug('call others [uri:"%s"]', target)
        var userData = JSON.parse(localStorage.userData)
        var randkey = Math.random()
            .toString()
            .split('.')[1]
            .substr(0, 3) //3位随机串
        switch (type) {
            case 1:
                let session = this._ua.call(target, {
                    mediaConstraints: {
                        audio: true
                    },
                    rtcOfferConstraints: {
                        offerToReceiveAudio: 1
                    },
                    eventHandlers: eventHandlers
                })
                this.setSessionInfo(session)
                return session
                break
            case 2:
                // p 是总机号,应该要从登陆的参数获得 ,i 是时间戳,随机生成
                var content = {
                    a: '200',
                    p: userData.switchNumber,
                    i: Date.now().toString() + randkey,
                    t: target
                }
                this.sendMsgHelper(content, 'callOutWithPhone', 'cc')
                break
            case 3:
                var content = {
                    a: '300',
                    p: userData.switchNumber,
                    i: Date.now().toString() + randkey,
                    t: `${target}_${userData.eid16}`
                }
                this.sendMsgHelper(content, 'callOutWithNumber', 'cc')
                break
            default:
        }
    }

    logOut(cb) {
        this._ua.removeAllListeners()
        this._ua.stop()
        this._ua.once('unregistered', data => {
            var res = data.response
            if (
                res.reason_phrase == 'OK' &&
                res.status_code == 200 &&
                res.method == 'REGISTER'
            ) {
                // 注销需要清除localstorege
                localStorage.removeItem('userData')
                cb({
                    code: res.status_code,
                    info: res.reason_phrase
                })
            } else {
                cb({
                    code: 53000,
                    info: res.reason_phrase
                })
            }
        })
    }

    // 发送xml消息
    sendMessage(target, text, eventHandlers) {
        logger.debug(`send message!!!,content:${text} target:${target}`)
        let options = {
            eventHandlers: eventHandlers,
            contentType: 'application/pidf+xml'
        }
        return this._ua.sendMessage(target, text, options)
    }

    isConnected() {
        return this._ua.isConnected
    }

    // 登录时预设状态  1 空闲  2暂离
    preLoginStatus(status) {
        // var xml = `<?xml version="1.0" encoding="utf-8"?><cc a="1" />`
        return this.sendMsgHelper(
            {
                a: status.toString()
            },
            'preLoginStatus',
            'cc'
        )
    }
    // 修改坐席状态 0 离线  1 空闲  2暂离
    changeStaus(status) {
        // var xml = `<?xml version="1.0" encoding="utf-8"?><cc a="1" />`
        return this.sendMsgHelper(
            {
                a: status.toString()
            },
            'changeStaus',
            'cc'
        )
    }

    // 发送登录时所选组的消息
    logonWithGroup(gid, eid) {
        // <?xml version="1.0" encoding="utf-8"?><cc a="53" g="580_65656" />
        return this.sendMsgHelper(
            {
                a: '53',
                g: `${gid}_${eid}`
            },
            'logonWithGroup',
            'cc'
        )
    }
    /**
     * 设置座席模式
     * seatMode 51 移动模式  52 固定模式
     * 对应 localStorage 值存储为  1 移动模式 2 固定模式
     */
    // 设置座席模式
    async setSeatMode(seatMode, isLogin) {
        //<?xml version="1.0" encoding="utf-8"?><cc a="52" />
        if (!isLogin && seatMode == 52) this.changeStaus('1') //登录后设置成固定模式时，必须置闲
        var userData = JSON.parse(localStorage.userData)
        var dataInfo = {}
        if (seatMode == 52) {
            //固定模式
            dataInfo.seatMode = 2
            if (!isLogin) dataInfo.callintype = userData.oldCallType
        }
        if (seatMode == 51) {
            //移动坐席模式
            dataInfo.seatMode = 1
            dataInfo.callintype = 4 // 移动坐席模式必须是 回拨模式
        }
        //移动模式时必须是电路模式  固定模式时必须配置回拨话机号，，暂不处理，切回 voip模式
        var webParam = {
            un: userData.userInfo.number,
            pwd: userData.clearPwd.slice(8, userData.clearPwd.length - 6),
            eid: userData.eid,
            jsonStr: JSON.stringify({
                data: {
                    callintype: dataInfo.callintype
                }
            })
        }
        var updateResult = await JsSipWrapper.webApiHandler(
            'updateInfo',
            webParam
        )
        if (updateResult.status !== 200) {
            this.emit('sendMessageFaild', {
                callbacktype: 'setSeatMode',
                info: updateResult.info,
                status: 52002
            })
            return
        }
        return this.sendMsgHelper(
            {
                a: seatMode.toString()
            },
            'setSeatMode',
            'cc',
            dataInfo
        )
    }
    // 通话转接给坐席
    transferPBXCall(ccNumber, gid, tranNumber) {
        //<?xml version="1.0" encoding="utf-8"?><cc a="31" c="1522722042196121conf_1522721954556" g="0_65656" n="1008_00010078" />
        if (!ccNumber || !gid || !tranNumber) {
            let err = new Error('缺少参数')
            return err
        }
        var userData = JSON.parse(localStorage.userData)
        var content = {
            a: '31',
            c: ccNumber,
            g: `${gid}_${userData.eid}`,
            n: `${tranNumber}_${userData.eid16}`
        }
        return this.sendMsgHelper(content, 'transferPBXCall', 'cc')
    }
}
JsSipWrapper.getLoginData = webApi.getLoginData
JsSipWrapper.webApiHandler = webApi.webApiHandler
