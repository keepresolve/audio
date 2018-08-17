
import Phone from './phone'
import { log, setting } from './store'
import { getLoginData, webApiHandler } from '../lib/getLoginInfo'
import creatHtml from "./html"
// import '../../resources/css/phone.css' //webpack specfic

(function (global, doc) {
    class Ephone {
        constructor() {
            this.options = {
                width: "500px",
                height: "50px",
                background: "",
                callBackground: ["#1E59B9", '#19C583', '#FF6754'],
                drop: true
            }
            this.closeTimer = null
            this.watchTimer = null
            this.gid = null // 转接坐席的组id
            this.recordsTotal = null // 某组坐席总数 滚动加载时使用
            this.isOutCall = false
            this.log = log('script')
        }
        init(targetID, options) {
            var toolbar = document.createElement("div")
            var target
            try {
                target = doc.querySelector(targetID) || doc.querySelector("body")
            } catch (e) {
                if (e) target = doc.querySelector("body")
            }
            var head = document.getElementsByTagName('head')[0]
            var link = document.createElement('link')
            var setting = localStorage.getItem("setting") ? JSON.parse(localStorage.getItem("setting")) : false
            //初始化配置
            if (typeof options == 'object' && options) {
                this.options.width = options.width ? options.width : this.options.width
                this.options.height = options.height ? options.height : this.options.height
                this.options.background = options.background ? options.background : this.options.background
                this.options.drop = options.drop != undefined ? options.drop : this.options.drop
                this.options.callBackground = (options.callBackground && Array.isArray(options.callBackground)) ? options.callBackground : this.options.callBackground

            }
            if (this.options.drop) {
                this._addDrop(toolbar, target)
            }

            // css
            // link.href = 'https://bot.emicmh.com/phone/main.css';
            // link.href = 'https://bot.emicmh.com/phone/main.css';
            link.href = './dist-wp/main.css';
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('media', 'all');
            link.setAttribute('type', 'text/css');
            head.appendChild(link);

            //html
            // toolbar.style.position = ''
            toolbar.style.width = this.options.width
            toolbar.style.boxShadow = '0px 1px 15px ' + '#c3c3c3'
            toolbar.style.zIndex = 999
            toolbar.style.background = this.options.background
            toolbar.id = "PHONE-DROP"
            toolbar.innerHTML = creatHtml(this.options)
            target.appendChild(toolbar)
            //添加DOM事件处理
            this.eventListener()
            this._hideAllMode()
            window.onbeforeunload = function (event) {
                Phone._beforeunload()
                event.returnValue = "离开取消会话";
            };
            // 初始位置 功能按钮位置  配置项可配
            if (setting) {
                this.setTogglePosition(setting)
            }

        }
        eventListener() {
            var stopProList = []
            //回调函数才需要that=this，或者箭头函数
            var that = this
            //工具条点击事件
            let actionButtons = document.querySelectorAll('#EphoneBar li[data-phone-key]')
            Array.from(actionButtons).forEach(v => {
                stopProList.push(v)
                v.onclick = function (e) {
                    e.stopPropagation()
                    var type = this.getAttribute("data-phone-type")
                    var key = this.getAttribute("data-phone-key")
                    if (this.classList.contains("gray")) return
                    switch (key) {
                        case "0"://注册 
                            if (type == 'register') {
                                if (Phone.sipStatus) {
                                    var userData = JSON.parse(localStorage.userData)
                                    var leisure = that._Sel("#PHONE-ENTRY-TOGGLE li[data-type='leisure']")
                                    var busy = that._Sel("#PHONE-ENTRY-TOGGLE li[data-type='busy']")
                                    leisure.dataset.hide = busy.dataset.hide = userData.seatMode == 1 ? "0" : "1"
                                    that.setDisplayNone("statusPage")
                                } else {
                                    that.setDisplayNone("loginPage")
                                }
                            }
                            break;
                        case "1": // 快速呼叫
                            if (type == 'open') {
                                that.setDisplayNone("fastPage")
                            }
                            if (type == 'terminate') {
                                Phone.terminate()
                            }
                            if (type == 'hold') {
                                Phone.hold()
                            }
                            if (type == 'unhold') {
                                Phone.unhold()
                            }
                            break;
                        case "2": // 转接
                            var hide = that._Sel("#PHONE-ENTRY-SWITCH[data-hide]").dataset.hide

                            if (hide == 0) {
                                // 获取技能组
                                that.getGroup()

                                // 获取坐席  getMembers
                                var userData = JSON.parse(localStorage.userData)
                                that.gid = userData.loginGid ? userData.loginGid : -1
                                var webParam = {
                                    un: userData.userInfo.number,
                                    pwd: userData.pwd,
                                    eid: userData.eid,
                                    searchGid: that.gid,
                                    length: 20
                                }
                                that.getMembers(webParam)

                                // 获取技能组状态 getMemberCallStates
                                // var res3 = await webApiHandler("getMemberCallStates", webParam)
                                // console.log({ getMemberCallStates: res3 })
                            }
                            that.setDisplayNone("switchPage")
                            break;
                        case '4':
                            var setting = that._Sel("#PHONE-ENTRY-SETTING[data-hide]")
                            var moveBtn = that._Sel("#PHONE-ENTRY-SETTING input[data-type='move']")
                            var fixBtn = that._Sel("#PHONE-ENTRY-SETTING input[data-type='fix']")
                            var userData = JSON.parse(localStorage.userData)
                            that.setDisplayNone("setting")
                            if (userData) {
                                that.log("seatMode", userData.seatMode)
                                if (userData.seatMode == "1") {
                                    moveBtn.checked = true
                                    fixBtn.checked = false
                                } else {
                                    moveBtn.checked = false
                                    fixBtn.checked = true
                                }
                            }
                        default:
                    }
                }
            })

            // PHONE-ENTRY-LOGIN 注册 登陆
            let registerBtn = this._Sel("#EphoneBar li[data-phone-type='register']") //登陆
            let logoutBtn = this._Sel("#EphoneBar li[data-phone-type='logout']") //注销
            let openBtn = this._Sel("#EphoneBar li[data-phone-type='open']") // 快速呼叫
            //登陆页面
            let loginTarget = this._Sel("#PHONE-ENTRY-LOGIN[data-hide]")
            let switchnumber = this._Sel("#PHONE-ENTRY-LOGIN[data-hide] input[data-type='switchnumber'] ")
            let seatnumber = this._Sel("#PHONE-ENTRY-LOGIN[data-hide] input[data-type='seatnumber'] ")
            let password = this._Sel("#PHONE-ENTRY-LOGIN[data-hide] input[data-type='password']")
            var error = this._Sel("#PHONE-ENTRY-LOGIN[data-hide] span[data-type='error']") // 错误提示
            var statusBtn = this._Sel("#PHONE-ENTRY-LOGIN[data-hide] [data-type='loginStatus']")
            var status_text = this._Sel("#PHONE-ENTRY-LOGIN[data-hide] [data-type='loginStatus']>span") // 示忙/示闲
            // 切换坐席状态、退出
            let toggleTarget = this._Sel("#PHONE-ENTRY-TOGGLE[data-hide]")
            let toggleBtn = this._Sel("li[data-phone-type='register'] span")
            //设置页面
            let settingTarget = this._Sel("#PHONE-ENTRY-SETTING[data-hide]")
            let register_server = this._Sel("#PHONE-ENTRY-SETTING input[data-type='registerServer']")
            let wss_url = this._Sel("#PHONE-ENTRY-SETTING input[data-type='websocketUrl']")
            let moveInp = this._Sel("#PHONE-ENTRY-SETTING input[data-type='move']")
            let fixInp = this._Sel("#PHONE-ENTRY-SETTING input[data-type='fix']")
            let optionInp = doc.querySelectorAll("#PHONE-ENTRY-SETTING option")
            var seatMode = 52  // 坐席模式 51 移动  52 固定
            var wssMode   // wss地址 
            // 选择技能组页面
            let selectGroupTarget = this._Sel("#PHONE-ENTRY-SELECTGROUP[data-hide]")
            var targetId  // 技能组id
            //自动登陆
            if (localStorage && localStorage.getItem('userData')) {
                this.register()
            }
            //登陆页面
            loginTarget.onclick = async function (e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                // console.log(target)
                if (target.dataset.type == 'close') {
                    loginTarget.dataset.hide = '0'
                    that.setArrowNone()

                }
                if (target.dataset.type == 'loginStatus' || target.parentNode.dataset.type == 'loginStatus') {
                    if (statusBtn.classList.contains('busy')) {
                        statusBtn.classList.remove('busy')
                        status_text.innerText = "示闲"
                        Phone._kefuStatus = "1"

                    } else {
                        statusBtn.classList.add('busy')
                        status_text.innerText = "示忙"
                        Phone._kefuStatus = "2"
                    }

                }
                if (target.dataset.type == 'login') {
                    if (switchnumber.value.length == 0) {
                        error.innerText = '请输入总机号码'
                        return false;
                    }
                    else if (seatnumber.value.length == 0) {
                        error.innerText = '请输入分机号码'
                        return false;
                    }
                    else if (seatnumber.value.length < 4 || seatnumber.value.length > 6) {
                        error.innerText = '分机号码错误，请重新输入'
                        return false;
                    }
                    else if (password.value.length == 0) {
                        error.innerText = '请输入密码'
                        return false;
                    } else {
                        var callType = loginTarget.querySelector("input[type='radio'][name='callType']:checked").value
                        var res = await getLoginData(seatnumber.value, password.value, switchnumber.value, callType)
                        that.log({ res: res })

                        if (res.status == 50000) {
                            error.innerText = '总机号码错误，请重新输入'
                            // 如果不清除，走自动登录逻辑时,会报错  因为此时没有userInfo
                            localStorage.removeItem('userData')
                            return
                        }

                        if (res.status == 50002) {
                            error.innerText = '分机号码或密码错误，请重新输入'
                            localStorage.removeItem('userData')
                            return
                        }
                        // that.log({ groupInfo: res.memberInfo.inGroups})
                        var groupInfo = JSON.parse(localStorage.userData).groupInfo
                        if (groupInfo.length > 1) {
                            loginTarget.dataset.hide = "0"
                            selectGroupTarget.dataset.hide = "1"
                            var group = ''
                            groupInfo.map((v, i) => {
                                group += "<li title='" + v.name + "' data-eid='" + v.eid + "' data-id='" + v.id + "'>" + v.name + "</li>"
                            })
                            that._Sel("#PHONE-ENTRY-SELECTGROUP ul[data-type='groupList']").innerHTML = group
                            return
                        }
                        var params = {
                            switchnumber: switchnumber.value,
                            seatnumber: seatnumber.value,
                            password: password.value,
                            gid: groupInfo[0] ? groupInfo[0].id : 0,
                            callintype: callType,
                            socketUri: setting.socket.uri,
                            status: Phone._kefuStatus
                        }
                        that.register(params)
                    }
                }
            }

            // 聚焦 错误提示隐藏
            var input = doc.querySelectorAll('#PHONE-ENTRY-LOGIN[data-hide] input')

            for (var i = 0; i < input.length; i++) {
                input[i].onfocus = function () {
                    that.log('input focus')
                    error.innerText = ''
                }
            }

            // 切换坐席状态、退出
            toggleTarget.addEventListener("click", function (e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                var userData = JSON.parse(localStorage.userData)
                var seatMode = userData.seatMode
                if (target.dataset.type == "leisure" || target.parentNode.dataset.type == "leisure") { // 示闲
                    if (seatMode == 1) return
                    Phone.changeStaus("1")
                }
                if (target.dataset.type == "busy" || target.parentNode.dataset.type == "busy") { // 示忙
                    if (seatMode == 1) return
                    Phone.changeStaus("2")
                }

                if (target.dataset.type == "logout" || target.parentNode.dataset.type == "logout") { // 退出
                    var title = that._Sel("#PHONE-LEFT-STATUS div[data-type='pattern']>div")
                    Phone.stop(function (res) {
                        if (res.code == 200) {
                            Phone._kefuStatus = "1"
                            that._Sel("#EphoneBar>li span[data-type='toggle']").dataset.hide = '0'
                            that.setDisplayNone("all")
                            that.sethighlight('register', true)
                            title.dataset.hide = '0'
                        } else {
                            alert(res.info)
                        }
                    })
                }
                toggleTarget.dataset.hide = "0"
                that.setArrowNone()

            })


            // PHONE-ENTRY-SETTING 更改设置
            settingTarget.onclick = function (e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                if (target.dataset.type == 'move') {
                    fixInp.checked = false
                    seatMode = target.value
                }

                if (target.dataset.type == 'fix') {
                    moveInp.checked = false
                    seatMode = target.value
                }

                if (target.dataset.type == 'confirm') {
                    var bar = that._Sel("#EphoneBar")
                    var status = that._Sel("#PHONE-LEFT-STATUS")
                    var title = that._Sel("#PHONE-LEFT-STATUS div[data-type='pattern']>div")
                    var postionRadio = settingTarget.querySelector("input[type='radio'][name='postionButton']:checked")
                    var postion = postionRadio.getAttribute("value")
                    var setting = { postion }
                    //模式
                    if (seatMode == "51") {
                        that.sethighlight("register,setting", true)
                        title.dataset.hide = '1'
                    } else if (seatMode == "52") {
                        that.sethighlight("register,open,setting", true)
                        title.dataset.hide = '0'
                    }
                    Phone.setSeatMode(seatMode)

                    //定位
                    that.setTogglePosition(setting)
                    localStorage.setItem("setting", JSON.stringify(setting))

                    that.setArrowNone()
                    settingTarget.dataset.hide = 0
                    //wss
                    // for(var i = 0;i<optionInp.length;i++) {
                    //     if (optionInp[i].selected) {
                    //         wssMode = optionInp[i].innerText
                    //     }
                    // }
                    // setting.socket.uri = wssMode   // 更改wss地址
                    // loginTarget.dataset.hide = 1
                    // var userData = JSON.parse(localStorage.userData)
                    // var params = {
                    //     switchnumber: userData.switchnumber,
                    //     seatnumber: userData.userInfo.number,
                    //     password: slice(8, userData.clearPwd.length - 6),
                    //     gid: userData.loginGid,
                    //     callintype: "2",
                    //     socketUri: setting.socket.uri,
                    //     status: Phone._kefuStatus
                    // }
                    // that.register(params)
                }

                if (target.dataset.type == 'close') {
                    settingTarget.dataset.hide = 0
                    that.setArrowNone()
                }

            }
            // PHONE-ENTRY-SELECTGROUP 选择技能组
            selectGroupTarget.onclick = function (e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                that.log(target)
                if (target.dataset.type == "close") {
                    selectGroupTarget.dataset.hide = '0'
                    loginTarget.dataset.hide = '1'
                    if (localStorage.getItem("userData")) localStorage.removeItem("userData")

                }
                if (target.parentNode.dataset.type == "groupList") {
                    var len = target.parentNode.children.length
                    for (var i = 0; i < len; i++) {
                        target.parentNode.children[i].classList.remove('selected')
                    }
                    target.classList.add('selected')
                    targetId = target.dataset.id
                    that.log(targetId + '-----------------')
                }
                if (target.dataset.type == "confirm") {
                    var len = document.querySelectorAll("#PHONE-ENTRY-SELECTGROUP ul[data-type='groupList']>li.selected").length
                    that.log(len)
                    if (len < 1) return alert('请选择技能组')
                    var userData = JSON.parse(localStorage.userData)
                    var params = {
                        switchnumber: userData.switchNumber,
                        seatnumber: userData.userInfo.number,
                        password: userData.pwd,
                        gid: targetId,
                        callintype: "2",
                        socketUri: setting.socket.uri
                    }
                    that.register(params)
                }
            }

            // PHONE-ENTRY-PANEL 快速呼叫 
            let panel = this._Sel("#PHONE-ENTRY-PANEL[data-hide]")//拨号面板
            let panelInput = this._Sel("#PHONE-ENTRY-PANEL[data-hide] input[data-type='input']") //手机号输入框
            var circleStatus = this._Sel("#PHONE-LEFT-STATUS>div[data-type='circle']>div") //左边状态显示
            panel.onclick = function (e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                if (target.dataset.type == 'close') {
                    panel.dataset.hide = panel.dataset.hide == '0' ? '1' : '0'
                    that.setArrowNone()
                }

                if (target.dataset.type == 'call') { //拨号
                    var peerID = panelInput.value
                    panelInput.value = ''
                    if (peerID.length == 0) return
                    var userData = JSON.parse(localStorage.userData)
                    var extension_start = parseInt(userData.extension_start)
                    var extension_end = parseInt(userData.extension_end)
                    var callType
                    if (parseInt(peerID) >= extension_start && parseInt(peerID) <= extension_end) {
                        callType = 3
                    } else {
                        callType = 2
                        peerID = "9" + peerID
                    }
                    Phone.call({ peerID, callType })
                    panel.dataset.hide = 0
                    that.phoneStatus('outgoingCall', { panelInput: callType == 2 ? peerID.substring(1) : peerID, callType })
                }
            }
            var timer = null
            // PHONE-ENTRY-SWITCH 转接
            let switchPage = this._Sel("#PHONE-ENTRY-SWITCH[data-hide]")
            let p = this._Sel("#PHONE-ENTRY-SWITCH[data-hide] [data-type='select_text']")
            let errorTitle = switchPage.querySelector("span[data-type='error']")
            var page = 1 // 记录当前页数
            var checked = 0 // 仅查可转接坐席是否勾选 0 未勾选 1 已勾选
            var gid
            var tranNumber
            switchPage.onclick = async function (e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                that.log(target)
                if (target.parentNode.dataset.type == "select") {
                    var hide = that._Sel('#GROUP ul[data-type="group"]').dataset.hide
                    that._Sel('#GROUP ul[data-type="group"]').dataset.hide = hide == '1' ? '0' : '1'
                }
                if (target.parentNode.dataset.type == "group") {
                    p.innerText = target.innerText
                    that._Sel('#GROUP ul[data-type="group"]').dataset.hide = 0
                    that.log(target.dataset.id)
                    that.gid = target.dataset.id ? target.dataset.id : -1

                    page = 1
                    // 获取某组坐席  getMembers
                    var userData = JSON.parse(localStorage.userData)
                    var webParam = {
                        un: userData.userInfo.number,
                        pwd: userData.pwd,
                        eid: userData.eid,
                        searchGid: target.dataset.id ? target.dataset.id : -1,
                        length: 20
                    }
                    if (checked) {
                        webParam.searchServiceControl = checked
                    }
                    that.getMembers(webParam)
                }
                if (target.dataset.type == "checkbox") {
                    page = 1
                    that.log(target.checked)
                    var userData = JSON.parse(localStorage.userData)
                    var webParam = {
                        un: userData.userInfo.number,
                        pwd: userData.pwd,
                        eid: userData.eid,
                        searchGid: that.gid,
                        length: 20
                    }
                    if (target.checked) {
                        checked = 1
                        webParam.searchServiceControl = checked
                    } else {
                        checked = 0
                    }

                    that.getMembers(webParam)

                }
                if (target.dataset.type == "close") {
                    that.setDisplayNone("switchPage")
                    p.innerText = '未分组'
                    that.setArrowNone()
                }
                if (target.parentNode.dataset.type == "kefuList") {
                    if (target.dataset.status == "offLine" || target.dataset.status == "busy") return

                    var len = target.parentNode.children.length
                    for (var i = 0; i < len; i++) {
                        target.parentNode.children[i].classList.remove('selected')
                    }
                    target.classList.add('selected')
                    gid = target.dataset.gids
                    tranNumber = target.dataset.number
                }
                if (target.dataset.type == "transfer" && target.dataset.disabled != "0" && gid && tranNumber) {
                    that.log('正在转接...', gid, tranNumber)
                    target.dataset.disabled = '0'
                    errorTitle.style.color = '#19C583'
                    errorTitle.innerText = '正在转接,请稍后...'

                    Phone.transferPBXCall(gid, tranNumber, function (res) {
                        if (res.type == "transferCallFaild") {
                            switchPage.dataset.hide = '1'
                            errorTitle.style.color = '#FD3D39'
                            errorTitle.innerText = '电话转接失败'
                            if (timer) global.clearTimeout(timer)
                            timer = global.setTimeout(() => { errorTitle.innerText = '' }, 2000)
                        } else {
                            switchPage.dataset.hide = '0'
                        }
                        target.dataset.disabled = '1'
                    })

                }
            }
            //滚动加载坐席
            let kefuList = this._Sel("#PHONE-ENTRY-SWITCH[data-hide] [data-type='kefuList']")
            kefuList.onscroll = function (e) {
                var target = e.target || e.srcElement
                var pageTotal = Math.ceil(parseInt(that.recordsTotal) / 20)

                if (target.scrollTop >= target.scrollHeight - target.offsetHeight) {
                    if (page == pageTotal) return
                    var userData = JSON.parse(localStorage.userData)
                    var webParam = {
                        un: userData.userInfo.number,
                        pwd: userData.pwd,
                        eid: userData.eid,
                        searchGid: that.gid,
                        start: 20 * page,
                        length: 20
                    }
                    that.getMembers(webParam, true)
                    page++
                }
            }

            //PHONE-LEFT-STATUS 左边状态显示 
            //拨号面板
            var planePageBtn = this._Sel("#PHONE-LEFT-STATUS>div[data-type='planePage']>div")
            var planePage = this._Sel("#PHONE-PANEL")
            var input = planePage.querySelector("input[data-type='input']")
            planePageBtn.onclick = function (e) {
                e.stopPropagation()
                var hide = planePage.dataset.hide
                planePage.dataset.hide = hide == '0' ? "1" : "0"
            }
            planePage.onclick = function (e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                var type = target.dataset.type
                if (type == 'num') {  //点击数字键盘
                    input.value += target.value
                    Phone.sendDTMF(target.value)
                    input.focus()
                }
                if (type == 'call') { //删除
                    if (input.value.length == 0) return
                    input.value = input.value.substring(0, input.value.length - 1)
                }
                if (type == 'close') { //删除
                    planePage.dataset.hide = "0"
                }

            }

            stopProList.push(loginTarget, selectGroupTarget, settingTarget, panel, planePage, planePageBtn, switchPage, toggleTarget)
            if (this.options.drop)
                this._stopPro(stopProList)
        }
        _Sel(id) {
            return doc.querySelector(id)
        }

        // 获取技能组
        async getGroup() {
            var userData = JSON.parse(localStorage.userData)
            var webParam = {
                un: userData.userInfo.number,
                pwd: userData.pwd,
                eid: userData.eid,
                // needPbxFields: 1
            }
            var res = await webApiHandler("getGroups", webParam)
            this.log({ getGroups: res })
            var groups = "<li>未分组</li>"
            var searchName
            res.returnData.map((v, i) => {
                v.id == userData.loginGid && (searchName = v.name)
                groups += "<li data-eid='" + v.eid + "' data-id='" + v.id + "' data-level='" + v.level + "' data-name='" + v.name + "' data-oid='" + v.oid + "' data-pid='" + v.pid + "'>" + v.name + "</li>"
            })
            this._Sel("#PHONE-ENTRY-SWITCH[data-hide] [data-type='select_text']").innerText = searchName ? searchName : '未分组'
            var selectDom = this._Sel('#PHONE-ENTRY-SWITCH ul[data-type="group"]')
            selectDom.innerHTML = groups
        }

        // 请求坐席
        async getMembers(webParam, isScroll) {
            var res = await webApiHandler("searchEpMembers", webParam)
            this.recordsTotal = res.returnData.recordsTotal
            this.log({ getMembers: res })
            var members = ''
            if (res.returnData.data.length) {
                res.returnData.data.map((v, i) => {
                    var status
                    if (v.service_control == 0 || v.service_control == 2) {
                        status = 'offLine'
                    } else if (v.service_control == 1) {
                        status = ''
                    } else if (v.service_control > 2) {
                        status = 'busy'
                    }
                    members += "<li title='" + v.displayname + "' data-status_code='" + v.service_control + "' data-status='" + status + "' data-gids='" + this.gid + "' data-number='" + v.number + "'>" + v.displayname + "<span></span></li>"
                })
            } else {
                members += "<li data-type='noOne'>暂无坐席</li>"
            }
            var liDom = this._Sel('#PHONE-ENTRY-SWITCH>#SWITCH_PlATE>ul')
            if (isScroll) {
                liDom.innerHTML = liDom.innerHTML + members
            } else {
                liDom.innerHTML = members
            }
        }

        register(params) {
            var login = this._Sel("#PHONE-ENTRY-LOGIN[data-hide]")
            var selectGroupTarget = this._Sel("#PHONE-ENTRY-SELECTGROUP[data-hide]")
            var registerBtn = this._Sel("#EphoneBar li[data-phone-type='register']") //登陆
            var logoutBtn = this._Sel("#EphoneBar li[data-phone-type='logout']") //注销
            var holdBtn = this._Sel("#EphoneBar li[data-phone-type='hold']") //注销
            var unHoldBtn = this._Sel("#EphoneBar li[data-phone-type='unhold']") //注销
            var toggleBtn = this._Sel("li[data-phone-type='register'] span")
            var title = this._Sel("#PHONE-LEFT-STATUS div[data-type='pattern']>div") //移动模式提示
            if (params)
                params.remoteAudio = "peeraideo"
            //刷浏览器 params undefined 
            localStorage.setItem('audioId', "peeraideo")
            Phone.register(params, (data) => {
                if (data.code == 200) { //登陆成功
                    if (Phone.session) return
                    var userData = localStorage.userData ? JSON.parse(localStorage.userData) : undefined
                    this.setDisplayNone("all")
                    this.setArrowNone()
                    this.sethighlight('register,open,setting', true)
                    if (userData) {
                        if (userData.seatMode == 1) {
                            this.sethighlight("register,setting", true)
                            title.dataset.hide = '1'
                        } else {
                            this.sethighlight("register,open,setting", true)
                            title.dataset.hide = '0'
                        }
                    }
                } else if (data.code == 100) {  //呼入会话 事件监听 
                    this.log("incomingCall__" + data.type, data)
                    switch (data.type) {
                        case "calloutResponse":
                            this.phoneStatus("calloutResponse", data.data)//外线PBX外呼响应
                            break;
                        case "callinResponse": //内线PBX外呼响应
                            this.phoneStatus("callinResponse", data.data)
                            break;
                        case 'progress':
                            this.phoneStatus("incomingProgress")
                            break;
                        case 'accepted': //直呼 callType=1
                            this.phoneStatus("incomingAccepted")
                            break;
                        case 'answeredPBXCall'://回拨外线 内线 callType=2,3
                            this.phoneStatus("answeredPBXCall", data.data)
                            break;
                        case 'failed':
                            this.phoneStatus("incomingFailed")
                            break;
                        case 'endPBXCall'://回拨外线 内线 callType=2,3
                            this.phoneStatus("endPBXCall")
                            break;
                        case 'ended':
                            this.phoneStatus("incomingEnded")
                            break;
                        case "hold":
                            if (data.data.originator == "local") {
                                holdBtn.dataset.hide = "0"
                                unHoldBtn.dataset.hide = "1"
                            }
                            break;
                        case "unhold":
                            if (data.data.originator == "local") {
                                holdBtn.dataset.hide = "1"
                                unHoldBtn.dataset.hide = "0"
                            }
                            break;
                        default: break;
                    }
                } else if (data.code == 300) {  //  被踢下线
                    var resCode = data.data.r
                    console.log("__________", resCode)
                    switch (resCode) {
                        case "895":
                            this.setDisplayNone("all")
                            var modal = confirm("其他用户登录您的账号，请重新登录")
                            if (modal) {
                                Phone.terminate()
                                this.register()
                            } else {
                                Phone.stop((res) => {
                                    if (res.code == 200) {
                                        Phone.terminate()
                                        Phone._kefuStatus = "1"
                                        this._Sel("#EphoneBar>li span[data-type='toggle']").dataset.hide = '0'
                                        this.sethighlight('register', true)
                                    } else {
                                        alert(res.info)
                                    }
                                })
                            }
                            break;
                        case "897":
                            alert("注册超时，请重新登录")
                            break;
                        case "898":
                            alert("账号过期/账号被删/账号修改，请重新登录")
                            break;
                        case "899":
                            alert("企业停止")
                            break;
                    }

                } else {
                    alert(data.info)
                }
            })
        }

        _addDrop(toolbar, target) {

            var thisWrapper = this
            toolbar.onmousedown = function (ev) {
                ev.stopPropagation()
                ev.preventDefault()
                target.setCapture && target.setCapture()

                var oEvent = ev || event;
                var that = this
                var disX = oEvent.clientX - this.offsetLeft;
                var disY = oEvent.clientY - this.offsetTop;
                var style = window.getComputedStyle(toolbar)

                this.style.left = parseInt(style.left) + parseInt(style.marginLeft) + "px"
                this.style.top = parseInt(style.top) + parseInt(style.marginTop) + "px"
                this.style.position = "fixed"
                this.style.cursor = "move";

                document.onmousemove = function (ev) {
                    var oEvent = ev || event;
                    var l = oEvent.clientX - disX;
                    var t = oEvent.clientY - disY;
                    var clientHeight = document.body.clientHeight || document.documentElement.offsetHeight || document.body.scrollHeight || window.screen.height - 133
                    var clientWidth = document.body.clientWidth || document.documentElement.clientWidth || document.body.clientWidth

                    if (l <= 20) {
                        l = 0
                    }
                    if (l >= clientWidth - parseInt(that.offsetWidth) - 20) {
                        l = clientWidth - parseInt(that.offsetWidth)
                    }
                    if (t >= clientHeight - parseInt(thisWrapper.options.height) - 20) {
                        t = clientHeight - parseInt(thisWrapper.options.height)
                    }
                    if (t <= 20) {
                        t = 0
                    }
                    that.style.left = l + 'px';
                    that.style.top = t + 'px';
                };


                document.onmouseup = function () {
                    document.onmousemove = null;//如果不取消，鼠标弹起div依旧会随着鼠标移动
                    document.onmouseup = null;
                    that.style.cursor = "default";
                    toolbar.setCapture && target.releaseCapture()
                };
                //    };
            }
        }
        _stopPro(arr) {
            arr.forEach(v => {
                v.addEventListener("mousedown", function (e) {
                    e.stopPropagation()
                })
            })
        }
        _targetIsMove() {
            alert(1)
        }
        _hideAllMode() {
            document.addEventListener("click", (e) => {
                e.stopPropagation()
                this.setDisplayNone("all")
            })
        }
        timerWatch(target, falg) {
            var second = 0, minute = 0, hour = 0, timer = null
            target.innerText = '00:00:00'
            if (falg) {
                global.clearInterval(this.watchTimer)
                this.watchTimer = global.setInterval(() => {
                    second++
                    if (second >= 60) {
                        second = 0
                        minute++
                    }
                    if (minute >= 60) {
                        minute = 0
                        hour++
                    }
                    // hour < 10 ? '0' + hour : hour + ":" + minute < 10 ? '0' + minute : minute +
                    target.innerText = (hour < 10 ? '0' + hour : hour) + ":" + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
                }, 1000)
            } else {
                global.clearInterval(this.watchTimer)
            }
        }
        sethighlight(str, flag) {
            var actionButtons = document.querySelectorAll('#EphoneBar li[data-phone-key]') //工具条面板
            actionButtons.forEach(v => {
                if (str.indexOf(v.dataset.phoneType) !== -1) {
                    flag ? v.classList.remove("gray") : v.classList.add("gray")
                } else {
                    flag ? v.classList.add("gray") : v.classList.remove("gray")
                }
            })
        }
        setDisplayNone(str) {
            var modes = document.querySelectorAll("#PHONE-ENTRY-CONTAINER  div[data-toggle]")
            var arrows = document.querySelectorAll('#EphoneBar div[data-arrow]')
            var arr = ['loginPage', 'selectGroup', 'statusPage', 'fastPage', 'switchPage', 'setting']
            var compArr = ['register', 'register', 'register', 'open', 'switch', 'setting']
            Array.from(arrows).forEach(v => {
                v.dataset.hide = "0"
            })
            Array.from(modes).forEach(v => {
                if (str.indexOf(v.dataset.toggle) !== -1) {
                    var index = arr.indexOf(v.dataset.toggle)
                    v.dataset.hide = v.dataset.hide == "1" ? "0" : "1"
                    if (index >= 0) {
                        document.querySelector('#EphoneBar div[data-arrow=' + compArr[index] + ']').dataset.hide = v.dataset.hide
                    }
                } else {
                    v.dataset.hide = "0"
                }
            })
        }
        setTogglePosition(setting) {
            var modes = document.querySelectorAll("#PHONE-ENTRY-CONTAINER  div[data-toggle]")
            var bar = this._Sel("#EphoneBar")
            var status = this._Sel("#PHONE-LEFT-STATUS")
            var radio = this._Sel("#PHONE-ENTRY-SETTING[data-hide] input[data-type='postionButton'][value=" + setting.postion + "]")
            var isLeft = setting.postion == 'left'

            bar.style.float = setting.postion
            status.style.float = isLeft ? "right" : "left"
            radio.checked = true

            Array.from(modes).forEach(v => {
                if (v.dataset.toggle != 'statusPage')
                    v.style.left = isLeft ? "0px" : parseInt(this.options.width) - 300 + "px"
            })
        }
        setArrowNone() {
            var arrows = document.querySelectorAll("#EphoneBar>li>div[data-arrow]")
            Array.from(arrows).forEach(v => {
                v.dataset.hide = '0'
            })
        }
        /**
         * 
         * @param {*呼入呼出页面交互} status 
         * progress 通话建立 但未接听 呼叫中
         * accept:接听通话通话中 
         * callfailed 呼叫失败
         * callended 呼叫结束 
         * 
         */
        phoneStatus(status, data) {
            var that = this
            //外呼样式
            var circleStatus = this._Sel("#PHONE-LEFT-STATUS>div[data-type='circle']>div") //左边状态显示
            var rectStatus = this._Sel("#PHONE-LEFT-STATUS>div[data-type='rect']>div")
            var rectN = rectStatus.querySelector("span[data-type='number']")
            var rectS = rectStatus.querySelector("span[data-type='status']")
            var rectT = rectStatus.querySelector("span[data-type='times']")
            //呼入样式
            var incomingStatus = this._Sel("#PHONE-LEFT-STATUS>div[data-type='incomingStatus']>div")
            var incomingBg = incomingStatus.querySelector("div[data-type='bg']")
            var incomingN = incomingStatus.querySelector("span[data-type='number']")
            var incomingS = incomingStatus.querySelector("span[data-type='status']")
            var incomingA = incomingStatus.querySelector("span[data-type='answer']")
            var call_bg = this.options.callBackground
            //通话中 拨号键
            var planePageBtn = this._Sel("#PHONE-LEFT-STATUS>div[data-type='planePage']>div")
            var planePage = this._Sel("#PHONE-PANEL")
            //工具条按钮
            var openBtn = this._Sel("li[data-phone-type='open']")
            var terminateBtn = this._Sel("li[data-phone-type='terminate']")
            var holdBtn = this._Sel("#EphoneBar li[data-phone-type='hold']")
            var unHoldBtn = this._Sel("#EphoneBar li[data-phone-type='unhold']")

            switch (status) {
                //点击拨号
                case "outgoingCall":
                    rectStatus.dataset.hide = 1
                    rectStatus.style.background = call_bg[0]
                    rectN.innerText = data.panelInput.length > 12 ? data.panelInput.substring(1, 12) + '...' : data.panelInput
                    rectS.innerText = "呼叫中"
                    that.sethighlight("all", true)
                    that.setDisplayNone("all")
                    that.setArrowNone()
                    setTimeout(() => {
                        if (!this.isOutCall) {
                            Phone.terminate()
                            rectStatus.style.background = call_bg[2]
                            rectS.innerText = "呼叫超时"
                            global.clearTimeout(that.closeTimer)
                            that.closeTimer = global.setTimeout(() => {
                                rectStatus.dataset.hide = "0"
                                that.sethighlight("register,open,setting", true)
                                that.setDisplayNone("all")
                            }, 2000);
                        }
                    }, 5000)
                    // Phone.changeStaus("2")
                    break;
                //呼出和PBX是否建立链接外线
                case "calloutResponse":
                    if (data.r != 200) {
                        rectStatus.style.background = call_bg[2]
                        rectS.innerText = "呼叫失败"
                        global.clearTimeout(that.closeTimer)
                        that.closeTimer = global.setTimeout(() => {
                            rectStatus.dataset.hide = "0"
                            that.sethighlight("register,open,setting", true)
                            that.setDisplayNone("all")
                        }, 2000);
                    }
                    break;
                //呼出和PBX是否建立链接内线线
                case "callinResponse":

                    if (data.r != 200) {//200成功   503对象忙碌
                        rectStatus.style.background = call_bg[2]
                        rectS.innerText = "呼叫失败"
                        global.clearTimeout(that.closeTimer)
                        that.closeTimer = global.setTimeout(() => {
                            rectStatus.dataset.hide = "0"
                            that.sethighlight("register,open", true)
                            that.setDisplayNone("all")

                        }, 2000);
                    }
                    break;
                //呼入会话 PBX已经建立双方链接
                case 'incomingProgress':
                    // 
                    // Phone.incomingCall(true)
                    this.isOutCall = true
                    openBtn.dataset.hide = '0'
                    terminateBtn.dataset.hide = '1'
                    that.sethighlight("terminate", true)
                    that.setDisplayNone("all")
                    that.setArrowNone()
                    break;
                //本地接听
                case 'incomingAccepted':
                    break;
                //通话已经建立接通
                case 'answeredPBXCall':
                    this.log({ data })
                    rectStatus.dataset.hide = '1'
                    rectStatus.style.background = call_bg[1]
                    that.timerWatch(rectT, true)
                    rectS.innerText = "通话中"
                    if (!data.n) {
                        that.sethighlight("terminate,hold,unhold", true)
                    } else {
                        that.sethighlight("terminate,hold,unhold,switch", true)
                    }

                    break;
                //结束
                case 'incomingEnded': //calloutResponse  callinResponse 如果r不是200没有建立会话
                    // planePageBtn.dataset.hide = '0'
                    that.setDisplayNone("all")
                    that.timerWatch(rectT, false)
                    rectStatus.dataset.hide = "1"
                    rectStatus.style.background = call_bg[2]
                    rectS.innerText = "通话结束"
                    that.sethighlight("all", true)
                    global.clearTimeout(that.closeTimer)
                    that.closeTimer = global.setTimeout(() => {
                        rectStatus.dataset.hide = "0"
                        openBtn.dataset.hide = '1'
                        terminateBtn.dataset.hide = '0'
                        unHoldBtn.dataset.hide = "0"
                        holdBtn.dataset.hide = "1"
                        that.sethighlight("register,open,setting", true)
                        this.isOutCall = false
                    }, 2000);
                    break;
                case "endPBXCall":
                    break;
                //
                case 'incomingFailed':
                    // planePageBtn.dataset.hide = '0'
                    that.setDisplayNone("all")
                    that.timerWatch(rectT, false)
                    rectStatus.dataset.hide = "1"
                    rectStatus.style.background = call_bg[2]
                    rectS.innerText = "通话结束"
                    that.sethighlight("all", true)
                    global.clearTimeout(that.closeTimer)
                    that.closeTimer = global.setTimeout(() => {
                        rectStatus.dataset.hide = "0"
                        openBtn.dataset.hide = '1'
                        terminateBtn.dataset.hide = '0'
                        unHoldBtn.dataset.hide = "0"
                        holdBtn.dataset.hide = "1"
                        that.sethighlight("register,open,setting", true)
                        this.isOutCall = false
                    }, 2000);
                    break;
                default:
                    break;
            }

        }
    }
    global.$E = new Ephone()
})(window, document)