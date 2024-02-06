<template>
  <el-menu router unique-opened :collapse="isCollapse">
    <a href="/" class="menu-logo">
        <img src="@/assets/menu-logo.jpg" alt="">
        <h1>legend</h1>
    </a>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i><span>权限管理</span></template>
        <el-menu-item index="roles">角色管理</el-menu-item>
        <el-menu-item index="menus">菜单管理</el-menu-item>
        <el-menu-item index="sources">资源管理</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i><span>课程管理</span></template>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-menu"></i><span>用户管理</span></template>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title"><i class="el-icon-setting"></i><span>广告管理</span></template>
        <el-menu-item index="ads">广告列表</el-menu-item>
        <el-menu-item index="adbits">广告位列表</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: 'AppAside',
  data () {
    return {

    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-logo {
    height: 60px;
    display: flex; // 弹性盒模型 水平对齐
    justify-content: center; //
    align-items: center;
    text-decoration: none;
    color: #000;
    img{
        width: 30px;
        height: 30px;
    }
}
.el-menu {
    height: 100%;
    width: auto;
}
.el-menu.el-menu--collapse { //同时拥有这两个类
    width: 60px;
    h1{
        display: none;
    }
}
</style>