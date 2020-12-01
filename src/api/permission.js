import request from '@/utils/request'
import { praseStrEmpty } from '@/utils/util'
export function permissionList() {
  return request({
    url: '/permission/treeSelect',
    method: 'get'
  })
}

/**
 * permisstion分页查询
 * @returns {AxiosPromise}
 */
export function permissions(data) {
  return request({
    url: '/permission/list',
    method: 'get',
    params: data
  })
}

/**
 * 添加permission
 * @param data
 * @returns {AxiosPromise}
 */
export function insertPermission(data) {
  return request({
    url: '/permission',
    method: 'post',
    data: data
  })
}

/**
 * 修改permission
 * @param data
 * @returns {AxiosPromise}
 */
export function updatePermission(data) {
  return request({
    url: '/permission',
    method: 'put',
    data: data
  })
}

/**
 * 批量删除
 * @param data
 * @returns {AxiosPromise}
 */
export function deletePermission(data) {
  return request({
    url: '/permission/' + praseStrEmpty(data),
    method: 'delete'
  })
}

/**
 * 根据id查询
 * @param id
 * @returns {AxiosPromise}
 */
export function getPermission(id) {
  return request({
    url: '/permission/' + praseStrEmpty(id),
    method: 'get'
  })
}
