<template>
  <div class="app-header">
    <i :class="iconClassName" @click="toggleCollapse"></i>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  <el-dropdown>
  <span class="el-dropdown-link">
    <el-avatar :size="40" :src="userInfo.avatar"></el-avatar><i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item divided>{{userInfo.name}}</el-dropdown-item>
    <el-dropdown-item divided>登出</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'

export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    toggleCollapse: {
      type: Function,
      required: true
    }
  },
  computed: {
    iconClassName () {
      return this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  },
  created () {
    getUserInfo().then(res => {
      const { data } = res
      console.log(data)
      this.userInfo = data.data
    })
  }
}
</script>
<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  height: 100%;
  .el-breadcrumb {
    margin-left: 10px;
  }
  .el-dropdown {
    margin-left: auto; //会在最右面
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>