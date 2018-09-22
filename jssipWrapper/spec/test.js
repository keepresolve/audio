var assert = require('assert')
// 引入 如果上一个单元测试执行失败下面的就停止执行
require('mocha-steps')
var debug = require('debug')('unit-test')
// 引入jssipwarp
import sipWrapper from '../src/lib'
import webApi from '../src/lib/getLoginInfo'
import convertXml from '../src/lib/xmljs.js'

/*
如果切换账号 测试 getMemberInfo的displayname要改下
  邱朗：  1024
  冯春燕： 1006
  贾国林： 1026
  曹士远:  1039
  关璐璐： 1023
  宋光暖： 1043
  王惠：   1042
*/
let switchNumber = '02566699734'
let yunwei = 'kfyw.emic.com.cn'
let WebRTC_gateway = 'wss://s01.vsbc.com:9060'
let account = '1024'
let pass = '1024'
// 内呼分机号
let callInsideLine = 1032
let callPhone = '910086'
// 转接号码 转接号码不要和内线呼入号码是同一个 因为: 转接过后 会立刻呼叫转接的座席 会话会建立失败
let tranNumber = 1055
// 此处的技能组id是在线客服组
let gid = 2059
//2 VoIP 模式
let callinType = 2
// 区号查询到的province
let province = '西藏自治区'

describe('webApi', function() {
    before(function() {
        localStorage.clear()
        //localStorage.setItem("debug", "unit-test,*getLoginInfo");
        localStorage.setItem('debug', 'unit-test')
    })
    describe('登录 获取信息', function() {
        step('获取运维服务器地址：loadServerFromJson', async function() {
            var server = await webApi._loadServerFromJson(switchNumber)
            assert.equal(server, yunwei)
        })
        step('loadServerFromJson 区号测试: 0555-534543', async function() {
            var server = await webApi._loadServerFromJson('0555-534543')
            assert.equal(server, 'ah.emic.com.cn')
        })
        step('loadServerFromJson 区号测试: 02153454378', async function() {
            var server = await webApi._loadServerFromJson('02153454378')
            assert.equal(server, 'sh.emic.com.cn')
        })
        xstep('_queryAddrByAreaCode 区号查询省份: 0891', async function() {
            var provinceData = await webApi._queryAddrByAreaCode('0891')
            province = provinceData.data
            assert.equal(province, '西藏自治区')
        })
        step('运维列表查询运维服务器地址: 0891', async function() {
            var serverData = await webApi._loadServer()
            var yunweiList = serverData.data
            var server
            for (var i = 0; i < yunweiList.length; i++) {
                if (province.startsWith(yunweiList[i].province)) {
                    server = yunweiList[i].s_client_domain
                    return
                }
            }
            assert.equal(server, 'xz.emic.com.cn')
        })
        step('获取运维信息:getInfo,获取eid', async function() {
            var info = await webApi._getInfo(
                account,
                pass,
                switchNumber,
                yunwei
            )
            assert.equal(
                info.status,
                '200',
                `调用getInfo失败,返回:${info.status}`
            )
            assert.notEqual(info.data.real_domain, null)
            debug('获取实际的注册地址:' + info.data.real_domain)
            let eid = Number(info.data.eid).toString(16)
            let eid8 = JSON.parse(localStorage.getItem('userData')).eid16
            assert.equal(eid8.length, 8)
            assert.ok(eid8.endsWith(eid), `${eid8} should end with ${eid}`)
            debug('获取企业id(16进制):' + eid8)
        })
        step('获取本企业相关属性 getEpProfile', async function() {
            var webParam = {
                un: account,
                pwd: pass,
                eid: JSON.parse(localStorage.getItem('userData')).eid
            }
            var EsInfo = await webApi.webApiHandler('getEpProfile', webParam)
            assert.equal(
                EsInfo.status,
                200,
                `调用getEpProfile失败,返回:${EsInfo.status}`
            )

            var para = document.createElement('div')
            var node = document.createTextNode(
                `getEpProfile:${JSON.stringify(EsInfo)}`
            )
            para.appendChild(node)
            document.getElementById('info').appendChild(para)
            assert.notEqual(EsInfo.returnData, null)
            let epProfile = EsInfo.returnData
            debug('这些设置到底哪些合理要再查文档，有几个重要属性值要检查')
            assert.notEqual(epProfile.switch_number_default, null)
            assert.equal(epProfile.allow_customer_manager, '1')
            assert.equal(epProfile.allow_monitor, '1')
        })
        step('获取座席信息详情 getMemberInfo', async function() {
            var webParam = {
                un: account,
                pwd: pass,
                eid: JSON.parse(localStorage.getItem('userData')).eid
            }
            var memberInfo = await webApi.webApiHandler(
                'getMemberInfo',
                webParam
            )
            assert.equal(memberInfo.status, 200)
            var para = document.createElement('div')
            var node = document.createTextNode(
                `获取技能组座席 getMemberInfo:${JSON.stringify(memberInfo)}`
            )
            para.appendChild(node)
            document.getElementById('info').appendChild(para)
            let member = memberInfo.returnData
            assert.notEqual(member.userData, null)
            assert.notEqual(member.inGroups, null)
            debug('因为预设1006这个账号在 客服组测试,其他几个设置含义还需校对')
            let group = member.inGroups[0]
            assert.equal(group.name, '客服组测试')
            assert.equal(group.eid, webParam.eid)
            assert.equal(member.userData.number, webParam.un)
            assert.equal(member.userData.displayname, 'qiulang')
            assert.equal(member.userData.call_limit, '0')
            assert.equal(member.userData.permission, '2')
        })
        step('更新用户呼叫模式 updateInfo', async function() {
            var webParam = {
                un: account,
                pwd: pass,
                eid: JSON.parse(localStorage.getItem('userData')).eid
            }
            webParam.jsonStr = JSON.stringify({
                data: {
                    callintype: callinType
                }
            })
            var updateInfo = await webApi.webApiHandler('updateInfo', webParam)
            assert.equal(updateInfo.status, 200)
            var para = document.createElement('div')
            var node = document.createTextNode(
                `更新用户呼叫模式 updateInfo:${JSON.stringify(updateInfo)}`
            )
            para.appendChild(node)
            document.getElementById('info').appendChild(para)
            debug('更新呼叫模式，返回200即表示成功')
        })
        step(
            '最后测试：登录获取信息，以上步骤完整的一次调用',
            async function() {
                var a = await webApi.getLoginData(
                    account,
                    pass,
                    switchNumber,
                    callinType
                )
                assert.equal(a.status, 200)
                debug('以上步骤完整的一次调用，返回200即表示成功')
            }
        )
    })
    describe('登陆后 获取信息', function() {
        step('获取用户通话状态 getMemberCallStates', async function() {
            var webParam = {
                un: account,
                pwd: pass,
                eid: JSON.parse(localStorage.getItem('userData')).eid
            }
            debug('何时调用getMemberCallStates合适？')
            var MemberCallStatesInfo = await webApi.webApiHandler(
                'getMemberCallStates',
                webParam
            )
            assert.equal(MemberCallStatesInfo.status, 200)
            debug(MemberCallStatesInfo.returnData)
        })
        step('获取用户列表接', async function() {
            var webParam = {
                un: account,
                pwd: pass,
                eid: JSON.parse(localStorage.getItem('userData')).eid
            }
            debug('何时调用searchEpMembers合适？')
            var returnData = await webApi.webApiHandler(
                'searchEpMembers',
                webParam
            )
            // 这个返回的是所有用户的信息 如果用户增加 修改数值
            debug(returnData.returnData)
            assert.ok(returnData.returnData.data.length > 0)
            assert.ok(returnData.returnData.recordsTotal > 0)
            assert.ok(returnData.returnData.recordsFiltered > 0)
            assert.equal(returnData.status, 200)
        })
    })
})

describe('云总机企业处理', () => {
    let number = '02566699808'
    let yunwei2 = 'yzj.10010js.com'
    let account2 = '8025'
    let pass2 = '8025'
    step('获取运维服务器地址：loadServerFromJson', async function() {
        var server = await webApi._loadServerFromJson(number)
        assert.equal(server, yunwei2)
    })
    step('getInfo返回50001', async function() {
        var info = await webApi._getInfo(account2, pass2, number, yunwei2)
        assert.equal(
            info.status,
            '50001',
            `yzj.10010js.com目前不支持跨域,返回:${info.status}`
        )
    })
})

describe('sip相关消息测试', function() {
    let _ua
    var registerted
    before(function() {
        localStorage.setItem('debug', 'unit-test,*index')
    })
    //@todo 反复重连的处理
    step('注册登录', async function(done) {
        // 有时测试用例会超时，所以设置下时间
        this.timeout(50000)
        _ua = new sipWrapper()
        var loginParam = {
            un: account,
            pwd: pass,
            switchNumber: switchNumber,
            callintype: callinType,
            socketUri: WebRTC_gateway,
            remoteAudio: 'peeraudio',
            status: 1
        }
        debug('ua.login')
        _ua.login(loginParam, data => {
            debug(data)
            if (data.code == 'registered') {
                done()
            } else if (data.code == 'registrationFailed') {
                done(new Error('注册失败'))
            }
        })
    })
    /* 这是云总机企业的测试用例，不适用呼叫中心区企业*/
    xstep('call 外呼', function(done) {
        // 此测试用例时间过长，设置 避免超时
        this.timeout(100000)
        var that = this
        var session = null
        // Register callbacks to desired call events
        var eventHandlers = {
            //成功失败进行
            progress: function(e) {
                that.session = session
            },
            // 外呼失败 会触发
            failed: function(e) {
                that.session = null
                debug(e)
                done(new Error('外呼失败'))
            },
            // 通话结束  表示完成
            ended: function(e) {
                that.session = null
                done()
            },
            confirmed: function(e) {
                that.session = session
            },
            accepted: function(e) {}
        }
        //http://jssip.net/documentation/3.2.x/api/session/
        session = _ua.call(callPhone, 1, eventHandlers)
        let peerconnection = session.connection
        // 拨打电话 通了之后大概十秒钟 自动挂断电话 未写
        peerconnection.addEventListener('addstream', event => {
            let remoteAudio = document.getElementById('peeraudio')
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
    })

    step('回拨方式 呼外线 呼叫保持 转接 call', function(done) {
        this.timeout(500000)
        //http://jssip.net/documentation/3.2.x/api/session/
        _ua.call(callPhone, 2)
        // 此变量防止 转接失败调用done
        var currentStatus = 0
        // 来电 ---
        _ua.once('incomingCall', function(data) {
            let session = data.session
            debug(session)
            // 设置10秒后呼叫保持3s
            setTimeout(() => {
                // 呼叫保持
                debug('呼叫开始保持-------------')
                session.hold()
                setTimeout(() => {
                    debug('呼叫保持成功')
                    session.unhold()
                }, 3000)
                // 呼叫转接8s
                setTimeout(() => {
                    _ua.transferPBXCall(session.ccNumber, gid, tranNumber)
                    debug(`转接给${tranNumber}`)
                    _ua.once('transferCallSuccess', data => {
                        debug('转接成功')
                    })
                    _ua.once('transferCallFaild', data => {
                        currentStatus = 1
                        debug('转接失败')
                        // 失败挂断电话
                        _ua.hangUpPBXCall(session.ccNumber)
                        done(new Error('转接失败'))
                    })
                }, 8000)
            }, 10000)
            session.on('progress', data => {
                // 在接收或生成INVITE请求的1XX SIP类响应（> 100）时触发
                debug('progress')
            })
            session.on('accepted', data => {
                // 接听电话时触发
                debug('accepted')
            })
            session.on('connecting', data => {
                //接受会话正在连接
                debug('connecting')
            })
            session.on('failed', data => {
                // 当会话无法建立时被触发
                done(new Error('failed'))
            })
            session.on('ended', data => {
                // 建立的呼叫结束时触发
                if (currentStatus == 0) {
                    debug('call finished 外呼')
                    done()
                }
            })
        })
    })

    step('呼内线 call', function(done) {
        this.timeout(500000)
        _ua.call(callInsideLine, 3)
        _ua.once('incomingCall', function(data) {
            debug('内线来电+++++++++++++')
            // 定时器 挂断电话  10s
            setTimeout(function() {
                _ua.hangUpPBXCall(data.session.ccNumber)
            }, 10000)
            data.session.on('progress', data => {
                // 在接收或生成INVITE请求的1XX SIP类响应（> 100）时触发
                debug('progress')
            })
            data.session.on('accepted', data => {
                // 接听电话时触发
                debug('accepted')
            })
            data.session.on('connecting', data => {
                //接受会话正在连接
                debug('connecting')
            })
            data.session.on('failed', data => {
                // 当会话无法建立时被触发
                done(new Error('failed'))
            })
            data.session.on('ended', data => {
                // 建立的呼叫结束时触发
                debug('call finished 呼内线')
                done()
            })
        })
        _ua.once('callinResponse', function(data) {
            debug(data)
            if (data.r == 503) {
                debug('座席状态不对  忙线...')
                done(new Error(`座席${callInsideLine}无法接听`))
            }
        })
    })
    step('修改座席状态', function(done) {
        this.timeout(5000)
        _ua.changeStaus('2')
        _ua.once('statusChanged', function() {
            debug('改变状态成功')
            done()
        })
        _ua.once('changeStausFailed', function() {
            debug('改变状态失败')
            done('改变状态失败')
        })
    })
    step('修改坐席模式', async function() {
        this.timeout(5000)
        await _ua.setSeatMode(51, false)
        var seatMode = JSON.parse(localStorage.getItem('userData')).seatMode
        debug('修改坐席模式 ------>  移动模式', seatMode)
        assert.equal(seatMode, '1')
    })
    step('用户注销', function(done) {
        this.timeout(2000)
        _ua.stop(res => {
            if (res.code == 200) {
                done()
            } else {
                done(new Error('注销失败'))
            }
        })
    })
})

describe('xml-js相互转换', function() {
    step('xml-js, 简单情况', function() {
        let xml = `<?xml version="1.0" encoding="utf-8"?>\
    <cc a="103" c="02557926526conf0_1522749264981" \
    i="1520488772626763" r="200"/>`
        var returnJs = convertXml.xmlToJs(xml)
        debug(xml)
        assert.equal(returnJs.cc.a, '103')
        assert.equal(returnJs.cc.c, '02557926526conf0_1522749264981')
        assert.equal(returnJs.cc.i, '1520488772626763')
        assert.equal(returnJs.cc.r, '200')
    })
    step('xml-js, 复杂情况', function() {
        let xml = `<?xml version="1.0" encoding="utf-8"?>
    <cc a="82" n="6" i="s_636581765458956378">
      <u n="1001_00010078" m="2" s="0" b="1522550821" />
      <u n="1003_00010078" m="2" s="1" b="1522550732" />
      <u n="1009_00010078" m="1" s="1" b="1522550243" />
      <u n="1012_00010078" m="2" s="0" b="1522550244" />
      <u n="1013_00010078" m="2" s="0" b="1522550245" />
      <u n="1572_00010078" m="2" s="0" b="1522550246" />
    </cc>`
        var returnJs = convertXml.xmlToJs(xml)
        debug(xml)
        assert.equal('82', returnJs.cc.a)
        assert.equal('6', returnJs.cc.n)
        assert.equal('s_636581765458956378', returnJs.cc.i)
        assert.equal(6, returnJs.cc.u.length)
        var obj = [
            { b: '1522550821', m: '2', n: '1001_00010078', s: '0' },
            { b: '1522550732', m: '2', n: '1003_00010078', s: '1' },
            { b: '1522550243', m: '1', n: '1009_00010078', s: '1' },
            { b: '1522550244', m: '2', n: '1012_00010078', s: '0' },
            { b: '1522550245', m: '2', n: '1013_00010078', s: '0' },
            { b: '1522550246', m: '2', n: '1572_00010078', s: '0' }
        ]
        for (var i = 0, len = returnJs.cc.u.length; i < len; i++) {
            assert.equal(obj[i].b, returnJs.cc.u[i].b)
            assert.equal(obj[i].m, returnJs.cc.u[i].m)
            assert.equal(obj[i].n, returnJs.cc.u[i].n)
            assert.equal(obj[i].s, returnJs.cc.u[i].s)
        }
    })
    step('sip-info', function() {
        var rs = convertXml.xmlToJs(
            `<?xml version="1.0" encoding="UTF-8"?><i n="1026_00010078conf0_1533280532501" s="*"> <u n="918550259787" a="i" l="m" /></i>`
        )
        debug(rs)
        assert.equal('1026_00010078conf0_1533280532501', rs.i.n)
        assert.equal('*', rs.i.s)
        assert.equal('918550259787', rs.i.u[0].n)
        assert.equal('i', rs.i.u[0].a)
        assert.equal('m', rs.i.u[0].l)
    })
    step('js-xml', function() {
        var JsObj = { a: '103', c: '02557926526conf0_1522749264981' }
        var returnXml = convertXml.jsToXml(JsObj, 'cc')
        assert.equal(
            '<?xml version="1.0" encoding="utf-8"?><cc a="103" c="02557926526conf0_1522749264981"></cc>',
            returnXml
        )
    })
    step('三级', function() {
        var xml = `<?xml version="1.0" encoding="UTF-8"?>
    <o>
     <a>
      <u n="1006_00010078" a="o" nm="fengchunyan" r="895" />
     </a>
    </o>`
        var returnJs = convertXml.xmlToJs(xml)
        assert.equal('fengchunyan', returnJs.o.a.u[0].nm)
        assert.equal('895', returnJs.o.a.u[0].r)
        debug(returnJs)
    })
})
