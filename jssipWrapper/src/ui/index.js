import Phone from './phone'
import creatHtml from './html'
;(function(global, doc) {
    class Ephone {
        constructor() {
            //定义Ephone的属性
            this.options = {
                width: '480px',
                height: '50px',
                background: '',
                callBackground: ['#1E59B9', '#19C583', '#FF6754'],
                drop: true
            }
            this.closeTimer = null
            this.watchTimer = null
            this.outTimer = null
            this.titleTimer = null
            this.recordsTotal = null // 某组坐席总数 滚动加载时使用
            this.callintype = '2' // 模式
            this.callType = 0 // 呼叫模式 0 无  2外线 3 内线
            this._ccNumber = undefined //ccNumber
            this.socket_uri = 'wss://s01.vsbc.com:9060'
            this.log = Phone.debug('script')
        }
        init(targetID, options) {
            // var ccNumber = localStorage.getItem("ccNumber")
            var head = document.getElementsByTagName('head')[0]
            var link = document.createElement('link')
            var userData = localStorage.userData
                ? JSON.parse(localStorage.userData)
                : false
            var toolbar = document.createElement('div')
            var target =
                doc.querySelector(targetID) || doc.querySelector('body')
            if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                target.innerHTML =
                    "<h1 style='text-align:center'>请使用非 IE 浏览器！！！</h1>"
                return
            }
            //初始化配置
            if (typeof options == 'object' && options) {
                this.options.width = options.width
                    ? options.width
                    : this.options.width
                this.options.height = options.height
                    ? options.height
                    : this.options.height
                this.options.background = options.background
                    ? options.background
                    : this.options.background
                this.options.drop =
                    options.drop != undefined ? options.drop : this.options.drop
                this.options.callBackground =
                    options.callBackground &&
                    Array.isArray(options.callBackground)
                        ? options.callBackground
                        : this.options.callBackground
            }
            //增加拖拽功能
            if (this.options.drop) {
                this._addDrop(toolbar, target)
            }
            //html
            toolbar.style.width = this.options.width
            toolbar.style.boxShadow = '0px 1px 15px ' + '#c3c3c3'
            toolbar.style.zIndex = 999
            toolbar.style.background = this.options.background
            toolbar.id = 'PHONE-DROP'
            toolbar.innerHTML = creatHtml(this.options)
            target.appendChild(toolbar)
            if (localStorage.refresh) {
                alert('您已打开一个页面,不可打开多个页面')

                window.open(
                    'https://www.yuque.com/yimi/phonebar/welcome-to-lark',
                    '_self'
                )
                // localStorage.removeItem('refresh')
                return
            } else {
                localStorage.refresh = '1'
            }
            //添加DOM事件处理
            this.eventListener()
            // this._hideAllMode()
            // https://www.chromestatus.com/features/5082396709879808
            window.addEventListener('beforeunload', e => {
                Phone.terminate(this.ccNumber)

                if (Phone.kefuStatus == 0 && localStorage.getItem('userData'))
                    localStorage.removeItem('userData')

                localStorage.removeItem('refresh')
                e.returnValue = '离开取消会话'
            })
            // 初始位置 功能按钮位置  配置项可配
            if (userData && userData.setting) {
                this.setTogglePosition(userData.setting)
            }
        }
        eventListener() {
            var stopProList = []
            var that = this //回调函数才需要that=this，或者箭头函数
            var targetId // 技能组id
            var timer = null
            var page = 1 // 记录当前页数
            var checked = 0 // 仅查可转接坐席是否勾选 0 未勾选 1 已勾选
            var gid
            var tranNumber
            //工具条元素
            let actionButtons = document.querySelectorAll(
                '#EphoneBar li[data-phone-key]'
            )
            let registerBtn = doc.querySelector(
                "#EphoneBar li[data-phone-type='register']"
            ) //登陆
            var holdBtn = doc.querySelector(
                "#EphoneBar li[data-phone-type='hold']"
            )
            var unHoldBtn = doc.querySelector(
                "#EphoneBar li[data-phone-type='unhold']"
            )
            let planePageBtn = doc.querySelector(
                "#PHONE-LEFT-STATUS>div[data-type='planePage']>div"
            ) //拨号面板按钮
            let kefuStatus = registerBtn.querySelector(
                "span[data-type='toggle']"
            ) //注册按钮显示状态
            //弹框元素
            let loginTarget = doc.querySelector('#PHONE-ENTRY-LOGIN[data-hide]') //登陆页面
            let selectGroupTarget = doc.querySelector(
                '#PHONE-ENTRY-SELECTGROUP[data-hide]'
            ) //登陆选择技能组
            let toggleTarget = doc.querySelector(
                '#PHONE-ENTRY-TOGGLE[data-hide]'
            ) //切换状态
            let settingTarget = doc.querySelector(
                '#PHONE-ENTRY-SETTING[data-hide]'
            ) //设置页面
            let panel = doc.querySelector('#PHONE-ENTRY-PANEL[data-hide]') //拨号面板
            let switchPage = doc.querySelector('#PHONE-ENTRY-SWITCH') //转接页面
            var incomingStatus = doc.querySelector(
                "#PHONE-LEFT-STATUS>div[data-type='incomingStatus']>div"
            ) //来电

            //loginTarget 登陆页面元素
            let Logininputs = doc.querySelectorAll(
                '#PHONE-ENTRY-LOGIN[data-hide] input[data-type]'
            )
            let switchnumber = Logininputs[0] //总机号
            let seatnumber = Logininputs[1] //分机号
            let password = Logininputs[2] //密码
            let modelnumber = Logininputs[3] //回拨话机/sip话机
            let error = loginTarget.querySelector("span[data-type='error']") // 错误提示
            var statusBtn = loginTarget.querySelector(
                "[data-type='loginStatus']"
            )
            var status_text = statusBtn.querySelector('span') // 示忙/示闲
            let modelSel = loginTarget.querySelectorAll(
                "li input[name='callintype']"
            )
            let modelLi = loginTarget.querySelector("li[data-type='model']")
            //selectGroupTarget 登陆选组元素
            let selectGroupTargetConfirm = selectGroupTarget.querySelector(
                "button[data-type='confirm']"
            )
            //  //状态 退出空闲忙碌元素
            let leisureStatus = toggleTarget.querySelector(
                "li[data-type='leisure']"
            )
            let busyStatus = toggleTarget.querySelector("li[data-type='busy']")
            // settingTarget //设置页面元素
            let moveBtn = settingTarget.querySelector("input[value='51']")
            let fixBtn = settingTarget.querySelector("input[value='52']")
            let wsUrl = settingTarget.querySelector("input[data-type='wsUrl']")
            let settingError = settingTarget.querySelector(
                "span[data-type='error'"
            )
            //panel 快速拨号元素
            let panelInput = panel.querySelector("input[data-type='input']") //手机号输入框
            // switchPage转接页元素
            let p = switchPage.querySelector("div[data-type='select_text']")
            let errorTitle = switchPage.querySelector("span[data-type='error']")
            let checkInp = switchPage.querySelector("input[type='checkbox']")
            let optionInp = switchPage.querySelectorAll('option')
            let kefuList = switchPage.querySelector("ul[data-type='kefuList']") //坐席

            //incomingStatus来电呼入
            let incomingS = incomingStatus.querySelector(
                "span[data-type='status']"
            )
            let incomingA = incomingStatus.querySelector(
                "button[data-type='answer']"
            )
            let title = doc.querySelector(
                "#PHONE-LEFT-STATUS div[data-type='pattern']>div"
            ) //移动模式提示
            //自动登陆
            if (localStorage && localStorage.userData) {
                this.register()
            }
            // 聚焦 错误提示隐藏
            // Array.from(Logininputs).forEach(v => {
            //     v.onfocus = () => { error.innerText = '' }
            // })
            //工具条点击事件
            Array.from(actionButtons).forEach(v => {
                stopProList.push(v)
                v.onclick = function(e) {
                    e.stopPropagation()
                    //this here is v so we can't use arrow function.
                    //BUT I really hate coding like this!!
                    var type = this.getAttribute('data-phone-type')
                    var key = this.getAttribute('data-phone-key')
                    try {
                        JSON.parse(localStorage.userData)
                    } catch (err) {
                        if (err) {
                            if (Phone.kefuStatus > 0) alert('请重新登录')
                            that.sethighlight('register setting', true)
                            kefuStatus.dataset.hide = '0'
                            Phone.stop()
                        }
                    }

                    if (this.classList.contains('gray')) return
                    switch (key) {
                        case '0': //注册,这里主要是续注册处理，要优化
                            that.log(Phone.kefuStatus)
                            if (Phone.kefuStatus > 0) {
                                var userData = JSON.parse(localStorage.userData)
                                leisureStatus.dataset.hide = busyStatus.dataset.hide =
                                    userData.seatMode == 1 ? '0' : '1'
                                that.setDisplayNone('statusPage')
                            } else {
                                that.setDisplayNone('loginPage')
                            }
                            break
                        case '1': // 快速呼叫 挂断 保持 恢复
                            if (type == 'open') {
                                that.setDisplayNone('fastPage')
                            }
                            if (type == 'terminate') {
                                Phone.terminate(that.ccNumber)
                            }
                            if (type == 'hold') {
                                Phone.hold(that.ccNumber)
                            }
                            if (type == 'unhold') {
                                Phone.unhold(that.ccNumber)
                            }
                            break
                        case '2': // 转接
                            var hide = doc.querySelector(
                                '#PHONE-ENTRY-SWITCH[data-hide]'
                            ).dataset.hide
                            if (hide == 0) {
                                // 置空可转接座席选择框
                                checkInp.checked = false
                                checked = 0
                                // 获取技能组
                                that.getGroup()

                                // 获取坐席  getMembers
                                var userData = JSON.parse(localStorage.userData)
                                gid = userData.loginGid ? userData.loginGid : -1
                                var webParam = {
                                    un: userData.userInfo.number,
                                    pwd: userData.pwd,
                                    eid: userData.eid,
                                    searchGid: gid,
                                    length: 20
                                }
                                that.getMembers(webParam, gid)

                                // 获取技能组状态 getMemberCallStates
                                // var res3 = await Phone.webApiHandler("getMemberCallStates", webParam)
                                // console.log({ getMemberCallStates: res3 })
                            }
                            that.setDisplayNone('switchPage')
                            break
                        case '4': //设置
                            var userData = localStorage.userData
                                ? JSON.parse(localStorage.userData)
                                : undefined
                            that.setDisplayNone('setting')
                            wsUrl.value = that.socket_uri
                            if (userData && Phone.kefuStatus > 0) {
                                userData.seatMode == '1'
                                    ? (moveBtn.checked = true)
                                    : (fixBtn.checked = true)
                                moveBtn.disabled = fixBtn.disabled = false
                                wsUrl.disabled = true
                            } else {
                                wsUrl.disabled = false
                                moveBtn.disabled = fixBtn.disabled = fixBtn.checked = true
                            }
                            break
                        default:
                            break
                    }
                }
            })
            //话机模式 切换
            Array.from(modelSel).forEach(v => {
                v.onchange = function() {
                    if (this.value != '2') {
                        modelLi.dataset.hide = '1'
                        modelLi.querySelectorAll('span').forEach(sv => {
                            sv.dataset.hide =
                                sv.dataset.type == this.value ? '1' : '0'
                        })
                        modelnumber.value = ''
                        modelnumber.oninput = null
                        modelnumber.oninput = function() {
                            v.value == '5'
                                ? (this.value = this.value.replace(/\D/g, ''))
                                : (this.value = this.value.replace(
                                      /[^0-9A-Z]/g,
                                      ''
                                  ))
                            this.value.length > 15
                                ? (this.value = this.value.substr(0, 14))
                                : this.value
                        }
                    } else {
                        modelLi.dataset.hide = '0'
                    }
                }
            })
            //loginTarget 登陆页面
            loginTarget.onclick = async function(e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                that._closePage(target, loginTarget)
                if (
                    target.dataset.type == 'loginStatus' ||
                    target.parentNode.dataset.type == 'loginStatus'
                ) {
                    var hasBusyClass = statusBtn.classList.contains('busy')
                    hasBusyClass
                        ? statusBtn.classList.remove('busy')
                        : statusBtn.classList.add('busy')
                    status_text.innerText = hasBusyClass ? '示闲' : '示忙'
                    var userData = {}
                    userData.preferredStatus = hasBusyClass ? '1' : '2'
                    localStorage.setItem('userData', JSON.stringify(userData))
                }
                if (target.dataset.type == 'login') {
                    var checkedModel = loginTarget.querySelector(
                        "li input[name='callintype']:checked"
                    ).value
                    that.callintype = checkedModel
                    if (switchnumber.value.length == 0)
                        return that.showError(
                            switchnumber,
                            error,
                            '请输入总机号码'
                        )
                    if (seatnumber.value.length == 0)
                        return that.showError(
                            seatnumber,
                            error,
                            '请输入分机号码'
                        )
                    if (
                        seatnumber.value.length < 4 ||
                        seatnumber.value.length > 6
                    )
                        return that.showError(
                            seatnumber,
                            error,
                            '分机号码错误，请重新输入'
                        )
                    if (password.value.length == 0)
                        return that.showError(password, error, '请输入密码')
                    if (checkedModel != '2' && modelnumber.value.length == '')
                        return that.showError(
                            modelnumber,
                            error,
                            '请输入话机号码'
                        )

                    if (target.dataset.disabled == '0') return
                    target.dataset.disabled = '0'

                    var res = await Phone.getLoginData(
                        seatnumber.value,
                        password.value,
                        switchnumber.value,
                        that.callintype,
                        that.callintype != '2' ? modelnumber.value : undefined
                    )
                    if (res.status != 200) {
                        if (res.status == 50000)
                            that.showError(
                                switchnumber,
                                error,
                                '服务器错误' + res.info
                            )
                        if (res.status == 50001)
                            that.showError(switchnumber, error, '参数错误')

                        if (res.status == 50002)
                            that.showError(
                                switchnumber,
                                error,
                                '未找到该企业，获取运维地址失败'
                            )
                        if (res.status == 50003)
                            that.showError(
                                seatnumber,
                                error,
                                '分机号码或密码错误，请重新输入'
                            )
                        if (res.status == 50004)
                            that.showError(
                                modelnumber,
                                error,
                                '未找到该企业，请使用其他账号登录'
                            )
                        if (res.status == 50005)
                            that.showError(
                                modelnumber,
                                error,
                                '登录信息获取失败'
                            )
                        if (res.status == 50006)
                            that.showError(
                                modelnumber,
                                error,
                                '回拨话机号码不存在'
                            )
                        target.dataset.disabled = '1'
                        return
                    }
                    that.log('getLoginData', { res: res })

                    // that.log({ groupInfo: res.memberInfo.inGroups})
                    var groupInfo = JSON.parse(localStorage.userData).groupInfo
                    if (groupInfo.length > 1) {
                        loginTarget.dataset.hide = '0'
                        selectGroupTarget.dataset.hide = '1'
                        selectGroupTargetConfirm.dataset.disabled = 'true'
                        var group = ''
                        groupInfo.map((v, i) => {
                            group +=
                                "<li title='" +
                                v.name +
                                "' data-eid='" +
                                v.eid +
                                "' data-id='" +
                                v.id +
                                "'>" +
                                v.name +
                                '</li>'
                        })
                        doc.querySelector(
                            "#PHONE-ENTRY-SELECTGROUP ul[data-type='groupList']"
                        ).innerHTML = group
                        target.dataset.disabled = '1'
                        return
                    }
                    var params = {
                        switchnumber: switchnumber.value,
                        un: seatnumber.value,
                        pwd: password.value,
                        gid: groupInfo[0] ? groupInfo[0].id : 0,
                        callintype: that.callintype,
                        socketUri: that.socket_uri,
                        remoteAudio: 'peeraudio'
                    }
                    that.register(params, target)
                }
            }
            // 切换坐席状态、退出
            toggleTarget.addEventListener('click', function(e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                var userData = localStorage.getItem('userData')
                    ? JSON.parse(localStorage.getItem('userData'))
                    : false
                var seatMode = userData.seatMode
                if (
                    target.dataset.type == 'leisure' ||
                    target.parentNode.dataset.type == 'leisure'
                ) {
                    // 示闲
                    if (seatMode == 1 || that.ccNumber) return
                    Phone.changeStaus('1')
                }
                if (
                    target.dataset.type == 'busy' ||
                    target.parentNode.dataset.type == 'busy'
                ) {
                    // 示忙
                    if (seatMode == 1) return
                    if (that.ccNumber && busyStatus.dataset.disabled != '0') {
                        if (busyStatus.dataset.status == '2') {
                            Phone.preSetStatus({ ccNumber: that.ccNumber })
                        } else {
                            Phone.preSetStatusCancle({
                                ccNumber: that.ccNumber
                            })
                        }
                        busyStatus.dataset.disabled = '0'
                        that.log('通话中修改状态', busyStatus.dataset.status)
                    } else {
                        Phone.changeStaus('2')
                    }
                }
                if (
                    target.dataset.type == 'logout' ||
                    target.parentNode.dataset.type == 'logout' ||
                    target.parentNode.parentNode.dataset.type == 'logout'
                ) {
                    // 退出
                    if (
                        target.dataset.disabled == 'true' ||
                        target.parentNode.dataset.disabled == 'true' ||
                        target.parentNode.parentNode.dataset.disabled ==
                            'true' ||
                        that.ccNumber
                    )
                        return
                    Phone.stop(function(res) {
                        if (res.code == 200) {
                            kefuStatus.dataset.hide = '0'
                            that.setDisplayNone('all')
                            that.sethighlight('register,setting', true)
                            title.dataset.hide = '0'
                        } else {
                            alert(res.info)
                        }
                    })
                }
                toggleTarget.dataset.hide = '0'
                that.setArrowNone()
            })

            // PHONE-ENTRY-SETTING 更改设置
            settingTarget.onclick = function(e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                that._closePage(target, settingTarget)
                if (target.dataset.type == 'confirm') {
                    var userData = localStorage.userData
                        ? JSON.parse(localStorage.userData)
                        : undefined
                    var patternRadioValue = settingTarget
                        .querySelector(
                            "input[type='radio'][name='pattern']:checked"
                        )
                        .getAttribute('value')
                    var postionRadioValue = settingTarget
                        .querySelector(
                            "input[type='radio'][name='postionButton']:checked"
                        )
                        .getAttribute('value')
                    var pattern = patternRadioValue == '51' ? 1 : 2
                    var setting = { postion: postionRadioValue }
                    //模式
                    if (userData && Phone.kefuStatus > 0) {
                        userData.setting = setting
                        localStorage.setItem(
                            'userData',
                            JSON.stringify(userData)
                        )
                        if (userData.seatMode != pattern) {
                            Phone.setSeatMode(patternRadioValue)
                        }
                    } else {
                        var reg = new RegExp(
                            '(ws|wss)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'
                        )
                        if (reg.test(wsUrl.value)) that.socket_uri = wsUrl.value
                        else
                            return that.showError(
                                wsUrl,
                                settingError,
                                '请输入正确的wss地址'
                            )
                    }
                    //定位
                    that.setTogglePosition(setting)
                    that.setArrowNone()
                    settingTarget.dataset.hide = 0
                }
            }
            // PHONE-ENTRY-SELECTGROUP 选择技能组
            selectGroupTarget.onclick = function(e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                that._closePage(target, selectGroupTarget)
                if (target.parentNode.dataset.type == 'groupList') {
                    that._selectedUI(target)
                    targetId = target.dataset.id
                    selectGroupTargetConfirm.dataset.disabled = '1'
                    that.log('groupList:id', targetId)
                }
                if (target.dataset.type == 'confirm') {
                    if (
                        target.dataset.disabled == '0' ||
                        target.dataset.disabled == 'true'
                    )
                        return
                    target.dataset.disabled = '0'
                    // var len = document.querySelectorAll(
                    //     "#PHONE-ENTRY-SELECTGROUP ul[data-type='groupList']>li.selected"
                    // ).length
                    // if (len < 1) return

                    var userData = JSON.parse(localStorage.userData)
                    var params = {
                        switchnumber: userData.switchNumber,
                        un: userData.userInfo.number,
                        pwd: userData.pwd,
                        gid: targetId,
                        callintype: that.callintype,
                        socketUri: that.socket_uri,
                        remoteAudio: 'peeraudio'
                    }
                    that.register(params, target)
                }
            }
            // PHONE-ENTRY-PANEL 快速呼叫
            panel.onclick = function(e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                that._closePage(target, panel)
                if (target.dataset.type == 'call') {
                    //拨号
                    that.callout(panelInput)
                }
            }
            panelInput.onkeydown = function(e) {
                if (e.keyCode == '13') {
                    that.callout(panelInput)
                }
            }
            //接听
            incomingA.onclick = function(e) {
                e.stopPropagation()
                if (this.dataset.disabled == '0') return
                if (this.closeTimer) global.clearTimeout(this.closeTimer)
                this.dataset.disabled = '0'
                incomingS.innerHTML = "呼叫中<span class='dotting'></span>"
                Phone.answerPBXCall(that.ccNumber)
            }
            // PHONE-ENTRY-SWITCH 转接
            switchPage.onclick = function(e) {
                e.stopPropagation()
                var target = e.target || e.srcElement
                var groupUl = switchPage.querySelector('ul[data-type="group"]')
                that._closePage(target, switchPage)
                if (
                    target.parentNode.dataset.type == 'select' ||
                    target.dataset.type == 'select' ||
                    target.classList[0] == 'arrow'
                ) {
                    groupUl.dataset.hide =
                        groupUl.dataset.hide == '1' ? '0' : '1'
                } else {
                    groupUl.dataset.hide = '0'
                }
                if (target.parentNode.dataset.type == 'group') {
                    p.innerText = target.innerText
                    groupUl.dataset.hide = '0'
                    that.log(target.dataset.id)
                    gid = target.dataset.id ? target.dataset.id : -1

                    page = 1
                    // 获取某组坐席  getMembers
                    var userData = JSON.parse(localStorage.userData)
                    var webParam = {
                        un: userData.userInfo.number,
                        pwd: userData.pwd,
                        eid: userData.eid,
                        searchGid: gid,
                        length: 20
                    }
                    if (checked) webParam.searchServiceControl = checked

                    that.getMembers(webParam, gid)
                }
                if (target.dataset.type == 'checkbox') {
                    page = 1
                    that.log(target.checked)
                    var userData = JSON.parse(localStorage.userData)
                    var webParam = {
                        un: userData.userInfo.number,
                        pwd: userData.pwd,
                        eid: userData.eid,
                        searchGid: gid,
                        length: 20
                    }
                    target.checked
                        ? (webParam.searchServiceControl = checked = 1)
                        : (checked = 0)

                    that.getMembers(webParam, gid)
                }
                if (target.parentNode.dataset.type == 'kefuList') {
                    if (
                        target.dataset.status == 'offLine' ||
                        target.dataset.status == 'busy'
                    )
                        return
                    that._selectedUI(target)
                    gid = target.dataset.gids
                    tranNumber = target.dataset.number
                }
                if (
                    target.dataset.type == 'transfer' &&
                    target.dataset.disabled != '0' &&
                    gid &&
                    tranNumber &&
                    target.dataset.disabled != 'true'
                ) {
                    if (!that.ccNumber) return
                    that.log('正在转接...', {
                        gid,
                        tranNumber,
                        ccNumber: that.ccNumber
                    })
                    target.dataset.disabled = '0'
                    errorTitle.style.color = '#19C583'
                    errorTitle.innerText = '正在转接,请稍后...'
                    that.sethighlight('all', true)
                    Phone.transferPBXCall(
                        gid,
                        tranNumber,
                        that.ccNumber,
                        function(res) {
                            if (res.type == 'transferCallFaild') {
                                switchPage.dataset.hide = '1'
                                errorTitle.style.color = '#FD3D39'
                                errorTitle.innerText = '电话转接失败'
                                if (timer) global.clearTimeout(timer)
                                timer = global.setTimeout(() => {
                                    errorTitle.innerText = ''
                                    that.sethighlight(
                                        'terminate,hold,unhold,switch',
                                        true
                                    )
                                }, 2000)
                            } else {
                                errorTitle.innerText = '电话转接成功'
                                if (timer) global.clearTimeout(timer)
                                timer = global.setTimeout(() => {
                                    errorTitle.innerText = ''
                                    switchPage.dataset.hide = '0'
                                }, 2000)
                            }
                            target.dataset.disabled = '1'
                        }
                    )
                }
            }
            //滚动加载坐席
            kefuList.onscroll = function(e) {
                var target = e.target || e.srcElement
                var pageTotal = Math.ceil(parseInt(that.recordsTotal) / 20)

                if (
                    target.scrollTop >=
                    target.scrollHeight - target.offsetHeight
                ) {
                    if (page == pageTotal) return
                    var userData = JSON.parse(localStorage.userData)
                    var webParam = {
                        un: userData.userInfo.number,
                        pwd: userData.pwd,
                        eid: userData.eid,
                        searchGid: gid,
                        start: 20 * page,
                        length: 20
                    }
                    that.getMembers(webParam, gid, true)
                    page++
                }
            }
            //拨号面板
            // var planePage = doc.querySelector("#PHONE-PANEL")
            // var input = planePage.querySelector("input[data-type='input']")
            // planePageBtn.onclick = function (e) {
            //     e.stopPropagation()
            //     var hide = planePage.dataset.hide
            //     planePage.dataset.hide = hide == '0' ? "1" : "0"
            // }
            // planePage.onclick = function (e) {
            //     e.stopPropagation()
            //     var target = e.target || e.srcElement
            //     var type = target.dataset.type
            //     if (type == 'num') {  //点击数字键盘
            //         input.value += target.value
            //         Phone.sendDTMF(target.value)
            //         input.focus()
            //     }
            //     if (type == 'call') { //删除
            //         if (input.value.length == 0) return
            //         input.value = input.value.substring(0, input.value.length - 1)
            //     }
            //     if (type == 'close') { //删除
            //         planePage.dataset.hide = "0"
            //     }

            // }

            stopProList.push(
                loginTarget,
                selectGroupTarget,
                settingTarget,
                panel,
                switchPage,
                toggleTarget,
                incomingA
            )
            if (this.options.drop) this._stopPro(stopProList)
        }

        // 关闭页面
        _closePage(target, closePage) {
            if (target.dataset.type == 'close') {
                closePage.dataset.hide = '0'
                this.setArrowNone()
                if (closePage.dataset.toggle == 'selectGroup') {
                    let loginTarget = doc.querySelector(
                        '#PHONE-ENTRY-LOGIN[data-hide]'
                    )
                    loginTarget.dataset.hide = '1'
                    if (localStorage.userData)
                        localStorage.removeItem('userData')
                }
            }
        }

        // 选中时的UI
        // 选中技能组 | 选中转接坐席
        _selectedUI(target) {
            var list = target.parentNode.children
            Array.from(list).forEach(v => {
                v.classList.remove('selected')
            })
            target.classList.add('selected')
        }

        // 点击确定按钮|回车  呼出电话
        callout(panelInput) {
            if (panelInput.value.length == 0) return
            var peerID = panelInput.value
            var userData = JSON.parse(localStorage.userData)
            var extension_start = parseInt(userData.epInfo.extension_start)
            var extension_end = parseInt(userData.epInfo.extension_end)
            this.callType =
                parseInt(peerID) >= extension_start &&
                parseInt(peerID) <= extension_end
                    ? 3
                    : 2
            var params = {
                peerID: this.callType == 2 ? '9' + peerID : peerID,
                callType: this.callType
            }
            Phone.call(params)
            this.phoneStatus('outgoingCall', {
                panelInput: peerID,
                callType: params.callType
            })
            panelInput.value = ''
            let panel = doc.querySelector('#PHONE-ENTRY-PANEL[data-hide]')
            panel.dataset.hide = 0
        }

        // 获取技能组
        async getGroup() {
            var userData = JSON.parse(localStorage.userData)
            var webParam = {
                un: userData.userInfo.number,
                pwd: userData.pwd,
                eid: userData.eid
                // needPbxFields: 1
            }
            var res = await Phone.webApiHandler('getGroups', webParam)
            this.log({ getGroups: res })
            var groups = '<li>未分组</li>'
            var searchName
            res.returnData.map((v, i) => {
                v.id == userData.loginGid && (searchName = v.name)
                groups +=
                    "<li data-eid='" +
                    v.eid +
                    "' data-id='" +
                    v.id +
                    "' data-level='" +
                    v.level +
                    "' data-name='" +
                    v.name +
                    "' data-oid='" +
                    v.oid +
                    "' data-pid='" +
                    v.pid +
                    "'>" +
                    v.name +
                    '</li>'
            })
            doc.querySelector(
                "#PHONE-ENTRY-SWITCH[data-hide] [data-type='select_text']"
            ).innerText = searchName ? searchName : '未分组'
            var selectDom = doc.querySelector(
                '#PHONE-ENTRY-SWITCH ul[data-type="group"]'
            )
            selectDom.innerHTML = groups
        }

        // 请求坐席
        async getMembers(webParam, gid, isScroll) {
            var res = await Phone.webApiHandler('searchEpMembers', webParam)
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
                    members +=
                        "<li title='" +
                        v.displayname +
                        "' data-status_code='" +
                        v.service_control +
                        "' data-status='" +
                        status +
                        "' data-gids='" +
                        gid +
                        "' data-number='" +
                        v.number +
                        "'>" +
                        v.displayname +
                        '<span></span></li>'
                })
            } else {
                members += "<li data-type='noOne'>暂无坐席</li>"
            }
            var liDom = doc.querySelector(
                '#PHONE-ENTRY-SWITCH ul[data-type="kefuList"]'
            )
            if (isScroll) {
                liDom.innerHTML = liDom.innerHTML + members
            } else {
                liDom.innerHTML = members
            }
        }

        register(params, target) {
            function kickOffcb(data) {
                let resCode = data.r
                this.log('被踢下线', resCode)
                switch (resCode) {
                    case '895':
                    case '897':
                        this.setDisplayNone('all')
                        var str =
                            resCode == '897'
                                ? '注册超时，请重新登录'
                                : '其他用户登录您的账号'
                        var modal = confirm(str + '确认重新登录,取消退出状态')
                        if (modal) {
                            Phone.terminate(this.ccNumber)
                            this.register()
                        } else {
                            Phone.stop(res => {
                                if (res.code == 200) {
                                    doc.querySelector(
                                        "#EphoneBar li[data-phone-type='register'] span[data-type='toggle']"
                                    ).dataset.hide = '0'
                                    this.sethighlight('register,setting', true)
                                }
                            })
                            if (Phone.session || this.ccNumber) {
                                this.phoneStatus('endPBXCall')
                                // 防止二次登录失败
                                Phone.session = null
                            }
                        }
                        break
                    case '898':
                    case '899':
                        alert(
                            resCode == '898'
                                ? '账号过期/账号被删/账号修改，请重新登录'
                                : '企业停止'
                        )
                        Phone.stop(res => {
                            if (res.code == 200) {
                                doc.querySelector(
                                    "#EphoneBar li[data-phone-type='register'] span[data-type='toggle']"
                                ).dataset.hide = '0'
                                this.sethighlight('register,setting', true)
                            }
                        })
                        if (Phone.session || this.ccNumber) {
                            this.phoneStatus('endPBXCall')
                            Phone.session = null
                        }
                        break
                }
            }

            function registercb(data) {
                if (target) target.dataset.disabled = '1'

                let resCode = data.code
                if (resCode != 200) {
                    //登录失败；用户名、密码的错误在getLoginData已经做了检查，所以这次错误应该主要是网络原因
                    //registrationFailed 暂时设置code = 500
                    this.setDisplayNone('all')
                    this.setArrowNone()
                    this.sethighlight('register,setting', true)
                    alert(data.info)
                    return
                }
                if (Phone.session || this.ccNumber) return
                var title = doc.querySelector(
                    "#PHONE-LEFT-STATUS div[data-type='pattern']>div"
                ) //移动模式提示\
                var registerTitle = doc.querySelector(
                    "#EphoneBar li[data-phone-type='register']"
                )
                var userData = localStorage.userData
                    ? JSON.parse(localStorage.userData)
                    : undefined
                var gidParams = userData
                    ? userData.groupInfo.find(v => v.id == userData.loginGid)
                    : undefined
                this.log(`What is current status:${userData.status}`)
                //初始状态
                this.setDisplayNone('all')
                this.setArrowNone()
                if (userData) {
                    userData.seatMode == 1
                        ? this.sethighlight('register,setting', true)
                        : this.sethighlight('register,open,setting', true)
                    title.dataset.hide = userData.seatMode == 1 ? '1' : '0'
                    registerTitle.title = `分机号:${
                        userData.userInfo.number
                    }\n所在组:${gidParams ? gidParams.name : '未分组'}`
                } else {
                    Phone.stop()
                    this.sethighlight('register,setting', true)
                }
            }

            // 发送message成功的回调
            function methodCb(data, status) {
                this.log(
                    'sending message method:' + data.callbacktype,
                    status,
                    data
                )
                switch (data.callbacktype) {
                    case 'preLoginStatus':
                        if (status == 'success') {
                            //修改本地状态  已通过监听 statusChanged 处理
                        } else {
                            //登录预设状态失败，应退出登录
                            Phone.stop(res => {
                                if (res.code == 200) {
                                    alert(data.info.response.reason_phrase)
                                    doc.querySelector(
                                        "#EphoneBar li[data-phone-type='register'] span[data-type='toggle']"
                                    ).dataset.hide = '0'
                                    this.sethighlight('register,setting', true)
                                } else {
                                    alert(res.info)
                                }
                            })
                        }
                        break
                    case 'changeStaus':
                        break
                    case 'setSeatMode':
                        var mode = data.dataInfo.seatMode
                        var title = doc.querySelector(
                            "#PHONE-LEFT-STATUS div[data-type='pattern']>div"
                        )
                        if (mode) {
                            title.dataset.hide = mode == '1' ? '1' : '0'
                            mode == 1
                                ? this.sethighlight('register,setting', true)
                                : this.sethighlight(
                                      'register,open,setting',
                                      true
                                  )
                        }
                        break
                    case 'answerPBXCall':
                        break
                    case 'holdPBXCall':
                        if (status == 'success') {
                            this.phoneStatus('holdPBXCall', status)
                        }
                        break
                    case 'unholdPBXCall':
                        if (status == 'success') {
                            this.phoneStatus('unholdPBXCall', status)
                        }
                        break
                    case 'preSetStatus':
                        if (status == 'success') {
                            var busyStatus = doc
                                .querySelector('#PHONE-ENTRY-TOGGLE[data-hide]')
                                .querySelector("li[data-type='busy']")
                            busyStatus.dataset.status = '-1'
                            busyStatus.querySelector('span').innerText = '取消'
                            busyStatus.dataset.disabled = '1'
                        }
                        break
                    case 'preSetStatusCancle':
                        if (status == 'success') {
                            var busyStatus = doc
                                .querySelector('#PHONE-ENTRY-TOGGLE[data-hide]')
                                .querySelector("li[data-type='busy']")
                            busyStatus.dataset.status = '2'
                            busyStatus.querySelector('span').innerText = '忙碌'
                            busyStatus.dataset.disabled = '1'
                        }
                        break
                    case 'hangUpPBXCall':
                        if (status == 'success') {
                            var userData = JSON.parse(
                                localStorage.getItem('userData')
                            )
                            localStorage.setItem(
                                'userData',
                                JSON.stringify(userData)
                            )
                            this.ccNumber = undefined
                        }
                        break
                    default:
                        break
                }
            }
            let callbackMap = {
                callEvent: this.phoneStatus.bind(this),
                kickedOffLine: kickOffcb.bind(this),
                register: registercb.bind(this),
                methodCb: methodCb.bind(this)
            }

            Phone.init(params, callbackMap)
        }

        _addDrop(toolbar, target) {
            var thisWrapper = this
            toolbar.onmousedown = function(ev) {
                ev.stopPropagation()
                ev.preventDefault()
                toolbar.setCapture && toolbar.setCapture()

                var oEvent = ev || event
                var disX = oEvent.clientX - this.offsetLeft
                var disY = oEvent.clientY - this.offsetTop

                this.style.position = 'fixed'
                this.style.cursor = 'move'

                document.onmousemove = ev => {
                    var oEvent = ev || event
                    var l = oEvent.clientX - disX
                    var t = oEvent.clientY - disY
                    var clientHeight =
                        document.body.clientHeight ||
                        document.documentElement.offsetHeight ||
                        document.body.scrollHeight ||
                        window.screen.height - 133
                    var clientWidth =
                        document.body.clientWidth ||
                        document.documentElement.clientWidth ||
                        document.body.clientWidth

                    if (l <= 20) {
                        l = 0
                    }
                    if (l >= clientWidth - parseInt(this.offsetWidth) - 20) {
                        l = clientWidth - parseInt(this.offsetWidth)
                    }
                    if (
                        t >=
                        clientHeight - parseInt(thisWrapper.options.height) - 20
                    ) {
                        t = clientHeight - parseInt(thisWrapper.options.height)
                    }
                    if (t <= 20) {
                        t = 0
                    }
                    this.style.left = l + 'px'
                    this.style.top = t + 'px'
                }

                document.onmouseup = () => {
                    document.onmousemove = null //如果不取消，鼠标弹起div依旧会随着鼠标移动
                    document.onmouseup = null
                    this.style.cursor = 'default'
                    toolbar.setCapture && toolbar.releaseCapture()
                }
                //    };
            }
        }
        _stopPro(arr) {
            arr.forEach(v => {
                v.addEventListener('mousedown', function(e) {
                    e.stopPropagation()
                })
            })
        }
        _hideAllMode() {
            document.addEventListener('click', e => {
                e.stopPropagation()
                this.setDisplayNone('all')
            })
        }
        timerWatch(target, falg) {
            var second = 0,
                minute = 0,
                hour = 0,
                timer = null
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
                    target.innerText =
                        (hour < 10 ? '0' + hour : hour) +
                        ':' +
                        (minute < 10 ? '0' + minute : minute) +
                        ':' +
                        (second < 10 ? '0' + second : second)
                }, 1000)
            } else {
                global.clearInterval(this.watchTimer)
            }
        }
        sethighlight(str, flag) {
            var actionButtons = document.querySelectorAll(
                '#EphoneBar li[data-phone-key]'
            ) //工具条面板
            actionButtons.forEach(v => {
                if (str.indexOf(v.dataset.phoneType) !== -1) {
                    flag ? v.classList.remove('gray') : v.classList.add('gray')
                    if (v.dataset.phoneType == 'terminate')
                        flag ? (v.style.color = 'red') : (v.style = '#999')
                } else {
                    flag ? v.classList.add('gray') : v.classList.remove('gray')
                    if (v.dataset.phoneType == 'terminate')
                        flag ? (v.style = '#999') : (v.style.color = 'red')
                }
            })
        }
        setDisplayNone(str) {
            var modes = document.querySelectorAll(
                '#PHONE-ENTRY-CONTAINER  div[data-toggle]'
            )
            var arrows = document.querySelectorAll('#EphoneBar div[data-arrow]')
            var arr = [
                'loginPage',
                'selectGroup',
                'statusPage',
                'fastPage',
                'switchPage',
                'setting'
            ]
            var compArr = [
                'register',
                'register',
                'register',
                'open',
                'switch',
                'setting'
            ]
            Array.from(arrows).forEach(v => {
                v.dataset.hide = '0'
            })
            Array.from(modes).forEach(v => {
                if (str.indexOf(v.dataset.toggle) !== -1) {
                    var index = arr.indexOf(v.dataset.toggle)

                    v.dataset.hide = v.dataset.hide == '1' ? '0' : '1'
                    v.dataset.hide == '1' &&
                        v.querySelector("input[type='text']") &&
                        v.querySelector('input').focus()
                    if (index >= 0) {
                        document.querySelector(
                            '#EphoneBar div[data-arrow=' + compArr[index] + ']'
                        ).dataset.hide = v.dataset.hide
                    }
                    if (index == 0) {
                        var loginStatus = document.querySelector(
                            "#PHONE-ENTRY-LOGIN span[data-type='loginStatus']"
                        )
                        if (loginStatus.classList.contains('busy'))
                            loginStatus.classList.remove('busy')
                        loginStatus.querySelector('span').innerText = '示闲'
                    }
                } else {
                    v.dataset.hide = '0'
                }
            })
        }
        setTogglePosition(setting) {
            var modes = document.querySelectorAll(
                '#PHONE-ENTRY-CONTAINER  div[data-toggle]'
            )
            var bar = doc.querySelector('#EphoneBar')
            var status = doc.querySelector('#PHONE-LEFT-STATUS')
            var radio = doc.querySelector(
                "#PHONE-ENTRY-SETTING[data-hide] input[name='postionButton'][value=" +
                    setting.postion +
                    ']'
            )
            var isLeft = setting.postion && setting.postion == 'left'

            bar.style.float = isLeft ? 'left' : 'right'
            status.style.float = isLeft ? 'right' : 'left'
            radio.checked = true

            Array.from(modes).forEach(v => {
                if (v.dataset.toggle != 'statusPage')
                    v.style.left = isLeft
                        ? '0px'
                        : parseInt(this.options.width) - 300 + 'px'
            })
        }
        setArrowNone() {
            var arrows = document.querySelectorAll(
                '#EphoneBar>li>div[data-arrow]'
            )
            Array.from(arrows).forEach(v => {
                v.dataset.hide = '0'
            })
        }
        showError(target, errorTarget, text) {
            global.clearTimeout(this.titleTimer)
            errorTarget.innerText = text
            target.focus()
            this.titleTimer = global.setTimeout(() => {
                errorTarget.innerText = ''
            }, 2000)
        }
        get ccNumber() {
            return this._ccNumber
        }
        set ccNumber(c) {
            // 会话中状态操作控制
            var statusList = doc
                .querySelector('#PHONE-ENTRY-TOGGLE[data-hide]')
                .querySelectorAll('li[data-type^=l]') //切换状态是否禁用
            var busy = doc
                .querySelector('#PHONE-ENTRY-TOGGLE[data-hide]')
                .querySelector("li[data-type='busy']")
            Array.from(statusList).forEach(v => {
                if (c) {
                    v.style.color = '#999'
                    v.dataset.disabled = true
                } else {
                    v.dataset.disabled = false
                    v.style.color = '#2ea9df'
                }
            })
            if (!c) {
                busy.dataset.status = '2'
                busy.querySelector('span').innerText = '忙碌'
            }
            this._ccNumber = c
            var userData = JSON.parse(localStorage.getItem('userData'))
            if (userData) {
                userData.ccNumber = c
                localStorage.setItem('userData', JSON.stringify(userData))
            }
            this.log('set ccNumber', c)
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
        phoneStatus(callType, data) {
            this.log('phoneStatus_' + callType + ':', data)
            //外呼样式
            var circleStatus = doc.querySelector(
                "#PHONE-LEFT-STATUS>div[data-type='circle']>div"
            ) //左边状态显示
            var rectStatus = doc.querySelector(
                "#PHONE-LEFT-STATUS>div[data-type='rect']>div"
            )
            var rectN = rectStatus.querySelector("span[data-type='number']")
            var rectS = rectStatus.querySelector("span[data-type='status']")
            var rectT = rectStatus.querySelector("span[data-type='times']")
            //呼入样式
            var incomingStatus = doc.querySelector(
                "#PHONE-LEFT-STATUS>div[data-type='incomingStatus']>div"
            )
            var incomingBg = incomingStatus.querySelector("div[data-type='bg']")
            var incomingN = incomingStatus.querySelector(
                "span[data-type='number']"
            )
            var incomingS = incomingStatus.querySelector(
                "span[data-type='status']"
            )
            var incomingA = incomingStatus.querySelector(
                "button[data-type='answer']"
            )
            var call_bg = this.options.callBackground
            //通话中 拨号键
            var planePageBtn = doc.querySelector(
                "#PHONE-LEFT-STATUS>div[data-type='planePage']>div"
            )
            var planePage = doc.querySelector('#PHONE-PANEL')
            //工具条按钮
            var openBtn = doc.querySelector("li[data-phone-type='open']")
            var terminateBtn = doc.querySelector(
                "li[data-phone-type='terminate']"
            )
            var holdBtn = doc.querySelector(
                "#EphoneBar li[data-phone-type='hold']"
            )
            var unHoldBtn = doc.querySelector(
                "#EphoneBar li[data-phone-type='unhold']"
            )
            //pbx
            switch (callType) {
                //点击拨号
                case 'outgoingCall':
                    rectStatus.dataset.hide = 1
                    rectStatus.style.background = call_bg[0]
                    rectN.innerText =
                        data.panelInput.length > 12
                            ? data.panelInput.substring(1, 12) + '...'
                            : data.panelInput
                    rectS.innerText = '呼叫中'
                    this.timerWatch(rectT, true)
                    this.sethighlight('all', true)
                    this.setDisplayNone('all')
                    this.setArrowNone()
                    if (this.outTimer) global.clearTimeout(this.outTimer)
                    this.outTimer = global.setTimeout(() => {
                        this.log('呼叫超时')
                        if (this.ccNumber) return
                        rectStatus.style.background = call_bg[2]
                        rectS.innerText = '呼叫超时'
                        this.timerWatch(rectT, false)
                        global.clearTimeout(this.closeTimer)
                        this.closeTimer = global.setTimeout(() => {
                            rectStatus.dataset.hide = '0'
                            openBtn.dataset.hide = '1'
                            terminateBtn.dataset.hide = '0'
                            this.sethighlight('register,open,setting', true)
                            this.setDisplayNone('all')
                        }, 2000)
                    }, 15000) //服务器是10秒
                    break
                //呼入
                case 'newPBXCall':
                    if (this.outTimer) global.clearTimeout(this.outTimer)
                    var userData = JSON.parse(localStorage.userData)
                    var allow_auto_answer = userData.epInfo.allow_auto_answer //是否自动应答
                    var auto_answer_duration = Number(
                        userData.epInfo.auto_answer_duration
                    ) //时间
                    var extension_start = parseInt(
                        userData.epInfo.extension_start
                    )
                    var extension_end = parseInt(userData.epInfo.extension_end)
                    var peerID =
                        data.n.indexOf('_') != -1
                            ? data.n.split('_')[0]
                            : data.n
                    this.callType =
                        parseInt(peerID) >= extension_start &&
                        parseInt(peerID) <= extension_end
                            ? 3
                            : 2
                    this.ccNumber = data.c
                    rectN.innerText = incomingN.innerText = peerID
                    openBtn.dataset.hide = '0'
                    terminateBtn.dataset.hide = '1'
                    this.sethighlight('terminate', true)
                    this.setDisplayNone('all')
                    this.setArrowNone()
                    incomingStatus.dataset.hide = '1'
                    incomingA.dataset.hide = '1'
                    incomingA.dataset.disabled = '1'
                    incomingBg.style.background = call_bg[0]
                    incomingS.innerHTML = "来电<span class='dotting'></span>"

                    if (allow_auto_answer == '1') {
                        if (this.closeTimer)
                            global.clearTimeout(this.closeTimer)
                        this.closeTimer = global.setTimeout(() => {
                            incomingA.click()
                        }, auto_answer_duration * 1000)
                    }

                    break
                case 'cancelPBXCall':
                    //  100和101消息一直发  在101处理逻辑这加一个延迟定时器，保证页面状态不变
                    //  暂时没想到其他方法
                    if (this.outTimer) global.clearTimeout(this.outTimer)
                    this.outTimer = global.setTimeout(() => {
                        this.ccNumber = undefined
                        this.sethighlight('all', true)
                        incomingA.dataset.hide = '0'
                        incomingBg.style.background = call_bg[2]
                        incomingS.innerHTML = '来电未接听'
                        global.setTimeout(() => {
                            incomingStatus.dataset.hide = '0'
                            openBtn.dataset.hide = '1'
                            terminateBtn.dataset.hide = '0'
                            this.sethighlight('register,open,setting', true)
                        }, 2000)
                    }, 2000)
                    break
                case 'callinFaildResponse':
                    break
                //呼出响应
                case 'calloutResponse': //呼出外线PBX响应
                case 'callinResponse': //呼出内线PBX响应
                    global.clearTimeout(this.outTimer)
                    global.clearTimeout(this.closeTimer)
                    if (data.r != 200) {
                        //200成功   503对象忙碌 509//非工作时间
                        rectStatus.style.background = call_bg[2]
                        switch (Number(data.r)) {
                            case 470:
                                rectS.innerText = '当前分机未绑定SIP话机'
                                break
                            case 471:
                                rectS.innerText = 'SIP话机不在线'
                                break
                            case 486:
                                rectS.innerText = 'SIP话机正忙'
                                break
                            case 503: //内线离线 忙碌
                                rectS.innerText = '对方忙碌'
                                break
                            case 507:
                                rectS.innerText = '总机号已停机'
                                break
                            case 508:
                                rectS.innerText = '非工作时间'
                                break
                            case 511: //针对选择总机号外呼的客户，如果pbx端没有此总机号了，会返回511
                                rectS.innerText = '总机号不存在'
                                break
                            case 512:
                                rectS.innerText = '该客户今日被呼叫次数已达上限'
                                break
                            case 1000: //以防通过拨号盘拨打在线客服分机号
                                rectS.innerText = '禁止拨打无权限坐席'
                                break
                            default:
                                rectS.innerText = '呼叫失败'
                                break
                        }
                        this.closeTimer = global.setTimeout(() => {
                            rectStatus.dataset.hide = '0'
                            this.sethighlight('register,open,setting', true)
                            this.setDisplayNone('all')
                        }, 2000)
                    } else {
                        this.ccNumber = data.c
                        openBtn.dataset.hide = '0'
                        terminateBtn.dataset.hide = '1'
                        this.sethighlight('terminate,register', true)
                        this.setDisplayNone('all')
                        this.setArrowNone()
                    }
                    break
                //通话已经建立接通
                case 'answeredPBXCall':
                    incomingStatus.dataset.hide = '0'
                    rectStatus.dataset.hide = '1'
                    rectStatus.style.background = call_bg[1]
                    this.timerWatch(rectT, true)
                    rectS.innerText = '通话中'
                    this.callType == 2
                        ? this.sethighlight(
                              'register,terminate,hold,unhold,switch',
                              true
                          )
                        : this.sethighlight(
                              'register,terminate,hold,unhold',
                              true
                          )
                    break
                case 'endPBXCall':
                    this.ccNumber = undefined
                    this.setDisplayNone('all')
                    this.timerWatch(rectT, false)
                    incomingStatus.dataset.hide = '0'
                    rectStatus.dataset.hide = '1'
                    rectStatus.style.background = call_bg[2]
                    rectS.innerText = '通话结束'
                    this.sethighlight('all', true)
                    global.clearTimeout(this.closeTimer)
                    this.closeTimer = global.setTimeout(() => {
                        rectStatus.dataset.hide = '0'
                        openBtn.dataset.hide = '1'
                        terminateBtn.dataset.hide = '0'
                        unHoldBtn.dataset.hide = '0'
                        holdBtn.dataset.hide = '1'
                        this.sethighlight('register,open,setting', true)
                    }, 2000)
                    break
                case 'failed':
                    // planePageBtn.dataset.hide = '0'
                    this.setDisplayNone('all')
                    this.timerWatch(rectT, false)
                    incomingStatus.dataset.hide = '0'
                    rectStatus.dataset.hide = '1'
                    rectStatus.style.background = call_bg[2]
                    rectS.innerText = '通话结束'
                    this.ccNumber = undefined
                    this.sethighlight('all', true)
                    global.clearTimeout(this.closeTimer)
                    this.closeTimer = global.setTimeout(() => {
                        rectStatus.dataset.hide = '0'
                        openBtn.dataset.hide = '1'
                        terminateBtn.dataset.hide = '0'
                        unHoldBtn.dataset.hide = '0'
                        holdBtn.dataset.hide = '1'
                        this.sethighlight('register,open,setting', true)
                    }, 2000)
                    break
                case 'holdPBXCall':
                    holdBtn.dataset.hide = '0'
                    unHoldBtn.dataset.hide = '1'
                    break
                case 'unholdPBXCall':
                    holdBtn.dataset.hide = '1'
                    unHoldBtn.dataset.hide = '0'
                    break
                default:
                    break
            }
        }
    }
    global.$E = new Ephone()
})(window, document)
