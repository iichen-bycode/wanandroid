<template>
  <div class="footer">
    <div class="w">
      <p class="info">版权所有 © 2022-2025 <a href="https://blog.iichen.cn">&nbsp;IIchen</a>&nbsp;|&nbsp;
        <a href="http://www.miitbeian.gov.cn">皖ICP备20005643号-1</a>&nbsp;
        <router-link to="/about" href="http://www.miitbeian.gov.cn"> 关于我们</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    border-top: 1px solid #e4dede;
    background-color: white;

    &   .info{
      height: 60px;
      line-height: 60px;
      margin: 0 auto;
      color: #767676;
      font-size: 14px;
      text-align: center;
    }
    a{
      text-decoration: underline;
    }
  }

</style>