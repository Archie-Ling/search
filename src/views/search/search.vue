<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <el-row class="tac">
      <el-col :span="1">
        <div><p /></div>
      </el-col>
      <!-- 页面主题内容 -->
      <el-col :span="22">
        <h2>检索页面</h2>
        <div class="content">
          <el-row>
            <el-input
              v-model="watchSearch"
              placeholder="请输入文章标题"
              size="small"
            />
          </el-row>
          <el-divider />
          <el-table :data="paginationData" style="width: 100%">
            <el-table-column
              prop="id"
              label="展开"
              align="center"
              type="expand"
            >
              <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                  <el-form-item label="摘要">
                    <span>{{ props.row.digest_one }}</span>
                  </el-form-item>
                  <el-form-item label="命中页码">
                    <span>{{ props.row.keypage }}</span>
                  </el-form-item>
                  <el-form-item label="命中分数">
                    <span>{{ props.row.keyscore }}</span>
                  </el-form-item>
                  <el-form-item label="添加时间">
                    <span>{{ props.row.add_time }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="listOne"
              label="文章名"
              align="center"
            />
            <el-table-column
              prop="listTwo"
              label="listTwo"
              align="center"
            />
            <!--  -->
            <!-- <el-table-column prop="listFour" label="listFour" align="center"></el-table-column> -->
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  size="small"
                  icon=""
                  @click="goToDetails(scope.row)"
                >详情</el-button>
                <el-button
                  type="primary"
                  size="small"
                  icon=""
                  @click="addToFavorites(scope.row)"
                >收藏</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="margin: 10px 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
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
      activeIndex: '1',
      tableData: [
        {
          id: '1',
          listOne: '慢性阻塞性肺疾病患者自我管理水平及影响因素研究',
          listTwo: '2',
          digest_one:
                  '2COPD患者作为调查对象。使用抑郁自评量表、社会支持量表、COPD患者生活质量调查表及自编的COPD患者自我管理量表对其进行调查',
          keypage: '1 5 7 9',
          keyscore: '5.2312',
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
        },
        {
          id: '5',
          listOne: 'girl',
          listTwo: '2',
          listThree: '3',
          listFour: '4',
          listFive: '5',
          listSix: '6'
        },
        {
          id: '5',
          listOne: 'one',
          listTwo: '2',
          listThree: '3',
          listFour: '4',
          listFive: '5',
          listSix: '6'
        },
        {
          id: '6',
          listOne: 'two',
          listTwo: '2',
          listThree: '3',
          listFour: '4',
          listFive: '5',
          listSix: '6'
        },
        {
          id: '7',
          listOne: 'three',
          listTwo: '2',
          listThree: '3',
          listFour: '4',
          listFive: '5',
          listSix: '6'
        },
        {
          id: '8',
          listOne: 'five',
          listTwo: '2',
          listThree: '3',
          listFour: '4',
          listFive: '5',
          listSix: '6'
        },
        {
          id: '9',
          listOne: 'six',
          listTwo: '2',
          listThree: '3',
          listFour: '4',
          listFive: '5',
          listSix: '6'
        },
        {
          id: '10',
          listOne: 'seven',
          listTwo: '2',
          listThree: '3',
          listFour: '4',
          listFive: '5',
          listSix: '6'
        },
        {
          id: '11',
          listOne: '1',
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
      watchSearch: ''
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
    search() {
      if (this.searchContent) {
        this.tableData = this.stashList // 解决评论第一条bug
        this.tableData = this.tableData.filter((item) => {
          return item.listOne.includes(this.searchContent)
        })
      } else {
        this.tableData = this.stashList
      }
      this.tableList()
    },
    goToDetails(row) {
      // 将当前行的数据传递到页面
      this.$router.push({ path: '/details/details', query: row })
      console.log(row)
    },
    addToFavorites(row) {
      // 将当前行的数据传递到收藏页面
      this.$router.push({ path: '/file/file', query: row })
      console.log(row)
      this.$message({
        message: '已收藏',
        type: 'success'
      })
    }
  }

}
</script>
