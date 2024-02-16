<template>
  <div class="upload-file">
    <el-progress
      type="circle"
      :percentage="uploadPercentage"
      v-if="isUploading"
      :status="uploadPercentage === 100 ? 'success' : undefined"
      :width="178"
    ></el-progress>
    <el-upload
      v-else
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUploadFile"
    >
      <img
       v-if="value"
       :src="value"
       class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { uploadFile } from '@/api/source'

export default {
  name: 'UploadFile',
  data () {
    return {
      uploadPercentage: 0, // 上传百分比
      isUploading: false // 是否正在上传
    }
  },
  props: {
    value: {
      type: String // 用于接收父组件 v-model 传递的值
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
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      this.imageUrl = URL.createObjectURL(file) // 实现本地预览
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
    handleUploadFile (option) {
      const fd = new FormData()
      fd.append('file', option.file)
      this.isUploading = true
      uploadFile(fd, (e) => {
        this.uploadPercentage = Math.floor(e.loaded / e.total * 100) // 上传百分比计算
      })
        .then((res) => {
          if (res.data.code === 200) {
            this.$emit('input', res.data.data.imageUrl)
          } else {
            this.$message.error('上传失败')
          }
        }
        ).finally(() => {
          this.isUploading = false
        })
    }
  }

}
</script>
<style>
.avatar-uploader .el-upload {
   border: 1px dashed #d9d9d9;
   border-radius: 6px;
   cursor: pointer;
   position: relative;
   overflow: hidden;
 }
 .avatar-uploader .el-upload:hover {
   border-color: #409EFF;
 }
 .avatar-uploader-icon {
   font-size: 28px;
   color: #8c939d;
   width: 178px;
   height: 178px;
   line-height: 178px;
   text-align: center;
 }
 .avatar {
   width: 178px;
   height: 178px;
   display: block;
 }
 .avatar-uploader {
    text-align: left;
 }
 .upload-file {
    text-align: left;
 }
</style>