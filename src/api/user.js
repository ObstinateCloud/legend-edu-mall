import zjyrequest from '@/utils/request'
import store from '@/store/index'
import router from '@/router/index'

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
    url: '/login/getToken',
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

// 防止同时请求刷新token接口
let promiseRT = null // 如果已经有接口在请求，就直接返回promise对象
let refreshing = false //
export const refreshToken = (data) => {
  if (refreshing) {
    return promiseRT
  }
  refreshing = true
  promiseRT = zjyrequest({
    method: 'POST',
    url: '/login/refreshToken',
    params: {
      refToken: store.state.loginResponse?.refToken
    }
  }).then((res) => {
    if (res.data.code === 200) {
      console.log(res.data)
      store.commit('changeLoginResponse', res.data.data)
    } else if (res.data.code === 201) {
      // 刷新失败返回登录页面
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath // 再次登录成功后还要返回当前路径
        }
      })
      throw new Error('刷新token失败')
      // console.error('刷新token失败')
    }
  }).finally(() => {
    refreshing = false
  })
  return promiseRT

  // .then({}) // 上面的then 必须抛异常否则 下面的then还会正常执行 详见promise对象处理逻辑
}