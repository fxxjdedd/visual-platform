<template>
  <div class="Sidebar">
      <el-menu
        class="Sidebar__Menu"
        :router="true"
        :default-active="$route.path">
        <el-menu-item
          v-for="app in apps"
          :key="app.appId"
          :index="getIndexPath(app.appId)">
            {{app.appName}}
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {LOGLIST_LOGMAIN} from '@/utils'

export default {
  computed: {
    ...mapGetters('user', [
      'apps'
    ])
  },
  methods: {
    getIndexPath (appId) {
      return `${LOGLIST_LOGMAIN}/` + appId
    }
  }
}
</script>

<style lang="scss" scoped>
.Sidebar {
    &__Menu {
        position: fixed;
        top: 60px;
        left: 0;
        bottom: 0;
        overflow-y: auto;
        width: 200px;
    }
    z-index: 999;
    
}
</style>

