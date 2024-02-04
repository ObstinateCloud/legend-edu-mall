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
        <el-button type="primary" @click="onSubmit" :loading="isSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { login } from '@/api/user'

export default {
  name: 'LoginVue',
  data () {
    return {
      isSubmit: false,
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
      this.isSubmit = true
      this.$refs.form
        .validate()
        .then(() => {
          return login(this.formData)
        })
        .then((res) => {
          const { data } = res
          console.log(res.data)
          if (data.code === 200) {
            this.$message.success('登录成功')
            // this.$router.push('/')// 使用路由路径跳转
            this.$router.push({ name: 'home' })// 使用路由名称跳转，名称更推荐一般不变
            this.$store.commit('changeLoginResponse', data)
          } else if (data.code === 201) {
            this.$message.error('用户名或密码错误')
          }
        })
        .catch(() => {
          this.$message.error('表单验证失败')
        })
        .finally(() => {
          this.isSubmit = false
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
