<template>
<div>
  <el-card class="box-card" v-for="province in cityList" :key="province.id" >
  <el-checkbox
    :indeterminate="province.isIndeterminate"
    v-model="province.selected"
    @change="handleCheckAllChange(province)"
    >{{province.name}}</el-checkbox
  >
  <el-checkbox-group
    v-model="province.checkedCities"
    @change="handleCheckedCitiesChange(province)"
  >
    <el-row>
      <el-col :span="8" v-for="city in province.children" :key="city.id">
    <el-checkbox  :label="city.id" style="padding: 7px 0px">{{
      city.name
    }}</el-checkbox>
    </el-col>
    </el-row>
  </el-checkbox-group>
  </el-card>
  <el-button type="primary" @click="handleSave">保存</el-button>
  <el-button type="success" @click="handleClear">清空</el-button>
</div>
</template>

<script>
import { getCityList } from '@/api/source'

export default {
  name: 'CitySelect',
  data () {
    return {
      cityList: []
    }
  },
  created () {
    this.loadCities()
  },
  methods: {
    handleCheckAllChange (province) { // 多组复选框处理 全选、全不选
      province.checkedCities = province.selected ? province.allCites : []
      province.isIndeterminate = false
    },
    handleCheckedCitiesChange (province) { // 多组复选框处理 所有的子复选选中是父复选框对应变化
      const checkedCount = province.checkedCities.length
      const allCount = province.allCites.length
      province.selected = checkedCount === allCount
      province.isIndeterminate = checkedCount > 0 && checkedCount < allCount
    },
    handleClear () {
      this.cityList.forEach(city => {
        city.selected = false
        city.isIndeterminate = false
        city.checkedCities = []
      })
    },
    handleSave () {
      // 遍历方式1
      let selectedCity = []
      // this.cityList.forEach(city => {
      //   if (city.checkedCities.length > 0) {
      //     selectedCity = selectedCity.concat(city.checkedCities)
      //   }
      // })
      // 遍历方式2
      const { cityList } = this
      selectedCity = cityList.reduce((result, city) => { // reduce 将每次遍历的返回值赋值给 result
        return result.concat(city.checkedCities)
      }, []) // 给result初始化为空数组
      console.log(selectedCity)
    },
    loadCities () {
      getCityList(this.sourceId)
        .then((res) => {
          if (res.data.code === 200) {
            const { data } = res.data
            // 数据处理
            this.cityList = data.map((province) => { // 先解构省级单位
              let { id, name, children, selected } = province
              const checkedCities = [] // 选中的市级单位
              const allCites = [] // 所有的市级单位
              // 遍历市级单位列表
              children = children?.map((city) => { // 加？防止空指针
                const { id, name, selected } = city // 解构出需要的属性，并封装后返回
                // if (selected) {
                //   checkedCities.push(id)
                // }
                selected && checkedCities.push(id) // 与短路 简略写法同if 判断
                allCites.push(id)
                return { id, name, selected }
              })
              // 计算每个省级单位是否半选 // 记录当前省份是否为半选状态
              const isIndeterminate = checkedCities.length > 0 && checkedCities.length < allCites.length
              selected = (checkedCities.length === allCites.length)
              return {
                id,
                name,
                children,
                selected,
                checkedCities, // 添加自定义属性
                allCites,
                isIndeterminate
              }
            })
          } else {
            this.$message.error('获取城市列表失败')
          }
        })
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