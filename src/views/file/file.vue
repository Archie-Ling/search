<template>
  <div id="app">
    <el-row class="tac">
      <el-col :span="1">
        <div><p style="color:white;">.</p></div>
      </el-col>
      <!-- 页面主题内容 -->
      <el-col :span="22">
        <h2>文献归档</h2>
        <div class="content" style="color:white;">.</div>
        <!-- 添加按钮 可以添加表格一行 -->
        <el-button type="primary" @click="addTableData">添加</el-button>
        <!-- elementUI 表格 -->
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <!-- 表格第一列为docId -->
          <el-table-column
            prop="docId"
            label="id"
            width="180"
          />
          <el-table-column
            prop="name"
            label="文件名"
          />

          <!-- 表格最后一列为操作，有删除，编辑，进入详情按钮 -->

          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- “编辑”按钮点击后会弹窗然后可以修改file_name的数据 -->
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>

              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
              <!-- 详情按钮 点击按钮跳转到filedetail.vue页面 -->
              <el-button
                size="mini"
                type="primary"
                @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button>

            </template>
          </el-table-column>
        </el-table>
        <!-- 编辑对话框 -->
        <el-dialog
          title="编辑数据"
          :visible.sync="showEditDialog"
        >
          <el-form :model="editData">
            <el-form-item label="id">
              <el-input v-model="editData.docId" />
            </el-form-item>
            <el-form-item label="文件名">
              <el-input v-model="editData.name" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showEditDialog = false">取消</el-button>
            <el-button type="primary" @click="submitEditData">确定</el-button>
          </div>
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

      // 编辑对话框是否显示
      showEditDialog: false,
      // 编辑对话框中的数据
      editData: {
        index: 0,
        docId: '',
        name: ''
      },
      // 表格数据
      tableData: []
    }
  },
  mounted() {
    this.getTableData()
    this.addTableData()
  },
  methods: {
    // 获取表格数据
    getTableData() {
      // 使用aioxs获取数据
      const userId = 3
      const url = 'http://192.168.43.222:8081/doc/search/' + userId
      axios.get(url).then(res => {
        this.tableData = res.data.data.data
        console.log('成功' + this.tableData)
        console.log(this.tableData)
      }).catch(err => {
        console.log(err)
      })
    },
    // 使用axios从后端api添加一行数据 使用params传参
    // 在点完添加按钮后页面上方弹出
    addTableData() {
      const url = 'http://192.168.43.222:8081/doc/add'
      const userId = 3
      axios.post(url, null, {
        params: {
          docName: '',
          userId: userId,
          docId: '',
          // 用于表示文件夹里面的数据条数
          size: ''
        }
      }).then(res => {
        console.log('成功' + res.data.data)
        console.log(this.tableData)
        this.getTableData()
      }).catch(err => {
        console.log(err)
      })
    },
    // 使用axios从后端api删除一行
    handleDelete(index, row) {
      console.log(index, row)
      const userId = 3
      const docId = row.docId
      const url = 'http://192.168.43.222:8081/doc/delete/' + userId + '/' + docId
      axios.delete(url).then(res => {
        console.log('成功' + res.data.data)
        console.log(res.data.mes)
        this.getTableData()
      }).catch(err => {
        console.log(err)
      })
    },
    /*  handleDelete(index, row) {
      console.log(index, row)
      this.tableData.splice(index, 1)
    }, */
    // 使用axios从后端api编辑一行数据 使用params传参,在点完编辑按钮后弹出窗口进行编辑
    handleEdit(index, row) {
      // 将当前行的数据绑定到表单控件中
      this.editData = {
        index: index,
        docId: row.docId,
        docName: row.name
      }
      // 显示编辑对话框
      this.showEditDialog = true
    },
    // 提交表单数据
    submitEditData() {
      // 更新tableData数组中的相应行
      this.tableData[this.editData.index] = {
        name: this.editData.name,
        docId: this.editData.docId
      }
      // 隐藏编辑对话框
      this.showEditDialog = false
      //  将编辑成功的数据使用aioxs的put方法发送params方法传参给后端 传参为docName,uesrId,docId docId为后端传回tableData中的docId并且是点击编辑按钮时传入的row.docId
      const url = 'http://192.168.43.222:8081/doc/update'
      const userId = 3
      // 获取点击编辑按钮时传入的row.docId
      const docId = this.editData.docId
      console.log('test' + docId)
      axios.put(url, null, {
        params: {
          docName: this.editData.name,
          userId: userId,
          docId: docId
        }
      }).then(res => {
        console.log('成功' + res.data.data)
        console.log(res.data.mes)
        this.getTableData()
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击详情按钮跳转到filedetail.vue页面
    handleDetail(index, row) {
      console.log(index, row)
      this.$router.push({
        path: '/filedetail/filedetail',
        query: {
          docId: row.docId,
          userId: 3
        }
      })
    }
    /*  handleDetails(index, row) {
      console.log(index, row)
    } */

  }
}
</script>
