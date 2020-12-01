import request from '@/utils/request'
import { praseStrEmpty } from '@/utils/util'
export function bookList(data) {
  return request({
    url: '/book/list',
    method: 'get',
    params: data
  })
}

/**
 * 根据id查询notice
 * @param data
 * @returns {AxiosPromise}
 */
export function book(data) {
  return request({
    url: '/book/' + praseStrEmpty(data),
    method: 'get'
  })
}

/**
 * 添加notice
 * @param data
 * @returns {AxiosPromise}
 */
export function insertBook(data) {
  return request({
    url: '/book',
    method: 'post',
    data: data
  })
}

/**
 * 修改notice
 * @param data
 * @returns {AxiosPromise}
 */
export function updateBook(data) {
  return request({
    url: '/book',
    method: 'put',
    data: data
  })
}

export function deleteBook(data) {
  return request({
    url: '/book/' + praseStrEmpty(data),
    method: 'delete'
  })
}

