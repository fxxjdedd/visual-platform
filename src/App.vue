<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import {Navbar} from '@/components/layouts'
export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
@import url('assets/css/main.css');
</style>
