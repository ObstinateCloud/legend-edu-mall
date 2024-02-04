<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import zjyrequest from '@/utils/request'
zjyrequest({ // 会拼接baseusrl
  method: 'GET',
  url: '/hello/sayHello'
}).then(res => {
  console.log(res)
})

// import axios from 'axios'

// axios({
//   method: 'GET',
//   url: 'http://localhost:8888/hello/sayHello'
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

export default {
  name: 'MyApp'
}
</script>

<style lang="scss">
@import "./styles/index.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      // color: #42b983;
      color: $primary-color;
    }
  }
}
</style>
