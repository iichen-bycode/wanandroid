<!--  import BaseDialog from "@/dialog/index"  -->
<template>
  <!--基类弹框 具体样式实现在 实现impl目录下-->
  <!--  <teleport to="body">-->
  <transition name="dialog" @after-leave="vanish">
    <div v-if="showDialog">
      <div class="mask" @click="action('close')" @keydown.esc="console.log('esc 按了')"/>
      <div class="dialog">
        <div class="header">
          <p class="title">登录</p>
          <span class="iconfont icon-Close" @click="action('close')"></span>
        </div>
        <div class="content">
          <el-form :model="loginForm" :rules="validate" ref="loginFormRef">
            <el-form-item label="" prop="username">
              <el-input placeholder="请输入用户名" v-model="loginForm.username"/>
            </el-form-item>

            <el-form-item label="" prop="password">
              <el-input placeholder="请输入密码" v-model="loginForm.password" type="password"/>
            </el-form-item>
          </el-form>
        </div>
        <div class="footer">
          <button class="confirmBtn" @click="submit(loginFormRef)">登录</button>
        </div>
      </div>
    </div>
  </transition>
  <!--  </teleport>-->
</template>

<script lang="ts">

import {defineComponent, reactive, ref, watch,} from "vue";
import {Action} from "@/global";
import {useLockscreen} from "@/hooks/use-lockscreen";
import {FormInstance, FormRules} from "element-plus";
import store from "@/store";

export default defineComponent({
  name: 'LoginDialog',
  emits: ['vanish', 'action'],
  props: {
    'show': {
      type: Boolean,
      default: false
    },
  },

  setup(props, {emit}) {
    let showDialog = ref(false)
    const loginFormRef = ref<FormInstance>()

    // 'vanish','action'    onAfterLeave 调用
    const vanish = () => {
      showDialog.value = false;
      emit('vanish',)
    }
    const action = (action: Action) => {
      showDialog.value = false;
      emit('action', action)
    }
    // 提交
    const submit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          action('confirm')
          doRequestLogin()
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    const doRequestLogin = () => {
      store.dispatch('doLogin',loginForm)
    }

    const loginForm = reactive({
      username: '',
      password:''
    })

    const validate = reactive<FormRules>({
      username:{
        required: true,
        message:"请输入用户名哦！"
      },
      password:{
        required: true,
        message:'请输入密码哦！'
      }
    })

    watch(
        () => props.show,
        (newVal) => {
          showDialog.value = newVal;
        }, {
          immediate: true,
        })

    useLockscreen(showDialog)

    return {
      showDialog,
      vanish,
      action,
      loginForm,
      validate,
      submit,
      loginFormRef
    }
  }
});
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .35);
  z-index: 999;

}

.dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1200;
  width: 320px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;

  .header {
    height: 20px;
    position: relative;

    .title {
      font-size: 15px;
      text-align: center;
      font-weight: bold;
    }

    .icon-Close {
      position: absolute;
      right: 0;
      top: 0;
      height: 20px;
      line-height: 20px;
      font-size: 32px;
    }
  }

  .content {
    margin:32px 0

  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .confirmBtn {
      flex: 1;
      color: white;
      background-color: #3498db;
      height: 45px;
      border-radius: 8px;
    }

  }
}


.dialog-enter-active,
.dialog-leave-active {
  transition: opacity .5s;
}

.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}
</style>