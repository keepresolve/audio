import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import internal.GlobalVariable as GlobalVariable
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import java.util.Random

Random rand = new Random()
random_num = rand.nextInt(7)
account = GlobalVariable.account[random_num]

// 打开https://toolbar.emicmh.com/
//WebUI.openBrowser(GlobalVariable.env)
CustomKeywords.'myKeyword.disableMicrophone'(GlobalVariable.env)

// 点击注册按钮
WebUI.click(findTestObject('phonebar/user_btn'))

// 置空总机号	
WebUI.setText(findTestObject('login/Page_Document/switchnumber-input'), '')

// 点击登录按钮	显示错误信息  "请输入总机号码" 
WebUI.click(findTestObject('login/Page_Document/login_btn'))

//WebUI.verifyElementText(findTestObject('login/Page_Document/error_msg'), '')
WebUI.delay(3)

WebUI.setText(findTestObject('login/Page_Document/switchnumber-input'), '02566699734')

// 点击登录按钮	显示错误信息  "请输入分机号码"
WebUI.click(findTestObject('login/Page_Document/login_btn'))

//WebUI.verifyElementText(findTestObject('login/Page_Document/error_msg'), '')
WebUI.delay(3)

WebUI.setText(findTestObject('login/Page_Document/seatnumber-input'), account)

// 点击登录按钮	显示错误信息  "请输入密码"
WebUI.click(findTestObject('login/Page_Document/login_btn'))

//WebUI.verifyElementText(findTestObject('login/Page_Document/error_msg'), '')
WebUI.delay(3)

WebUI.setText(findTestObject('login/Page_Document/password-input'), '1056')

// 点击登录按钮	显示错误信息  "分机号码或密码错误，请重新输入"
WebUI.click(findTestObject('login/Page_Document/login_btn'))

//WebUI.verifyElementText(findTestObject('login/Page_Document/error_msg'), '')
WebUI.delay(3)

WebUI.setText(findTestObject('login/Page_Document/password-input'), account)

WebUI.click(findTestObject('login/Page_Document/login_btn'))

WebUI.delay(5)

// 选择技能组
WebUI.click(findTestObject('login/Page_Document/group_select_btn'))

WebUI.delay(3)

WebUI.click(findTestObject('login/Page_Document/group_confirm_btn'))

WebUI.delay(3)

tip = '分机号:'+ account +'\n所在组:客服组测试'
WebUI.verifyElementAttributeValue(findTestObject('phonebar/logged_in_tip'), 'title', tip, 30)

// 登录成功	点击注册按钮	显示状态改变按钮
WebUI.click(findTestObject('phonebar/user_btn'))

WebUI.delay(3)

// 点击成功	成功退出
WebUI.click(findTestObject('loggedin/logout_btn'))

WebUI.delay(3)

WebUI.click(findTestObject('phonebar/user_btn'))

WebUI.click(findTestObject('login/Page_Document/radio_SIP'))

// 选择sip话机模式	点击登录	显示错误信息"请输入话机号码"
WebUI.click(findTestObject('login/Page_Document/login_btn'))

WebUI.delay(3)

// 选择回拨话机
WebUI.click(findTestObject('login/Page_Document/radio_CallBack'))

// 点击登录	显示错误信息"请输入话机号码"
WebUI.click(findTestObject('login/Page_Document/login_btn'))

WebUI.delay(3)

// 点击右上角close按钮
WebUI.click(findTestObject('login/Page_Document/close_btn'))

WebUI.click(findTestObject('phonebar/user_btn'))

WebUI.delay(3)

// 切换状态	示闲切换到示忙
WebUI.click(findTestObject('login/Page_Document/loginStatus_btn'))

WebUI.delay(3)

WebUI.verifyElementText(findTestObject('login/Page_Document/loginStatus_text'), '示忙')

WebUI.verifyElementAttributeValue(findTestObject('login/Page_Document/loginStatus_color'), 'class', 'busy', 30)

WebUI.click(findTestObject('login/Page_Document/radio_VOIP'))

WebUI.click(findTestObject('login/Page_Document/login_btn'))

WebUI.delay(3)

// 选择技能组页面	点击确认按钮
WebUI.click(findTestObject('login/Page_Document/group_confirm_btn'))

// 点击客服组测试按钮
WebUI.click(findTestObject('login/Page_Document/group_select_btn'))

WebUI.delay(3)

// 点击右上角close按钮
WebUI.click(findTestObject('login/Page_Document/login_group_close'))

WebUI.click(findTestObject('login/Page_Document/login_btn'))

WebUI.delay(3)

WebUI.click(findTestObject('login/Page_Document/group_select_btn'))

WebUI.click(findTestObject('login/Page_Document/group_confirm_btn'))

WebUI.delay(3)

// 设置状态
WebUI.click(findTestObject('phonebar/user_btn'))

WebUI.delay(2)

// 点击忙碌按钮
WebUI.click(findTestObject('loggedin/busy_btn'))

WebUI.delay(3)

// 判断状态正确	切成忙碌
WebUI.verifyElementAttributeValue(findTestObject('phonebar/logged_in_color'), 'style', 'background: rgb(254, 211, 0);', 
    30)

WebUI.click(findTestObject('phonebar/user_btn'))

WebUI.click(findTestObject('loggedin/active_btn'))

WebUI.delay(3)

// 判断状态正确	切成忙碌
WebUI.verifyElementAttributeValue(findTestObject('phonebar/logged_in_color'), 'style', 'background: rgb(75, 217, 102);', 
    30)

// 拨打电话
WebUI.click(findTestObject('phonebar/call_btn'))

WebUI.setText(findTestObject('call/number-input'), '10010')

WebUI.delay(2)

WebUI.click(findTestObject('call/call_btn'))

WebUI.delay(10)

// 点击挂断
WebUI.click(findTestObject('phonebar/hangup_btn'))

WebUI.click(findTestObject('phonebar/call_btn'))

WebUI.setText(findTestObject('call/number-input'), '10086')

WebUI.click(findTestObject('call/call_btn'))

WebUI.delay(10)

// 怎么判断暂停、恢复通话
// 暂停通话
WebUI.click(findTestObject('phonebar/hold_btn'))

WebUI.delay(3)

// 恢复通话
WebUI.click(findTestObject('phonebar/unhold_btn'))

WebUI.delay(3)

//话后状态设置
//WebUI.click(findTestObject('loggedin/busy_btn'))
WebUI.click(findTestObject('phonebar/hangup_btn'))

WebUI.delay(3)

// 点击设置
WebUI.click(findTestObject('phonebar/setting_btn'))

// 设置坐席模式	移动
WebUI.click(findTestObject('setting/mobile_label'))

WebUI.click(findTestObject('setting/ok_btn'))

// 提示出现	"当前处于移动模式"
WebUI.click(findTestObject('phonebar/setting_btn'))

WebUI.delay(5)

WebUI.verifyElementText(findTestObject('call/call_status'), '当前处于移动模式')

// 设置坐席模式	固定
WebUI.click(findTestObject('setting/fix_label'))

WebUI.click(findTestObject('setting/ok_btn'))

WebUI.click(findTestObject('phonebar/setting_btn'))

// 选择功能按钮	右
WebUI.click(findTestObject('setting/right_label'))

WebUI.click(findTestObject('setting/ok_btn'))

WebUI.delay(3)

WebUI.verifyElementAttributeValue(findTestObject('phonebar/toolbar'), 'style', 'width: 230px; float: right;', 30)

// 选择功能按钮	左
WebUI.click(findTestObject('phonebar/setting_btn'))

WebUI.click(findTestObject('setting/left_label'))

WebUI.click(findTestObject('setting/ok_btn'))

WebUI.click(findTestObject('phonebar/setting_btn'))

WebUI.click(findTestObject('setting/close_btn'))

WebUI.delay(3)

WebUI.verifyElementAttributeValue(findTestObject('setting/setting_div'), 'data-hide', '0', 30)

WebUI.click(findTestObject('phonebar/user_btn'))

WebUI.click(findTestObject('loggedin/logout_btn'))

WebUI.closeBrowser()

