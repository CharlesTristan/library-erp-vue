import request from '@/utils/request'
export function upload(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data: data,
    config: {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  })
}
