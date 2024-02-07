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