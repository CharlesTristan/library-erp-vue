import request from '@/utils/request'
// import { praseStrEmpty } from '@/utils/util'
export function permissionList() {
  return request({
    url: '/permission/treeSelect',
    method: 'get'
  })
}
