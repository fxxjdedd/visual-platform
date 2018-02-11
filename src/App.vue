<template>
  <div id="app">
    <navbar></navbar>
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
import {Navbar} from '@/components/layouts'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'app',
  components: {
    Navbar
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'pmtdRoutes'
    ]),
    key () {
      return this.$route.name !== undefined ? this.$route.name + new Date().getTime() : this.$route + new Date().getTime()
    }
  },
  methods: {
    ...mapActions('user', [
      'initUserInfo'
    ]),
    mountRoutes (routes) {
      // TODO: 需要对子路由也加上鉴定
      this.$router.addRoutes(this.pmtdRoutes)
    }
  },
  async created () {
    // TODO:在这里初始化用户信息
    await this.initUserInfo()
    this.mountRoutes()
  }
}
</script>

<style>
@import url('assets/css/main.css');
</style>
