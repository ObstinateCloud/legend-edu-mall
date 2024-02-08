<template>
   <el-dialog :title="title" :visible.sync="dialogFormVisible">
  <el-form :model="sourceType">
    <el-form-item label="名称" :label-width="formLabelWidth">
      <el-input v-model="sourceType.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="排序" :label-width="formLabelWidth">
      <el-input v-model="sourceType.sort" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </div>
</el-dialog>
</template>
<script>
import { addSourceType } from '@/api/source'
export default {
  name: 'AddSourceType',
  data () {
    return {
      dialogFormVisible: false,
      sourceType: {
        name: '',
        sort: ''
      },
      formLabelWidth: '120px',
      isCreate: false // 根据路由信息中是否携带id来判断，是修改还是创建
    }
  },
  created () {
  },
  computed: {
    title () {
      return this.isCreate ? '新增' : '编辑'
    }
  },
  methods: {
    onSubmit () {
      addSourceType(this.sourceType).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(`${this.title}成功:`)
          // 通知父组件重新加载列表
          this.$emit('reloadResourceList')
        } else {
          this.$message.warning(`${this.title}失败`)
        }
        this.dialogFormVisible = false
      })
    },
    showAndInit (sourceTypeId = 0) { // 默认值为0
      // 初始化对话框
      this.isCreate = sourceTypeId < 1
      this.dialogFormVisible = true
      if (this.isCreate) {
        console.log('新建')
      } else {
        console.log('编辑')
      }
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