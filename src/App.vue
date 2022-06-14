<template>
  <div class="w">
    <el-affix>
      <Header></Header>
    </el-affix>
    <router-view v-slot="{Component}">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <Footer></Footer>
  </div>

</template>

<script setup lang="ts">

</script>

<style lang="scss">
  body{
    background-color: #f4f4f4;

    .header {
      background-color: white;
    }
  }
</style>
