<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="$router.push({ name: 'add-menu'})">新增菜单</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="名称" align="center"> </el-table-column>
        <el-table-column prop="id" label="菜单id"> </el-table-column>
        <el-table-column prop="parentId" label="父菜单"> </el-table-column>
        <el-table-column prop="sort" label="排序"> </el-table-column>
        <el-table-column prop="path" label="地址"> </el-table-column>
        <el-table-column prop="router" label="路由"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scoped">
            <el-button size="mini" @click="$router.push({ name: 'edit-menu', params: { id: scoped.row.id}})">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteMenu(scoped.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { getAllMenus, delMenu } from '@/api/menu'

export default {
  name: 'MenuIndex',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadMenus()
  },
  methods: {
    loadMenus () {
      getAllMenus().then((res) => {
        this.tableData = res.data.data
      })
    },
    deleteMenu (menuId) {
      this.$confirm('确认删除菜单吗', '删除提示').then(() => {
        delMenu(menuId).then((res) => {
          console.log(res.data.data)
          this.$message.success('删除菜单成功')
          // 刷新菜单列表
          this.loadMenus()
        })
      }).catch((er) => {
        this.$message.info('取消删除菜单')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.clearfix {
  .el-button {
    display: flex
  }
}
</style>