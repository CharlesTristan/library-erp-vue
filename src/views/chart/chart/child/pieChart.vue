<template>
  <div id="lineChart" style="width: 100%;height:100%;" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'PieChart',
  data() {
    return {
      option: {
        title: {
          text: '书籍种类',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['历史', '经济', '计算机', '传统文学', '文学']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '历史' },
              { value: 310, name: '经济' },
              { value: 234, name: '计算机' },
              { value: 135, name: '传统文学' },
              { value: 1548, name: '文学' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions()
    },
    setOptions() {
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style scoped>

</style>
