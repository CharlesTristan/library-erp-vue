import request from '@/utils/request'
import { praseStrEmpty } from '@/utils/util'
export function dictionaryList(data) {
  return request({
    url: '/dictionary/list',
    method: 'get',
    params: data
  })
}

/**
 * 根据id查询notice
 * @param data
 * @returns {AxiosPromise}
 */
export function dictionary(data) {
  return request({
    url: '/dictionary/' + praseStrEmpty(data),
    method: 'get'
  })
}

/**
 * 添加notice
 * @param data
 * @returns {AxiosPromise}
 */
export function insertDictionary(data) {
  return request({
    url: '/dictionary',
    method: 'post',
    data: data
  })
}

/**
 * 修改notice
 * @param data
 * @returns {AxiosPromise}
 */
export function updateDictionary(data) {
  return request({
    url: '/dictionary',
    method: 'put',
    data: data
  })
}

export function deleteDictionary(data) {
  return request({
    url: '/dictionary/' + praseStrEmpty(data),
    method: 'delete'
  })
}

/**
 * 根据name查询dictionary
 * @param data
 * @returns {AxiosPromise}
 */
export function dictionaryByName(data) {
  return request({
    url: '/dictionary/dictionary/' + praseStrEmpty(data),
    method: 'get'
  })
}
