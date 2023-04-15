<!-- 用户注册 -->
<template>
  <div class="register">
    <div class="register-box">
      <div class="register-title">用户注册</div>
      <div class="register-form">
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="registerForm.confirmPassword" placeholder="请再次输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {
      // 点击注册后弹出注册成功提示，三秒后返回返回登录页面
      this.$message({
        message: '注册成功',
        type: 'success'
      })
      setTimeout(() => {
        this.$router.push('/login')
      }, 3000)
      /* this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.$http.post('/user/register', this.registerForm).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              this.$router.push('/login')
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      }) */
    },
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .register-box {
    width: 400px;
    height: 400px;
    border: 1px solid #ebeef5;
    border-radius: 5px;
    .register-title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      border-bottom: 1px solid #ebeef5;
    }
    .register-form {
      width: 100%;
      height: 350px;
      padding: 20px;
    }
  }
}
</style>
