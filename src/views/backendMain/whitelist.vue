<template>
  <div class="WhiteList">
    <el-form
      :model="form"
      :rules="rules"
      ref="whitelistForm"
      label-width="100px">
      <el-form-item 
        label="业务ID"
        prop="appId">
        <el-select
            v-model="form.appId"
            filterable
            reserve-keyword
            placeholder="请选择">
            <el-option
              v-for="item in apps"
              :key="item.value"
              :label="item.appName"
              :value="item.appId">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item 
        label="用户IMEI"
        prop="userImei">
        <el-input v-model="form.userImei"></el-input>
      </el-form-item>
      <el-form-item 
        label="所有者"
        prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('whitelistForm')">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      form: {
        appId: '',
        userImei: '',
        userName: ''
      },
      rules: {
        appId: [
          { required: true, message: '请选择业务ID', trigger: 'change' }
        ],
        userImei: [
          { required: true, message: '请输入用户IMEI', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入所有者', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getApps()
  },
  computed: {
    ...mapGetters('backend', [
      'apps'
    ])
  },
  methods: {
    ...mapActions('backend', [
      'getApps',
      'addWhiteList'
    ]),
    onSubmit (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const code = await this.addWhiteList(this.form)
          console.log(code)
          if (code === 200) {
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败，可能是添加过')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.WhiteList {
  height: 100%;
  width:600px;
  margin-top: 60px;
  text-align: left;

}
</style>

