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

// 获取城市列表
export const getCityList = (sourceId) => {
  return zjyrequest({
    method: 'GET',
    url: '/sources/getCityList',
    params: {
      sourceId
    }
  })
}

// 获取角色列表
export const getRoleList = (sourceId) => {
  return zjyrequest({
    method: 'GET',
    url: '/sources/getRoleList',
    params: {
      sourceId
    }
  })
}

// 上传文件
export const uploadFile = (data) => {
  return zjyrequest({
    method: 'POST',
    url: '/sources/uploadFile',
    data
  })
}
