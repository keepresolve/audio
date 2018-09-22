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
account = GlobalVariable.account2[random_num]
// 打开https://toolbar.emicmh.com/
//WebUI.openBrowser(GlobalVariable.env)
CustomKeywords.'myKeyword.disableMicrophone'(GlobalVariable.env)

WebUI.delay(3)

'没登录前是灰色的'
WebUI.verifyElementAttributeValue(findTestObject('phonebar/call_btn'), 'class', 'gray', 0)

// 点击注册按钮
WebUI.click(findTestObject('phonebar/user_btn'))

WebUI.setText(findTestObject('login/Page_Document/seatnumber-input'), account)

WebUI.setText(findTestObject('login/Page_Document/password-input'), account)

WebUI.click(findTestObject('login/Page_Document/login_btn'))

WebUI.delay(5)

// 点击拨打
WebUI.click(findTestObject('phonebar/call_btn'))

WebUI.delay(5)

WebUI.setText(findTestObject('call/number-input'), '10086')

WebUI.click(findTestObject('call/call_btn'))

//WebUI.delay(2)
//
//Robot robot = new Robot()
//robot.keyPress(KeyEvent.VK_TAB)
//robot.keyPress(KeyEvent.VK_ENTER)
WebUI.delay(10)

//assert WebUI.getText(findTestObject('call/call_span')) == '通话'
// 断言： 如果是true就执行下面的，false直接报错，并直接End Test Case
'判断是否接通'
def val1 = WebUI.getText(findTestObject('call/call_span')) == '通话中'

def val2 = WebUI.getAttribute(findTestObject('phonebar/hold_btn'), 'class') == ''

if (val1 && val2) {
    // 暂停通话
    WebUI.click(findTestObject('phonebar/hold_btn'))

    WebUI.delay(3)

    // 恢复通话
    WebUI.click(findTestObject('phonebar/unhold_btn'))

    WebUI.delay(3)

    WebUI.click(findTestObject('phonebar/hangup_btn'))
}

WebUI.delay(2)

WebUI.closeBrowser()

