import zjyrequest from '@/utils/request'
// import store from '@/store/index'

export const loginStr = (data) => { // 得到一个promise对象
  return zjyrequest({
    method: 'POST',
    url: '/login/userAndPwdString',
    data: `username=${data.username}&password=${data.password}`
  })
}

export const login = (data) => { // 得到一个promise对象
  return zjyrequest({
    method: 'POST',
    url: '/login/userAndPwd',
    data: `username=${data.username}&password=${data.password}`
  })
}

// export const getUserInfo = (data) => { // 得到一个promise对象
//   return zjyrequest({
//     method: 'GET',
//     url: '/user/getUserInfo',
//     headers: {
//       Authorization: store.state.loginResponse?.token // .? 代表对loginResponse判空，防止loginResponse不存在报错
//     }
//   })
// }

// 在request.js中增加公共头部此处可以省略
export const getUserInfo = (data) => { // 得到一个promise对象
  return zjyrequest({
    method: 'GET',
    url: '/user/getUserInfo'
  })
}