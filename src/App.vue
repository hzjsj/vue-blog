<template>
  <div id="app">
    <div class="k_menu">
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" :router="true" @select="handleSelect">
      <el-menu-item index="/">首页</el-menu-item>
    </el-menu>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '/'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
.k_menu{
  width: 80%;
  margin-left: 10%;
}
</style>
