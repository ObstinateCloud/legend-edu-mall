import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/LayoutIndex'
import Home from '@/views/home/HomeIndex'
import About from '@/views/about/About'
import Error404 from '@/views/error/Error'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'about',
        name: 'about',
        component: About
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

export default router
