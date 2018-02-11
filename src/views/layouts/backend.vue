<template>
  <div class="Backend">
    <backend-sidebar></backend-sidebar>
    <div class="Backend__Main">
        <router-view></router-view> 
     </div>
  </div>
</template>

<script>
import {BackendSidebar} from '@/components/layouts'
export default {
  components: {
    BackendSidebar
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.Backend {
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
