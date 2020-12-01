<template>
  <div id="lineChart" style="width: 100%;height:100%;" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'LineChart',
  props: {
    xAxisData: {
      type: Array,
      default() {
        return []
      }
    },
    seriesData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: this.initSerie()
      }
    }
  },
  created() {
    this.option.xAxis.data = this.xAxisData
    this.option.series.data = this.seriesData
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
    },
    initSerie() {
      var serie = []
      var item = {
        type: 'line',
        data: this.seriesData
      }
      serie.push(item)
      return serie
    }
  }
}
</script>

<style scoped>

</style>
