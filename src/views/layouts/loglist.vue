<template>
  <div class="Loglist">
     <sidebar></sidebar> 
     <div class="Loglist__Main">
        <!-- 采用key的方式，而不是使用监听$route(监听$route在从/backend/whitelist切换到/loglist/logmain/000001的时候不会刷新组件，还不知道原因) -->
        <router-view :key="key"></router-view> 
     </div>
  </div>
</template>

<script>
import {Sidebar} from '@/components/layouts'
export default {
  components: {
    Sidebar
  },
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + new Date().getTime() : this.$route + new Date().getTime()
    }
  }
}
</script>

<style lang="scss" scoped>
.Loglist {
  overflow: hidden;
  &__Main {
    height: 100%;
    margin-left: 201px;
    margin-top: 60px;
    padding: 20px 60px;
    z-index: 0;
  }
} 
</style>



