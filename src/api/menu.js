import zjyrequest from '@/utils/request'

export const getAllMenus = () => {
  return zjyrequest({
    method: 'GET',
    url: '/menus/getAllMenus'
  })
}

export const addMenu = (addData) => {
  return zjyrequest({
    method: 'POST',
    url: '/menus/addMenu',
    data: addData
  })
}

export const delMenu = (menuId = 0) => {
  return zjyrequest({
    method: 'DELETE',
    url: `/menus/delMenu/${menuId}`
  })
}
// 获取资源的菜单
export const getTreeMenus = (sourceId) => {
  return zjyrequest({
    method: 'GET',
    url: '/menus/getTreeMenus',
    params: {
      sourceId // 此处可以简写
    }
  })
}