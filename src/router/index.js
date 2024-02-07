import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/LayoutIndex'
import Home from '@/views/home/HomeIndex'
import About from '@/views/about/About'
import Error404 from '@/views/error/Error'
import LoginVue from '@/views/login/Login'
import store from '@/store/index'
import MenuIndex from '@/views/menu/MenuIndex'
import AddMenu from '@/views/menu/AddMenu'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', // '/'必须加
    name: 'login',
    component: LoginVue
  },
  {
    path: '/',
    name: 'main',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'menus', //
        name: 'menus',
        component: MenuIndex
      },
      {
        path: 'menus/create', //
        name: 'add-menu',
        component: AddMenu
      },
      {
        path: 'menus/:id/edit', // id传参
        name: 'edit-menu',
        component: AddMenu
      },
      {
        path: 'about',
        name: 'about',
        component: About,
        meta: { // key可以自定义
          requireAuth: true // 配置页面访问是否需要鉴权 key可以自定义
        }
      }
    ]
  },
  {
    path: '*',
    name: 'error-404',
    component: Error404
  }
]

const router = new VueRouter({
  routes
})

// 每个路由跳转前都要检查是否需要token,如果上级路由需要鉴权，下级路由必须要鉴权 eg aa/需要鉴权 则aa/bb aa/cc/dd 都需要鉴权
router.beforeEach((to, from, next) => {
  // console.log('to---------')
  // console.log(to)
  // console.log('from---------')
  // console.log(from)
  if (to.matched.some(r => r.meta.requireAuth)) { // match代表要跳转的地址数据，some 用于遍历数组并返回是否有符合条件的数据 只要有一条满足即为true，全部不满足为false eg: some([1,2,3,4]>2)
    console.log(to.matched.some(r => r.meta.requireAuth))
    if (!store.state.loginResponse) {
      next({
        name: 'login', // 未登录跳转到哪个页面
        query: { // query 代表? 传参
          redirect: to.fullPath // 登录成功后跳转到哪个页面 此处代表来时的页面
        }
      })
      return
    }
  }
  next() // next是一个方法 检查通过后执行
})

export default router
