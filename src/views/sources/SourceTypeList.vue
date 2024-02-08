<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="handleDialog(0)">新增</el-button>
      </div>
      <el-table :data="sourceTypeData" border style="width: 100%">
        <el-table-column type="index" label="编号" width="50" align="center"> </el-table-column>
        <el-table-column prop="name" label="名称" align="center"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" :formatter="timeFormatter" align="center"> </el-table-column>
        <el-table-column prop="sort" label="排序" align="center"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scoped">
            <el-button size="mini" @click="handleDialog(1)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delSourceType(scoped.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <add-source-type ref="sourceTypeDialog" @reloadResourceList="loadSourceType"></add-source-type>
    </el-card>
</template>
<script>
import dayjs from 'dayjs' // 引入三方日期处理函数 dayjs https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
import AddSourceType from './AddSourceType.vue'
import { getSourceTypeList } from '@/api/source'

// 导入对话框组件
export default {
  name: 'SourceTypeList',
  data () {
    return {
      sourceTypeData: []
    }
  },
  created () {
    this.loadSourceType()
  },
  methods: {
    // 添加或编辑对话框
    handleDialog (sourceTypeId = 0) {
      this.$refs.sourceTypeDialog.showAndInit(sourceTypeId) // ref 代表子组件 父组件调用子组件方法
    },
    loadSourceType () {
      getSourceTypeList().then((res) => {
        if (res.data.code === 200) {
          const { data } = res.data
          this.sourceTypeData = data
          this.$message.success('加载资源类别成功')
        } else {
          this.$$message.error('加载资源类别失败')
        }
      })
    },
    delSourceType (id) {
      this.$message.success('删除资源类别成功：' + id)
    },
    timeFormatter (row, column, value, index) { // 封装日期时间格式化参数
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  components: {
    AddSourceType
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