
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
     */

    //工具条按钮
    var controlPage = `<ul class="s-tips" id='EphoneBar'>
            
                <li class="zhuce" id="zhuce"  data-phone-key="0" data-phone-type="register">
                  <em title="注册">&#xe600;</em>
                </li>
                <li class="logout" id="logout"  data-phone-key="0" data-phone-type="logout" data-hide='0'>
                  <em title="退出">&#xe633;</em>
                </li>
                <li class="gray shimang" id="shimang" data-phone-key="3"  data-phone-type='busy' data-hide='1'>
                  <em title="示闲">&#xe6a5;</em>
                </li>
                <li class="shixian" id="shixian" data-phone-key="3"  data-phone-type='leisure' data-hide='0'>
                  <em title="示忙">&#xe6a6;</em>
                </li>
                <li class="gray hujiao" id="hujiao" data-phone-key="1" data-phone-type='open'>
                  <em title="呼叫">&#xe680;</em>
                </li>
                <li class="gray zhuanjie" id="zhuanjie" data-phone-key="2" data-phone-type="switch">
                  <em title="转接">&#xe638;</em>
                </li>
                <!--<li class="gray sanfang" id="sanfang">
                  <em></em>
                  <span>三方通话</span>
                </li> -->
                <li class="gray guanduan" id="guanduan"  data-phone-key="1" data-phone-type='terminate'>
                  <em title="挂断">&#xe645;</em>
                </li> 
                <li class="gray baochi" id="baochi"  data-phone-key="1"  data-phone-type='hold' data-hide='1'>
                  <em title="保持">&#xe61c;</em>
                </li>
                <li class="jietong" id="jietong"  data-phone-key="1"  data-phone-type='unhold' data-hide='0'>
                  <em title="接通">&#xe62f;</em>
                </li> 
          </ul>`

    //注册登陆
    var loginPage = ` <div id="PHONE-ENTRY-LOGIN" data-hide='0' data-type='mode'>
              <div class="arrow arrow-up"></div>
              <span data-type='close'>&times;</span>
              <ul>
                  <li id="title">
                      <span data-type='title'>用户号码登录</span>
                      <span data-type='error'></span>
                      <span data-type='setting'>设置</span>
                  </li>
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
                  <li id="model">
                      <span><input type="checkbox">&nbsp;VOIP</span> 
                      <span><input type="checkbox">&nbsp;SIP话机模式</span> 
                      <span data-type="loginStatus"><em></em>&nbsp;<span>示闲</span></span> 
                  </li>
                  <li id="login">
                      <span data-type='login'>登录</span>
                  </li>
              </ul>
          </div>
          <div id="PHONE-ENTRY-SELECTGROUP" data-hide='0' data-type='mode'>
              <div class="arrow arrow-up"></div>
              <div data-type="introduce">由于处于不同技能组，请先选择工作所需的技能组:</div>
              <ul data-type="groupList">
                  <!-- <li>白浅白浅</li>
                  <li>野花野花</li>
                  <li class="selected">凤九凤九</li>
                  <li>东华东华</li>
                  <li>小团子小团子子子</li>
                  <li>成玉成玉</li>
                  <li>白浅白浅</li>
                  <li>野花野花</li> -->
              </ul>
              <div data-type="confirm">确认</div>
          </div>
          <div id="PHONE-ENTRY-SETTING" data-hide='0' data-type='mode'>
              <ul>
                  <li>
                      <span>registrar server</span>
                      <input type="text" data-type="registerServer">
                  </li>
                  <li>
                      <span>Websocket URL</span>
                      <input type="text" data-type="websocketUrl">
                  </li>
                  <li>
                      <span>Contact URL</span>
                      <input type="text" data-type="input[data-type='']" disabled>
                  </li>
                  <li id="CONFIRM">
                      <span data-type='cancel'>取消</span>
                      <span data-type='confirm'>确认</span>
                  </li>
              </ul>
      </div>`

    //快速呼叫面板
    var fastPage = `<div id='PHONE-ENTRY-PANEL' data-hide='0' data-type='mode'>
              <div class="arrow arrow-up"></div>
              <span data-type='close'>&times;</span>
              <div>
                  <input type="text" data-type='input' placeholder="请输入电话号码" oninput='this.value=this.value.replace(/[^0-9]/g,"").replace(/ /g,"")'>
              </div>
              <button data-type='call'>呼叫</button>
          </div>`

    //状态
    //呼叫状态显示状态 
    var callStatusPage = ` <div id='PHONE-LEFT-STATUS'>
                      <div data-type='circle'>
                         <div  data-hide='0'>
                              <span data-type='bg'></span>
                              <span data-type='status'>空闲</span>
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
    var planePage = `<div id="PHONE-PANEL" data-hide='0' data-type='mode'> 
              <div class="arrow arrow-up"></div>
              <span data-type='close'>&times;</span>
              <div><input data-type='input' id='PANEL-INPUT' type='text' placeholder="请输入拨打的号码" oninput='this.value=this.value.replace(/[^0-9]/g,"")'></div>
              <div>
              ${str}
              </div>
              <div data-type='call' data-hide='0'>拨号</div>
          </div>`

    //消息面板
    var messagPage = ` <div id="PHONE-ENTRY-MESSAGE" data-hide='0' data-type='mode'>
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
    var switchPage = `  <div id="PHONE-ENTRY-SWITCH" data-hide='0' data-type='mode'>
          <div class="arrow arrow-up"></div>
          <div id="SWITCH_PlATE">
              <span id="CLOSE">&times;</span>
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
                <div data-type="filter"><input type="checkbox" data-type="checkbox">&nbsp;仅查可转接坐席</div>
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
              <div data-type="transfer">确认转接</div>
          </div>
      </div>`
    //三方通话
    var threeSession = `<div id="PHONE-TRILATERA-SESSION" data-hide='0' data-type='mode'>
              <div class="arrow arrow-up"></div>
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

    var HTML = `<div id="PHONE-ENTRY-CONTAINER" style="width:${options.width};height:${options.height};">
                                <div class="head"  style="background:${options.background}">
                                <!--呼叫系统start-->
                                <!--<div class="rightTipsStatus">
                                  <div class="box">
                                    <h4>状态：
                                      <a id="callStatus">未连接</a>
                                    </h4>
                                    <h4 class="t2">排队：
                                      <a id="queueInfo">0人</a>
                                    </h4>
                                  </div>
                                </div>-->
                                <audio autoplay id='peeraideo'></audio>
                                ${controlPage}
                                <!--左状态-->
                                ${callStatusPage}
                              </div>
                              <!--遮罩-->
                              <div id="PHONE-ENTRY-MASK" data-mask-hide='0'></div>
                              <!--登陆-->
                              ${loginPage}
                              <!--拨号面板-->
                              ${fastPage}
                              <!--消息面板-->        
                              ${messagPage}
                              <!--转接-->              
                              ${switchPage}
                              <!--三方通话-->
                              ${threeSession}
                              <!--拨号面板-->
                              ${planePage}
                          </div>`
    return HTML
}