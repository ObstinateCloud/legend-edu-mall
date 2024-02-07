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
    <el-button type="primary" @click="onSubmit">立即{{tipMsg}}</el-button>
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
      parentMenus: [],
      isCreate: false // 根据路由信息中是否携带id来判断，是修改还是创建
    }
  },
  created () {
    this.loadAll()
    this.isCreate = !this.$route.params.id // 新增时没有传id 默认为undefind 取反为true 传值后取反为false
  },
  computed: {
    tipMsg () {
      return this.isCreate ? '新增' : '编辑'
    }
  },
  methods: {
    onSubmit () {
      addMenu(this.addData).then((res) => {
        if (res.data.code === 200) {
          console.log(res.data.data.id)
          this.$message.success(`${this.tipMsg}成功:` + res.data.data.id)
          this.$router.push({
            name: 'menus'
          })
        } else {
          this.$message.warning(`${this.tipMsg}失败`)
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