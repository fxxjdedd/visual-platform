<template>
  <div class="Job">
     <job-sidebar></job-sidebar> 
     <div class="Job_Main">
        <router-view></router-view> 
     </div>
  </div>
</template>

<script>
import {JobSidebar} from '@/components/layouts'
export default {
  components: {
    JobSidebar
  }
}
</script>

<style lang="scss" scoped>
.Job {
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



