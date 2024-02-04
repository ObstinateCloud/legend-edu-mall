import zjyrequest from '@/utils/request'

export const login = (data) => { // 的到一个promise对象
  return zjyrequest({
    method: 'POST',
    url: '/login/userAndPwd',
    data: `username=${data.username}&password=${data.password}`
  })
}