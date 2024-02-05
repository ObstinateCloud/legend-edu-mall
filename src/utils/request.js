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

export default zjyrequest