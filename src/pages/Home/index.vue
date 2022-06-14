<template>
  <div class="home">
    <div class="article">
      <Article></Article>
    </div>
    <div class="aside">
      <div class="content">
        <Aside></Aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Article from '@/pages/Home/Article/index.vue'
  import Aside from '@/pages/Home/Aside/index.vue'
</script>

<style scoped lang="scss">

  .home {
    position: relative;
    max-width: 1200px;
    width: 100%;
    margin: 30px auto;

    .article{
      position: relative;
      width: calc(100% - 320px);
      max-width: 100%;
      box-sizing: border-box;
    }
    .aside{
      position: absolute;
      width: 300px;
      top: 0;
      right: 0;

      .content{
        position: relative;
        width:inherit;
        transition:top .2s
      }
    }
  }

</style>