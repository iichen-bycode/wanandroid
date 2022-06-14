<template>
  <div class="header">
    <div>
      <a class="logo" @click="handleMenuClick(0,'/')" ><img :src="require('@/assets/images/logo.png')"></a>
      <div class="nav">
        <ul>
          <li v-for="(nav,index) in navList" :key="index" @click="handleMenuClick(index,nav.route)" :class="{active:menuIndex === index}">
            <a>{{nav.nav}}</a>
          </li>
        </ul>
      </div>
      <div class="user">
        <div v-if="userInfo" class="userInfo">
          <el-dropdown ref="userMenu" trigger="hover" placement="top">
          <span class="el-dropdown-link">
            {{userInfo.nickname}}
            <i><a><span class="iconfont icon-message"></span></a></i>
          </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>用户中心</el-dropdown-item>
                <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div v-else>
          <ul class="lr">
            <li @click="showDialog"><a>登录</a></li>
            <li>·</li>
            <li><a >注册</a></li>
            <li class="message"><a><span class="iconfont icon-message"></span></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {useNavMenu} from "@/hooks/useNavMenu";
  import LoginDialog from "@/dialog/login/index";

  import {computed, getCurrentInstance, ref} from "vue";
  import { useStore } from 'vuex' // 引入useStore 方法
  const store = useStore()  // 该方法用于返回store 实例
  // 组件还未创建完成 可以使用这个 获取当前组件实例
  // const proxy = getCurrentInstance();
  const {menuIndex,handleMenuClick,navList} = useNavMenu();


  // 是否显示登录后的用户下拉选择菜单
  const userMenu = ref()

  const userInfo = computed(() => store.state.loginStore.userInfo)

  const loginOut = () => {
    store.dispatch('doLoginOut')
  }


  function showDialog() {
    LoginDialog.show({
      distinguishCancelAndClose: true
    }).then(() => {
      console.log('confirm')
    })
    .catch((e) => {
      console.log(e)
    });
  }
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  width: 100%;

  &>div{
    width: 100%;
    height: 60px;
    position: relative;
    max-width: 1260px;
    margin: 0 auto;
  }

  // 左侧logo
  .logo {
    float: left;
    line-height: 60px;
    margin: 0 20px;

    img{
      width: 68px;
      height: 50px;
    }
  }

  // 用户信息或登录注册
  .user {
    float: right;
    // 登录状态下的布局
    .userInfo{
      .el-dropdown-link{
        float: left;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    // 未登录状态下的布局
    .lr{
      li{
        float: left;
        line-height: 60px;
        font-size: 14px;
        a{
          color: #276692;
          cursor: pointer;
        }
      }
    }
    .message{
      height: 60px;
      line-height: 60px;
      a{
        display: inline-block;
        width: 30px;
        height: 30px;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        background-color: #fff;
        margin-top: 15px;
        overflow: hidden;
        .icon-message {
          display: block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          margin: 5px auto 0px;
          text-align: center;
          font-size: 20px;
          color: #276692;
        }
      }
    }
  }

  // 导航
  .nav {
    float: left;
    height: 100%;
    line-height: 60px;

    @mixin navUnderLine{
      content: " ";
      display: block;
      position: relative;
      bottom: 10px;
      left: 0;
      width: 100%;
      height: 3px;
      background: #276692;
      border-radius: 10px;
    }

    li {
      float: left;
      height: 100%;
      padding: 0 15px;

      a {
        color: #276692;
        cursor: pointer;
        font-size: 16px;

        &:after {
          @include navUnderLine;
          background: #fff;
        }

        &:hover:after{
          @include navUnderLine;
        }

      }
      // 不加控制 选择包含 active属性的 li元素
      &.active>a:after {
        @include navUnderLine;
      }
    }
  }
}

</style>