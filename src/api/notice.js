import request from '@/utils/request'
import { praseStrEmpty } from '@/utils/util'
export function noticeList(data) {
  return request({
    url: '/notice/list',
    method: 'get',
    params: data
  })
}

/**
 * 添加sysnotice
 * @param data
 * @returns {AxiosPromise}
 */
export function insertNotice(data) {
  return request({
    url: '/notice',
    method: 'post',
    data: data
  })
}

/**
 * 删除notice
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteNotice(data) {
  return request({
    url: '/notice/' + praseStrEmpty(data),
    method: 'delete'
  })
}

/**
 * 修改notice
 * @param data
 * @returns {AxiosPromise}
 */
export function updateNotice(data) {
  return request({
    url: '/notice',
    method: 'put',
    data: data
  })
}

/**
 * 根据id查询
 * @param id
 * @returns {AxiosPromise}
 */
export function getNotice(id) {
  return request({
    url: '/notice/' + praseStrEmpty(id),
    method: 'get'
  })
}
