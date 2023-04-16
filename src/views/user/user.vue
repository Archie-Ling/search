<!-- 个人中心页面 展示用户头像,用户iduserId,手机号userPhone,用户积分userPoints -->
<template>
  <div id="app">
    <div class="user-profile">
      <el-row class="tac">
        <el-col :span="1">
          <div><p style="color:white;">.</p></div>
        </el-col>
        <!-- 页面主题内容 -->
        <el-col :span="22">
          <h2>个人中心</h2>
          <el-divider />
          <!--          <div class="content" style="color:white;">.</div>-->
          <!-- 个人信息 -->
          <el-row class="clock">
            <!--            <el-col :span="1"><div><p style="color:white;">.</p></div></el-col>-->
            <el-col :span="1" :xs="1"><div><p style="color:white;">.</p></div></el-col>
            <el-col :span="5" :xs="4">
              <div class="user-avatar">
                <el-avatar :size="150" :src="require('@/icons/svg/logo.png')" />
              </div>
            </el-col>
            <el-col :span="1" :xs="8"><div><p style="color:white;">.</p></div></el-col>
            <el-col :span="15" :xs="7">
              <div class="zhan" style="height: 10px;"><p style="color:white;">.</p></div>
              <div class="user-details"  >
                <div class="user-id">用户ID: {{ userInfo.userId }}</div><br>
                <!-- <div class="user-id">用户名: {{ userInfo.username }}</div><br> -->
                <div class="user-phone">手机号: {{ userInfo.userPhone }}</div><br>
                <div class="user-points"> 积  分  : {{ userInfo.userPoints }}</div><br>
                <div class="user-points"> 容  量  : {{ userInfo.userCapacity }}</div>
              </div>
              <div class="zhan" style="height: 10px;"><p style="color:white;">.</p></div>
              <!-- 购买积分按钮 点击后跳转到购买页面buy.vue -->
              <div style="">
                <el-button type="">
                  <router-link to="/buy/buy">购买积分</router-link>
                </el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>

      </el-row>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      userInfo: {
        username: '用户12542',
        userId: '',
        userPhone: '',
        userPoints: ''
      }
      // dialogVisible: false
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 使用axios 连接后端api，获取用户信息 /user/echo/{userId}
    getUserInfo() {
      const userId = 3
      const url = 'http://192.168.43.61:8081/user/echo/' + userId
      axios.get(url).then(res => {
        this.userInfo = res.data.data
      })
    },
    // 点击编辑资料按钮，可以跳出对话框，修改用户名，手机号
    editUserInfo() {
      this.$message({
        message: '修改成功',
        type: 'success'
      })
    }
  }
}
</script>
<style>
.clock{
  /*background-color: #005dba;*/
  border-radius: 10px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

</style>
