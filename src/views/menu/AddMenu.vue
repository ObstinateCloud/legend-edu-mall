<template>
    <el-form ref="form" :model="addData" label-width="80px">
  <el-form-item label="菜单id">
    <el-input v-model="addData.id"></el-input>
  </el-form-item>
  <el-form-item label="菜单名称">
    <el-input v-model="addData.name"></el-input>
  </el-form-item>
  <el-form-item label="上级菜单">
    <el-select v-model="addData.parentId" placeholder="请选择上级菜单">
      <el-option label="顶级菜单" value="0"></el-option>
      <el-option v-for="menu in parentMenus" :key="menu.id" :label="menu.name" :value="menu.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="菜单地址">
    <el-input v-model="addData.path"></el-input>
  </el-form-item>
  <el-form-item label="菜单路由">
    <el-input v-model="addData.router"></el-input>
  </el-form-item>
  <el-form-item label="菜单排序">
    <el-input v-model="addData.sort" type="number"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { addMenu, getAllMenus } from '@/api/menu'
export default {
  name: 'AddMenu',
  data () {
    return {
      addData: {
        id: '',
        name: '',
        path: '',
        router: '',
        parentId: '',
        sort: 0
      },
      parentMenus: []
    }
  },
  created () {
    this.loadAll()
  },
  methods: {
    onSubmit () {
      addMenu(this.addData).then((res) => {
        if (res.data.code === 200) {
          console.log(res.data.data.id)
          this.$message.success('添加成功:' + res.data.data.id)
          this.$router.push({
            name: 'menus'
          })
        } else {
          this.$message.warning('添加失败')
        }
      })
    },
    loadAll () {
      // 拿到所有的一级菜单
      getAllMenus().then((res) => {
        if (res.data.code === 200) {
          this.parentMenus = res.data.data.filter((p) => p.parentId === 0)
        } else {
          this.$message.warning('获取菜单列表失败')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  text-align: left
}
.el-input {
  width: 280px
}
</style>