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
            <el-button type="primary" @keyup.enter="enterSearch()" @click="search()">搜索</el-button></el-col>
        </el-row>
        <el-divider />
        <template v-if="tableData.length > 0">
          <el-table :data="tableData" @row-click="handleRowClick">
            <el-table-column prop="title" label="文章标题" />
            <el-table-column prop="pdfPages" label="页数" />
            <el-table-column prop="score" label="内容相关度" sortable />
            <el-table-column prop="createtime" label="上传时间" sortable />
            <el-table-column v-if="showAddressColumn" label="" width="0" prop="pdfId" />
          </el-table>
          <!-- 分页 每页显示数量size和总数total从后端获取 然后将后端传回的数据分页显示在表格中 -->
          <el-pagination
            :current-page="currentPage"
            background
            layout="prev, pager, next"
            :total="this.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="text-align: center"
          />
        </template>

        <template v-else>
          <el-skeleton>
            <template slot="template">
              <div style="padding: 14px;">
                <el-skeleton-item variant="p" style="width: 100%" />
                <!--              eslint-disable-next-line vue/no-unused-vars -->
                <div v-for=" n in 8" :key="n" style="margin:20px">
                  <div style="display: flex; align-items: center;justify-content: space-between;">
                    <el-skeleton-item variant="text" class="item" />
                    <el-skeleton-item variant="text" class="item" />
                    <el-skeleton-item variant="text" class="item" />
                    <el-skeleton-item variant="text" class="item" />
                  </div>
                </div>
              </div>
            </template>
          </el-skeleton>
        </template>
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
      currentPage: 0, // 当前页
      pageSize: 5, // 每页显示条数
      total: 20, // 总条数
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
      const pageNo = this.currentPage
      const pageSize = this.pageSize
      const userId = 3
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
        // 返回分页信息 total
        this.total = 20
      }).catch(error => {
        // 处理错误
        console.log(error)
      })
      console.log('搜索' + this.searchText)
      console.log(url + 'url')
    },
    // 搜索框回车事件
    enterSearch() {
      this.search()
    },
    // 点击分页器中的每页显示数量，触发size-change事件，调用handleSizeChange()方法
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.search()
    },
    // 点击分页器中的页码，触发current-change事件，调用handleCurrentChange()方法
    handleCurrentChange(pageNo) {
      this.currentPage = pageNo
      this.search()
    }
  }

}

</script>
<style>
.item{
  width: 20%;
  height: 20px
}
</style>
