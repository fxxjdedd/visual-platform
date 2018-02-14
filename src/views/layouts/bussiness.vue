<template>
  <div class="Bussiness">
     <bussiness-sidebar></bussiness-sidebar> 
     <div class="Bussiness_Main">
        <router-view></router-view> 
     </div>
  </div>
</template>

<script>
import {BussinessSidebar} from '@/components/layouts'
export default {
  components: {
    BussinessSidebar
  }
}
</script>

<style lang="scss" scoped>
.Bussiness {
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



