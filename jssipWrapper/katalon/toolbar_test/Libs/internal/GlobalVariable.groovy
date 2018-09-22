package internal

import com.kms.katalon.core.configuration.RunConfiguration
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase

/**
 * This class is generated automatically by Katalon Studio and should not be modified or deleted.
 */
public class GlobalVariable {
     
    /**
     * <p>Profile default : &#32447;&#19978;&#30340;&#29615;&#22659;
Profile env_demo : webpack&#36215;&#30340;&#26381;&#21153;&#22120;&#22312;8888</p>
     */
    public static Object env
     
    /**
     * <p>Profile default : &#36825;&#20123;&#36134;&#21495;&#20998;&#23646;&#20004;&#20010;&#32452;
Profile env_demo : &#36825;&#20123;&#36134;&#21495;&#20998;&#23646;&#20004;&#20010;&#32452;</p>
     */
    public static Object account
     
    /**
     * <p>Profile default : &#36825;&#20123;&#36134;&#21495;&#21482;&#22312;&#22312;&#32447;&#23458;&#26381;&#32452;
Profile env_demo : &#36825;&#20123;&#36134;&#21495;&#21482;&#22312;&#22312;&#32447;&#23458;&#26381;&#32452;</p>
     */
    public static Object account2
     

    static {
        def allVariables = [:]        
        allVariables.put('default', ['env' : 'https://toolbar.emicmh.com', 'account' : ['1006', '1023', '1024', '1032', '1039', '1050', '1055'], 'account2' : ['1026', '1042', '1043', '1047', '1048', '1049', '1057']])
        allVariables.put('env_demo', allVariables['default'] + ['env' : 'http://localhost:9000', 'account' : ['1006', '1023', '1024', '1032', '1039', '1050', '1055'], 'account2' : ['1026', '1042', '1043', '1047', '1048', '1049', '1057']])
        
        String profileName = RunConfiguration.getExecutionProfile()
        
        def selectedVariables = allVariables[profileName]
        env = selectedVariables['env']
        account = selectedVariables['account']
        account2 = selectedVariables['account2']
        
    }
}
