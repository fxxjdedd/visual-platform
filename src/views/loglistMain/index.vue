<template>
  <div class="ImeiTable">

    <el-table
      :data="pmtdImeis">
      <el-table-column
        label="用户名">
         <template slot-scope="scope">
          <el-button plain type="primary" class="ImeiTable__Button" @click="clickHandler(scope.row)">
            <!-- <router-link :to="`/loglist/logdetail/${scope.row.userImei}`">{{scope.row.userName}}</router-link>   -->
            {{scope.row.userName}}
          </el-button>
         </template> 
      </el-table-column>
      <el-table-column
        prop="userImei"
        label="imei">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {LOGLIST_LOGMAIN, LOGLIST_LOGDETAIL} from '@/utils'
export default {
  props: ['appId'],
  updated () {
    // 因为总是子组件先加载，所以在create钩子中使用apps，会是[]
    // 同时要注意这里的循环，getPmtedImeis会再次更改页面，导致updated钩子死循环(所以改用 watch)
    // nextTick表示等待整个视图update完成（而不是更新一个地方执行一次），再执行。
    // this.$nextTick(function () {
    //   this.getPmtedImeis(this.apps.length ? this.apps[0].appId : '')
    // })
  },
  created () {
    if (this.appId === 'default' && this.apps.length) {
      this.redirect()
      return
    }
    this.getPmtedImeis(this.appId)
  },
  computed: {
    ...mapGetters('loglist', [
      'pmtdImeis'
    ]),
    ...mapGetters('user', [
      'apps'
    ])
  },
  watch: {
    apps () {
      if (this.appId === 'default') {
        this.redirect()
        return
      }
      // this.getPmtedImeis(this.apps.length ? this.apps[0].appId : '')
      this.getPmtedImeis(this.appId)
    }
  },
  methods: {
    ...mapActions('loglist', [
      'getPmtedImeis'
    ]),
    clickHandler (row) {
      this.$router.push(`${LOGLIST_LOGDETAIL}/${row.userImei}`)
    },
    redirect () {
      this.$router.replace(`${LOGLIST_LOGMAIN}/${this.apps[0].appId}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.ImeiTable {
  height: 100%;
  width:1000px;
  margin: 0 auto;
  a {
    text-decoration: none;
    color: #409EFF;
    &:hover {
      color: white;
    }
  }
  &__Button:hover {
    color: red;
    &:hover {
      color: white;
    }
  }
} 
</style>



