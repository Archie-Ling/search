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
            <el-button type="primary" @click="search()">搜索</el-button></el-col>
        </el-row>
        <el-divider />
        <el-table :data="tableData" @row-click="handleRowClick">
          <el-table-column prop="title" label="文章标题" />
          <el-table-column prop="pdfPages" label="页数" />
          <el-table-column prop="score" label="得分(按内容相关度排序)" sortable />
          <el-table-column prop="createtime" label="时间(按时间排序)" sortable />
          <el-table-column v-if="showAddressColumn" label="" width="0" prop="pdfId" />
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 15]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="margin:10px 0"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
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
      const pageSize = 5
      const userId = 0
      const docId = 0
      const searchType = 1
      const url = 'http://192.168.43.61:8081/search/' + searchString + '/' + pageNo + '/' + pageSize + '/' + userId + '/' + docId + '/' + searchType

      axios.get(url, {
        params: {
          searchString: this.searchText
        }
      }).then(response => {
        // 处理搜索结果
        this.tableData = response.data.data
        console.log(this.tableData)
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
  }

}

</script>
<style>

</style>
