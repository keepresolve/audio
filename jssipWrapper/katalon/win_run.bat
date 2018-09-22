@echo off
echo "----------------------------"
REM katalon -noSplash  -runMode=console -consoleLog -noExit -projectPath="D:\current_project\toolbar\katalon\toolbar_test\toolbar.prj" -retry=0 -testSuitePath="Test Suites/toolbar" -executionProfile="env_demo" -browserType="Chrome"
katalon -noSplash  -runMode=console -consoleLog  -projectPath="%~dp0toolbar_test\toolbar.prj" -retry=0 -testSuitePath="Test Suites/%CASE%" -executionProfile="%NODE_DEMO%" -browserType="Chrome" 
@echo OK