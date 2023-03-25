<template>
  <div id="app">
    <el-row class="tac">
      <el-col :span="1">
        <div><p>.</p></div>
      </el-col>
      <!-- 页面主题内容 -->
      <el-col :span="22">
        <h2>详情</h2>
        <div class="content">
          <el-row>
            <el-col :span="24">
              <div>
                <el-link type="primary" @click="showPdf">{{ $route.query.row.listOne }}.pdf</el-link>
              </div>
            </el-col>
          </el-row>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {
    console.log(this.$route.query.row)
  }
}
</script>
