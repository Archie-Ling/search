<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <el-row class="tac">
      <el-col :span="1">
        <div><p></p></div>
      </el-col>
      <!-- 页面主题内容 -->
      <el-col :span="22">
        <h2>上传分析</h2>
        <div class="content">
          <!-- 上传 https://jsonplaceholder.typicode.com/posts/-->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            accept=".pdf"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">可批量上传PDF文件</div>
          </el-upload>
          <!-- 搜索 -->
          <el-divider />
          <el-row>
            <el-input
              v-model="watchSearch"
              placeholder="请输入文章名"
              size="small"
            />
          </el-row>
          <el-divider />
          <!-- :data="paginationData" -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="listOne" label="文章名" />
            <el-table-column
              prop="state"
              label="状态"
              align="center"
            />
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <!-- <el-button v-if="!scope.row.isEgdit" type="primary" size="small" @click="edit(scope.$index,scope.row)" icon="el-icon-edit"></el-button> -->
                <!-- <el-button v-if="scope.row.isEgdit" type="success" size="small" @click='editSuccess(scope.$index,scope.row)' icon="el-icon-check" ></el-button> -->
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="deleteRow(scope.$index)"
                />
              </template>
            </el-table-column>
          </el-table>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '1',
      isCollapse: false,
      activeIndex: '2',
      tableData: [
        {
          id: '1',
          listOne: '慢性阻塞性肺疾病患者自我管理水平及影响因素研究',
          state: '已分析',
          add_time: '2023-02-16'
        },
        {
          id: '2',
          listOne: 'boy',
          listTwo: '2',
          listThree: '3',
          listFour: '4',
          listFive: '5',
          listSix: '6'
        },
        {
          id: '3',
          listOne: 'six',
          listTwo: '2',
          listThree: '3',
          listFour: '4',
          listFive: '5',
          listSix: '6'
        },
        {
          id: '4',
          listOne: 'sun',
          listTwo: '2',
          listThree: '3',
          listFour: '4',
          listFive: '5',
          listSix: '6'
        }

      ],
      total: 0, // 数组总数
      currentPage: 1, // 当前页
      paginationData: [], // 分页数组
      pagesize: 5, // 每页数据
      searchContent: '', // 搜索内容
      stashList: [],
      watchSearch: '',
      fileList: [
        // 上传文件展示
        {
          name: '慢性阻塞性肺疾病患者自我管理水平及影响因素研究.pdf'
        },
        {
          name: '42.pdf'
        }
      ]
    }
  },
  watch: {
    watchSearch: {
      handler(newValue, oldValue) {
        const self = this
        if (newValue) {
          // 这里要从暂存的所有数据中过滤 放到展示的数组中
          self.tableData = self.stashList.filter((item) => {
            return item.listOne.includes(newValue)
          })
        } else {
          self.tableData = self.stashList
        }
        self.tableList()
      },
      deep: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // 一般这里会有一个axios请求
      this.handleCurrentChange(this.currentPage)
      this.stashList = this.tableData // 暂存数组  当搜索为空时候  数组展示所有数据
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.tableList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.tableList()
    },
    tableList() {
      this.paginationData = [] // 分页数组  tableData 所有的数据
      for (
        var j = this.pagesize * (this.currentPage - 1);
        j < this.pagesize * this.currentPage;
        j++
      ) {
        if (this.tableData[j]) {
          this.paginationData.push(this.tableData[j])
        }
      }
      this.total = this.tableData.length
    },

    goUrl(url) {
      // 跳转页面覆盖当前页面
      window.open(url, '_self')
    },
    deleteRow(index) {
      // 要删除的行号，这里删除第二行
      this.tableData.splice(index, 1)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    }
  }
}
</script>
