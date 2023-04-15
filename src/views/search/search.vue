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
        <!--<div class="content">
          //搜索框 --
          <el-row>
            <el-input
              v-model="watchSearch"
              placeholder="请输入文章标题"
              size="small"
            />
          </el-row>
          <el-divider />
          //
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
              prop="estype"
              label="estype"
              align="center"
            />

            // <el-table-column prop="listFour" label="listFour" align="center"></el-table-column> --
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
        -->
        <!-- <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属店铺">
                  <span>{{ props.row.shop }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="商品 ID"
            prop="id"
          />
          <el-table-column
            label="商品名称"
            prop="name"
          />
          <el-table-column
            label="描述"
            prop="desc"
          />
        </el-table> -->
        <!-- 分页 -->
        <!-- <el-pagination
          :current-page="currentPage4"
          :page-sizes="[5,10,15,20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="20"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        /> -->
        <!-- <el-input v-model="searchText" placeholder="请输入关键字" /> -->
        <!-- 分页 -->
        <!-- <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
        <!-- <el-row>
          <el-col :span="20">
            <el-input v-model="searchContent" size="small" placeholder="enter或按钮搜索" @keyup.enter.native="search" />
          </el-col>
          <el-col :span="1"><div>.</div></el-col>
          <el-col :span="2">
            <el-button type="primary" size="small" @click="search">搜索</el-button>
          </el-col>
        </el-row>
        <el-divider /> -->
        <!-- <el-row>
          <el-input v-model="watchSearch" placeholder="watch监听搜索" size="small" />
        </el-row> -->
        <!--
        <el-table
          :data="paginationData"
          border
          style="width: 100%;"
        >
          <el-table-column
            prop="id"
            label="id"
            align="center"
          />
          <el-table-column
            prop="listOne"
            label="listOne"
            align="center"
          />
          <el-table-column
            prop="listTwo"
            label="listTwo"
            align="center"
          />
          <el-table-column
            prop="listThree"
            label="listThree"
            align="center"
          />
          <el-table-column
            prop="listFour"
            label="listFour"
            align="center"
          />
          <el-table-column
            prop="listFive"
            label="listFive"
            align="center"
          />
          <el-table-column
            prop="listSix"
            label="listSix"
            align="center"
          />
        </el-table>
        -->
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
          :page-sizes="[5, 10, 15, 20]"
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
  methods: {
    // 分页组件连接后端api
    handleSizeChange(val) {
      this.pagesize = val
      this.search()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.search()
    },
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
    }
    /* handleRowClick(row) {
      // 在这里处理点击行事件，可以跳转到详情页面并将数据传递给详情页面
      this.$router.push('/details/details', {
        name: 'details',
        path: '/details',
        params: {
          title: row.title,
          pdfPages: row.pdfPages,
          score: row.score,
          createtime: row.createtime
        }
      })
    } */
  }
  /* data() {
    return {
      searchText: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 获取表格数据
    getTableData() {
      // 发送异步请求获取数据，将结果赋值给tableData和total
      axios.get('http://127.0.0.1:59381/doc.json', {
        params: {
          searchText: this.searchText,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
        console.log(this.tableData)
        console.log('成功')
      })
    },
    // 处理分页大小改变事件
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.getTableData()
    },
    // 处理当前页码改变事件
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.getTableData()
    }
  } */
  /* data() {
    return {
      tableData: [],
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
          self.tableData = self.stashList.filter(item => {
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
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      // 一般这里会有一个axios请求
      axios.get('http://someoneyou.top:8082/search/{searchString}/{pageNo}/{pageSize}/0/{searchType}').then(res => {
        this.tableData = res.data
        this.paginationData = res.data.data
        // this.tableData = this.paginationData
        // this.total = res.data.data.total
        // self.stashList = self.tableData
        console.log(this.tableData)
        console.log('成功')
      })
      this.handleCurrentChange(this.currentPage)
      this.stashList = this.tableData // 暂存数组  当搜索为空时候  数组展示所有数据
      console.log(this.stashList)
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.tableList()
      console.log(this.pagesize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.tableList()
    },
    tableList() {
      this.paginationData = [] // 分页数组  tableData 所有的数据
      for (var j = this.pagesize * (this.currentPage - 1); j < this.pagesize * this.currentPage; j++) {
        if (this.tableData[j]) {
          this.paginationData.push(this.tableData[j])
        }
      }
      this.total = this.tableData.length
      console.log('test')
      console.log(this.paginationData)
      console.log(this.total)
    }, */
  /* search() {
      if (this.searchContent) {
        this.tableData = this.stashList // 解决评论第一条bug
        this.tableData = this.tableData.filter(item => {
          return item.listOne.includes(this.searchContent)
        })
      } else {
        this.tableData = this.stashList
        console.log('搜索')
        console.log(this.tableData)
      }
      this.tableList()
    } */
  // 搜索功能实现
  /*  search() {
      if (this.searchContent) {
        this.tableData = this.stashList // 解决评论第一条bug
        this.tableData = this.tableData.filter(item => {
          return item.listOne.includes(this.searchContent)
        })
      } else {
        this.tableData = this.stashList
        console.log('搜索')
        console.log(this.tableData)
      }
      this.tableList()
    }

  } */

}

</script>
<style>

</style>
