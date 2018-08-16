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
    var setting = `<div id="PHONE-ENTRY-SETTING" data-hide='0'  data-toggle='setting'>
                        <span data-type='close'>&times;</span>
                        <ul>
                            <li>
                                <span>坐席模式</span>
                                <span>
                                    <input type="radio" name="pattern" checked value="51" data-type="move">&nbsp;移动&nbsp;
                                    <input type="radio" name="pattern"  value="52" checked data-type="fix" >&nbsp;固定
                                </span>
                            </li>
                            <li>
                                <span>wss地址</span>
                                <span>
                                    <select>
                                        <option value="1" selected>wss://s01.vsbc.com:9060</option>
                                        <option value="2">wss://10.0.0.165:10443</option>
                                    </select> 
                                </span>
                            </li>
                            <li>
                                <span>功能按钮位置</span>
                                <span>
                                    <input type="radio"  data-type="postionButton" name="postionButton" value="left" checked>&nbsp;左&nbsp;
                                    <input type="radio"  data-type="postionButton" name="postionButton" value="right">&nbsp;右
                                </span>
                            </li>
                            <li id="confirm">
                                <span data-type='confirm'>确定</span>
                            </li>
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
                                <input type="password" data-type="password" onkeyup="this.value=this.value.replace(/\\D/g,'')" onpaste="this.value=this.value.replace(/\\D/g,'')">
                            </li>
                            <!-- <li>
                                <span>座机号</span>
                                <input type="text" data-type="password" onkeyup="this.value=this.value.replace(/\\D/g,'')" onpaste="this.value=this.value.replace(/\\D/g,'')">
                            </li> -->
                            <li id="model" style="border:none">
                                <span><input type="radio" name="callType" value='2' checked>&nbsp;VOIP</span> 
                                <span><input type="radio" name="callType" value='4'>&nbsp;SIP话机模式</span> 
                                <span data-type="loginStatus"><em></em>&nbsp;<span>示闲</span></span> 
                            </li>
                            <li id="login">
                                <span data-type='login'>登录</span>
                            </li>
                        </ul>
                    </div>`
    // 状态切换
    var statusPage = `<div id="PHONE-ENTRY-TOGGLE" data-hide='0'   data-toggle='statusPage'> 
                        <ul>
                            <li data-type="leisure"><em></em><span>空闲</span></li>
                            <li data-type="busy"><em></em><span>忙碌</span></li>
                            <li data-type="logout"><em>&#xe81c;</em><span>退出</span></li>
                        </ul>
                    </div>`
    //登陆选择所在组
    var selectGroup = `<div id="PHONE-ENTRY-SELECTGROUP" data-hide='0' data-toggle='selectGroup' >
                            <span data-type='close'>&times;</span>
                            <div data-type="introduce">请先选择工作所需的技能组:</div>
                            <ul data-type="groupList">
                                <<li>白浅白浅</li>
                                <li>野花野花</li>
                                <li class="selected">凤九凤九</li>
                                <li>东华东华</li>
                                <li>小团子小团子子子</li>
                                <li>成玉成玉</li>
                                <li>白浅白浅</li>
                                <li>野花野花</li>
                            </ul>
                            <div data-type="confirm">确认</div>
                        </div>`

    //快速呼叫面板
    var fastPage = `<div id='PHONE-ENTRY-PANEL' data-hide='0'  data-toggle='fastPage'>
                        <span data-type='close'>&times;</span>
                        <div data-type='inputgroup'>
                            <input type="text" data-type='input' placeholder="请输入电话号码" oninput='this.value=this.value.replace(/[^0-9]/g,"").replace(/ /g,"")'>
                        </div>
                        <button data-type='call'>呼叫</button>
                    </div>`

    //状态
    //呼叫状态显示状态 
    var callStatusPage = ` <div id='PHONE-LEFT-STATUS'  style='width:${parseInt(options.width)/2}px'>
                      <div data-type='pattern'>
                         <div  data-hide='0'>
                             当前处于移动模式
                          </div>
                      </div>            
                      <div data-type='rect' >
                          <div data-hide='0'>
                              <span data-type='number'>18330986136</span>
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
                                      <span data-type='number'>18330986136</span>
                                      &nbsp
                                      <span data-type='status'>来电</span>
                                  </div>   
                                  <span data-hide="1" data-type='answer'>接听</span>
                              </div>    
                      </div>
                  </div>
              `
    // 拨号面板
    var buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']
    var str = ''
    buttons.map((v, i) => {
        var marginRight = i % 3 == 0 ? 0 : 16
        str += '<span style="display:inline-block;"><input data-type="num" type="button" value="' + v + '"  style="margin-left:' + marginRight + 'px"></span>'
    })
    var planePage = `<div id="PHONE-PANEL" data-hide='0'   data-toggle='planePage'> 
              <span data-type='close'>&times;</span>
              <div><input data-type='input' id='PANEL-INPUT' type='text' placeholder="请输入拨打的号码" oninput='this.value=this.value.replace(/[^0-9]/g,"")'></div>
              <div>
              ${str}
              </div>
              <div data-type='call' data-hide='0'>拨号</div>
          </div>`

    //消息面板
    var messagPage = ` <div id="PHONE-ENTRY-MESSAGE" data-hide='0'   data-toggle='messagPage'>
                  <span><h6>测试message</h1></span>
                  <div data-content></div>
                  <div>
                      <span>sip:</span>
                      <input data-type='callId' placeholder='1009' type="text">_00013093..
                      <br>
                      <span>消息</span>
                      <input data-type='text' type="text">
                      <button data-type='send'>发送</button>
                  </div>
             </div>`

    //转接
    var switchPage = `  <div id="PHONE-ENTRY-SWITCH" data-hide='0' data-toggle='switchPage'>
                            <span data-type="error"></span>
                            <div id="SWITCH_PlATE">
                                <span data-type="close">&times;</span>
                                <div id="GROUP">
                                    <div data-type="select">
                                    <div data-type="select_text">全部技能组</div>
                                    <div data-type="select_icon">
                                        <div class="arrow arrow-down"></div>
                                    </div>
                                    </div>
                                    <ul data-type="group" data-hide="0">
                                    <!-- <li data-eid='65656' data-id='580' data-level='1' data-name='翟岗岗技能组' data-oid='1' data-pid='0'>全部技能组</li>
                                    <li>售前技能组</li>
                                    <li>售后技能组</li>
                                    <li>技术支持</li> -->
                                    </ul>
                                    <div data-type="filter"><input type="checkbox" data-type="checkbox" style='vertical-align: middle;'>&nbsp;仅查可转接坐席</div>
                                </div>
                                <ul data-type="kefuList">
                                    <!-- <li class="busy">白浅
                                        <span></span>
                                    </li>
                                    <li>野花
                                        <span></span>
                                    </li>
                                    <li>凤九
                                        <span></span>
                                    </li>
                                    <li>东华
                                        <span></span>
                                    </li>
                                    <li>小团子
                                        <span></span>
                                    </li>
                                    <li>成玉
                                        <span></span>
                                    </li> -->
                                </ul>
                                <div data-type="transfer" data-disabled='1'>确认转接</div>
                            </div>
                        </div>`
    //三方通话
    var threeSession = `<div id="PHONE-TRILATERA-SESSION" data-hide='0' data-toggle='threeSession'>
              <p data-type="status">等待被叫接听...</p>
              <p>
                <span data-type="number">02567893755</span>
                <span data-type="img">&#xe76b;</span> 
                <!-- <span data-type="cancel">取消</span> -->
                <!-- <span data-type="redial">重新拨号</span> -->
                <span data-type="hangup">挂断</span>
              </p>
              <p>
                <span data-type="number">02567893755</span>
                <!-- <span data-type="img">&#xe76b;</span> -->
                <span data-type="cancel">取消</span>
                <span data-type="redial">重新拨号</span>
                <!-- <span data-type="hangup">挂断</span> -->
              </p>
            </div>`

    //工具条按钮
    var controlPage = `<ul class="s-tips" id='EphoneBar'>
            
                <li class="zhuce" id="zhuce"  data-phone-key="0" data-phone-type="register">
                    <!-- &#xe600; &#xe633;-->
                    <em title="注册">&#xe63f;</em>
                    <span data-type="toggle" data-hide="0"></span>
                    <div  data-arrow='register' class="arrow arrow-up" data-hide='0'></div>
                    <!--状态切换-->
                    ${statusPage}
                </li>

                <!--<li class="logout" id="logout"  data-phone-key="0" data-phone-type="logout" data-hide='0'>
                    <em title="退出">&#xe7c9;</em>
                </li>
                <li class="gray shimang" id="shimang" data-phone-key="3"  data-phone-type='busy' data-hide='1'>
                    <em title="示闲">&#xe6a5;</em>
                </li>
                <li class="shixian" id="shixian" data-phone-key="3"  data-phone-type='leisure' data-hide='0'>
                    <em title="示忙">&#xe6a6;</em>
                </li> -->

                <li class="gray hujiao" id="hujiao" data-phone-key="1" data-phone-type='open'>
                    <em title="呼叫">&#xe625;</em>
                    <div  data-arrow='open' class="arrow arrow-up"  data-hide='0'></div>
                </li>

                <li class="gray guanduan" id="guanduan"  data-phone-key="1" data-phone-type='terminate' data-hide='0'>
                    <em title="挂断" style='color:red'>&#xe637;</em>
                </li> 
                <li class="gray zhuanjie" id="zhuanjie" data-phone-key="2" data-phone-type="switch">
                    <em title="转接">&#xe603;</em>
                    <div  data-arrow='switch' class="arrow arrow-up"  data-hide='0'></div>
                </li>

                <!--<li class="gray sanfang" id="sanfang" data-phone-type='three'>
                    <em></em>
                    <span>三方通话</span>
                    <div  data-arrow='three' class="arrow arrow-up"  data-hide='0'></div>
                </li> -->

                <li class="gray baochi" id="baochi"  data-phone-key="1"  data-phone-type='hold' data-hide='1'>
                    <em title="保持">&#xe61c;</em>
                </li>
                <li class="jietong" id="jietong"  data-phone-key="1"  data-phone-type='unhold' data-hide='0'>
                    <em title="接通">&#xe605;</em>
                </li> 

                <li class="jietong gray" id="jietong"  data-phone-key="4"  data-phone-type='setting' data-hide='1'>
                    <em title="设置">&#xe610;</em>
                    <div  data-arrow='setting' class="arrow arrow-up"  data-hide='0'></div>
                </li>
          </ul>`


    var HTML = `<div id="PHONE-ENTRY-CONTAINER" style="width:${options.width};height:${options.height};">
                    <div  style="background:${options.background};"width:${options.width};height:${options.height};">                 
                        <audio autoplay id='peeraideo'></audio>
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
                        ${planePage}
                        <!--转接-->              
                        ${switchPage}
                        <!--设置-->
                        ${setting}
                        <!--三方通话-->
                        ${threeSession}                                                                      
                </div>`
    return HTML
}