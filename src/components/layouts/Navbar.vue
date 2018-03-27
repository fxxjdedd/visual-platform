<template>
  <div>
    <el-menu
      mode="horizontal"
      text-color="#777"
      active-text-color="#409EFF"
      default-active="/job"
      :router="true">
      <div class="Nav">
        <div class="Nav__Logo">
          <span class="Nav__Logo__Title">USESD</span>
        </div>
        <el-menu-item 
          class="Nav__Item" 
          index="/job">
          我要求职
        </el-menu-item>
        <el-menu-item 
          class="Nav__Item" 
          index="/employ">
          企业招聘
        </el-menu-item>
        <!-- <el-menu-item 
          class="Nav__Item" 
          index="/bussiness"> 
          大众创业
        </el-menu-item> -->
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.el-menu {
  box-shadow: 0 2px 15px #eee;
  z-index: 996;
  position: fixed;
  left: 0;
  right: 0;
  .Nav {
    height: 60px;
    display: flex;
    &__Logo{
      height: 100%;
      width: 199px;
      display: flex;
      align-items: center;
      justify-content: center;
      &__Title {
        color:#777;
        font-size: 30px;
        font-weight: bold;
        letter-spacing: 4px;
      }
    }
    &__Item {
      font-weight: bold;
      margin-left: 1px;
      &:first-of-type{
        border-right: none;
        border-top: none;
      }
    }
  }
}
</style>