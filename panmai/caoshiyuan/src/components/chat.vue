<style>
.user {
    display: inline-block;
    font-size: 0.1rem;
}
</style>

<template>
  <div id="chat">
    <header>
      <div>
        <el-tabs :span="20" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="竞拍列表" name="1"></el-tab-pane>
          <el-tab-pane label="聊天室" name="2"></el-tab-pane>
          <el-tab-pane label="个人中心" name="3"></el-tab-pane>
          <el-tab-pane label="管理员" name="4"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="showNews" @click="isShowLog=!isShowLog">
        <span>{{showNews}}</span>
        <a>查看详情</a>
      </div>
    </header>
    <section class="body" :span="12">
      <div class="item" v-show="activeName==1">
        <el-table
          :data="tableData6"
          size="mini"
          resizable
          row-class-name="row"
          :fit="true"
          :span-method="objectSpanMethod"
          border
          style="width: 100%;"
        >
          <el-table-column label-class-name="col" prop="number" label="号码"></el-table-column>
          <el-table-column label-class-name="col" prop="startPrice" label="标准" sortable></el-table-column>
          <el-table-column label-class-name="col" prop="maxPrice" label="承诺" sortable></el-table-column>
          <el-table-column label-class-name="col" prop="unit" label="单位"></el-table-column>
        </el-table>
      </div>

      <div class="item chatpage" v-show="activeName==2">
        <el-scrollbar class="chatlist">
          <ul ref="chatList">
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
        </el-scrollbar>
        <div class="chatFooter">
          <el-input
            placeholder="请输入内容"
            ref="sendMessage"
            v-model="message"
            class="input-with-select"
          >
            <el-button slot="append" @click="send">发送</el-button>
          </el-input>
        </div>
      </div>

      <div class="item" v-if="activeName==3"></div>

      <div class="item" v-if="activeName==4"></div>

      <transition name="fade">
        <el-col class="logs" :span="6" v-if="isShowLog">
          <el-scrollbar style="height:100%;padding-bottom: 30px;">
            <ul ref="logList">
              <span
                style="float:right;font-size:24px;margin-right:10px;"
                @click="isShowLog=false"
              >&times;</span>
              <li v-for="(item,index) in logList" :key="index">
                <span>
                  <span>{{item.userName}}:</span>
                  <span>{{item.log}}</span>
                </span>
              </li>
            </ul>
          </el-scrollbar>
        </el-col>
      </transition>
    </section>
    <!-- <footer class="footer"></footer> -->
  </div>
</template>
<script>
export default {
    name: 'chat',
    data() {
        return {
            percentage: 0,
            id: null,
            socketStatus: 0,
            message: '',
            chatList: [],
            logList: [{ userName: 13, log: '13123' }],
            isShowLog: false,
            showNews: '',
            activeName: '1',
            userName: localStorage.userName,
            tableData6: [
                {
                    number: '12987122',
                    startPrice: '王小虎', //标准起拍价
                    maxPrice: '234',
                    amount2: '3.2',
                    amount3: 10
                }
            ]
        }
    },
    sockets: {
        chatMessage(data) {},
        message(data) {
            data = JSON.parse(data)
            let self = data.token == localStorage.token
            switch (data.type) {
                case 'chat':
                    this.chatList.push({
                        msg: data.msg,
                        self,
                        userName: self ? '我' : data.userName,
                        time: data.cre
                    })
                    break
                case 'getMessage':
                    this.chatList = data.list
                    break
                case 'log':
                    this.showNews = `${data.userName}: ${data.log}`
                    this.logList.push({
                        log: data.log,
                        self,
                        userName: data.userName
                    })
                    break
                case 'getlog':
                    this.logList = data.list
                    break
                default:
                    break
            }
            console.log('message', data)
        },
        percentage(data) {
            this.percentage = JSON.parse(data).percentage
        },
        broadcast(data) {
            console.log('broadcast', data)
        }
    },
    watch: {
        chatList(n) {
            this.$nextTick(() => {
                let list = this.$refs.chatList.children
                if (list.length == 0) return
                list[list.length - 1].scrollIntoView()
            })
        },
        logList() {}
    },
    mounted() {
        console.log(this.$refs.sendMessage)
        let that = this
        document
            .querySelector('.el-input__inner')
            .addEventListener('keydown', function(e) {
                if (e.keyCode == 13) {
                    that.send()
                }
            })
        this.$socket.send(
            JSON.stringify({
                type: 'getMessage',
                limit: 20,
                currentPage: 1,
                userName: localStorage.userName,
                passWord: localStorage.passWord,
                unit: localStorage.unit,
                token: localStorage.token
            })
        )
        this.$socket.send(
            JSON.stringify({
                type: 'getlog',
                limit: 20,
                currentPage: 1,
                userName: localStorage.userName,
                passWord: localStorage.passWord,
                unit: localStorage.unit,
                token: localStorage.token
            })
        )
    },
    methods: {
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    }
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    }
                }
            }
        },
        handleClick() {},
        send() {
            if (this.message == '') return
            if (!localStorage.token) {
                this.$message({
                    type: 'warning',
                    message: '请重新登陆'
                })
                return this.$router.push('/login')
            }

            let data = {
                type: 'chat',
                userName: localStorage.userName,
                passWord: localStorage.passWord,
                unit: localStorage.unit,
                msg: this.message,
                token: localStorage.token
            }
            this.$socket.send(JSON.stringify(data))
            this.message = ''
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
<style>
.el-tabs__header {
    margin: 0px;
}
.el-tabs__nav-scroll > div {
    margin: 0 auto;
}
.col {
    font-size: 0.1rem !important;
}
.row {
    height: 0.25rem;
}
</style>

<style scoped>
#chat {
    height: 100%;
    width: 100%;
    background-color: #eee;
    padding: 0 15px;
}
header > div {
    width: 320px;
    margin: 0 auto;
}
.body {
    width: 100%;
    /* padding: 0px 15px 50px 15px; */
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    height: calc(100% - 70px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.item {
    position: absolute;
    left: 0px;
    bottom: 0px;
    top: 0px;
    right: 0px;
    transition: all 0.5s ease 0s;
}
.chatpage .chatlist {
    height: calc(100% - 40px);
}

.showNews {
    width: 100%;
    font-size: 0.1rem;
    color: #b2b2b2;
    line-height: 30px;
    padding: 0px 10px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.showNews a {
    float: right;
}
.showNews:hover {
    color: #f8f8f8;
}
.logs {
    z-index: 999;
    position: absolute;
    top: 20%;
    bottom: 0px;
    overflow: auto;
    right: 0px;
    padding: 10px 5px;
    font-size: 12px;
    border-radius: 3px;
    background-color: #ffffff;
}
.footer {
    height: 100px;
    position: absolute;
    bottom: 0px;
    left: 10px;
    right: 10px;
}
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
    background: #b2e281;
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
</style>
