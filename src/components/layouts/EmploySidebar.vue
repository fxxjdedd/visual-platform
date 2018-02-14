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
        {value: '/employ/talent', label: '人才岗位'},
        {value: '/employ/jobfair', label: '招聘会'}
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

