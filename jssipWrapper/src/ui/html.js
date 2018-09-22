export default function creatHTML(options) {
    /**
     * PHONE-ENTRY-LOGIN 注册页面
     * PHONE-ENTRY-SETTING 配置页面
     * PHONE-ENTRY-MASK 遮罩
     * PHONE-IFRAME 嵌入工具条
     * PHONE-ENTRY-PANEL 快速呼叫
     * PHONE-ENTRY-SWITCH 转接
     * PHONE-ENTRY-MESSAGE 发送消息
     * PHONE-LEFT-STATUS 左侧状态
     * PHONE-ENTRY-TOGGLE 状态切换
     */
    var config = {
        EphoneBar_width: 230,
        callStatusPage_width: parseInt(options.width) - 230
    }
    const { version } = require('../../package.json')
    var setting = `<div id="PHONE-ENTRY-SETTING" data-hide='0'  data-toggle='setting'>
                        <span data-type='close' title=${version}>&times;</span>
                        <span data-type='error'></span>
                        <ul>
                            <li>
                                <span>坐席模式</span>
                                <span>
                                <label><input type="radio" name="pattern" checked value="51"  >&nbsp;移动&nbsp; </label>
                                <label><input type="radio" name="pattern"  value="52" checked >&nbsp;固定 </label>
                                </span>
                            </li>
                           <!-- <li>
                                <span>wss地址</span>
                                <span>
                                    <select>
                                        <option value="1" selected>wss://s01.vsbc.com:9060</option>
                                        <option value="2">wss://10.0.0.165:10443</option>
                                    </select> 
                                </span>
                            </li> -->
                            <li>
                                <span>wss地址</span>
                                <span>
                                    <input data-type='wsUrl' value='wss://s01.vsbc.com:9060' type='text'  list="wsUrl"  placeholder='请输入有效的wss地址'>
                                    <datalist id="wsUrl">
                                        <option value="wss://s01.vsbc.com:9060">
                                        <option value="wss://10.0.0.165:10443">
                                    </datalist>
                                </span>
                            </li>
                            <li>
                                <span>功能按钮位置</span>
                                <span>
                                <label><input type="radio"   name="postionButton" value="left" checked>&nbsp;左&nbsp; </label>
                                <label><input type="radio"   name="postionButton" value="right">&nbsp;右 </label>
                                </span>
                            </li>
                            <button data-type='confirm'>确定</button>
                        </ul>
                    </div>`
    //注册登陆
    var loginPage = ` <div id="PHONE-ENTRY-LOGIN" data-hide='0'  data-toggle='loginPage'>
                        <span data-type='close'>&times;</span>
                        <span data-type='error'></span>
                        <ul>
                            <li>
                                <span>总机号</span>
                                <input type="text" data-type="switchnumber" value="02566699734" onkeyup="this.value=this.value.replace(/\\D/g,'')" onpaste="this.value=this.value.replace(/\\D/g,'')">
                            </li>
                            <li>
                                <span>分机号</span>
                                <input type="text" data-type='seatnumber' onkeyup="this.value=this.value.replace(/\\D/g,'')" onpaste="this.value=this.value.replace(/\\D/g,'')">
                            </li>
                            <li>
                                <span>密　码</span>
                                <input type="password" data-type="password">
                            </li>
                            <li  data-hide='0' data-type='model'>  
                                <span data-type='4' data-hide='0' >回拨话机号</span>
                                <span data-type='5' data-hide='0' >sip话机号</span>
                                <input type="text" data-type="modelnumber" onpaste="this.value=this.value.replace(/\\D/g,'')">
                            </li>
                            <li  style="border:none">
                                <label><span><input type="radio" name="callintype" value='2' checked>&nbsp;VOIP</span></label>
                                <label><span><input type="radio" name="callintype" value='5'>&nbsp;SIP话机</span></label>
                                <label><span><input type="radio" name="callintype" value='4'>&nbsp;回拨话机</span></label>
                                <span data-type="loginStatus"><em></em>&nbsp;<span>示闲</span></span> 
                            </li>
                            <button data-type='login' data-disabled='1'>登录</button>
                        </ul>
                    </div>`
    // 状态切换
    var statusPage = `<div id="PHONE-ENTRY-TOGGLE" data-hide='0'   data-toggle='statusPage'> 
                        <ul>
                            <li data-type="leisure" data-hide='1'    data-disabled='false'><em></em><span>空闲</span></li>
                            <li data-type="busy"    data-hide='1'    data-disabled='false' data-status='2'><em></em><span>忙碌</span></li>
                            <li data-type="logout"  data-hide='1'    data-disabled='false'><span><em>&#xe81c;</em></span><span>退出</span></li>
                        </ul>
                    </div>`
    //登陆选择所在组
    var selectGroup = `<div id="PHONE-ENTRY-SELECTGROUP" data-hide='0' data-toggle='selectGroup' >
                            <span data-type='close'>&times;</span>
                            <div data-type="introduce">请先选择工作所需的技能组:</div>
                            <ul data-type="groupList" class="option_style">
                            </ul>
                            <button data-type="confirm" data-disabled='true' >确认</button>
                        </div>`

    //快速呼叫面板
    var fastPage = `<div id='PHONE-ENTRY-PANEL' data-hide='0'  data-toggle='fastPage'>
                        <span data-type='close'>&times;</span>
                        <div>
                            <input type="text" data-type='input' placeholder="请输入电话号码" oninput='this.value=this.value.replace(/[^0-9]/g,"").replace(/ /g,"")'>
                            <button data-type='call'>呼叫</button>
                        </div> 
                    </div>`

    //状态
    //呼叫状态显示状态
    var callStatusPage = ` <div id='PHONE-LEFT-STATUS'  style='width:${
        config.callStatusPage_width
    }px'>
                                <div data-type='pattern'>
                                    <div  data-hide='0'>
                                        当前处于移动模式
                                    </div>
                                </div>            
                                <div data-type='rect' >
                                    <div data-hide='0'>
                                        <span data-type='number'></span>
                                        &nbsp;|&nbsp;
                                        <span data-type='status'>呼叫中</span>
                                        <span data-type='times'>00:00:00</span>
                                    </div>
                                </div>
                                <div data-type='planePage'>
                                    <div data-hide='0'>
                                        &#xe627;
                                    </div> 
                                </div> 
                                <div  data-type='incomingStatus'>
                                        <div data-hide='0'>
                                            <div data-type='bg'>
                                                <span data-type='number'></span>
                                                &nbsp
                                                <span data-type='status'>来电</span>
                                            </div>   
                                            <button data-hide="1"  data-disable='1' data-type='answer'>接听</button> 
                                        </div>  
                                </div>
                            </div>
                        `
    // 拨号面板
    // var buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']
    // var str = ''
    // buttons.map((v, i) => {
    //     var marginRight = i % 3 == 0 ? 0 : 16
    //     str += '<span style="display:inline-block;"><input data-type="num" type="button" value="' + v + '"  style="margin-left:' + marginRight + 'px"></span>'
    // })
    // var planePage = `<div id="PHONE-PANEL" data-hide='0'   data-toggle='planePage'>
    //           <span data-type='close'>&times;</span>
    //           <div><input data-type='input' id='PANEL-INPUT' type='text' placeholder="请输入拨打的号码" oninput='this.value=this.value.replace(/[^0-9]/g,"")'></div>
    //           <div>
    //           ${str}
    //           </div>
    //           <div data-type='call' data-hide='0'>拨号</div>
    //       </div>`
    //转接
    var switchPage = `  <div id="PHONE-ENTRY-SWITCH" data-hide='0' data-toggle='switchPage'>
                            <span data-type="error"></span>
                            <span data-type="close">&times;</span>
                            <div>
                                <div data-type='selectGroup'>
                                    <div data-type="select">
                                    <div data-type="select_text">全部技能组</div>
                                    <div data-type="select_icon">
                                        <div class="arrow-down"></div>
                                    </div>
                                </div>
                                <ul data-type="group" data-hide="0">
                                    
                                </ul>
                                <div data-type="filter"><input type="checkbox"  data-type="checkbox" style='vertical-align: middle;'>&nbsp;仅查可转接坐席</div>
                            </div>
                            <ul data-type="kefuList"  class="option_style">
                            </ul>
                            <button data-type="transfer" data-disabled='1'>确认转接</button>
                        </div>
                        </div>`
    //三方通话
    // var threeSession = `<div id="PHONE-TRILATERA-SESSION" data-hide='0' data-toggle='threeSession'>
    //           <p data-type="status">等待被叫接听...</p>
    //           <p>
    //             <span data-type="number">02567893755</span>
    //             <span data-type="img">&#xe76b;</span>
    //             <!-- <span data-type="cancel">取消</span> -->
    //             <!-- <span data-type="redial">重新拨号</span> -->
    //             <span data-type="hangup">挂断</span>
    //           </p>
    //           <p>
    //             <span data-type="number">02567893755</span>
    //             <!-- <span data-type="img">&#xe76b;</span> -->
    //             <span data-type="cancel">取消</span>
    //             <span data-type="redial">重新拨号</span>
    //             <!-- <span data-type="hangup">挂断</span> -->
    //           </p>
    //         </div>`

    //工具条按钮
    var controlPage = `<ul  id='EphoneBar' style='width:${
        config.EphoneBar_width
    }px'>
            
                    <li  data-phone-key="0" data-phone-type="register"  title="注册">
                        <!-- &#xe600; &#xe633;-->
                        <em>&#xe63f;</em>
                        <span data-type="toggle" data-hide="0"></span>
                        <div  data-arrow='register' class="arrow-up" data-hide='0'></div>
                        <!--状态切换-->
                        ${statusPage}
                    </li>

                    <!--<li   data-phone-key="0" data-phone-type="logout" data-hide='0' title="退出">
                        <em>&#xe7c9;</em>
                    </li>
                    <li class="gray"  data-phone-key="3"  data-phone-type='busy' data-hide='1'  title="示闲">
                        <em>&#xe6a5;</em>
                    </li>
                    <li class="" data-phone-key="3"  data-phone-type='leisure' data-hide='0' title="示忙">
                        <em>&#xe6a6;</em>
                    </li> -->

                    <li class="gray"  data-phone-key="1" data-phone-type='open' data-hide='1' title="呼叫">
                        <em >&#xe625;</em>
                        <div  data-arrow='open' class="arrow-up"  data-hide='0'></div>
                    </li>

                    <li class="gray"  data-phone-key="1" data-phone-type='terminate' data-hide='0' style='color:red' title="挂断">
                        <em >&#xe845;</em>
                    </li> 
                    <li class="gray" data-phone-key="2" data-phone-type="switch" title="转接">
                        <em >&#xe603;</em>
                        <div  data-arrow='switch' class="arrow-up"  data-hide='0'></div>
                    </li>

                    <!--<li class="gray"  data-phone-type='three'>
                        <em></em>
                        <span>三方通话</span>
                        <div  data-arrow='three' class="arrow-up"  data-hide='0'></div>
                    </li> -->

                    <li class="gray"  data-phone-key="1"  data-phone-type='hold' data-hide='1' title="暂停通话">
                        <em >&#xe61c;</em>
                    </li>
                    <li class=""  data-phone-key="1"  data-phone-type='unhold' data-hide='0' title="恢复通话">
                        <em >&#xe846;</em>
                    </li> 

                    <li  data-phone-key="4"  data-phone-type='setting' data-hide='1' title="设置">
                        <em >&#xe610;</em>
                        <div  data-arrow='setting' class="arrow-up"  data-hide='0'></div>
                    </li>
            </ul>`

    var HTML = `<div id="PHONE-ENTRY-CONTAINER" style="width:${
        options.width
    };height:${options.height};">
                    <div  style="background:${options.background};"width:${
        options.width
    };height:${options.height};">                 
                        <audio autoplay id='peeraudio'></audio>
                        <!--控制面板-->
                        ${controlPage}
                        <!--通话状态-->
                        ${callStatusPage}
                    </div> 
                        <!--登陆-->
                        ${loginPage}
                        <!--登陆选组-->
                        ${selectGroup}
                        <!--拨号面板-->
                        ${fastPage}
                        <!--转接-->              
                        ${switchPage}
                        <!--设置-->
                        ${setting}
                        <!--三方通话-->                                                                   
                </div>`
    return HTML
}
