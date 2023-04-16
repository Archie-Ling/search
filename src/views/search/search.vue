<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <el-row class="tac">
      <el-col :span="1">
        <div><p>.</p></div>
      </el-col>
      <!-- 页面主题内容 -->
      <el-col :span="22">
        <h2>检索页面</h2>
        <div class="content" style="color: white;">.</div>
        <el-row>
          <el-col :span="18">
            <el-input v-model="searchText" placeholder="请输入搜索内容" /></el-col>
          <el-col :span="4" offset="1">
            <el-button type="primary" :enter-search="enterSearch()" @click="search()">搜索</el-button></el-col>
        </el-row>
        <el-divider />

        <el-skeleton >
          <template slot="template">
            <div style="padding: 14px;">
              <el-skeleton-item variant="p" style="width: 100%" />
<!--              eslint-disable-next-line vue/no-unused-vars -->
              <div v-for=" n in 8" style="margin:20px">
                <div style="display: flex; align-items: center;justify-content: space-between;">
                  <el-skeleton-item variant="text" class="item" />
                  <el-skeleton-item variant="text"  class="item"/>
                  <el-skeleton-item variant="text"  class="item"/>
                  <el-skeleton-item variant="text"  class="item"/>
                </div>
              </div>
            </div>
          </template>
        </el-skeleton>

<!--        <el-table :data="tableData" @row-click="handleRowClick">-->
<!--          <el-table-column prop="title" label="文章标题" />-->
<!--          <el-table-column prop="pdfPages" label="页数" />-->
<!--          <el-table-column prop="score" label="内容相关度" sortable />-->
<!--          <el-table-column prop="createtime" label="上传时间" sortable />-->
<!--          <el-table-column v-if="showAddressColumn" label="" width="0" prop="pdfId" />-->
<!--        </el-table>-->
<!--        &lt;!&ndash; 分页 &ndash;&gt;-->
<!--        <el-pagination-->
<!--          background-->
<!--          layout="prev, pager, next"-->
<!--          :total="total"-->
<!--          style="margin:10px 0;text-align: center"-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--        />-->
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      searchText: '',
      tableData: [], // 表格数据
      currentPage: 1, // 当前页
      pagesize: 5, // 每页显示条数
      total: 0, // 总条数
      showAddressColumn: false

    }
  },
  created() {
    this.search()
  },
  methods: {
    // 分页组件连接后端api

    // 表格行点击事件 并带参跳转到details.vue页面
    handleRowClick(row) {
      this.$router.push({
        path: '/details/details',
        query: {
          title: row.title,
          pdfPages: row.pdfPages,
          score: row.score,
          createtime: row.createtime,
          pdfId: row.pdfId,
          searchString: this.searchText
        }
      })
      console.log('跳转到详情页')
    },

    // 搜索
    search() {
      // 调用后端API接口进行搜索
      const searchString = this.searchText
      const pageNo = 0
      const pageSize = 10
      const userId = 3
      const docId = 0
      const searchType = this.searchType
      const url = 'http://192.168.43.61:8081/search/' + searchString + '/' + pageNo + '/' + pageSize + '/' + userId + '/' + docId + '/' + searchType

      axios.get(url, {
        params: {
          searchString: this.searchText
        }
      }).then(response => {
        // 处理搜索结果
        this.tableData = response.data.data
        console.log(this.tableData)
        // 返回分页信息 total pagesize currentpage
        this.total = response.data.total
        this.pagesize = response.data.pageSize
        this.currentPage = response.data.currentPage
      }).catch(error => {
        // 处理错误
        console.log(error)
      })
      console.log('搜索' + this.searchText)
      console.log(searchString + pageNo + pageSize + userId + docId + searchType)
      console.log(url + 'url')
    },
    // 搜索框回车事件
    enterSearch() {
      this.search()
    }
    // 分页组件连接后端api

  }

}

</script>
<style>
.item{
  width: 20%;
  height: 20px
}
</style>
