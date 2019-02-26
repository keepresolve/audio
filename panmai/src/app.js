const Koa = require('koa')
const app = new Koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)
io.on('connection', socket => {
    console.log('初始化成功！下面可以用socket绑定事件和触发事件了')
    app.socket = socket
    socket.on('send', data => {
        console.log('客户端发送的内容：', data)
        socket.emit('getMsg', '我是返回的消息... ...')
    })
    setTimeout(() => {
        socket.emit('getMsg', '我是初始化3s后的返回消息... ...')
    }, 3000)
})
global.app = app

// require('./util/init')
const PORT = process.env.port || 3000
app.listen(PORT)
server.listen(8000)
// logger.debug(`app starts at ${PORT}`)
module.exports = app
