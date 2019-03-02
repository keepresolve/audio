<template>
  <el-container id="login">
    <el-main class="form">
      <el-header class="header">手机号拍卖网站</el-header>
      <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm">
        <el-form-item prop="user">
          <el-input v-model.number="loginForm.user" placeholder="请输入用户名">
            <template slot="prepend">
              <div style="width:80px">用户名</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="loginForm.pass"
            autocomplete="off"
            placeholder="输入密码"
            clearable
          >
            <template slot="prepend">
              <div style="width:80px">输入密码</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!islogin" prop="checkPass">
          <el-input
            type="password"
            v-model="loginForm.checkPass"
            autocomplete="off"
            placeholder="请再次输入密码"
            clearable
          >
            <template slot="prepend">
              <div style="width:80px">输入密码</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!islogin" prop="unit">
          <el-input v-model.number="loginForm.unit" placeholder="请输入单位">
            <template slot="prepend">
              <div style="width:80px">单位</div>
            </template>
          </el-input>
        </el-form-item>
        <el-col>
          <el-button v-if="islogin" type="primary" :loading="saveLock" @click="submitForm(1)">登陆</el-button>
          <el-button v-if="!islogin" type="primary" :loading="saveLock" @click="submitForm(0)">注册</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-col>
        <el-col>
          <el-button v-if="!islogin" type="text" :loading="saveLock" @click="islogin=true">已有账号去登陆</el-button>
          <el-button v-if="islogin" type="text" :loading="saveLock" @click="islogin=false">无账号去注册</el-button>
        </el-col>
      </el-form>
    </el-main>
  </el-container>
</template><style >
.el-input-group__prepend {
    padding: 0 5px;
}
.el-form-item__error {
    left: 91px;
}
</style>
<style scoped>
#login {
    height: 100%;
    width: 100%;
    background: url('../assets/3.jpg') no-repeat;
    background-size: cover;
    background-color: #111;
}
.header {
    text-align: center;
    line-height: 60px;
    font-size: 30px;
    color: #7e7e7e;
}
.form {
    color: #7e7e7e;
    width: 100%;
    max-width: 600px;
    min-width: 350px;
    margin: 0 auto;
    padding: 20px 10px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
<script>
export default {
    data() {
        var checkAge = (rule, value, callback) => {
            if (value.replace(/ /g, '') == '') {
                return callback(new Error('用户名不能为空'))
            }
            callback()
        }
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.loginForm.checkPass !== '') {
                    this.$refs.loginForm.validateField('checkPass')
                }
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.loginForm.pass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                pass: '',
                checkPass: '',
                user: '',
                unit: ''
            },
            rules2: {
                pass: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    {
                        required: true,
                        validator: validatePass2,
                        trigger: 'blur'
                    }
                ],
                user: [
                    { required: true, validator: checkAge, trigger: 'blur' }
                ],
                unit: [
                    {
                        required: true,
                        message: '请输入所属单位'
                    }
                ]
            },
            islogin: false,
            saveLock: false
        }
    },
    watch: {
        islogin() {
            this.resetForm()
        }
    },
    methods: {
        submitForm(type) {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    let params = {
                        passWord: this.loginForm.pass,
                        userName: this.loginForm.user,
                        unit: this.loginForm.unit,
                        type
                    }
                    this.saveLock = true
                    try {
                        let result = await this.$api.post('/login', params)
                        if (result.data.status == 0) {
                            this.$message({
                                type: 'success',
                                message: result.data.info
                            })

                            if (type == 1) {
                                sessionStorage.token = result.data.data.token
                                sessionStorage.userName =
                                    result.data.data.userName
                                this.$router.push('/index')
                            }
                        } else {
                            this.$message({
                                type: 'error',
                                message: result.data.info
                            })
                        }
                        this.saveLock = false
                    } catch (error) {
                        if (error) {
                            this.saveLock = false
                            this.$message({
                                type: 'error',
                                message: error.message
                            })
                        }
                    }
                } else {
                    return false
                }
            })
        },
        resetForm() {
            this.$refs.loginForm.resetFields()
        }
    }
}
</script>