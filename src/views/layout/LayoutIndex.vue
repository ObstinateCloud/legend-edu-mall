<template>
  <el-container>
    <el-aside width="auto" style="background-color: rgb(238, 241, 246)">
        <app-aside></app-aside>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
          <app-header></app-header>
      </el-header>

      <el-main>
        <router-view></router-view>
        <!-- <el-table :data="tableData"> -->
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        <!-- </el-table> -->
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
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  },
  components: {
    AppAside,
    AppHeader
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
