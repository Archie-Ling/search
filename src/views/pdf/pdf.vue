<!-- <template>
  <div>
    <iframe
      ref="pdfIframe"
      :src="pdfUrl"
      frameborder="0"
      width="100%"
      height="680"
    />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PdfViewer',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pdfUrl: ''
    }
  },

  mounted() {
    // 接收details页面传输过来的参数
    // this.pdfUrl = this.$route.query.url
    this.searchString = this.$route.query.searchString
    this.pdfId = this.$route.query.pdfId
    // 测试 浏览器控制台打印details.vue传递过来的参数
    console.log(this.$route.query.searchString)
    console.log(this.$route.query.pdfId)

    // 使用axios获取pdf文件  /https://192.168.43.61:8081file/view/{userId}/{pdfId}
    const pdfId = this.pdfId
    const userId = 3
    const url = 'http://192.168.43.61:8081/file/view/' + userId + '/' + pdfId
    axios.get(url, {
      params: {
      }
    }).then((res) => {
      // 处理结果
      console.log(res)
      this.pdfUrl = 'http://192.168.43.61:8081' + res.data.data
      console.log(this.pdfUrl)
      console.log('成功')
    }).catch(error => {
      // 处理错误
      console.log(error)
    })

    // this.pdfUrl = 'https://lkw-edu.oss-cn-chengdu.aliyuncs.com/'+this.searchString+'.pdf'
    // console.log(this.pdfUrl);
    // this.pdfUrl = 'https://lkw-edu.oss-cn-chengdu.aliyuncs.com/%E5%9F%BA%E4%BA%8E%E7%98%A4%E5%91%A81_cm%E5%86%85ADC%E5%80%BC...%E6%B5%8B%E8%83%B6%E8%B4%A8%E7%98%A4%E6%9C%AF%E5%90%8E%E8%BF%9B%E5%B1%95%E7%9A%84%E4%B8%B4%E5%BA%8A%E4%BB%B7%E5%80%BC_%E7%A8%8B%E6%A2%A6%E9%9B%A8%20%281%29.pdf'
    this.$refs.pdfIframe.src = this.pdfUrl
  }

}
</script>
<style>
</style> -->

<!-- 2 -->
<!-- <template>
  <div id="app">
    <div id="demo"></div>
  </div>
</template>
<script>
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'
export default {
  name: 'App',
  data() {
    return {
      pdfh5: null
    }
  },
  mounted() {
    // 实例化
    this.pdfh5 = new Pdfh5('#demo', {
      pdfurl: 'https://lkw-edu.oss-cn-chengdu.aliyuncs.com/%E6%9C%8D%E5%8A%A1%E5%A4%96%E5%8C%85%E6%89%BF%E8%AF%BA%E4%B9%A6.pdf'
    })
    // 监听完成事件
    this.pdfh5.on('complete', function(status, msg, time) {
      console.log('状态：' + status + '，信息：' + msg + '，耗时：' + time + '毫秒，总页数：' + this.totalNum)
    })
  }
}
</script>

<style>
	*{
	padding: 0;
	margin: 0;
	}
	html,body,#app {
	width: 100%;
	height: 100%;
	}
</style> -->

<!-- 3 -->
<!-- <template>
  <div id="pdfWrap">.</div>
</template>
<script>
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'
export default {
  name: 'Pdf',
  data() {
    return {
      pdfh5: null
    }
  },

  /** 初始化渲染（vue） */
  mounted() {
    this.loadPdfBlob()
  },
  methods: {
    loadPdfBlob() {
      fetch('请求地址', {
        method: 'get',
        headers: {} // 自定义headers头数据
      }).then((response) => {
        // 转换为blob数据
        response.blob().then(b => {
          const url = window.URL.createObjectURL(b)
          this.loadPdf(url)
        })
      }).then((json) => {
        console.log(json)
      }).catch((error) => {
        console.error(error)
      })
    },
    // 加载pdf文档
    loadPdf(datas) {
      // 实例化
      this.pdfh5 = new Pdfh5('#pdfWrap', {
        // pdfurl: "/static/pdf-dist.pdf",
        pdfurl: datas,
        // data: datas,  //流数据
        URIenable: true, // true开启地址栏file参数
        renderType: 'svg', // pdf渲染模式 svg canvas
        lazy: false, // 是否开启懒加载
        maxZoom: 3, // 手势缩放最大倍数 默认3
        scrollEnable: true, // 是否允许pdf滚动
        zoomEnable: true // 是否允许pdf手势缩放
      })
      // 监听完成事件
      this.pdfh5.on('complete', (status, msg, time) => {
        console.log('状态：', status, ', 信息：', msg, ', 耗时：', time, '毫秒，总页数：', this.totalNum)
      })
      // pdf 监听加载失败，msg信息，time耗时
      this.pdfh5.on('error', (msg, time) => {
        console.log('pdf加载失败', '信息：', msg, ', 耗时：', time, '毫秒')
      })
    }
  }
}

</script> -->

<!-- 4 -->
<!-- <template>
  <div>
    <iframe :src="htmlUrl" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      htmlUrl: './pdf.html' // 设置对应的html文件URL
    }
  }
}
</script> -->
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
    // 页面加载时调用获取图片列表的方法
    this.getImageList()
  },
  methods: {
    // 通过axios获取图片列表
    getImageList() {
      const userId = 3
      const pdfId = 3
      const url = 'http://192.168.43.222:8081/file/view2/' + userId + '/' + pdfId
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
