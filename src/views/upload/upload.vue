<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <el-row class="tac">
      <el-col :span="1">
        <div><p /></div>
      </el-col>
      <!-- 页面主题内容 -->
      <el-col :span="22">
        <h2>上传分析</h2>
        <div class="content">
          <!-- 上传 https://jsonplaceholder.typicode.com/posts/-->
          <!-- 点击上传后，将文件上传到服务器，服务器返回文件名，再将文件名pdfTitle和userId传回后端，后端返回pdfId,再将pdfId和userId返回后端 -->
          <el-upload
            class="upload-demo"
            action="http://192.168.43.61:8081/file/temp"
            accept=".pdf"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-error="handleAvatarError"
            :on-success="handleAvatarSuccess"
            :get-messages="getMessages"
            multiple
            :limit="50"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">可批量上传PDF文件(限50个)</div>
          </el-upload>
          <el-button
          type="primary"
          :disabled="isDisabled"
          @click="handleDelete"
        >识别</el-button>
          <el-divider />
          <!-- <el-upload
            class="upload-demo"
            action="http://192.168.43.61:8081/file/temp"
            accept=".pdf"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-error="handleAvatarError"
            :on-success="handleAvatarSuccess"
            multiple
            :limit="50"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">可批量上传PDF文件(限50个)</div>
          </el-upload>
          <el-divider /> -->
          <!-- “识别”按钮 点击后变成disabled样式持续3秒，并弹出提示：正在识别中，请稍后，在7秒之后弹出提示：识别已完成 -->
          <div style="font-size:20px;font-weight: bolder;margin-bottom: 10px">最近上传文件</div>
          <div v-for="(items,index) in this.files" :key="index">
            <div>
              <span class="title">{{items.pdfTitle}}</span>
              <el-tag
                effect="plain">
                {{ items.pdfStatus}}
              </el-tag>
            </div>
          <el-divider />
        </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
.title{
  white-space:nowrap;/*强制单行显示*/
  text-overflow:ellipsis;/*超出部分省略号表示*/
  overflow:hidden;/*超出部分隐藏*/
  width: 260px;/*设置显示的最大宽度*/
  display:inline-block;
}
.title-next{
  vertical-align: top;
}
</style>
<script>
import axios from 'axios'

import sortfile from '@/api/sortfile'
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
        }
      ],
      fileList: [
        // 上传文件展示
      ],
      isDisabled: false,
      pdfTitle: '',
      userId: '3',
      pdfId: '',
      file: '',
      formData: new FormData(),
      files: []
    }
  },
  created() {
    this.userId = 3
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.fetchSortFiles(this.userId, 1)
  },
  methods: {
    fetchSortFiles(userId, status) {
      sortfile.fetchById(userId, status).then(response => {
        if (response.code === 200) {
          const arr = JSON.parse(JSON.stringify(response.data))
          this.files = arr.data
        }
      })
    },
    handleAvatarSuccess(res, file, fileList) {
      this.fileList = fileList
      // 上传成功钩子函数
      console.log('res', res)
      console.log('file', file)
      console.log('fileList', fileList)
      // 上传成功后，服务端返回文件名
      this.pdfTitle = res.data
      console.log(this.pdfTitle)
      console.log('成功返回文件名')
      // 将文件名pdfTitle和userId传回后端，后端返回pdfId
      axios.post('http://192.168.43.61:8081/file/upload', {
        pdfTitle: this.pdfTitle,
        userId: this.userId
      }).then(
        (res) => {
          this.pdfId = res.data
          console.log(res.data)
          console.log(this.pdfId)
          console.log('成功返回pdfId')
          // 将pdfId和userId返回后端
          axios.post('http://192.168.43.61:8081/file/analyze/structure'
            , {
              pdfId: this.pdfId,
              userId: this.userId
            }).then(
            (res) => {
              console.log(res.data)
              console.log('成功返回pdfId和userId')
            }
          ).catch(
            (err) => {
              console.log(err)
              console.log('失败返回pdfId和userId')
            }
          )
        })
      // 上传成功后，弹出提示 上传成功
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    handleAvatarError(err, file, fileList) {
      // 上传失败钩子函数
      console.log('err', err)
      console.log('file', file)
      console.log('fileList', fileList)
      console.log('err', JSON.parse(err.message))
      if (file.status === 'fail') {
        this.$message.error(JSON.parse(err.message).message)
      }
    },
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 50 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    handleDelete() {
      this.isDisabled = true
      this.$message({
        message: '正在识别中，请稍后',
        type: 'warning'
      })
      setTimeout(() => {
        this.$message({
          message: '识别已完成',
          type: 'success'
        })
        this.isDisabled = false
      }, 4000)
    }
    // 点击上传后，将文件上传到服务器，服务器返回文件名,再将文件名pdfTitle和userId传回后端，后端返回pdfId,再将pdfId和userId返回后端
    /* getMessage() {
      axios.post('http://192.168.43.61:8081/file/temp').then(
        (res) => {
          this.pdfTitle = res.data.data
          console.log(res.data)
          console.log(this.pdfTitle)
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
      axios
        .post('http://192.168.43.61:8081/file/upload', {
          pdfTitle: this.pdfTitle,
          userId: this.userId
        })
        .then(
          (res) => {
            this.pdfId = res.data.data.pdfId
            console.log(res)
          },
          (err) => {
            console.log(err)
          }
        )
      axios.get('http://192.168.43.61:8081/file/analyze/structure', {
        params: {
          pdfId: this.pdfId,
          userId: this.userId
        }
      }).then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        }
      )
    } */
  }
}
</script>
