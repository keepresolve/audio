import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import internal.GlobalVariable as GlobalVariable
import java.util.Random

Random rand = new Random()
random_num = rand.nextInt(7)
account = GlobalVariable.account[random_num]
// 打开https://toolbar.emicmh.com/
WebUI.openBrowser(GlobalVariable.env)

// 点击注册按钮
'点开登录菜单'
WebUI.click(findTestObject('phonebar/user_btn'))

// 置空总机号	
WebUI.setText(findTestObject('login/Page_Document/switchnumber-input'), '')

// 点击登录按钮	显示错误信息  "请输入总机号码" 
WebUI.click(findTestObject('login/Page_Document/login_btn'))

WebUI.setText(findTestObject('login/Page_Document/switchnumber-input'), '02566699734')

// 点击登录按钮	显示错误信息  "请输入分机号码"
WebUI.click(findTestObject('login/Page_Document/login_btn'))

WebUI.setText(findTestObject('login/Page_Document/seatnumber-input'), account)

// 点击登录按钮	显示错误信息  "请输入密码"
WebUI.click(findTestObject('login/Page_Document/login_btn'))

WebUI.setText(findTestObject('login/Page_Document/password-input'), '1056')

// 点击登录按钮	显示错误信息  "分机号码或密码错误，请重新输入"
WebUI.click(findTestObject('login/Page_Document/login_btn'))

WebUI.setText(findTestObject('login/Page_Document/password-input'), account)

'选择回拨话机和SIP话机登录方式'
WebUI.click(findTestObject('login/Page_Document/radio_CallBack'))

// 点击登录按钮	显示错误信息"请重新输入分机号"
WebUI.click(findTestObject('login/Page_Document/login_btn'))

// 选择SIP话机
WebUI.click(findTestObject('login/Page_Document/radio_SIP'))

// 点击登录	显示错误信息"请输入话机号码"
WebUI.click(findTestObject('login/Page_Document/login_btn'))

// 选择VOIP
WebUI.click(findTestObject('login/Page_Document/radio_VOIP'))

WebUI.click(findTestObject('login/Page_Document/login_btn'))

// 选择技能组
WebUI.click(findTestObject('login/Page_Document/group_select_btn'))
WebUI.click(findTestObject('login/Page_Document/group_confirm_btn'))
WebUI.delay(2)

'起作用！直接捕获元素，所以不需要移动鼠标。'
tip = '分机号:'+ account +'\n所在组:客服组测试'
WebUI.verifyElementAttributeValue(findTestObject('phonebar/logged_in_tip'), 'title', tip, 30)

'空闲颜色: 绿色'
WebUI.verifyElementAttributeValue(findTestObject('phonebar/logged_in_color'), 'style', 'background: rgb(75, 217, 102);', 
    2)

WebUI.click(findTestObject('phonebar/user_btn'))

'登录、登出完整一次'
WebUI.click(findTestObject('loggedin/logout_btn'))

'再次验证登录'
WebUI.click(findTestObject('phonebar/user_btn'))

// 点击右上角close按钮
'验证关闭登录菜单按钮有效'
WebUI.click(findTestObject('login/Page_Document/close_btn'))

WebUI.click(findTestObject('phonebar/user_btn'))

// 切换状态	示闲切换到示忙
WebUI.click(findTestObject('login/Page_Document/loginStatus_btn'))

WebUI.verifyElementText(findTestObject('login/Page_Document/loginStatus_text'), '示忙')

'选择登录初始状态为忙碌'
WebUI.verifyElementAttributeValue(findTestObject('login/Page_Document/loginStatus_color'), 'class', 'busy', 1)

WebUI.click(findTestObject('login/Page_Document/login_btn'))

// 点击客服组测试按钮
WebUI.click(findTestObject('login/Page_Document/group_select_btn'))

WebUI.delay(1)

// 选择技能组页面	点击确认按钮
WebUI.click(findTestObject('login/Page_Document/group_confirm_btn'))

'准备验证忙碌状态'
WebUI.delay(2)

WebUI.verifyElementAttributeValue(findTestObject('phonebar/logged_in_color'), 'style', 'background: rgb(254, 211, 0);', 
    2)

// 要验证此时为忙碌
WebUI.closeBrowser()

