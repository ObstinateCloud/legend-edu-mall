<template>
   <el-dialog :title="title" :visible.sync="dialogFormVisible">
  <el-form :model="sourceData">
    <el-form-item label="名称" :label-width="formLabelWidth">
      <el-input v-model="sourceData.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="路径" :label-width="formLabelWidth">
      <el-input v-model="sourceData.address" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="描述" :label-width="formLabelWidth">
    <el-input type="textarea" v-model="sourceData.desc"></el-input>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </div>
</el-dialog>
</template>
<script>
import { addSource } from '@/api/source'
export default {
  name: 'AddSource',
  data () {
    return {
      dialogFormVisible: false,
      sourceData: {
        name: '',
        address: '',
        sourceData: ''
      },
      formLabelWidth: '120px',
      isCreate: false // 根据传参id来判断，是修改还是创建
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
      addSource(this.sourceData).then((res) => {
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
    showAndInit (sourceId = 0) { // 默认值为0
      // 初始化对话框
      this.isCreate = sourceId < 1
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