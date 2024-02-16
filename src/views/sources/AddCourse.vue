<template>
  <div>
    <el-page-header @back="goBack" :content="title"></el-page-header>
    <el-button type="primary" class="topSava">保存</el-button>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-steps :active="curentStep" simple>
  <el-step title="基本信息" @click.native="curentStep=0" icon="el-icon-edit"></el-step>
  <el-step title="课程封面" @click.native="curentStep=1" icon="el-icon-upload"></el-step>
  <el-step title="销售信息" @click.native="curentStep=2" icon="el-icon-picture"></el-step>
  <el-step title="秒杀活动" @click.native="curentStep=3" icon="el-icon-edit"></el-step>
  <el-step title="课程详情" @click.native="curentStep=4" icon="el-icon-upload"></el-step>
</el-steps>
  </div>
  <el-form ref="form" :model="course" >
  <div v-show="curentStep === 0">
      <el-form-item label="课程名称">
      <el-input v-model="course.name" maxlength="20">
        <template slot="append">{{course.name.length}}/20</template>
      </el-input>
       </el-form-item>
  </div>
  <div v-show="curentStep === 1">
     <el-form-item label="课程封面">
      <upload-file v-model="course.imageUrl"></upload-file>
       </el-form-item>
  </div>
  <div v-show="curentStep === 2">
    <el-form-item label="销售数量">
      <el-input v-model="course.discount" type="number" >
      </el-input>
       </el-form-item>
  </div>
  <div v-show="curentStep === 3">
        <el-form-item label="开启秒杀">
            <el-switch
  v-model="course.openDiscount"
  active-color="#13ce66"
  inactive-color="#ff4949"
  :active-value="true"
  :inactive-value="false"
  >
</el-switch>
</el-form-item>
<!-- v-if 控制template 元素的显示隐藏 v-show 控制div元素的显示隐藏 -->
<template v-if="course.openDiscount">
      <el-form-item label="秒杀价格">
      <el-input v-model="course.discountPrice" type="number" />
     </el-form-item>
       <el-form-item label="秒杀数量">
      <el-input v-model="course.discountNum" type="number" />
    </el-form-item>
</template>
</div>
  <div v-show="curentStep === 4">
  <el-form-item label="课程详情">
  </el-form-item>
  <text-editor v-model="course.courseDetails"></text-editor>
  </div>
  <el-form-item>
    <el-button type="info" @click="nextStep" v-if="curentStep !==4 ">下一步</el-button>
    <el-button type="primary" @click="onSubmit" v-else>提交</el-button>
  </el-form-item>
</el-form>
</el-card>
  </div>
</template>

<script>
import { uploadFile } from '@/api/source'
import TextEditor from '@/components/TextEditor'
import UploadFile from '@/components/UploadFile'
export default {
  name: 'AddCourse',
  data () {
    return {
      curentStep: 0,
      course: {
        name: '',
        imageUrl: '',
        discount: 0,
        openDiscount: false,
        discountPrice: 0,
        discountNum: 0,
        courseDetails: ''
      }
    }
  },
  props: {
    sourceId: {
      type: [Number, String] // 属性支持两种参数类型
    }
  },
  created () {
  },
  computed: {
    title () {
      return this.sourceId !== undefined ? '编辑课程' : '新增课程'
    }
  },
  methods: {
    init () {

    },
    goBack () {
      this.$router.go(-1) // -1 代表前一页 1 后一页
    },
    nextStep () {
      this.curentStep = (this.curentStep + 1) % 5
    },
    onSubmit () {

    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      console.log(file.type)
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleUpload (option) {
      const fd = new FormData()
      fd.append('file', option.file)
      uploadFile(fd).then((res) => {
        if (res.data.code === 200) {
          console.log(res.data)
        } else {
          this.$message.error('上传失败')
        }
      }
      )
    }
  },
  components: {
    TextEditor,
    UploadFile
  }

}
</script>

<style>
.topSava {
    float: right;
    margin-top: -50px;
 }
 .el-page-header {
    margin-bottom: 20px;
 }

.el-step {
    cursor: pointer;
}
</style>