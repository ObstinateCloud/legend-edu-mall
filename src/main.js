import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import 'element-ui/packages/theme-chalk/src/index.scss' // 不加路径从nodemodules下查找
import './styles/index.scss'
// import "element-ui/lib/theme-chalk/index.css"

// 注册组件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
