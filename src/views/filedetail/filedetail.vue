<template>
  <div id="app">
    <el-row class="tac">
      <el-col :span="1">
        <div><p style="color:white;">.</p></div>
      </el-col>
      <!-- 页面主题内容 -->
      <el-col :span="22">
        <h2>文件夹详情</h2>
        <div class="content" style="color:white;">.</div>
        <!-- 多选文献后批量移动到其他文件夹 按钮 -->
        <el-button type="primary" size="mini" @click="handleDelete">移动</el-button>
        <el-divider />
        <!-- elementUI 可选择表格 -->
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <!-- 表格第一列为docId -->
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="pdfId"
            label="id"
            width="180"
          />
          <el-table-column
            prop="pdfTitle"
            label="文献名"
            width="180"
          />
          <el-table-column
            prop="pdfAuthor"
            label="作者"
            width="180"
          />
          <!-- 表格最后一列为操作,有跳转到文献详情界面detail.vue,有移动到另一个文件夹操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 详情按钮 点击按钮跳转到detail.vue页面 -->
              <el-button
                size="mini"
                type="primary"
                @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button>
              <!-- 移动按钮 点击按钮跳转到file.vue页面 -->
              <el-button
                size="mini"
                type="success"
                @click="handleMove(scope.$index, scope.row)"
              >移动</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页显示 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
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
      // 从file.vue页面传递过来的参数
      docId: '',
      userId: '',
      // 表格数据
      tableData: [
      ],
      // 选中的数据
      multipleSelection: [],
      // 总页数
      total: ''
    }
  },
  mounted() {
    // 接收file.vue页面传输过来的参数
    this.docId = this.$route.query.docId
    this.userId = this.$route.query.userId
    // 测试 浏览器控制台打印file.vue传递过来的参数
    console.log('测试')
    console.log(this.docId)
    console.log(this.userId)
    // 页面加载时获取数据
    this.getdata()
  },
  methods: {
    // 使用使用axios从后端api获取文件夹里面的文献信息 /file/search/{page}/{size}
    getdata() {
      const page = 1
      const size = 10
      const url = 'http://192.168.43.61:8081/file/search/' + page + '/' + size
      console.log(url)
      // 使用axios从后端api获取数据 get请求 params传参数
      axios.get(url, {
        params: {
          docId: this.docId,
          userId: this.userId
        }
      }).then(res => {
        console.log(res)
        // 将获取到的数据赋值给tableData
        console.log('成功')
        console.log(res.data)
        this.tableData = res.data.data.data
        this.total = res.data.data.all
        console.log(this.tableData)
      }).catch(err => {
        console.log('失败')
        console.log(err)
      })
    },
    // 选择框
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 移动
    handleDelete() {
      console.log(this.multipleSelection)
    },
    // 详情
    handleDetail() {
      console.log(this.multipleSelection)
    }
  }
}
</script>
