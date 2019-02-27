io.on('connection', socket => {
    // listen to the event
    socket.on('reply', function(data) {
        logger.info(`reply:${data}`)
    })
    socket.on('disconnect', function(data) {
        logger.info(`disconnect:${data}`)
    })
    socket.on('message', function(data) {
        logger.info(`message:${data}`)
    })
    socket.on('login', function(data) {
        logger.info(`login:${data}`)
    })
})
setInterval(() => {
    io.emit('broadcast', '广播')
    logger.info('broadcast')
}, 3000)
