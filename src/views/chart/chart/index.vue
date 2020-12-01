<template>
  <div class="container">
    <div class="chart-wrapper">
      <line-chart :x-axis-data="xAxisData" :series-data="seriesData" />
    </div>
    <div class="bottom-bar">
      <div class="chart-wrapper1">
        <table-chart :table-data="tableData"/>
      </div>
      <div class="chart-wrapper2">
        <pie-chart :x-axis-data="xAxisData" :series-data="seriesData"/>
      </div>
    </div>
  </div>
</template>

<script>
import lineChart from '@/views/chart/chart/child/lineChart'
import TableChart from '@/views/chart/chart/child/tableChart'
import PieChart from '@/views/chart/chart/child/pieChart'
export default {
  name: 'Index',
  components: {
    PieChart,
    TableChart,
    lineChart
  },
  data() {
    return {
      xAxisData: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      seriesData: [50, 72, 34, 63, 110, 20, 89],
      tableData: [
        { 'order': 1, 'name': '水浒传', 'count': 140 },
        { 'order': 2, 'name': '红鞋子', 'count': 123 },
        { 'order': 3, 'name': '长袜子皮皮', 'count': 121 },
        { 'order': 4, 'name': '秘密花园', 'count': 102 },
        { 'order': 5, 'name': '草房子', 'count': 99 },
        { 'order': 6, 'name': '木偶奇遇记', 'count': 56 },
        { 'order': 7, 'name': '安徒生童话全集', 'count': 3 }
      ]
    }
  }
}
</script>

<style scoped>
.chart-wrapper{
  /*background-color: black;*/
  height: 50vh;
  width: 100%;
}
.chart-wrapper1{
  width: 50%;
  height: 50vh;
}
.chart-wrapper2{
  width: 50%;
  height: 50vh;
}
.bottom-bar{
  display: flex;
  flex-direction: row;
}
</style>
