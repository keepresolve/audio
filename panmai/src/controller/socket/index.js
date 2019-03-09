let timer = null
let beginTime = 0
let room = {}
io.on('connection', socket => {
    // listen to the event
    socket.on('reply', function(data) {
        logger.info(`reply:${data}`)
    })
    socket.join('room')
    socket.on('disconnect', function(data) {
        logger.info(`disconnect:${data}`)
    })
    socket.on('message', async function(data) {
        data = JSON.parse(data)
        try {
            let result = await app.db.user.find({
                where: { token: data.token }
            })

            if (!result) {
                data.type = 'loginout'
                return socket.emit('login', JSON.stringify(data))
            }
            switch (data.type) {
                case 'login':
                    socket.emit('login', JSON.stringify(data))
                    break
                case 'chat':
                    await app.db.chat.create({
                        userName: result.userName,
                        message: data.msg,
                        userid: result.id,
                        createTime: new Date().getTime()
                    })
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
                            list.push({
                                msg: chat.message,
                                self,
                                userName: self ? '我' : data.userName
                            })
                        })
                    }

                    data.type = 'getMessage'
                    data.list = list
                    io.to('room').emit('message', JSON.stringify(data))
                    break
                case '':
                    break
                case '':
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
