import { refreshToken } from '@/api/user'
import store from '@/store/index'
import axios from 'axios'

const zjyrequest = axios.create({ // 此种方式创建的key容器导致跨域问题
  baseURL: '/api' // 此处key 名称为 baseURL,不一致会导致 无效
})

// 添加请求拦截器 为每个请求增加公共属性
zjyrequest.interceptors.request.use(function (config) {
  config.headers.Authorization = store.state.loginResponse?.token
  return config
})

// 添加响应拦截器 判断每个响应是否因为token过期而失败
zjyrequest.interceptors.response.use(function (response) {
  // 响应成功
  // console.log('响应成功处理')
  return response
}, function (err) {
  // 响应失败
  // console.log('响应失败处理')
  if (err.response.data.code === 401) {
    return refreshToken().then(() => {
      return zjyrequest(err.config)
    })
  } else {
    // 如果不是token相关错误，就不处理
    return Promise.reject(err)
  }
})

export default zjyrequest