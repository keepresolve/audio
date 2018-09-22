import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions

import com.kms.katalon.core.annotation.Keyword
import com.kms.katalon.core.util.KeywordUtil
import com.kms.katalon.core.webui.driver.DriverFactory

public class myKeyword {
	/**
	 * Disabled browser microphone
	 */
	@Keyword
	def disableMicrophone(String url) {
		KeywordUtil.logInfo("disable...")
		System.setProperty("webdriver.chrome.driver", DriverFactory.getChromeDriverPath())
		ChromeOptions options = new ChromeOptions()
		options.addArguments("use-fake-ui-for-media-stream")
		WebDriver driver = new ChromeDriver(options)
		driver.get(url)
		DriverFactory.changeWebDriver(driver)
		KeywordUtil.markPassed("disableMicrophone successfully")
	}
}
