<template>
<div>
  <el-tree
    :data="menuTreeData"
    :props="defaultProps"
    @node-click="handleNodeClick"
    ref="menu-tree"
    show-checkbox
    :default-expand-all=true
    :default-checked-keys="[]"
    node-key="id"
  ></el-tree>
  <el-button type="primary" @click="handleSave">保存</el-button>
  <el-button type="success" @click="handleClear">清空</el-button>
  </div>
</template>

<script>
import { getTreeMenus } from '@/api/menu'

export default {
  name: 'MenuTree',
  data () {
    return {
      menuTreeData: [],
      defaultProps: {
        children: 'children',
        // label: 'label' // 父子节点都使用同样的key
        label (data, node) {
          return data.label || data.name // 父子节点使用不同的key
        }
      },
      checkedMenuIds: []
    }
  },
  created () {
    this.loadTreeMenuData()
  },
  methods: {
    handleNodeClick (data) {
      console.log(data.id + ':' + data.label)
    },
    loadTreeMenuData () {
      getTreeMenus(this.sourceId).then((res) => {
        if (res.data.code === 200) {
          const { data } = res.data
          this.menuTreeData = data // 所有的菜单信息
          // 渲染选中的菜单信息
          // 方案1 在Data属性中 定义变量接收在标签中使用变量
          // this.checkedMenuIds = this.getSourceMenus(data)
          const checkedMenuIds = this.getSourceMenus(data)
          // this.$refs['menu-tree'].setCheckedKeys(checkedMenuIds) // 直接这么写会 因为渲染顺序的原因造成无法渲染
          // 解决方法2: $nextTick 下一个渲染周期内执行
          // this.$nextTick(() => {
          //   this.$refs['menu-tree'].setCheckedKeys(checkedMenuIds) // ref属性为中划线调用时写法 $refs['menu-tree']
          // })
          // 解决方案3
          // setTimeout(() => { // 计时器
          //   this.$refs['menu-tree'].setCheckedKeys(checkedMenuIds)
          // })
          // 解决方案4
          queueMicrotask(() => { // vue 微任务 相当于将方法后再加一个then() 但是需要将上一步的结果返回出去
            this.$refs['menu-tree'].setCheckedKeys(checkedMenuIds)
          })
        } else {
          this.$message.error('获取树形菜单数据失败')
        }
      })
    },
    getSourceMenus (menuArray) { // 查询当前资源拥有的菜单
      // 规则1 如果菜单有子菜单则以子菜单为主
      // 规则2 如果菜单无子菜单，并且标记为true，就保存他的id
      let menuIds = []
      menuArray.forEach(menu => {
        if (menu.children) {
          const tmpArr = this.getSourceMenus(menu.children)
          // 把方法的返回值数组赋值给总的menuid数组
          // menuIds = menuIds.concat(tmpArr)
          menuIds = [...menuIds, ...tmpArr] // 新语法
        } else if (menu.selected) {
          menuIds.push(menu.id)
        }
      })
      return menuIds
    },
    handleClear () {
      this.$refs['menu-tree'].setCheckedKeys([])
    },
    handleSave () {
      const checked = this.$refs['menu-tree'].getCheckedKeys()
      console.log(checked)
    }
  },
  props: {
    sourceId: {
      type: [Number, String], // 属性支持两种参数类型
      required: true
    }
  }
}
</script>