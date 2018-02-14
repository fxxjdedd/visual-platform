<template>
  <div class="Sidebar">
      <el-menu
        class="Sidebar__Menu"
        :router="true"
        :default-active="$route.path">
        <el-menu-item
          v-for="item in sidelist"
          :key="item.value"
          :index="item.value">
            {{item.label}}
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sidelist: [
        {value: '/job/campbase', label: '见习基地'},
        {value: '/job/jobwanted', label: '求职信息'}
      ]
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

