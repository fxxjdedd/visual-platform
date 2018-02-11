<template>
  <div>
    <!-- 这个地方需要动态的default-active  -->
    <el-menu
      mode="horizontal"
      text-color="#777"
      active-text-color="#409EFF"
      :router="true">
      <div class="Nav">
        <div class="Nav__Logo">
          <span class="Nav__Logo__Title">Thoth</span>
        </div>
        <el-menu-item 
          class="Nav__Item" 
          index="/loglist" 
          :class="{'is-active': isActive('loglist')}">
          日志列表
        </el-menu-item>
        <el-menu-item 
          index="/backend"
          class="Nav__Item" 
          :class="{'is-active': isActive('backend')}">
          后台
        </el-menu-item>
        <div class="Nav__User">
          <p>{{userInfo}}</p>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {LOGLIST_LOGMAIN} from '@/utils'

export default {
  computed: {
    ...mapGetters('user', [
      'roles',
      'userName',
      'apps'
    ]),
    userInfo () {
      return `${this.userName.split('@')[0]}:${this.roles.join(',')}`
    },
    /** 因为要日志列表左侧栏目是动态的，所以要写成计算属性 */
    loglistIndex () {
      return this.apps.length ? `${LOGLIST_LOGMAIN}/${this.apps[0].appId}`
                              : `${LOGLIST_LOGMAIN}/default`
    }
  },
  methods: {
    isActive (name) {
      return this.$route.path.includes(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  // box-shadow: 0 2px 15px #eee;
  z-index: 996;
  position: fixed;
  left: 0;
  right: 0;
  .Nav {
    display: flex;
    align-items: center;
      &__Logo{
      height: 100%;
      width: 199px;
      display:flex;
      align-items: center;
      &__Image {
        background-image: url('../../assets/logo.png');
        height: 54px;
        width: 54px;
        margin-left: 20px;
        display: inline-block
      }
      &__Title {
        height: 100%;
        margin-left: 50px;
        color:#777;
        font-size: 30px;
        font-weight: bold;
        letter-spacing: 4px;
        vertical-align: middle;
      }
    }
    &__Item {
      font-weight: bold;
      margin-left: 1px;
      &:first-of-type{
        border-right: none;
        border-top: none;
        border-left: 1px solid #e6e6e6;
      }
    }
    &__User {
      position: absolute;
      right: 20px;
      p {
        color: #777;
        font-weight: bold;
      }
    }

  }
}
.is-active {
  color:#409EFF !important;
  border-bottom-color: #409EFF !important;
}

</style>