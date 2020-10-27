import request from '@/utils/request'
export function roleList(data) {
  return request({
    url: '/role/roleList',
    method: 'get',
    params: data
  })
}
