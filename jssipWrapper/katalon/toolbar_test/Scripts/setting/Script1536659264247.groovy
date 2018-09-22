import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import org.junit.After as After
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

WebUI.openBrowser(GlobalVariable.env)

WebUI.delay(3)

'打开设置错误的ws'
WebUI.click(findTestObject('phonebar/setting_btn'))

'输入错误ws'
WebUI.setText(findTestObject('setting/wss_input'), 'wss://10.0.0.165:10443')

'确定'
WebUI.click(findTestObject('setting/ok_btn'))

'登陆\r\n'
WebUI.click(findTestObject('phonebar/user_btn'))

WebUI.setText(findTestObject('login/Page_Document/seatnumber-input'), account)

WebUI.setText(findTestObject('login/Page_Document/password-input'), account)

'点击登陆'
WebUI.click(findTestObject('login/Page_Document/login_btn'))

// 选择技能组
WebUI.click(findTestObject('login/Page_Document/group_select_btn'))

'确认选组'
WebUI.click(findTestObject('login/Page_Document/group_confirm_btn'))

'验证是否出现错误提示'
WebUI.verifyAlertPresent(6)

'关闭alert'
WebUI.dismissAlert()

'打开设置正确的ws'
WebUI.click(findTestObject('phonebar/setting_btn'))

'输入正确的ws'
WebUI.setText(findTestObject('setting/wss_input'), 'wss://s01.vsbc.com:9060')

'确定'
WebUI.click(findTestObject('setting/ok_btn'))

'登陆\r\n'
WebUI.click(findTestObject('phonebar/user_btn'))

WebUI.setText(findTestObject('login/Page_Document/seatnumber-input'), account)

WebUI.setText(findTestObject('login/Page_Document/password-input'), account)

'点击登陆'
WebUI.click(findTestObject('login/Page_Document/login_btn'))

// 选择技能组
WebUI.click(findTestObject('login/Page_Document/group_select_btn'))

'确认选组'
WebUI.click(findTestObject('login/Page_Document/group_confirm_btn'))

WebUI.delay(5)

'验证设置关闭按钮有效'
WebUI.click(findTestObject('phonebar/setting_btn'))

'验证设置关闭按钮有效'
WebUI.click(findTestObject('setting/close_btn'))

'设置坐席模式\t移动'
WebUI.click(findTestObject('phonebar/setting_btn'))

WebUI.click(findTestObject('setting/mobile_label'))

WebUI.click(findTestObject('setting/ok_btn'))

WebUI.delay(5)

'提示出现:当前处于移动模式'
WebUI.verifyElementText(findTestObject('call/call_status'), '当前处于移动模式')

'设置坐席模式:固定'
WebUI.click(findTestObject('phonebar/setting_btn'))

'改回固定模式并验证'
WebUI.click(findTestObject('setting/fix_label'))

WebUI.click(findTestObject('setting/ok_btn'))

WebUI.delay(5)

WebUI.verifyElementAttributeValue(findTestObject('call/call_status'), 'data-hide', '0', 3)

'左右按钮设置验证'
WebUI.click(findTestObject('phonebar/setting_btn'))

'选择功能按钮\t右'
WebUI.click(findTestObject('setting/right_label'))

WebUI.delay(1)

WebUI.click(findTestObject('setting/ok_btn'))

WebUI.delay(3)

WebUI.verifyElementAttributeValue(findTestObject('phonebar/toolbar'), 'style', 'width: 230px; float: right;', 3)

'选择功能按钮\t左'
WebUI.click(findTestObject('phonebar/setting_btn'))

WebUI.click(findTestObject('setting/left_label'))

WebUI.delay(1)

WebUI.click(findTestObject('setting/ok_btn'))

WebUI.delay(3)

WebUI.verifyElementAttributeValue(findTestObject('setting/setting_div'), 'data-hide', '0', 3)

WebUI.closeBrowser()

