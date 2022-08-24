import axios from 'axios'
import router from '@/router'
import store from '@/store'
import message from '@/components/message/'
import { paramsign } from '@/utils/md5'

const showStatus = (status) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 402:
      message = '拒绝访问(402)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

const service = axios.create({
  // 是否跨站点访问控制请求
  withCredentials: true,
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  validateStatus () {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true
  }
})

// 请求拦截器
service.interceptors.request.use(
  request => {
    if (request.data != null) {
      request.data = paramsign(request.data)
    }
    if (store.getters.token != null) {
      request.headers['X-Token'] = store.getters.token
      console.log("X-Token" + request.headers['X-Token'])
    }
    console.log("req %s:%o", request.url, request.data)
    return request
  },
  (err) => {
    message.error(res.message || '服务器异常，请联系管理员!')
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    console.log('response:%o', response)
    const status = response.status
    const res = response.data
    if (status === 200) {
      if (res.code === 101) {
        // router.push({ path: '/login' })
        router.replace('/login')
        // return Promise.reject(new Error("exception code:" + res.code));
      } else {
        return res
      }
    } else {
      message.error("exception status:" + status)
      return Promise.reject(new Error("exception status:" + status))
    }
  },
  (err) => {
    console.log(err)
    message.error(res.message || '服务器异常，请联系管理员!')
    return Promise.reject(err)
  }
)

export default service