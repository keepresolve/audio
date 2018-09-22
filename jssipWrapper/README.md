## 对 jssip 的包装

易米电话工具条基于 [jssip](http://jssip.net/)，通过 WebRTC 网关对接易米 sip 服务器。工具条主要封装了对易米 sip 服务器的消息处理，让用户通过浏览器直接使用易米 sip 服务器提供的服务。
推荐使用 Chrome 68+浏览器；IE 浏览器不支持 WebRTC，所以工具条不能在 IE 中使用。

### 如何安装使用

我们当前代码不能在 node 环境下执行： `localstorage` & `fetch` 都是浏览器方法，因此我们没有在 package.json[设置 main 字段而是设置 browser 字段](https://docs.npmjs.com/files/package.json#browser)。因为没有设置 main, 所以引用时候[不能直接写 require...](https://docs.npmjs.com/files/package.json#main)

使用时在 html 页面中通过 CDN 引用打包后的代码，比起通过 `npm i` 安装更方便。如果用 npm 安装，引用时候需要写 `node_modules` 路径， `<script src='.\node_modules\...'` 不然浏览器无法处理。

注：根据这个[SO 讨论](https://stackoverflow.com/questions/14221579/how-do-i-add-comments-to-package-json-for-npm-install) 我们在 package.json 用 "//"添加几个要点，但重要的东西还是都这里详述。

### 如何打包

我们提供两种打包方式 `webpack` 和 `gulp(4.0)` 方式，webpack 通过 npm script 执行;
webpack 打包命令`npm run bundle` ; gulp 打包直接在命令行执行 `gulp bundle`

webpack 打包需要对 css 准备处理，见下面描述。

使用 webpack 打包的一个好处是方便断点调试，gulp 即便有 sourcemap 也很难定位到源文件在打包后的实际位置，而且 webpack 打包速度远比 gulp+browserify 快。

gulp 4.0 和 3.0 主要不同是引入 `gulp.series & gulp.parallel` (vinyl-source-stream 要升级到 2.0)，网上很多文章还是用 3.0（看他们定义 task 的依赖关系可判断），所以我们使用 4.0 带有一定学习目的。

### .bablerc 设置

development 下只设置 target 是 chrome 和 firefox，production 才设置支持 IE

为了让代码能直接在 IE 里运行（然后弹出警告工具条不支持 IE :$）`.bablerc`设置增加了`"transform-runtime"`插件，它的几个设置含义还没仔细研究，但可以注意到如果 target 不设置 IE，打包出来的代码是一样的。

babel 的环境变量是这样设置：

[`Default: process.env.BABEL_ENV || process.env.NODE_ENV || "development"` ](https://babeljs.io/docs/en/next/options#envname)

目前我们设置 `BABEL_ENV` 而不是 `NODE_ENV` 让意图更明确，同时确实不设置 development 减少跨平台的代码

### 怎么起服务器

我们一共尝试过三种 http 服务器：

1. [http-server](https://www.npmjs.com/package/http-server)

2. [live-server](https://www.npmjs.com/package/live-server) (主要是针对 http-server 不能重刷页面)

3. webpack 带的[webpack-dev-server](https://github.com/webpack/webpack-dev-server)

没有别的原因，**不会**再引入别的服务器(比如 express，或者自己再写一个)。

网页刷新重连有几种做法：

1. webpack 的 devServer 做更新重连，devServer 使用"webpack-cli"，这其实是一个[bug](https://github.com/webpack/webpack-dev-server/issues/1422)所以造成目前没法用`webpack-command`
2. 用 webpack-command + live-server 做更新重连。但要再引入[live-server](https://www.npmjs.com/package/live-server) 这个包上一次更新是两年前，远不如[webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) 活跃。所以已经把 live-server 相关代码去掉了
3. 用 gulp 时使用 [browser-sync](https://www.npmjs.com/package/browser-sync)

### 断点调试

和微软工程师讨论了 6 天 [**vscode-chrome-debug**](https://github.com/Microsoft/vscode-chrome-debug/issues/723)，才终于发现原来是 webpack.config.js 没有设置`devtool: 'source-map'` 造成在 vscode 里断点停不下来。

断点调试大家一定熟练起来

### dependencies 设置

-   如果 jssip 里用的我们就不在列出，比如 debug
-   events, 这是模拟 node.js EventEmitter 在浏览器的实现，因为 jssip 已经设置所以也没在我们的 dependencies 列出
-   不使用 jQuery，网络请求使用 fetch

### 发布 es6 module 注意事项

-   我们所有用到 es6 功能 Chrome 66+ 都支持，所以不需要把 babel 转成 es5, `.bablerc` 设置好 target 确保不必要的转码。
-   我们代码里既有 commonjs 的 require 又有 es6 import 所以需要 babel 统一转成 commonjs。
-   mocha 单元测试还没有完全支持 es6 所以需要对单元测试代码做转码

### 如何在回调函数里正确使用 this

首先，只有回调函数里才可能会用到 that , 不是回调函数不需`let that = this` (之前代码有这个问题)

其次 ，不要在每个回调函数前都习惯性的加 `let that = this` 并在函数体里用`that` , 这样代码很难维护。

建议一下几个方法：

1. 首选用箭头函数
2. 多层回调里，二级回调通过 .bind(this) 保证 this 值正确，参见 `Phone.init(params,callbackMap)`

注：

1. Ephone 类加了一个类变量 self 和 webpack-dev-server 发生冲突 `Uncaught TypeError: self.postMessage is not a function at sendMsg (webpack:///(:9000/webpack)-dev-server/client?:61:10)'`

2. 别的类也不能再设置 self，因为设置也最终也还是指向 Ephone(原因还是 100%确认)

参考 [How to access the correct `this` inside a callback?](https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback)

### 如何让 mocha 运行 es6 代码

-   [es6 module](http://jamesknelson.com/testing-in-es6-with-mocha-and-babel-6/)
-   [Using Mocha with ES6 spec files](http://krasimirtsonev.com/blog/article/using-mocha-with-es6-spec-files)
-   [async/await](https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined/51605910#51605910)

### mocha 单元测试

1.  `localstorage` & `fetch` 都是浏览器方法，所以我们测试代码需要浏览器执行
2.  npm run unit
3.  用浏览器打开 test 文件夹下面的 index.html
4.  http://127.0.0.1:9999/?grep=`key` 比如 `http://127.0.0.1:9999/?grep=web`只跑相关用例

### 浏览器 mocha 测试步骤

1. [使 mocha 运行在浏览器端](https://mochajs.org/#running-mocha-in-the-browser)
2. 将 mocha 测试代码转成浏览器可识别的代码(使用了 webpack + babel) 参考[如何让浏览器支持 ES6 中的 import 和 export 语法](https://blog.csdn.net/u012863664/article/details/72813941)
3. 因为浏览器无法处理 node_modules 目录下的代码，所以想使用浏览器的`script type="module"`必须写全路径，借助 webpack 把所有 import 的文件打包成一个文件是最简单的方法，[参见](https://github.com/vitalets/mocha-es6-modules/issues/4)
4. [For browsers, you need to use Webpack or Browserify to compile all test files.](https://x-team.com/blog/setting-up-javascript-testing-tools-for-es6/)

### css 文件处理

1. 按钮图标使用[阿里云矢量图标](http://www.iconfont.cn/),没有使用而外图片，所以 css 打包处理就是做最小化。
2. 通过 webpack 打包处理 css，但 webpack 需要在 js 文件 import css，这是 webpack 特定语法；而且这样做如果用 gulp 打包就还要引入`browserify-css` [参见](https://stackoverflow.com/questions/51807092/is-it-possible-to-let-webpack-bundle-css-without-import-css-in-my-entry-js)
3. sass 没有相应的 browserify 插件，但其实处理简单（css 也一样）就是把那行代码删了在 browserify。可以用两种方法,<1> 'gulp-replace' 生成一个临时文件再交给 browserify 处理 <2> 'browserify-replace'相对简单， 但帮助文档不详，查看源代码找到调用方法。

#### 更新

在 js 文件 import css 这个做法始终让我很不安，[在 SO 问了很久](https://stackoverflow.com/questions/51807092/is-it-possible-to-let-webpack-bundle-css-without-import-css-in-my-entry-js/) 都没答复，结果在 google `webpack entry css` 这三个关键字时候偶然发现答案。其实当时是在调查如何让 HtmlWebPackPlugin 不要对 index.html 加 css，保证 webpack 和 gulp 打包的东西都能正确显示。

做法就是一个 entry，但是设置文件名数组

```
    entry:{
      index: [
        './src/ui/index.js',
        './resources/css/phone.scss'
      ]
    },
    output:{
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
   },
```

### 选择哪种 font-face

阿里字体图标库有多种格式下载，因为我们已经限定了浏览器的版本 ，选用 woff 对我们最合适。

TTF, OTF, WOFF, EOT, SVG [字体文件对浏览器的支持](https://creativemarket.com/blog/the-missing-guide-to-font-formats?tdsourcetag=s_pctim_aiomsg)

1. EOT 仅支持 IE8-11

2. OTF/TTF 支持 [ IE9-11, Edge12-14, Firefox 40-45, Chrome 43-49, Safari 8-9, Opera 32-35, iOS Sarfari 8.4-9.1, Android 4.4-44, Chrome for Android 46 ]

3. WOFF 支持[ IE9-11, Edge12-14, Firefox 40-45, Chrome 43-49, Safari 8-9, Opera 32-35, iOS Sarfari 8.4-9.1, Android 4.4-44, Chrome for Android 46 ]

4. WOFF2 支持[ Firefox 40-45, Chrome 43-49, Opera 32-35, Chrome for Android 46 ]

5. SVG 支持 [ Safari 8-9, iOS Sarfari 8.4-9.1 ]

关于 font-face 介绍，还可以参考 [1](https://www.jianshu.com/p/0fc36e7f7d2e),[2](https://stackoverflow.com/questions/11002820/why-should-we-include-ttf-eot-woff-svg-in-a-font-face)

### 统一文件 tab，引号，结尾分号设置

格式化工具[Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) 和 [Prettier](https://prettier.io/)， 经过比较选择 [Prettier](editor.formatOnSave) Prettier 只能格式化 js 文件，其他文件用 vscode 自带 format document

通过 Prettier 统一文件 tab 设置，4 个空格；js 代码都用单引号，利用 Prettier 对 js 的**ASI**，注意前置括号会因此被加一个分号。

安装 Prettier 的 vscode 插件，设置 vscode `format on save` **true** 以及 `Ignore Trim Whitespace` **false**

以后合代码再发生此类问题一定查到原因。关于 Prettier 的其他叙述参见 `文件格式修改.md`

### 开发工具

开发人员需要标配以下几个工具：

1. vscode [2018 的版本](https://code.visualstudio.com/updates/)，并安装[**vscode-chrome-debug**](https://github.com/Microsoft/vscode-chrome-debug/issues/723)

2. Prettier

3. [Katalon](https://www.katalon.com/) 自动化 UI 测试 ，Katalon 有单独文件详细描述。最新版本[5.7.1](https://docs.katalon.com/display/KD/Release+Notes)

4. Markdown 编辑器

---

### 使用

```javascript
//首先创建一个实例
//具体配置信息和字段和 jssip 一样,除了 socekts 不需要配置
var ua = new JsSIPWrap(config)
```

创建完成后,需要登录

#### 登录

`ua.login();`

登录成功后就可以监听各类事件.目前定义有如下:

```
// 注册登录相关
connecting
connected
disconnected
registered
unregistered
registrationFailed

//会话相关
newRTCSession

// 收到新的消息
newMessage
由于消息都是 xml ,且 PBX 的消息种类比较多,后面需要对每个不同的消息分别定义不同事件,外层使用不用关心 PBX 消息类型
```

#### 拨打电话

```
ua.call(target, type)

// target 的是呼叫号码 ,type 是呼叫的类型 1:外线直接呼叫 2:回拨 3:内线互拨
```

#### 挂断

`ua.stop()`

#### 发送 xml 消息

```
ua.sendMessage(target, text)

//target 消息接受人,需要加企业和分机号拼接

// 如果发给 PBX 的事件,需要单独函数处理,上层不需要关系各种 PBX 事件
```

#### 注意

-   不管是发出 invite 或者收到 invite 消息,session 相关的事件都通过原生 RTCSession 来监听

#### 后续

-   需要把 ring 相关的封装写进来

-   发出的 PBX 消息事件接口完善

-   收到的 PBX 消息事件接口完善

    注，对 jssip 使用参考[tryit](https://github.com/versatica/tryit-jssip)

#### http 对外接口封装使用说明

可参见单元测试代码

```
-   获取初始化数据接口 getLoginData(un, pwd, switchNumber, callintype)
    该接口会获取登录所需的所有参数

-   调用示例
    getLoginData（'1006'，'1006'，'02566699734',4）
-   参数说明
    参数名 | 说明 |类型
    un | 分机号 | string
    pwd | 密码 |string
    switchNumber | 总机号 |string
    callintype | 呼叫模式 | number
```

```
-   web 接口统一调用接口 webApiHandler(functionName, webParam)

参数名 | 说明 |类型
functionName | 请求方法名 |string
webParam | 请求参数体 | object
```

#### webApiHandler 对外 function 的参数定义

```
getEpProfile 获取企业属性

-   调用示例
    webApiHandler（"getEpProfile"，{un:'1006','pwd:1006',eid:65656}）

*   参数说明
    un | 分机号 | string
    pwd | 密码 |string
    eid | 企业 id |string
```

```
getMemberInfo 获取用户信息

-   调用示例

webApiHandler（"getMemberInfo"，{un:'1006','pwd:1006',eid:65656}）

-   参数说明
    un | 分机号 | string
    pwd | 密码 |string
    eid | 企业 id |string
```

```
getGroups 获取所有技能组

-   调用示例
    webApiHandler（"getGroups"，{un:'1006','pwd:1006',eid:65656,needMembers:1}）

-   参数说明
    un | 分机号 | string
    pwd | 密码 |string
    eid | 企业 id |string
    needMembers | 不传或传空则不返回属于组的用户信息，传 1 返回 mids| number
```

```
updateInfo 更新用户呼叫模式

-   调用示例
    webApiHandler（"updateInfo"，{un:'1006','pwd:1006',eid:65656,jsonStr:{ "data": { "callintype": 2 } }}}）

-   参数说明
    un | 分机号 | string
    pwd | 密码 |string
    eid | 企业 id |string
    \*jsonStr| 用户新的信息 json 内容【或者 post 一个 json 文件】|object
```

```
searchEpMembers 获取技能组包含坐席

-   调用示例
    webApiHandler（"searchEpMembers"，{un:'1006','pwd:1006',eid:65656,searchGid:'2050',searchServiceControl:1}）

-   参数说明
    un | 分机号 | string
    pwd | 密码 |string
    eid | 企业 id |string
    start | 起始记录数 默认 0 |string
    length | 获取记录数，默认 10 |number
    searchGid | 组 id （筛选未分组时传-1） | string
    searchServiceControl |状态筛选 0-离线 1-空闲 2-暂离 3-消息请求 4-呼叫请求 5-通话中 6-话后处理| string
```

```
getMemberCallStates 获取坐席状态

-   调用示例
    webApiHandler（"getMemberCallStates"，{un:'1006','pwd:1006',eid:65656,uid:'234'}）

-   参数说明
    un | 分机号 | string
    pwd | 密码 |string
    eid | 企业 id |string
    uid | 用户 id |string
```
