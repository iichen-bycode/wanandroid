<template>
  <teleport to="body">
    <transition name="dialog">
      <div v-if="showDialog" @keydown.esc="onDismiss" tabindex="0">
        <div class="mask" @click="onDismiss"/>
        <div class="container">
          <div class="header">
            <p class="title">{{props.title}}</p>
            <span class="iconfont icon-Close" @click="onDismiss"></span>
          </div>
          <div class="form">
            <slot name="form"></slot>
          </div>
          <div class="footer">
            <div v-show="props.showCancel" class="btn cancel" @click="onDismiss">
              {{props.cancelText}}
            </div>
            <div class="btn confirm" @click="onConfirm">
              {{props.confirmText}}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
  import {useLockscreen} from "@/hooks/use-lockscreen";
  import {BaseDialog} from "@/hooks/use-dialog";

  const {onDismiss,onConfirm,showDialog,props} = BaseDialog();

  useLockscreen(showDialog)

</script>

<style scoped lang="scss">
.container{
  @include dialogContent;

  .header{
    position: relative;
    .title{
      text-align: center;
      font-size: 16px;
    }
    .icon-Close{
      position: absolute;
      right: 0;
      top: 0;
      height: 20px;
      line-height: 20px;
      font-size: 32px;
    }
  }
  .form{
    padding: 24px 0;

  }
  .footer{
    display: flex;
    justify-content: center;

    .btn{
      width: 140px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 8px;
      cursor: pointer;
    }
    .cancel{
      background-color: #eee;
      color: #3498db;
      margin-right: 32px;
    }
    .confirm{
      background-color: #3498db;
      color: #fff;
    }
  }
}
</style>