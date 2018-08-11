## 对jssip的包装
主要是想单独分开处理PBX的各种sip消息

### dependencies 设置

* 如果jssip里用的我们就不在列出，比如debug
* events, 这是模拟 node.js EventEmitter 在浏览器的实现

### 使用
 > npm install jssipwrap


```javascript
var ua = new JsSIPWrap(config)
// 具体配置信息和字段和jssip 一样,除了socekts不需要配置
```

创建完成后,需要登录


### 登录
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
由于消息都是xml ,且PBX 的消息种类比较多,后面需要对每个不同的消息分别定义不同事件,外层使用不用关心PBX消息类型
```
### 拨打电话

```
 ua.call(target, type)

// target 的是呼叫号码 ,type 是呼叫的类型 1:外线直接呼叫 2:回拨  3:内线互拨
```

### 挂断
`ua.stop()`
### 发送xml消息

```
ua.sendMessage(target, text)

//target 消息接受人,需要加企业和分机号拼接 

// 如果发给PBX 的事件,需要单独函数处理,上层不需要关系各种PBX事件
```
### 注意
*  不管是发出invite 或者收到invite消息,session 相关的事件都通过原生RTCSession 来监听
### 后续
* 需要把ring 相关的封装写进来
* 发出的PBX 消息事件接口完善
* 收到的PBX 消息事件接口完善


### 最后发布还有一部打包压缩成min.js

* 这样别人引用有两种方式 npm install （从我们的git库）或者 `<script min.js>`


### 如何让mocha运行 es6 代码

* [es6 module](http://jamesknelson.com/testing-in-es6-with-mocha-and-babel-6/)
* [Using Mocha with ES6 spec files](http://krasimirtsonev.com/blog/article/using-mocha-with-es6-spec-files)
* [async/await](https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined/51605910#51605910)

### 发布es6 module注意事项

* https://github.com/babel/babel/issues/1625 需要在package.json 加 `"browserify": { "transform": [ "babelify" ] }`
* 需要设置 .babelrc `presets` 以及 `targets`
* 使用时候，如果是直接把源代码加到使用的代码库里，而不是node_module方式这必须在使用gulp文件里设置`presets` 以及 `targets` 。在源代码出设置`.babelrc`不起作用

### mocha单元测试

 1. `localstorage` & `fetch` 都是浏览器方法，所以我们测试代码需要浏览器执行
 2. npm run unit
 3. 用浏览器打开test文件夹下面的index.html
 4. http://127.0.0.1:9999/?grep=`key` 比如 `http://127.0.0.1:9999/?grep=web`只跑相关用例
 
 
### 浏览器mocha测试步骤

1. [使mocha运行在浏览器端](https://mochajs.org/#running-mocha-in-the-browser)
2. 将mocha测试代码转成浏览器可识别的代码(使用了webpack + babel) 参考[如何让浏览器支持ES6中的import和export语法](https://blog.csdn.net/u012863664/article/details/72813941)
3. 不借助webpack把所有import的文件打包成一个文件似乎不行，[参见](https://github.com/vitalets/mocha-es6-modules/issues/4)
4. [For browsers, you need to use Webpack or Browserify to compile all test files.](https://x-team.com/blog/setting-up-javascript-testing-tools-for-es6/)




### http 对外接口封装使用说明


```
- 获取初始化数据接口 getLoginData(un, pwd, switchNumber, callintype)
  该接口会获取登录所需的所有参数

- 调用示例
getLoginData（'1006'，'1006'，'02566699734',4）
- 参数说明
参数名 | 说明 |类型
un | 分机号 | string
pwd | 密码  |string
switchNumber | 总机号 |string
callintype | 呼叫模式 | number

```

```
- web接口统一调用接口 webApiHandler(functionName, webParam)

参数名 | 说明 |类型
functionName | 请求方法名 |string
webParam | 请求参数体 | object

```



### webApiHandler对外 function的参数定义

```
getEpProfile 获取企业属性

- 调用示例
webApiHandler（"getEpProfile"，{un:'1006','pwd:1006',eid:65656}）


- 参数说明
un | 分机号 | string
pwd | 密码  |string
eid | 企业id |string

```

```
getMemberInfo 获取用户信息

- 调用示例

webApiHandler（"getMemberInfo"，{un:'1006','pwd:1006',eid:65656}）

- 参数说明
un | 分机号 | string
pwd | 密码  |string
eid | 企业id |string

```


```
getGroups 获取所有技能组

- 调用示例
webApiHandler（"getGroups"，{un:'1006','pwd:1006',eid:65656,needMembers:1}）

- 参数说明
un | 分机号 | string
pwd | 密码  |string
eid | 企业id |string
needMembers | 不传或传空则不返回属于组的用户信息，传1返回mids| number
```

```
updateInfo 更新用户呼叫模式

- 调用示例
webApiHandler（"updateInfo"，{un:'1006','pwd:1006',eid:65656,jsonStr:{ "data": { "callintype": 2 } }}}）

- 参数说明
un | 分机号 | string
pwd | 密码  |string
eid | 企业id |string
*jsonStr| 用户新的信息json内容【或者post一个json文件】|object

```

```
searchEpMembers 获取技能组包含坐席

- 调用示例
webApiHandler（"searchEpMembers"，{un:'1006','pwd:1006',eid:65656,searchGid:'2050',searchServiceControl:1}）

- 参数说明
un | 分机号 | string
pwd | 密码  |string
eid | 企业id |string
start | 起始记录数 默认0 |string
length | 获取记录数，默认10 |number
searchGid | 组id （筛选未分组时传-1） | string
searchServiceControl |状态筛选 0-离线 1-空闲 2-暂离 3-消息请求 4-呼叫请求 5-通话中 6-话后处理| string
```

```
getMemberCallStates 获取坐席状态

- 调用示例
webApiHandler（"getMemberCallStates"，{un:'1006','pwd:1006',eid:65656,uid:'234'}）

- 参数说明
un | 分机号 | string
pwd | 密码  |string
eid | 企业id |string
uid | 用户id |string
```