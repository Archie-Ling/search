<template>
  <div id="app">
    <el-row class="tac">
      <el-col :span="1">
        <div><p>.</p></div>
      </el-col>
      <!-- 页面主题内容 -->
      <el-col :span="22">
        <h2>文献归档</h2>
        <div v-for="(item,index) in tableData" :key="index" class="content">
          {{ item.listOne }}
          {{ item.keypage }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableData: []
      /* {
          id: '',
          listOne: '',
          listTwo: '2',
          digest_one:
                  '',
          keypage: '1 5 7 9',
          keyscore: '5.2312',
          add_time: '2023-02-16'
        } */
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // 一般这里会有一个axios请求
      axios.get('http://127.0.0.1:65324/doc.json')
        .then(response => {
          this.tableData = response.data.data.data1
          console.log(this.tableData)
          console.log(' 成功 ')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

}
</script>
