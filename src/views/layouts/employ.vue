<template>
  <div class="Employ">
     <employ-sidebar></employ-sidebar> 
     <div class="Employ_Main">
        <router-view></router-view> 
     </div>
  </div>
</template>

<script>
import {EmploySidebar} from '@/components/layouts'
export default {
  components: {
    EmploySidebar
  }
}
</script>

<style lang="scss" scoped>
.Employ {
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



