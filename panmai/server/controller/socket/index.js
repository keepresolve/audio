let timer = null
let beginTime = 0
let room = {}
io.onlineList = []
io.on('connection', socket => {
    // listen to the event
    socket.on('reply', function(data) {
        logger.info(`reply:${data}`)
    })
    socket.join('room')
    socket.on('disconnect', function(data) {
        logger.info(`disconnect:${data}${socket}`)
    })
    socket.on('message', async function(data) {
        data = JSON.parse(data)
        try {
            let time = null
            let result = await app.db.user.find({
                where: { token: data.token }
            })

            if (!result) {
                data.type = 'loginout'
                return socket.emit('login', JSON.stringify(data))
            }
            if (!io.onlineList[result.userName]) {
                io.onlineList.push(result.userName)
            }
            switch (data.type) {
                case 'login':
                    time = new Date().getTime()

                    data.time = time
                    socket.emit('login', JSON.stringify(data))
                    let createLog = await app.db.log.create({
                        userName: result.userName,
                        log: '登陆系统',
                        userid: result.id,
                        createTime: time
                    })
                    io.to('room').emit(
                        'message',
                        JSON.stringify({
                            type: 'log',
                            self: result.id == createLog.userid,
                            userName: createLog.userName,
                            log: '登陆系统',
                            userid: createLog.userid,
                            time: createLog.created_at
                        })
                    )
                    break
                case 'chat':
                    time = new Date().getTime()
                    await app.db.chat.create({
                        userName: result.userName,
                        message: data.msg,
                        userid: result.id,
                        createTime: time
                    })
                    data.time = time
                    io.to('room').emit('message', JSON.stringify(data))
                    break

                case 'getMessage':
                    let limit = data.limit || 20
                    let currentPage = data.currentPage || 1
                    let offset = (currentPage - 1) * limit
                    let userList = await app.db.chat.findAndCountAll({
                        limit: parseInt(limit),
                        offset,
                        order: [['created_at', 'DESC']]
                    })
                    let list = []
                    if (userList.rows.length > 0) {
                        userList.rows.forEach(chat => {
                            let self = result.id == chat.userid
                            list.unshift({
                                msg: chat.message,
                                self,
                                userName: data.userName
                            })
                        })
                    }

                    data.type = 'getMessage'
                    data.list = list
                    socket.emit('message', JSON.stringify(data))
                    break
                case 'getlog':
                    let loglimit = data.limit || 20
                    let logcurrentPage = data.currentPage || 1
                    let logoffset = (logcurrentPage - 1) * loglimit
                    let logList = await app.db.log.findAndCountAll({
                        limit: parseInt(loglimit),
                        offset: logoffset,
                        order: [['created_at', 'ASC']]
                    })
                    let logcopylist = []
                    if (logList.rows.length > 0) {
                        logList.rows.forEach(log => {
                            let self = result.id == log.userid
                            logcopylist.unshift({
                                log: log.log,
                                self,
                                userid: log.userid,
                                time: log.created_at,
                                userName: log.userName
                            })
                        })
                    }

                    data.type = 'getlog'
                    data.list = logcopylist
                    socket.emit('message', JSON.stringify(data))
                    break
            }
        } catch (error) {
            data = {
                type: 'error',
                message: error.message
            }
            io.to('room').emit('message', JSON.stringify(data))
        }

        logger.info(`message:${JSON.stringify(data)}`)
    })
    // socket.on('percentage', function(data) {
    //     data = JSON.parse(data)
    //     logger.info(`percentage:${data}`)
    //     clearInterval(timer)
    //     timer = setInterval(() => {
    //         if (beginTime >= data.total) {
    //             clearInterval(timer)
    //             beginTime = 0
    //         }
    //         beginTime++
    //         socket.emit('percentage', JSON.stringify({ percentage: beginTime }))
    //     }, 1000)
    // })
})
