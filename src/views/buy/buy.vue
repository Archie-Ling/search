<template>
  <div id="app">
    <div class="user-profile">
      <el-row class="tac">
        <el-col :span="1">
          <div><p style="color:white;">.</p></div>
        </el-col>
        <!-- 页面主题内容 -->
        <el-col :span="22">
          <h2>购买积分</h2>
          <el-divider />
          <span>请点击商品进行购买</span>
          <div class="content" style="color:white;">.</div>
          <!-- el-table 分页显示bizId,bizPrice,bizPoint,bizStatus 每页显示数量size和总数total从后端获取 然后将后端传回的数据分页显示在表格中 -->
<!--          <el-table-->
<!--            :data="bizList"-->
<!--            style="width: 100%"-->
<!--            highlight-current-row-->
<!--            @row-click="handleRowClick"-->
<!--          >-->
<!--            <el-table-column-->
<!--              prop="bizPrice"-->
<!--              label="商品价格"-->
<!--            />-->
<!--            <el-table-column-->
<!--              prop="bizPoint"-->
<!--              label="商品积分"-->
<!--            />-->
<!--            &lt;!&ndash; 当商品状态为1时，el-tag显示在售 &ndash;&gt;-->
<!--            <el-table-column-->
<!--              prop="bizStatus"-->
<!--              label="商品状态"-->
<!--            >-->
<!--              <template slot-scope="scope">-->
<!--                <el-tag v-if="scope.row.bizStatus === 1" type="success">在售</el-tag>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--          <el-pagination-->
<!--            :current-page="currentPage"-->
<!--            :page-sizes="[5,10,15]"-->
<!--            :page-size="pageSize"-->
<!--            layout="total, sizes, prev, pager, next, jumper"-->
<!--            :total="total"-->
<!--            @size-change="handleSizeChange"-->
<!--            @current-change="handleCurrentChange"-->
<!--          />-->
          <div v-for="(page, index) of pages" :key="index" >
            <el-col :span="6" v-for="(item, innerindex) of page" :key="item.bizId" style="align-items: center">
              <el-card :body-style="{ padding: '0px', height:'30%'}" shadow="hover" style="width: 90%;height: 90%; margin-bottom: 15px;background-color: #eff0fa"
              @click.native="handleRowClick(item.bizId)"
              >
                <div style="padding: 10px 10px;">
                  <div>
                    <div style="font-size: 20px; font-weight:bolder; margin: 10px 10px">套餐 {{innerindex+1}}</div>
                  </div>
                  <div style="font-size: 18px;font-weight:bolder; margin-left: 10px">
                      <i class="el-icon-coin"></i>
                      {{item.bizPoint}}
                  </div>
                  <div style="font-size: 18px;font-weight:bold;margin-left: 10px">
                    <i class="el-icon-money"></i>
                    {{item.bizPrice}}
                  </div>
                </div>
              </el-card>
            </el-col>
          </div>
          <!-- 点击表格中的某一行，弹窗显示购买窗口 后端传回的图片流 弹窗显示后端传回的图片流并显示 -->
          <el-dialog
            title="支付订单"
            :visible.sync="orderVisible"
            width="30%"
          >
            <template slot="title">
              <span>支付订单</span>
            </template>
            <template slot="default">
              <img :src="bizImg" alt="" style="width: 100%; height: 100%;">
            </template>
            <template slot="footer">
              <span slot="footer" class="dialog-footer">
                <el-button  @click="orderVisible = false">支 付 取 消</el-button>
              </span>
            </template>
          </el-dialog>
          <el-dialog
            title="创建订单"
            :visible.sync="dialogVisible">
            <template >
              <div>即将生成订单，请确认是否需要购买</div>
            </template>
            <template slot="footer">
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="generateOrder">确 定</el-button>
              </span>
            </template>
          </el-dialog>

<!--          <el-dialog-->
<!--            title="支付订单"-->
<!--            :visible.sync="orderVisible"-->
<!--            width="20%"-->
<!--            style="align-items: center;text-align: center"-->
<!--          >-->
<!--            <img :src="bizImg" alt="" style="text-align: center">-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--              <el-button  @click="orderVisible = false">支 付 取 消</el-button>-->
<!--            </span>-->
<!--          </el-dialog>-->

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      bizList: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      bizId: '',
      userId: '',
      bizImg: '',
      dialogVisible: false,
      orderVisible: false,
      dialogImageUrl: ''
    }
  },
  computed: {
    pages() {
      const pages = []
      this.bizList.forEach((item, index) => {
        const page = Math.floor(index / 5)
        // 4代表4条为一行，随意更改
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  created() {
    this.getBizList()
  },
  methods: {
    generateOrder() {
      this.userId = 3
      const url = 'http://192.168.43.61:8081/order/add'
      axios({
        method: 'post',
        url: url,
        params: {
          bizId: this.bizId,
          userId: this.userId
        }, responseType: 'blob'
      }
      ).then(response => {
        console.log(response)
        if (response.status === 200) {
          const imageUrl = window.URL.createObjectURL(new Blob([response.data]))
          // 将图片显示在页面上
          this.bizImg = imageUrl
          this.dialogVisible = false
          this.orderVisible = true
          this.$message.success('已生成订单，请尽快支付')
        } else {
          this.dialogVisible = false
          this.$message.error('生成订单失败，请联系工作人员')
        }
        // 处理后端返回的图片流
      }).catch(error => {
        console.error(error)
      })
    },
    getBizList() {
      // /biz/list/{page}/{size}
      const page = this.currentPage
      const size = this.pageSize
      const url = 'http://192.168.43.61:8081/biz/list/' + page + '/' + size
      console.log(url)
      axios.get(url, {
        params: {
          page: page,
          size: size
        }
      }).then(res => {
        this.bizList = res.data.data.data
        this.total = res.data.data.total
        console.log(res.data.data)
      })
    },
    // 点击分页器中的每页显示数量，触发size-change事件，调用handleSizeChange()方法
    handleSizeChange(size) {
      this.pageSize = size
      this.getBizList()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.getBizList()
    },
    // 点击表格中的某一行，弹窗显示 将bizId和userId传给后端，后端传回的图片流
    handleRowClick(bizId) {
      // 使用axios.post将bizId和userId传给后端，前端使用blob处理显示后端传回的图片流
      // url = 'http://192.168.43.61:8081/order/add'
      this.dialogVisible = true
      this.bizId = bizId
    }
  }
}
</script>

<style>
/* bizImg图片大小 */

</style>

