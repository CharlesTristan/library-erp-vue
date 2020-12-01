import request from '@/utils/request'
export function getLineChart() {
  return request({
    url: '/echarts/lineChart',
    method: 'get'
  })
}
