let timer = null
let beginTime = 0
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
    socket.on('percentage', function(data) {
        data = JSON.parse(data)
        logger.info(`percentage:${data}`)
        clearInterval(timer)
        timer = setInterval(() => {
            if (beginTime >= data.total) {
                clearInterval(timer)
                beginTime = 0
            }
            beginTime++
            socket.emit('percentage', JSON.stringify({ percentage: beginTime }))
        }, 1000)
    })
})
io.on('disconnect', function(data) {
    logger.info(` iodisconnect:${data}`)
})
// setInterval(() => {
//     io.emit('broadcast', '广播')
//     logger.info('broadcast')
// }, 3000)
