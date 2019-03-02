<template>
  <el-container class="index">
    <!-- <div class="status" :style="{background:socketStatus?'blue':'red'}"></div>
    <el-progress type="circle" :percentage="percentage" status="exception"></el-progress>
    <button @click="setTime">asads</button>-->
    <el-header class="header">拍卖室</el-header>
    <el-main class="main">
      <ul>
        <li
          v-for="(item,index) in chatList"
          :key="index"
          :class="{left:!item.self,right:item.self}"
        >
          <span>
            <span>{{item.userName}}:</span>
            <span>{{item.msg}}</span>
          </span>
        </li>
      </ul>
    </el-main>
    <el-footer class="footer">
      <el-input placeholder="请输入内容" v-model="meesage" class="input-with-select">
        <el-button slot="append" @click="send">发送</el-button>
      </el-input>
    </el-footer>
  </el-container>
</template>
<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            percentage: 0,
            id: null,
            socketStatus: 0,
            meesage: '',
            chatList: [
                { msg: '山东省', self: false, userName: '全是' },
                { msg: '山东省', self: true, userName: '全是' }
            ]
        }
    },
    sockets: {
        connect() {
            this.socketStatus = 1
            console.log('connected', this.$socket.id)
            this.id = this.$socket.id
        },
        disconnect() {
            this.socketStatus = 0
            console.error('disconnect')
        },
        reconnect() {
            this.socketStatus = 1
            console.log('reconnect')
        },
        chatMessage(data) {
            data = JSON.parse(data)
            let self = data.userName == sessionStorage.userName
            switch (data.type) {
                case 'login':
                    this.chatList.push({
                        msg: '已加入',
                        self: false,
                        userName: data.userName
                    })
                    break
                default:
                    this.chatList.push({
                        msg: data.msg,
                        self,
                        userName: self ? '自己' : data.userName
                    })
                    break
            }
        },
        message(data) {
            console.log('message', data)
        },
        percentage(data) {
            this.percentage = JSON.parse(data).percentage
        },
        broadcast(data) {
            console.log('broadcast', data)
        }
    },
    methods: {
        send() {
            if (this.meesage == '') return
            if (!sessionStorage.token) {
                this.$message({
                    type: 'warning',
                    message: '请重新登陆'
                })
                return this.$router.push('/')
            }

            let data = {
                userName: sessionStorage.userName,
                msg: this.meesage,
                token: sessionStorage.token
            }
            this.$socket.send(JSON.stringify(data))
            this.meesage = ''
        },
        setTime() {
            this.$socket.emit(
                'percentage',
                JSON.stringify({
                    total: 100
                })
            )
        }
    }
}
</script>

<style scoped>
.status {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
.left > span,
.right > span {
    padding: 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.left > span {
    background: #fff;
}
.right > span {
    background: #1989fa;
}
.left {
    height: 40px;
    line-height: 40px;
    text-align: left;

    color: #333;
}
.right {
    height: 40px;
    line-height: 40px;
    text-align: right;
    color: #333;
}
.header {
    text-align: center;
    line-height: 60px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.main {
    left: 20px;
    right: 20px;
    position: absolute;
    top: 70px;
    bottom: 100px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.footer {
    height: 100px;
    position: absolute;
    bottom: 0px;
    left: 20px;
    right: 20px;
}
</style>
