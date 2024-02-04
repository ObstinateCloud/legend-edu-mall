import axios from 'axios'

const zjyrequest = axios.create({ // 此种方式创建的key容器导致跨域问题
  baseURL: '/api' // 此处key 名称为 baseURL,不一致会导致 无效
})

export default zjyrequest