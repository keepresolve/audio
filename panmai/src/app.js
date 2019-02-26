const Koa = require('koa')
const app = new Koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)
io.on('connection', socket => {
    console.log(socket)
    socket.on('login', function(data) {
        console.log(data)
    })
    socket.emit('message', 'asdasd')
})
global.app = app

require('./util/init')
const PORT = process.env.port || 3000
app.listen(PORT)
server.listen(8000)
// logger.debug(`app starts at ${PORT}`)
module.exports = app
