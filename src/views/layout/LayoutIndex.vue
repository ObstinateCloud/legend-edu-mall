<template>
  <el-container>
    <el-aside width="auto" style="background-color: rgb(238, 241, 246)">
        <app-aside :isCollapse="isCollapse"></app-aside>
    </el-aside>

    <el-container>
      <el-header >
          <app-header :isCollapse="isCollapse" :toggleCollapse="toggleCollapse"></app-header>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'LayoutIndex',
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    AppAside,
    AppHeader
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="css" scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
