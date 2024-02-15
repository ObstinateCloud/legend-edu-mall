<template>
  <div class="app-header">
    <i :class="iconClassName" @click="toggleCollapse"></i>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    <el-avatar :size="40" :src="userInfo.avatar"></el-avatar><i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown" >
    <el-dropdown-item divided command='a'>{{userInfo.name}}</el-dropdown-item>
    <el-dropdown-item divided command='b'>刷新token</el-dropdown-item>
    <el-dropdown-item divided @click.native="handleLogout">登出</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
  </div>
</template>

<script>
import { getUserInfo, refreshToken } from '@/api/user'

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
      this.userInfo = data.data
    })
  },
  methods: {
    handleLogout () {
      this.$confirm('确认退出登录吗', '退出提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('changeLoginResponse', null)
          this.$message.success('退出成功')
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message.success('退出失败')
        })
    },
    handleCommand (command) {
      console.log(command)
      if (command === 'a') {
        this.$message.info('Hello ' + this.userInfo.name)
      } else if (command === 'b') {
        refreshToken()
      }
    }
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