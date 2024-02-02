<template>
  <div class="app-header">
    <i :class="iconClassName" @click="toggleCollapse"></i>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-left:50px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>传奇</span>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
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
  }

}
</script>
<style lang="scss" scoped>
.app-header {
  text-align: left;
}
</style>