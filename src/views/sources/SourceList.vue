<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="queryParams" class="demo-form-inline" ref="sourceForm">
        <el-form-item label="资源名称" prop="name">
            <el-input v-model="queryParams.name" placeholder="资源名称" ></el-input>
        </el-form-item>
        <el-form-item label="创建日期" prop="name">
            <el-date-picker
      v-model="createTimeArr"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="资源类别"  prop="sourceType">
    <el-select v-model="queryParams.sourceType" placeholder="资源类别">
      <el-option label="全部" value="0"></el-option>
      <el-option v-for="sourceType in sourceTypeData" :key="sourceType.id" :label="sourceType.name" :value="sourceType.id"></el-option>
    </el-select>
  </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
            <el-button type="info" @click="onReset">重置</el-button>
        </el-form-item>
        </el-form>
      </div>
      <el-button @click="handleDialog(0)">添加</el-button>
      <el-button @click="$router.push({ name: 'source-type-list'})">资源分类</el-button>
      <el-table :data="sourceData" border style="width: 100%" v-loading="isLoading">
        <el-table-column type="index" label="编号" width="50" align="center"> </el-table-column>
        <el-table-column prop="name" label="姓名" align="center"> </el-table-column>
        <el-table-column prop="avater" label="头像" align="center" v-slot="scope">
          <el-avatar :size="30" :src="scope.row.avater || defaultAvater"></el-avatar>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" :formatter="timeFormatter" align="center"> </el-table-column>
        <el-table-column prop="address" label="资源路径" align="center"> </el-table-column>
        <el-table-column  label="资源状态" align="center" v-slot="scope">
          <el-switch
  style="display: block"
  v-model="scope.row.status"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="启用"
  inactive-text="禁用"
  active-value="ENABLE"
  inactive-value="DISABLE"
  @change="handleChangeStatus(scope.row)">
</el-switch>
        </el-table-column>
        <el-table-column label="操作" width="380">
          <template v-slot="scope">
            <el-button size="mini" type="success" @click="$router.push({name: 'menu-tree', params: {sourceId: scope.row.id}})">分配菜单</el-button>
            <el-button size="mini" type="primary" @click="$router.push({name: 'city-select', params: {sourceId: scope.row.id}})">分配城市</el-button>
            <el-button size="mini" type="info" @click="handleDialog(1)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delSource(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryParams.index"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="queryParams.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryResult.dataNumber"
      :disabled="isLoading"
      >
    </el-pagination>
    <add-source ref="sourceDialog"></add-source>
    </el-card>
</template>
<script>
import dayjs from 'dayjs' // 引入三方日期处理函数 dayjs https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
import { getSourcePageList, getSourceTypeList } from '@/api/source'
import AddSource from './AddSource.vue'

// 导入对话框组件
export default {
  name: 'SourceList',
  data () {
    return {
      sourceData: [],
      queryParams: {
        id: '',
        name: '',
        avater: '',
        address: '',
        sourceType: '',
        createTime: '',
        status: 'DISABLED',
        index: 1,
        size: 10
      },
      sourceTypeData: [],
      queryResult: {},
      isLoading: false,
      createTimeArr: [],
      defaultAvater: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  watch: { // 监听日期选择数组
    createTimeArr: {
      deep: true,
      handler (newValue) {
        console.log(newValue[0])
        console.log(newValue[1])
      }
    }
  },
  created () {
    this.loadSourceType()
    this.loadSourceList()
  },
  methods: {
    // 添加或编辑对话框
    handleDialog (sourceId = 0) {
      this.$refs.sourceDialog.showAndInit(sourceId) // ref 代表子组件 父组件调用子组件方法
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
    loadSourceList () {
      this.isLoading = true
      getSourcePageList(this.queryParams).then((res) => {
        if (res.data.code === 200) {
          const { data, index, size, pageNumber, dataNumber, currentPage } = res.data
          this.sourceData = data
          Object.assign(this.queryParams, { index, size })
          this.queryResult = { pageNumber, dataNumber, currentPage }
          this.$message.success('加载资源成功')
        } else {
          this.$message.error('加载资源失败')
        }
      }).finally(() => {
        this.isLoading = false
      })
    },
    delSource (id) {
      this.$message.success('删除资源成功：' + id)
    },
    timeFormatter (row, column, value, index) { // 封装日期时间格式化参数
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.queryParams.size = val
      this.loadSourceList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.queryParams.index = val
      this.loadSourceList()
    },
    onSubmit () {
      console.log('submit!')
      this.loadSourceList()
    },
    onReset () {
      console.log('reset!')
      // 给表单一个引用 sourceForm 需要在el-item上加 prop="sourceType"
      this.$refs.sourceForm.resetFields() // eleui 提供的重置方法
      this.loadSourceList()
    },
    handleChangeStatus (row) {
      console.log(row.status)
      // row.status 此时状态为变化后的状态
      const info = row.status === 'ENABLE' ? '启用成功' : '禁用成功'
      this.$message.success(info)
    }

  },
  components: {
    AddSource
  }
}
</script>
<style lang="scss" scoped>
.box-card {
  text-align: left;
}
.el-table {
  margin-top: 10px;
}
</style>