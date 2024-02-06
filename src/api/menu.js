import zjyrequest from '@/utils/request'

export const getAllMenus = () => {
  return zjyrequest({
    method: 'GET',
    url: '/menus/getAllMenus'
  })
}