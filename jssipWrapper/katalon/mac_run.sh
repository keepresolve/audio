#!/bin/bash
pwd=`pwd`

/Applications/Katalon\ Studio.app/Contents/MacOS/katalon --args -noSplash  -runMode=console -projectPath="$pwd/katalon/toolbar_test/toolbar.prj" -retry=0 -testSuitePath="Test Suites/$CASE" -executionProfile="$PROFILE" -browserType="Chrome"
