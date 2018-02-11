<template>
  <div class="Sidebar">
      <el-menu
        class="Sidebar__Menu"
        :router="true"
        :default-active="$route.path">
        <el-menu-item
          v-for="item in sidebarItems"
          :key="item.path"
          :index="getIndexPath(item.path)">
          {{item.label}}
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('user', [
      'apps',
      'pmtdRoutes'
    ]),
    sidebarItems () {
      return this.pmtdRoutes.length
              ? this.pmtdRoutes.find(route => route.name === 'backend').children
              : []
    }
  },
  methods: {
    getIndexPath (index) {
      return '/backend/' + index
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

