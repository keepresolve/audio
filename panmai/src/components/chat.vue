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
        <a>查看日志详情</a>
      </div>
    </header>
    <section class="body" :span="12">
      <div class="item" v-show="activeName==1">
        <div class="numberList">
          <el-table
            :data="numberData"
            size="mini"
            width="100%"
            height="100%"
            resizable
            row-class-name="row"
            border
          >
            <el-table-column label-class-name="col" min-width="150" label="号码(标准价)">
              <template slot-scope="scope">
                <span>{{scope.row.number}}</span>
                <sub>{{scope.row.startPrice}}元</sub>
              </template>
            </el-table-column>
            <el-table-column label-class-name="col" prop="maxPrice" label="承诺价" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.maxPrice}}元</span>
                <el-button
                  size="mini"
                  icon="el-icon-plus"
                  @click="indexItem = scope.row;addItem = JSON.parse(JSON.stringify(scope.row));addPriceShow = true;"
                  circle
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column label-class-name="col" label="竞拍单位">
              <template slot-scope="scope">
                <span>{{scope.row.Auctioneer}}</span>
                <sub>{{scope.row.unit}}</sub>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            align="center"
            :current-page.sync="currentPage"
            layout="prev, pager, next"
            :total="total"
            @current-change="currentChange"
          ></el-pagination>
        </div>
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
            @focus="scrollTop"
          >
            <el-button slot="append" @click="send">发送</el-button>
          </el-input>
        </div>
      </div>

      <div class="item" v-if="activeName==3"></div>

      <div class="item" v-if="activeName==4">
        <div class="numberList">
          <el-table
            ref="multipleTable"
            size="mini"
            width="100%"
            height="100%"
            resizable
            row-class-name="row"
            border
            :data="AllnumberData"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="号码" align="center">
              <template slot-scope="scope">{{ scope.row.number }}</template>
            </el-table-column>
            <el-table-column label="标准价" align="center" prop="startPrice"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <!-- <el-button
                  size="mini"
                  @click="dialog=1;dialogVisible=true;row=row;number=row.number;startPrice=row.startPrice;"
                >编辑</el-button>-->
                <el-button size="mini" type="danger" @click="remove(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-button size="mini" @click="dialog=0;number='';startPrice='';dialogVisible=true;">添加</el-button>
          <el-button size="mini" @click="remove(selectData.map(v=>v.id).join(','))">批量删除</el-button>
        </div>
      </div>

      <transition name="fade">
        <el-col class="logs" :span="6" v-if="isShowLog">
          <span id="closeLogs" @click="isShowLog=false">&times;</span>
          <el-scrollbar style="height:100%">
            <ul ref="logList">
              <li v-for="(item,index) in logList" :key="index">
                <div>{{new Date(item.time).toLocaleString()}}</div>
                <span>{{item.userName}}:{{item.log}}</span>
              </li>
            </ul>
          </el-scrollbar>
        </el-col>
      </transition>
    </section>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
      <el-form label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="number" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="起拍价">
          <el-input v-model="startPrice" type="number" placeholder="起拍价"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="dialog==0" type="primary" @click="add()">确 定</el-button>
        <el-button v-if="dialog==1" type="primary" @click="edit()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="请输入金额" :visible.sync="addPriceShow" center>
      <div>
        <el-input-number
          style="width:100%"
          @change="priceChange"
          v-model="addItem.maxPrice"
          :step="5"
          :min="indexItem.maxPrice"
          label="请输入金额"
        ></el-input-number>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPriceShow = false">取 消</el-button>
        <el-button type="primary" :loading="addPriceLoading" @click="addPrice()">确 定</el-button>
      </span>
    </el-dialog>
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
            numberData: [
                {
                    id: 0,
                    number: '18330986137',
                    startPrice: '100', //标准起拍价
                    maxPrice: '300',
                    unit: '长沙aaaaaaaaaaaaaaaaaaaaaa'
                }
            ],
            AllnumberData: {},
            selectData: [],
            total: 0,
            currentPage: 1,
            timer: null,
            number: '',
            startPrice: 0,
            dialogVisible: false,
            dialog: 0,
            row: null,
            addPriceShow: false,
            indexItem: {
                id: 0,
                number: '1001',
                startPrice: '0', //标准起拍价
                maxPrice: '0',
                unit: '北京'
            },
            addItem: {
                id: 0,
                number: '1001',
                startPrice: '0', //标准起拍价
                maxPrice: '0',
                unit: '北京'
            },
            addPriceLoading: false
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
                        time: data.createTime
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
        broadcast(data) {
            console.log('broadcast', data)
        }
    },
    watch: {
        chatList(n) {
            this.$nextTick(() => {
                this.scrollTop(true)
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
        this.getList(1)
    },
    methods: {
        priceChange(num) {
            // if (
            //     /^((-\d+)|(0+))$/.test(num) ||
            //     num < this.indexItem.maxPrice ||
            //     !num ||
            //     num == undefined
            // ) {
            //     this.addItem.maxPrice = Number(this.indexItem.maxPrice) + 1
            //     return this.$message({
            //         type: 'error',
            //         message: `请输入大于${this.indexItem.maxPrice}的金额`
            //     })
            // }
        },
        addPrice() {
            if (this.addItem.maxPrice <= this.indexItem.maxPrice) {
                return this.$message({
                    type: 'error',
                    message: `请输入大于${this.indexItem.maxPrice}的金额`
                })
            }
            let params = {
                id: this.addItem.id,
                price: parseInt(this.addItem.maxPrice),
                userName: localStorage.userName,
                passWord: localStorage.passWord,
                unit: localStorage.unit,
                token: localStorage.token
            }
            this.addPriceLoading = true
            this.$api.post('/addPrice', params).then(res => {
                if (res.code == 200) {
                } else {
                    this.$message({
                        type: 'error',
                        message: res.info
                    })
                }
                this.addPriceLoading = false
            })
        },
        edit() {},
        add() {
            let params = {
                type: '0',
                number: this.number,
                startPrice: this.startPrice,
                status: 0
            }
            this.$api
                .post('/number', params)
                .then(res => {
                    if (res.data.status == 0) {
                        this.getList(1)
                    }
                    this.dialogVisible = false
                    this.number = ''
                    this.startPrice = ''
                })
                .catch(err => {
                    if (err) {
                        this.number = ''
                        this.startPrice = ''
                        this.dialogVisible = false
                    }
                })
        },
        getList(type) {
            let params = {
                type: type,
                currentPage: this.currentPage,
                limit: 20,
                status: '0'
            }
            this.$api.get('/number', { params }).then(res => {
                if (res.data.status == 0) {
                    if (type == 1 || type == 4) {
                        this.numberData = res.data.data.rows
                        console.log(this.numberData)
                        this.AllnumberData = res.data.data.rows
                        this.total = res.data.data.count
                    }
                }
            })
        },
        remove(id) {
            this.$api
                .post('/number', { id: String(id), type: '9' })
                .then(res => {
                    if (res.data.status == 0) {
                        this.getList(1)
                    }
                })
        },

        handleSelectionChange(arr) {
            this.selectData = arr
        },
        scrollTop(fast) {
            let list = this.$refs.chatList.children
            if (list.length == 0) return
            if (fast) {
                list[list.length - 1].scrollIntoView()
            } else {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    list[list.length - 1].scrollIntoView()
                }, 300)
            }
        },
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
        currentChange(val) {
            // alert(this.currentPage)
        },
        handleClick(value) {
            switch (value) {
                case '1':
                    let params = {
                        type: '1',
                        number: this.number,
                        startPrice: this.startPrice,
                        status: 1
                    }
                    this.getList(value, paramms)
                    break
                case '2':
                    break
                case '3':
                    break
                case '4':
                    break
            }
        },
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
    text-align: center;
    font-size: 0.2rem;
}
.row {
    height: 0.75rem;
    font-size: 0.2rem;
    /* height: 4rem; */
}
.row .cell {
    text-align: center;
    font-size: 0.2rem;
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
    height: calc(100% - 100px);
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
.numberList {
    width: 100%;
    height: calc(100% - 70px);
}
.pagination {
    background: #fff;
    padding: 23px 0px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.chatpage .chatlist {
    height: calc(100% - 40px);
}

.showNews {
    width: 100%;
    font-size: 0.1rem;
    color: #b2b2b2;
    height: 30px;
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
    z-index: 20;
    position: absolute;
    width: 100%;
    top: 0px;
    height: 200px;
    overflow: auto;
    padding: 5px;
    font-size: 12px;
    border-radius: 3px;
    background-color: #ffffff;
}
.logs #closeLogs {
    z-index: 30;
    font-size: 24px;
    position: absolute;
    right: 10px;
    top: 0px;
}
#closeLogs:active {
    color: #409eff;
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
