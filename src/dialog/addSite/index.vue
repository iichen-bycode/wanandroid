<template>
  <FormDialog :show="showDialog">
    <template #form>
      <el-form  ref="formRef">
        <el-form-item label="" prop="title">
          <el-input placeholder="请输入网站名称" />
        </el-form-item>

        <el-form-item label="" prop="link">
          <el-input placeholder="请输入链接地址" />
        </el-form-item>
      </el-form>
    </template>
  </FormDialog>
</template>

<script setup lang="ts">
  import FormDialog from '@/dialog/form/index.vue'

  import {defineProps, ref, watch} from "vue";

  const props = defineProps( {
    'show':{
      type: Boolean,
      required:true,
    },
  })

  let showDialog = ref(false)
  watch(
      () => props.show,
      (newVal) => {
        showDialog.value = newVal;
      }, {
        immediate: true,
      })




</script>

<style scoped lang="scss">

</style>