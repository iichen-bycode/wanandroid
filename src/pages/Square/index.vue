<template>
  <div class="content">
    <div class="title">
      <h2>近期分享</h2>
    </div>
    <Article :type-flag="1"></Article>
  </div>
</template>

<script setup lang="ts">
  import Article from '@/pages/Home/Article/index.vue'


</script>

<style scoped lang="scss">
  .content{
    max-width: 1200px;
    width: 100%;
    margin: 30px auto;
    background-color: white;

    .title{
      height: 40px;
      line-height: 40px;
      border-bottom: 2px solid #8DB5D0;
      //padding-left: 8px;
      text-indent: 10px;
      font-size: 16px;
    }
  }
</style>