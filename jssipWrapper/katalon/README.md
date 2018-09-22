### 关于 CI

目前做 CI 的主要考量是学习成本和实现功能间的平衡。我们不需要 nightly build, 只需要在有“重大”改动时候触发自动化测试。如果搭建 CI 服务器投入精力、成本远大于自己手动跑个脚本，就不值得，尤其我们 CI 服务器需要做 UI 操作，并不合适在 Linux 上搭建，需要在 mac 或 Windows 机器上搭建。

Katalon 提供和 [Jenkins](https://www.katalon.com/resources-center/tutorials/jenkins-ci-integration/) , [GitLab](https://www.katalon.com/resources-center/tutorials/continuous-integration-gitlab/) 考虑到学习成本，我们考察了[GitLab Runner](https://docs.gitlab.com/runner/) 参见下面描述。 要求每个人在涉及 UI 改动时候要自己找时间跑下 UI 测试用例；同样的，涉及功能上改动要跑下单元测试用例（目前单元测试用例还要完善）。

准备发版本前需要先提交 release 分支，触发 UI 测试用例，这时候 url 填的是自己起的服务器；发布版本提交到 master 分支，阿里云会自动部署到 https://toolbar.emicmh.com 我们需要要再跑测试用例验证。

### 关于 Katalon

Katalon 应该目前能找到最好用的 Web UI 自动化测试工具。但目前使用有两个问题（除了本身小问题）：

1. 每次执行，测试用例的 .ts 文件的 <lastRun> 值就会修改，造成 git 一次不必要的 commit，[暂时想不到什么解决办法](https://forum.katalon.com/discussion/9587/every-time-i-run-test-suite-it-will-be-updated-then-i-have-a-new-git-commit) , [不止一人提过](https://forum.katalon.com/discussion/7146/suggestion-katalon-studio-last-run-info-could-be-saved-in-a-separate-fille-not-in-the-ts-file)

2. [Chrome 必须要手动点运行访问麦克风](https://forum.katalon.com/discussion/2607/how-to-allow-or-block-in-permission-popup#latest)，参见下面详述。由于呼叫用例不是 100%能成功，所以目前把非呼叫相关测试用例一组，呼叫相关一组。

注：跑测试用例失败可能恰恰说明我们代码改出问题，所以**不要担心测试用例失败情况**。但目前偶尔有测试用例会失败原因不明的情况，所以目前需要大家多跑跑。

关于第一个问题，尝试用 git filter 来处理 [Can git ignore a specific line?](https://stackoverflow.com/questions/6557467/can-git-ignore-a-specific-line/22171275#22171275) 参考 [1](http://blog.davydovanton.com/2015/11/14/ignore-file-lines-in-git/), [2](https://stackoverflow.com/questions/16244969/how-to-tell-git-to-ignore-individual-lines-i-e-gitignore-for-specific-lines-of/16244970), [3](https://stackoverflow.com/a/32048335/301513), 每个人要在自己机器运行这两个命令（windows 下也可以！）:

```shell
git config --global filter.gitignore.clean "sed '/lastRun/d'"
git config --global filter.gitignore.smudge cat
```

mac 下可查看 `~/.gitconfig` `[filter "gitignore"]` 确实设置了。 当这些文件又被写入 lastRun 时候，stage 一下就可以了。

还有一个办法是先提交一版没有这个值文件，然后运行以下命令。而且每个人的机器都要执行这个命令。

```
git update-index --assume-unchanged "katalon/toolbar_test/Test Suites/call.ts"
git update-index --assume-unchanged "katalon/toolbar_test/Test Suites/nocall.ts"
git update-index --assume-unchanged "katalon/toolbar_test/Test Suites/toolbar.ts"
```

但有其他重要改动是需要 `git update-index --no-assume-unchanged [files]`

注意**每台机器都要**运行这几条命令

### 关于 Chrome 必须要手动点运行访问麦克风

两种解决方法：

1. 通过 robot.keypress 模拟点击 tab、enter 键，达到权限允许的效果,（commit id 68e0ba7）,但是该方法 mac 不适用,参考：

    - [How to fire tab key event?](https://stackoverflow.com/questions/4546214/how-to-fire-tab-key-event)

2. 通过 webdriver,在打开浏览器之前设置允许麦克风权限，参考：

    - [Allowing Camera and Mic access in Chrome 64](https://stackoverflow.com/questions/48777822/allowing-camera-and-mic-access-in-chrome-64)
    - [How to use Selenium WebDriver in Katalon Studio](https://www.katalon.com/resources-center/tutorials/using-selenium-webdriver-katalon-studio/#)

### 关于 gitlab-runner

​ step 1: 在 mac 上安装 gitlab-runner

​ https://docs.gitlab.com/runner/install/osx.html

​ step 2: 创建 .gitlab-ci.yml 文件

```yaml
before_script:
    - yarn
    - npm run debug &
    # 解决乱码 for Windows
    # - chcp 65001
run_katalon_test_suite:
    only:
        # 只在 release上提交进行测试
        - release
    # 定义一列tags，用来指定选择哪个Runner（同时Runner也要设置tags）
    tags:
        - toolbar_katalon
    script:
        - npm run aul
        - killall node
```

注： 1 、当 mac 处于睡眠状态提交代码不执行测试， 现在设置 mac 屏幕关闭不睡眠，[参见](https://apple.stackexchange.com/questions/336716/why-wake-for-network-access-does-not-work-when-setting-ci-server)。

​ 2、 runner-token 在仓库目录下 Settings -- CI/CD Pipelines

### 关于测试用例

测试用例需要把所有功能都涉及(除了呼入功能没法实现)。目前对错误提示验证是难点，还在解决。

捕获元素是除了测试用例外 Katalon 提供的最重要的功能，Object Repository 里元素需要和我们实际界面元素一一对应，命名也要有意义。

通过 Test Suite 组织测试用例，一个 Test Case 不要太长，我们目前分三组 Test Case: `login, call,setting`

#### 已测试功能：

-   登陆
-   登陆
-   呼叫方式选择
-   忙闲状态设置
-   退出
-   基本通话功能 呼入呼出
-   挂断
-   坐席模式切换
-   左右位置切换

#### 未测试功能：

-   sip 话机模式
-   回拨话机模式
-   移动模式
-   转接
-   踢下线消息
-   登录错误提示未验证
