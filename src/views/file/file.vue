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
        <el-button type="primary"  plain @click="addTableData">添加文件夹</el-button>
        <!-- elementUI 表格 -->
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="文件夹名"
          >
            <template slot-scope="scope">
              <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="larkui-icon larkui-icon-book-type-default icon-svg larkui-tooltip index-module_size_wVASz" data-name="BookTypeDefault" style="width: 18px; height: 18px; min-width: 18px;text-align: center">
                <g fill="none" fill-rule="evenodd">
                  <path d="M4.75 1.267h10.5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4.75a2 2 0 0 1-2-2v-14a2 2 0 0 1 2-2Z" fill="" />
                  <path d="M4.75 1.267h2.215v18H5.75a3 3 0 0 1-3-3v-13a2 2 0 0 1 2-2Z" fill="" />
                  <path stroke="#0093D5" d="M7.25 1.1v17.667" />
                  <path stroke="#0093D5" stroke-linecap="round" stroke-linejoin="round" d="M10.85 5.394h3.4" />
                  <path d="M4.25 1.267h11.5a1.5 1.5 0 0 1 1.5 1.5v14.5a1.5 1.5 0 0 1-1.5 1.5H4.25a1.5 1.5 0 0 1-1.5-1.5v-14.5a1.5 1.5 0 0 1 1.5-1.5Z" stroke="#0093D5" />
                </g>
              </svg>
              <span style="margin-left: 5px;text-align: center;vertical-align:middle">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="size"
            label="文件夹大小"
            width="90"
          />
          <el-table-column
            label=""
            align="right"
            padding-right="30"
          >
            <template slot-scope="scope">
              <el-dropdown trigger="click" placement="bottom-start">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1" @click.native="handleEdit(scope.$index, scope.row)">编辑</el-dropdown-item>
                  <el-dropdown-item command="2" divided @click.native="handleDelete(scope.$index, scope.row)">删除</el-dropdown-item>
                  <el-dropdown-item command="3" divided @click.native="handleDetail(scope.$index, scope.row)">详情</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!-- el-dialog嵌套对话框 点击"添加"按钮后弹出对话框提示“是否要新建文件夹”，点击确定后再弹出对话框对文件名进行编辑 -->
        <el-dialog
          title="新建文件夹"
          :visible.sync="outerVisible"
        >
          <template #default>
            <el-form>
              <span>本次创建文件夹需要花费10积分,是否要新建文件夹</span>
            </el-form>
          </template>
          <template #footer>
            <div slot="footer" class="dialog-footer">
              <el-button @click="outerVisible = false">取消</el-button>
              <el-button type="primary" @click="FirstDialog">确定</el-button>
            </div>
          </template>

        </el-dialog>

        <!-- 编辑对话框  custom-class="mydialog"-->
        <el-dialog
          title="添加文件夹"
          :visible.sync="showAddDialog"
        >
          <template #default>
            <el-form :model="editData">
              <el-form-item label="文件名">
                <el-input v-model="editData.name" />
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showAddDialog = false">取消</el-button>
              <el-button type="primary" @click="submitAddData">确定</el-button>
            </div>
          </template>
        </el-dialog>
        <el-dialog
          title="编辑文件夹"
          :visible.sync="showEditDialog"
        >
          <template #default>
            <el-form :model="editData">
              <el-form-item label="文件名">
                <el-input v-model="editData.name" />
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showEditDialog = false">取消</el-button>
              <el-button type="primary" @click="submitEditData">确定</el-button>
            </div>
          </template>
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
      showEditDialog: false,
      outerVisible: false,
      showAddDialog: false,
      // 编辑对话框中的数据
      editData: {
        index: 0,
        // docId: '',
        name: 'x'
      },
      // 表格数据
      tableData: []
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData() {
      // 使用aioxs获取数据
      const userId = 3
      const url = 'http://192.168.43.61:8081/doc/search/' + userId
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
      this.editData.name = ''
      this.outerVisible = true
    },
    // 使用axios从后端api删除一行
    handleDelete(index, row) {
      console.log(index, row)
      const userId = 3
      const docId = row.docId
      const url = 'http://192.168.43.61:8081/doc/delete/' + userId + '/' + docId
      axios.delete(url).then(res => {
        console.log('成功' + res.data.data)
        console.log(res.data.mes)
        this.getTableData()
      }).catch(err => {
        console.log(err)
      })
      // 点击删除后 上方弹出提示框 提示删除成功
      this.$message({
        message: '删除成功',
        type: 'success'
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
        name: row.name
      }
      // 显示编辑对话框
      this.showEditDialog = true
    },
    // 提交表单数据
    submitEditData() {
      // 隐藏编辑对话框
      this.showEditDialog = false
      //  将编辑成功的数据使用aioxs的put方法发送params方法传参给后端 传参为docName,uesrId,docId docId为后端传回tableData中的docId并且是点击编辑按钮时传入的row.docId
      const url = 'http://192.168.43.61:8081/doc/update'
      const userId = 3
      // 获取点击编辑按钮时传入的row.docId
      console.log('edit')
      const docId = this.editData.docId
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
    FirstDialog() {
      this.showAddDialog = true
      this.editData.name = ''
      this.outerVisible = false
    },
    submitAddData() {
      // 更新tableData数组中的相应行
      // 隐藏编辑对话框
      this.showAddDialog = false
      //  将编辑成功的数据使用aioxs的put方法发送params方法传参给后端 传参为docName,uesrId,docId docId为后端传回tableData中的docId并且是点击编辑按钮时传入的row.docId
      const url = 'http://192.168.43.61:8081/doc/add'
      const userId = 3
      // 获取点击编辑按钮时传入的row.docId
      axios.post(url, null, {
        params: {
          docName: this.editData.name,
          userId: userId
        }
      }).then(res => {
        console.log('成功' + res.data.data)
        console.log(res.data.mes)
        this.getTableData()
      }).catch(err => {
        console.log(err)
      })
      // 添加成功后上方弹出消息 提示添加成功
      this.$message({
        message: '添加成功',
        type: 'success'
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
  }
}
</script>
<style lang="scss">
svg{
  vertical-align:middle;
}
.mydialog{
  width: 30%;
  height: 30%;
  overflow: scroll;
  input{

  }
}
// 当鼠标移动到表格中的某一行时，才显示操作按钮
.el-icon-arrow-down{
  display: none;
  padding-right: 30px;
}
.el-table__row:hover .el-icon-arrow-down{
  display: inline-block;
}

</style>
