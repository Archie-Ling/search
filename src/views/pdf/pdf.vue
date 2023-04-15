<template>
  <!-- 后端传入多张图片连接，用列表显示图片 -->
  <ul>
    <li v-for="item_img in imageList" :key="item_img.imageId">
      <img class="demo-image" :src="item_img" alt="image">
    </li>
  </ul>

</template>

<script>
import axios from 'axios' // 引入axios
export default {
  data() {
    return {
      imageList: []
    }
  },
  mounted() {
    // 接收details页面传输过来的参数
    this.userId = this.$route.params.userId
    this.pdfId = this.$route.params.pdfId
    // 测试 浏览器控制台打印details页面传递过来的参数
    console.log('测试')
    console.log(this.userId)
    console.log(this.pdfId)
    // 页面加载时调用获取图片列表的方法
    this.getImageList()
  },
  methods: {
    // 通过axios获取图片列表
    getImageList() {
      const userId = 3
      // const pdfId = this.pdfId
      const pdfId = 3
      const url = 'http://192.168.43.61:8081/file/view2/' + userId + '/' + pdfId
      axios.get(url).then(res => {
        this.imageList = res.data.data
        console.log(res.data)
        console.log(this.imageList)
        console.log('成功')
      })
    }
  }
}
</script>

<style>
/* 去掉列表圆点 */
ul {
  list-style: none;
}
/* 设置图片大小 并居中显示 */
.demo-image {
  width: 75%;
  height: 100%;
  display: block;
  margin: 0 auto;
}
</style>
