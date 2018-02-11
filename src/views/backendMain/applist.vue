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
        <el-input v-model="appId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item 
        label="业务名称"
        prop="appName">
        <el-input v-model="form.appName"></el-input>
      </el-form-item>
      <el-form-item 
        label="工厂路径"
        prop="factoryPath">
        <el-input v-model="form.factoryPath"></el-input>
      </el-form-item>
      <el-form-item 
        label="kafka路径"
        prop="kafkaPath">
        <el-input v-model="form.kafkaPath"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('whitelistForm')">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getDecodedAppId } from '@/utils'
export default {
  data () {
    return {
      form: {
        appName: '',
        factoryPath: '',
        kafkaPath: ''
      },
      rules: {
        appName: [
          { required: true, message: '请输入用户IMEI', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    appId () {
      return getDecodedAppId()
    }
  },
  methods: {
    ...mapActions('backend', [
      'addAppList'
    ]),
    onSubmit (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const code = await this.addAppList(Object.assign({}, {appId: this.appId}, this.form))
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

