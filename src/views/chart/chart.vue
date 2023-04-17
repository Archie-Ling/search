<template>
  <div class="chart">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card" style="background-color: #fafafa">
          <!-- <el-radio-group v-model="radio" @change="initChart">
            <el-radio-button label="1">柱状图</el-radio-button>
            <el-radio-button label="2">折线图</el-radio-button>
            <el-radio-button label="3">饼图</el-radio-button>
          </el-radio-group> -->
          <span style="color: #0093d5;font-weight: bolder;font-size: 16px">您的文献数据统计分析图如下</span>
          <div id="main" style="width: 100%; height: 670px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script >

import * as echarts from 'echarts'
export default {
  data() {
    return {
      radio: '1',
      isCollapse: false,
      activeIndex: '2'
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      var chartDom = document.getElementById('main')
      var myChart = echarts.init(chartDom, 'dark')
      var option

      const colors = [
        '#5a4ad0',
        'rgb(97,179,196)',
        'rgb(222,138,222)',
        'rgb(120, 178, 229)',
        '#c1a7cd'
      ]
      const bgColor = '#fafafa'
      const itemStyle = {
        star5: {
          color: colors[0]
        },
        star4: {
          color: colors[1]
        },
        star3: {
          color: colors[2]
        },
        star2: {
          color: colors[3]
        },
        star1: {
          color: colors[4]
        }
      }
      const data = [
        {
          name: '研究内容',
          itemStyle: {
            color: '#effafa'
          },
          children: [
            {
              name: '疾病研究',
              children: [
                {
                  name: '4',
                  children: [
                    {
                      name: '病因学研究'
                    },
                    {
                      name: '病理生理学研究'
                    }
                  ]
                },
                {
                  name: '12',
                  children: [
                    {
                      name: '治疗学研究'
                    },
                    {
                      name: '诊断学研究'
                    }
                  ]
                },
                {
                  name: '3',
                  children: [
                    {
                      name: '预后学研究'
                    }
                  ]
                }
              ]
            },
            {
              name: '药物研究',
              children: [
                {
                  name: '2',
                  children: [
                    {
                      name: '化学成分研究'
                    }
                  ]
                },
                {
                  name: '12',
                  children: [
                    {
                      name: '不良反应研究'
                    }
                  ]
                }
              ]
            },
            {
              name: '临床试验',
              children: [
                {
                  name: '9',
                  children: [
                    {
                      name: '新药临床试验'
                    }
                  ]
                },
                {
                  name: '4',
                  children: [
                    {
                      name: '新治疗方法临床试验'
                    }
                  ]
                }
              ]
            },
            {
              name: '流行病学',
              children: [
                {
                  name: '4',
                  children: [
                    {
                      name: '流行病学调查研究'
                    },
                    {
                      name: '危险因素研究'
                    }
                  ]
                }
              ]
            },
            {
              name: '基础医学',
              children: [
                {
                  name: '9',
                  children: [
                    {
                      name: '生理学研究'
                    }
                  ]
                },
                {
                  name: '4',
                  children: [
                    {
                      name: '生物化学研究'
                    }
                  ]
                },
                {
                  name: '2',
                  children: [
                    {
                      name: '分子生物学研究'
                    }
                  ]
                }
              ]
            },
            {
              name: '医学教育',
              children: [
                {
                  name: '4',
                  children: [
                    {
                      name: '教学方法研究'
                    }
                  ]
                },
                {
                  name: '2',
                  children: [
                    {
                      name: '评价方法研究'
                    },
                    {
                      name: '课程设置研究'
                    }
                  ]
                }
              ]
            },
            {
              name: '医疗管理',
              children: [
                {
                  name: '9',
                  children: [
                    {
                      name: '医保政策研究'
                    }
                  ]
                },
                {
                  name: '12',
                  children: [
                    {
                      name: '医院管理研究'
                    }
                  ]
                },
                {
                  name: '4',
                  children: [
                    {
                      name: '医疗资源配置研究'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
      for (let j = 0; j < data.length; ++j) {
        const level1 = data[j].children
        for (let i = 0; i < level1.length; ++i) {
          const block = level1[i].children
          const bookScore = []
          let bookScoreId
          for (let star = 0; star < block.length; ++star) {
            let style = (function(name) {
              switch (name) {
                case '12':
                  bookScoreId = 0
                  return itemStyle.star5
                case '4':
                  bookScoreId = 1
                  return itemStyle.star4
                case '3':
                  bookScoreId = 2
                  return itemStyle.star3
                case '2':
                  bookScoreId = 3
                  return itemStyle.star2
                case '9':
                  bookScoreId = 4
                  return itemStyle.star1
              }
            })(block[star].name)
            block[star].label = {
              color: style.color,
              downplay: {
                opacity: 0.5
              }
            }
            if (block[star].children) {
              style = {
                opacity: 1,
                color: style.color
              }
              block[star].children.forEach(function(book) {
                book.value = 1
                book.itemStyle = style
                book.label = {
                  color: style.color
                }
                let value = 1
                if (bookScoreId === 0 || bookScoreId === 3) {
                  value = 5
                }
                if (bookScore[bookScoreId]) {
                  bookScore[bookScoreId].value += value
                } else {
                  bookScore[bookScoreId] = {
                    // colors[bookScoreId]
                    color: 'black',
                    value: value
                  }
                }
              })
            }
          }
          level1[i].itemStyle = {
            color: data[j].itemStyle.color
          }
        }
      }
      option = {
        backgroundColor: bgColor,
        color: colors,
        series: [
          {
            type: 'sunburst',
            center: ['50%', '48%'],
            data: data,
            sort: function(a, b) {
              if (a.depth === 1) {
                return b.getValue() - a.getValue()
              } else {
                return a.dataIndex - b.dataIndex
              }
            },
            label: {
              rotate: 'radial',
              color: 'black'
            },
            itemStyle: {
              borderColor: '#e0e0e0',
              borderWidth: 1
            },
            levels: [
              {},
              {
                r0: 0,
                r: 40,
                label: {
                  rotate: 0
                }
              },
              {
                r0: 40,
                r: 105
              },
              {
                r0: 115,
                r: 140,
                itemStyle: {
                  shadowBlur: 2,
                  shadowColor: colors[2],
                  color: 'transparent'
                },
                label: {
                  rotate: 'tangential',
                  fontSize: 10,
                  color: colors[0]
                }
              },
              {
                r0: 140,
                r: 145,
                itemStyle: {
                  shadowBlur: 80,
                  shadowColor: colors[0]
                },
                label: {
                  position: 'outside',
                  textShadowBlur: 1,
                  textShadowColor: '#e0e0e0'
                },
                downplay: {
                  label: {
                    opacity: 0.5
                  }
                }
              }
            ]
          }
        ]
      }

      option && myChart.setOption(option)
    }
  }
}

</script>

<style>

</style>
