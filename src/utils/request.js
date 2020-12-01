import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.authorization) {
      config.headers['authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      if (res.code !== 4010002) { // 需要刷新token的时候不需要弹出提示框
        if (res.code !== 4010001) {
          Message({
            message: res.msg || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
        }
        // eslint-disable-next-line eqeqeq
        if (res.code == 4010001) {
          MessageBox.confirm('请重新登录', '', {
            confirmButtonText: '重新登录',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/logout')
          })
        }
      } else {
        // token过期，更新token和refreshToken
        store.dispatch('user/refreshToken').then(() => {
          // reload()方法用于刷新当前文档。
          // reload() 方法类似于你浏览器上的刷新页面按钮
          location.reload()
        })
      }
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
