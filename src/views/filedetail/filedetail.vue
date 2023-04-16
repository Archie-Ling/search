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
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          :height="tableHeight"
          @selection-change="handleSelectionChange"

        >
          <!-- 表格第一列为docId -->
          <el-table-column
            type="selection"
            width="55"
          />
<!--          <el-table-column-->
<!--            prop="pdfId"-->
<!--            label="id"-->
<!--            width="55"-->
<!--          />-->
          <el-table-column
            prop="pdfTitle"
            label="文献名"
            show-overflow-tooltip="true"
            min-width="160"
          />
          <!-- 表格最后一列为操作,有跳转到文献详情界面detail.vue,有移动到另一个文件夹操作 -->
          <el-table-column
            prop="pdfAuthor"
            label="作者"
            width="80"
          />
          <el-table-column label="ww" >
          <template slot-scope="scope">
            <!-- 编辑按钮 点击按钮弹窗显示docId,pdfId,pdfTitle 并且可以修改 -->
            <el-popover
              placement="right"
              width="10"
              v-model="visible">
              <div>
                <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              </div>
              <i class="el-icon-caret-bottom" slot="reference"></i>
            </el-popover>

<!--            <el-button-->
<!--              size="mini"-->
<!--              type="primary"-->
<!--              @click="handleEdit(scope.$index, scope.row)"-->
<!--            >编辑</el-button>-->

            <!-- 移动按钮 点击按钮弹窗显示请求后端显示文件夹信息 -->
            <!-- <el-button
              size="mini"
              type="success"
              @click="handleMove(scope.$index, scope.row)"
            >移动</el-button> -->
          </template>
        </el-table-column>
        </el-table>
        <!-- 分页显示 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
        />
        <!-- 点击编辑按钮弹窗显示docId,pdfId,pdfTitle 并且可以修改-->
        <el-dialog
          title="编辑数据"
          :visible.sync="showEditDialog"
          width="30%"
        >
          <el-form :model="editData" label-width="80px">
            <el-form-item label="docId">
              <el-input v-model="editData.docId" ></el-input>
            </el-form-item>
            <el-form-item label="pdfId">
              <el-input v-model="editData.pdfId" disabled></el-input>
            </el-form-item>
            <el-form-item label="pdfTitle">
              <el-input v-model="editData.pdfTitle"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showEditDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
          </span>
        </el-dialog>
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
      userId: '3',
      // 表格数据
      tableData: [
      ],
      // 选中的数据
      multipleSelection: [],
      // 总页数
      total: '',
      // 当前页
      currentPage: 1,
      // 每页显示的条数
      pageSize: 10,
      // 编辑对话框是否显示
      showEditDialog: false,
      // 编辑对话框中的数据
      editData: {
        index: 0,
        docId: '',
        pdfId: '',
        pdfTitle: '',
        newDocId: ''
      }

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
    /* handleMove() {
      // 使用axios通过后端api实现弹窗显示文件夹信息，点击文件夹可以将改该文献移动到文件夹里
    }, */
    // 编辑 使用axios post从后端api编辑一行数据 使用query传参,在点完编辑按钮后弹出窗口进行编辑
    handleEdit(index, row) {
      console.log('编辑')
      console.log(index)
      console.log(row)
      // 将点击的行的数据赋值给editData
      this.editData.index = index
      this.editData.docId = row.docId
      this.editData.pdfId = row.pdfId
      this.editData.pdfTitle = row.pdfTitle
      // 将弹窗显示
      this.showEditDialog = true
    },
    // 编辑提交
    handleEditSubmit() {
      console.log('编辑提交')
      console.log(this.editData)
      console.log(this.userId)
      // 使用axios post 从后端api编辑一行数据 使用query传参
      const url = 'http://192.168.43.61:8081/file/update'
      axios({
        method: 'post',
        url: url,
        query: {
          docId: this.editData.docId,
          pdfId: this.editData.pdfId,
          pdfTitle: this.editData.pdfTitle,
          userId: this.userId,
          newDocId: ''
        }
      }).then(res => {
        console.log(res)
        // 将获取到的数据赋值给tableData
        console.log('成功')
        console.log(res.data)
        // 将弹窗隐藏
        this.showEditDialog = false
        // 将修改后的数据赋值给tableData
        this.tableData[this.editData.index].pdfTitle = this.editData.pdfTitle
      }).catch(err => {
        console.log('失败')
        console.log(err)
      })
    }

  }
}
</script>
