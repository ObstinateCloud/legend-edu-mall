import zjyrequest from '@/utils/request'

// 查询资源类别列表
export const getSourceTypeList = () => {
  return zjyrequest({
    method: 'GET',
    url: '/sources/sourceTypeList'
  })
}

// 新增资源类别列表
export const addSourceType = () => {
  return zjyrequest({
    method: 'GET',
    url: '/sources/addSourceType'
  })
}

// 查询资源列表
export const getSourcePageList = (data = {}) => {
  return zjyrequest({
    method: 'POST',
    url: '/sources/sourcePageList',
    data: data
  })
}

// 新增资源类别列表
export const addSource = () => {
  return zjyrequest({
    method: 'GET',
    url: '/sources/addSource'
  })
}