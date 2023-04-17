<!-- eslint-disable indent -->
<template>
  <div class="login-container">
    <el-card shadow="always">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
          <img src="@/icons/svg/logo.png" alt="logo" class="loginlogo">
          <span class="titleh1">医 寻</span>
          <!-- <h3 class="title">登录界面</h3> -->
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Userphone"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <a style="color: rgba(69,69,68,0.53); " href="/password_reset?loginWay=mobile">忘记密码？</a>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录/注册</el-button>
        <label class="ant-checkbox-wrapper">
          <span class="ant-checkbox">
            <input type="checkbox" class="ant-checkbox-input" data-testid="protocolCheckBox" value="">
            <span class="ant-checkbox-inner" /></span>
          <span>   我已阅读并同意医寻<a href="https://www.yuque.com/terms" target="_blank"> 服务协议 </a>和<a href="https://app.nlark.com/mobile-app/pages/privacy-policy.html" target="_blank"> 隐私权政策 </a></span>
        </label>

<!--        <div class="tips">-->
<!--          <el-button type="mini" style="margin-right:50px;margin-left: 50px;">忘记密码</el-button>-->
<!--          &lt;!&ndash; el-button按钮 跳转到register用户注册页面 &ndash;&gt;-->
<!--          <el-button type="mini" style="margin-left: 50px;" @click="register">用户注册</el-button>-->

<!--        </div>-->

      </el-form>
    </el-card>
  </div>
</template>

<script>

import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: '13999999999',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined

    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid)
        if (valid) {
          // 验证登录逻辑
          // if(){
          //
          // }
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: '/search' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    register() {
      // this.$router.replace({ path: '/register/register' })
      this.$router.push({ path: '/register' })
    }
    /*  login() {
      axios.request(options).then(function(response) {
        console.log(response.data)
      }).catch(function(error) {
        console.error(error)
      })
    } */
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#92b6e2;
$light_gray: #000000;
$cursor: #000000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-card {
    background: white;
    border-radius: 10px;
    box-shadow: 15px 15px 10px rgba(0, 0, 0, 0.1);
    // 卡片位置
    position: absolute;
    top: 10%;
    width: 50%;
    margin: 0 auto;
    margin-top: 0;
    padding: 30px 30px 20px 30px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

    .el-card__body {
      padding: 0;
    }
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(89, 186, 255, 0.314);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fafafa;
$dark_gray:#889aa4;
$light_gray: #000000;
a{
  color: #005dba;
}
.login-container {
  /* min-height: 100%;
  width: 100%;
  overflow: hidden; */
  background-color: $bg;
  width: 100%;
  height: 100%;
  // background-image: url("../../assets/login_images/login.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 70px 35px 35px 35px;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    margin-top: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-bottom: 30px;
    text-align: center;
    //align-items: center;
    // 将loginlogo放在卡片中，和医寻字体并排同等大小,居中显示
    .loginlogo {
      position: absolute;
      top: 0;
      left: 0;
      width: 70px;
      height: 70px;
      margin: 0 auto;
      margin-top: 0;
      margin-left: 50px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      // 垂直居中
      display: inline;
      vertical-align: middle;
    }
    //居中显示 和loginlogo在同一排同等大小垂直居中
    .titleh1 {
      color:#0093d5;
      font-size: 50px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 100px;
      margin: 0 auto;
      margin-top: 0;
      font-family: "Hiragino Sans GB";
      padding: 30px 30px 20px 30px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      // 垂直居中
      vertical-align: middle;
      display: inline;
    }
    .title {
      font-size: 26px;
      // color: $light_gray;
      color: #409eff;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
