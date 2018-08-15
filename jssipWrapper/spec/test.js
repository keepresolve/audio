var assert = require('assert');
// 引入 如果上一个单元测试执行失败下面的就停止执行
require('mocha-steps')
var debug = require('debug')('unit-test')
// 引入jssipwarp
import sipWrapper from '../src/lib'
import webApi from '../src/lib/getLoginInfo'
import { xmlToJs, jsToXml } from '../src/lib/xmljs.js'

let switchNumber = '02566699734'
let yunwei = 'kfyw.emic.com.cn'
let WebRTC_gateway = 'wss://s01.vsbc.com:9060'
let account = '1043'
let pass = '1043'
// 内呼分机号
let callInsideLine = '1026'
let callPhone = '910086'
//2 VoIP 模式
let callinType = 2

describe('webApi', function () {
  before(function () {
    localStorage.clear();
    //localStorage.setItem("debug", "unit-test,*getLoginInfo");
    localStorage.setItem("debug", "unit-test");
  })
  describe('登录 获取信息', function () {
    step('获取运维服务器地址：loadServerFromJson', async function () {
      var server = webApi._loadServerFromJson(switchNumber);
      assert.equal(server, yunwei);
    })
    step('loadServerFromJson 区号测试: 0555-534543', async function () {
      var server = webApi._loadServerFromJson('0555-534543');
      assert.equal(server, 'ah.emic.com.cn');
    })
    step('loadServerFromJson 区号测试: 02153454378', async function () {
      var server = webApi._loadServerFromJson('02153454378');
      assert.equal(server, "sh.emic.com.cn");
    })
    step('获取运维信息:getInfo,获取eid', async function () {
      var info = await webApi._getInfo(account, pass, switchNumber, yunwei);
      assert.equal(info.status, '200', `调用getInfo失败,返回:${info.status}`);
      assert.notEqual(info.data.real_domain, null);
      debug('获取实际的注册地址:' + info.data.real_domain)
      let eid = Number(info.data.eid).toString(16)
      let eid8 = JSON.parse(localStorage.getItem("userData")).eid16
      assert.equal(eid8.length, 8)
      assert.ok(eid8.endsWith(eid), `${eid8} should end with ${eid}`)
      debug('获取企业id(16进制):' + eid8)
    })
    step('获取本企业相关属性 getEpProfile', async function () {
      var webParam = {
        un: account,
        pwd: pass,
        eid: JSON.parse(localStorage.getItem("userData")).eid
      }
      var EsInfo = await webApi.webApiHandler('getEpProfile', webParam);
      assert.equal(EsInfo.status, 200, `调用getEpProfile失败,返回:${EsInfo.status}`);

      var para = document.createElement("div");
      var node = document.createTextNode(`getEpProfile:${JSON.stringify(EsInfo)}`);
      para.appendChild(node);
      document.getElementById('info').appendChild(para)
      assert.notEqual(EsInfo.returnData, null);
      let epProfile = EsInfo.returnData;
      debug('这些设置到底哪些合理要再查文档，有几个重要属性值要检查')
      assert.notEqual(epProfile.switch_number_default, null)
      assert.equal(epProfile.allow_customer_manager, "1")
      assert.equal(epProfile.allow_monitor, "1")
    })
    step('获取座席信息详情 getMemberInfo', async function () {
      var webParam = {
        un: account,
        pwd: pass,
        eid: JSON.parse(localStorage.getItem("userData")).eid
      }
      var memberInfo = await webApi.webApiHandler('getMemberInfo', webParam);
      assert.equal(memberInfo.status, 200);
      var para = document.createElement("div");
      var node = document.createTextNode(`获取技能组座席 getMemberInfo:${JSON.stringify(memberInfo)}`);
      para.appendChild(node);
      document.getElementById('info').appendChild(para)
      let member = memberInfo.returnData;
      assert.notEqual(member.userData, null)
      assert.notEqual(member.inGroups, null)
      debug('因为预设1006这个账号在 客服组测试,其他几个设置含义还需校对')
      let group = member.inGroups[0]
      assert.equal(group.name, "客服组测试")
      assert.equal(group.eid, webParam.eid)
      assert.equal(member.userData.number, webParam.un)
      assert.equal(member.userData.displayname, "songguangnuan")
      assert.equal(member.userData.call_limit, "0")
      assert.equal(member.userData.permission, "2")
    })
    step('更新用户呼叫模式 updateInfo', async function () {
      var webParam = {
        un: account,
        pwd: pass,
        eid: JSON.parse(localStorage.getItem("userData")).eid
      }
      webParam.jsonStr = JSON.stringify({
        "data": {
          "callintype": callinType
        }
      });
      var updateInfo = await webApi.webApiHandler('updateInfo', webParam);
      assert.equal(updateInfo.status, 200);
      var para = document.createElement("div");
      var node = document.createTextNode(`更新用户呼叫模式 updateInfo:${JSON.stringify(updateInfo)}`);
      para.appendChild(node);
      document.getElementById('info').appendChild(para)
      debug('更新呼叫模式，返回200即表示成功')
    })
    step('最后测试：登录获取信息，以上步骤完整的一次调用', async function () {
      var a = await webApi.getLoginData(account, pass, switchNumber, callinType);
      assert.equal(a.status, 200);
      debug('以上步骤完整的一次调用，返回200即表示成功')
    })
  })
  describe('登陆后 获取信息', function () {
    step('获取用户通话状态 getMemberCallStates', async function () {
      var webParam = {
        un: account,
        pwd: pass,
        eid: JSON.parse(localStorage.getItem("userData")).eid
      }
      debug('何时调用getMemberCallStates合适？')
      var MemberCallStatesInfo = await webApi.webApiHandler('getMemberCallStates', webParam);
      assert.equal(MemberCallStatesInfo.status, 200);
      debug(MemberCallStatesInfo.returnData)
    })
    step('获取用户列表接', async function () {
      var webParam = {
        un: account,
        pwd: pass,
        eid: JSON.parse(localStorage.getItem("userData")).eid
      }
      debug('何时调用searchEpMembers合适？')
      var returnData = await webApi.webApiHandler('searchEpMembers', webParam);
      // 这个返回的是所有用户的信息 如果用户增加 修改数值
      debug(returnData.returnData)
      assert.ok(returnData.returnData.data.length > 0)
      assert.ok(returnData.returnData.recordsTotal > 0)
      assert.ok(returnData.returnData.recordsFiltered > 0)
      assert.equal(returnData.status, 200);
    })
  })
})

describe('sip相关消息测试', function () {
  let _ua;
  var registerted;
  before(function () {
    localStorage.setItem("debug", "unit-test,*index");
  })
  //@todo 反复重连的处理
  step('注册登录', async function (done) {
    // 有时测试用例会超时，所以设置下时间
    this.timeout(50000);
    _ua = new sipWrapper();
    var loginParam = {
      un: account,
      pwd: pass,
      switchNumber: switchNumber,
      callintype: callinType,
      socketUri: WebRTC_gateway,
      remoteAudio: "peeraideo"
    }
    debug('ua.login')
    _ua.login(loginParam);
    _ua.on('connecting', () => {
      debug('尝试连接WebRTC网关')
    });
    _ua.once('connected', () => {
      debug('连接到WebRTC网关')
      var para = document.createElement("div");
      var node = document.createTextNode(`连接消息：socket连接成功`);
      para.appendChild(node);
      document.getElementById('info').appendChild(para)
    });
    _ua.once('disconnected', () => {
      var para = document.createElement("div");
      var node = document.createTextNode(`连接消息：socket断开`);
      para.appendChild(node);
      document.getElementById('info').appendChild(para);
      debug('从WebRTC网关断开')
    });
    // 注册成功事件 事件触发 说明测试用例通过
    _ua.once('registered', (data) => {
      var para = document.createElement("div");
      var node = document.createTextNode(`注册消息：注册成功`);
      para.appendChild(node);
      document.getElementById('info').appendChild(para)
      debug('注册成功')
    });

    _ua.once('statusChanged', () => {
      debug('sip注册成功紧接着改变用户状态也成功')
      if (registerted) return;//防止重连情况 done被多次调用
      registerted = true;
      done()
    });
    /**
     * 注册失败
     */
    _ua.on('getLoginDataFailed', (data) => {
      debug(`getLoginDataFailed 失败原因:`)
      debug(data)
      //本来调用assert.fail()是最直接方式，但是因为引入EventEmitter，处理逻辑变复杂
      //AssertionError会造成registrationFailed消息再次抛出
      //所以用done(error) 方式表示失败
      //https://stackoverflow.com/a/40539753/301513
      done(new Error('注册失败,getLoginDataFailed'));
    });

    _ua.on('registrationFailed', (data) => {
      var para = document.createElement("div");
      var node = document.createTextNode(`注册消息：注册失败`);
      para.appendChild(node);
      document.getElementById('info').appendChild(para)
      debug(`registrationFailed 失败原因:`)
      debug(data)
      done(new Error('注册失败'));
    });
    // 这个事件， 当注册超时前会被触发
    _ua.on('registrationExpiring', (data) => {
      var para = document.createElement("div");
      var node = document.createTextNode(`注册消息：注册超时`);
      para.appendChild(node);
      document.getElementById('info').appendChild(para)
    });
  })
  // step('call 外呼', function (done) {
  //   // 此测试用例时间过长，设置 避免超时
  //   this.timeout(100000);
  //   var that = this
  //   var session = null
  //   // Register callbacks to desired call events
  //   var eventHandlers = { //成功失败进行
  //       'progress': function (e) {
  //           that.session = session
  //       },
  //       // 外呼失败 会触发
  //       'failed': function (e) {
  //           that.session = null
  //           debug(e)
  //           done(new Error("外呼失败"))
  //       },
  //       // 通话结束  表示完成
  //       'ended': function (e) {
  //           that.session = null
  //           done()
  //       },
  //       'confirmed': function (e) {
  //           that.session = session
  //       },
  //       'accepted': function (e) {
  //       }
  //   };
  //   //http://jssip.net/documentation/3.2.x/api/session/
  //   session = _ua.call(callPhone, 1, eventHandlers)
  //   let peerconnection = session.connection;
  //   // 拨打电话 通了之后大概十秒钟 自动挂断电话 未写
  // peerconnection.addEventListener('addstream', (event) => {
  //     let remoteAudio = document.getElementById("peeraideo")
  //     // 设置音频
  //     remoteAudio.srcObject = event.stream;
  //     event.stream.addEventListener('addtrack', (event) => {
  //         let track = event.track;
  //         if (remoteAudio.srcObject !==  event.stream)   
  //          return;
  //         remoteAudio.srcObject =  event.stream;
  //         track.addEventListener('ended', () => {
  //         });
  //     });
  //     event.stream.addEventListener('removetrack', () => {
  //         if (remoteAudio.srcObject !==  event.stream)  
  //          return;
  //         remoteAudio.srcObject =  event.stream;
  //     });
  // });
  // })
  step("回拨方式 呼外线 call", function (done) {
    this.timeout(500000);
    //http://jssip.net/documentation/3.2.x/api/session/
    _ua.call(callPhone, 2)
    // 来电 ---
    _ua.once("incomingCall", function (data) {
      let session = data.session
      debug(session)
      // 定时器 挂断电话  50s
      setTimeout(function () {
        _ua.hangUpPBXCall(session.ccNumber)
      }, 25000)
      session.on("progress", (data) => {
        // 在接收或生成INVITE请求的1XX SIP类响应（> 100）时触发
        debug('progress')
      })
      session.on("accepted", (data) => { // 接听电话时触发
        debug('accepted')
      })
      session.on("connecting", (data) => { //接受会话正在连接
        debug("connecting")
      })
      session.on("failed", (data) => { // 当会话无法建立时被触发
        done(new Error("failed"))
      })
      session.on('ended', (data) => { // 建立的呼叫结束时触发
        debug('call finished')
        done()
      });
    })
  })
  step("呼内线 call", function (done) {
    this.timeout(500000);
    _ua.call(callInsideLine, 3)
    _ua.once("incomingCall", function (data) {
      // 定时器 挂断电话  50s
      setTimeout(function () {
        _ua.hangUpPBXCall(session.ccNumber)
      }, 25000)
      data.session.on("progress", (data) => {
        // 在接收或生成INVITE请求的1XX SIP类响应（> 100）时触发
        debug('progress')
      })
      data.session.on("accepted", (data) => { // 接听电话时触发
        debug('accepted')
      })
      data.session.on("connecting", (data) => { //接受会话正在连接
        debug("connecting")
      })
      data.session.on("failed", (data) => { // 当会话无法建立时被触发
        done(new Error("failed"))
      })
      data.session.on('ended', (data) => { // 建立的呼叫结束时触发
        debug('call finished')
        done()
      });
    })
  })
})
describe('xml-js相互转换', function () {
  step('xml-js, 简单情况', function () {
    let xml = `<?xml version="1.0" encoding="utf-8"?>\
    <cc a="103" c="02557926526conf0_1522749264981" \
    i="1520488772626763" r="200"/>`
    var returnJs = xmlToJs(xml)
    debug(xml)
    assert.equal(returnJs.cc.a, '103')
    assert.equal(returnJs.cc.c, '02557926526conf0_1522749264981')
    assert.equal(returnJs.cc.i, '1520488772626763')
    assert.equal(returnJs.cc.r, '200')
  })
  step('xml-js, 复杂情况', function () {
    let xml = `<?xml version="1.0" encoding="utf-8"?>
    <cc a="82" n="6" i="s_636581765458956378">
      <u n="1001_00010078" m="2" s="0" b="1522550821" />
      <u n="1003_00010078" m="2" s="1" b="1522550732" />
      <u n="1009_00010078" m="1" s="1" b="1522550243" />
      <u n="1012_00010078" m="2" s="0" b="1522550244" />
      <u n="1013_00010078" m="2" s="0" b="1522550245" />
      <u n="1572_00010078" m="2" s="0" b="1522550246" />
    </cc>`
    var returnJs = xmlToJs(xml)
    debug(xml)
    assert.equal('82', returnJs.cc.a)
    assert.equal('6', returnJs.cc.n)
    assert.equal('s_636581765458956378', returnJs.cc.i)
    assert.equal(6, returnJs.cc.u.length)
    var obj = [{ b: "1522550821", m: "2", n: "1001_00010078", s: "0" },
    { b: "1522550732", m: "2", n: "1003_00010078", s: "1" },
    { b: "1522550243", m: "1", n: "1009_00010078", s: "1" },
    { b: "1522550244", m: "2", n: "1012_00010078", s: "0" },
    { b: "1522550245", m: "2", n: "1013_00010078", s: "0" },
    { b: "1522550246", m: "2", n: "1572_00010078", s: "0" }]
    for (var i = 0, len = returnJs.cc.u.length; i < len; i++) {
      assert.equal(obj[i].b, returnJs.cc.u[i].b)
      assert.equal(obj[i].m, returnJs.cc.u[i].m)
      assert.equal(obj[i].n, returnJs.cc.u[i].n)
      assert.equal(obj[i].s, returnJs.cc.u[i].s)
    }
  })
  step('sip-info', function () {
    var rs = xmlToJs(`<?xml version="1.0" encoding="UTF-8"?><i n="1026_00010078conf0_1533280532501" s="*"> <u n="918550259787" a="i" l="m" /></i>`);
    debug(rs)
    assert.equal('1026_00010078conf0_1533280532501', rs.i.n)
    assert.equal('*', rs.i.s)
    assert.equal('918550259787', rs.i.u[0].n)
    assert.equal('i', rs.i.u[0].a)
    assert.equal('m', rs.i.u[0].l)
  })
  step('js-xml', function () {
    var JsObj = { a: "103", c: "02557926526conf0_1522749264981" }
    var returnXml = jsToXml(JsObj);
    assert.equal('<?xml version="1.0" encoding="utf-8"?><cc a="103" c="02557926526conf0_1522749264981"></cc>', returnXml);
  })
  step('三级', function () {
    var xml = `<?xml version="1.0" encoding="UTF-8"?>
    <o>
     <a>
      <u n="1006_00010078" a="o" nm="fengchunyan" r="895" />
     </a>
    </o>`
    var returnJs = xmlToJs(xml)
    assert.equal('fengchunyan', returnJs.o.a.u[0].nm)
    assert.equal('895', returnJs.o.a.u[0].r)
    debug(returnJs)
  })
})
