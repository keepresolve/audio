const Koa = require('koa')
const app = new Koa()
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)
global.io = io
global.app = app

require('./util/init')
const PORT = process.env.port || 3001
app.listen(PORT)
server.listen(process.env.wsport)
// logger.debug(`app starts at ${PORT}`)
module.exports = app
