<template>
  <div class="login">
    <el-form ref="form" :model="formData" label-width="80px" :rules="myRules">
        <h2>登录</h2>
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import zjyrequest from '@/utils/request'

export default {
  name: 'LoginVueV1',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      myRules: {
        username: [
          { required: true, message: '用户名必填', trigger: 'blur' },
          { pattern: /\w{3,}$/, message: '用户名不合法', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码必填', trigger: 'blur' },
          { pattern: /\w{3}$/, message: '密码不合法', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate()
        .then(() => {
          this.$message.success('表单验证通过')
          zjyrequest({ // 会拼接baseusrl
            method: 'POST',
            url: '/login/userAndPwd',
            // params: { // 方式1
            //   username: this.formData.username,
            //   password: this.formData.password
            // },
            // data: this.formData // 方式3，需要与后台接收方式一致，默认为json对象 对应application-json
            data: `username=${this.formData.username}&password=${this.formData.password}` // 方式2 'application/x-www-form-urlencoded'
          }).then(res => {
            console.log(res.data)
          })
        })
        .catch(() => {
          this.$message.error('表单验证失败')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-form {
    width: 20%;
    background-color: #fff;
}
</style>
