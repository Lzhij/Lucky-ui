<docs>
---
title: 清除/触发校验与重置
---

你可以使用input实例的validate触发校验、也可以使用clearValid来清除校验；
使用reset方法会重置输入框的内容与校验、也可以通过isValidFailed获取当前输入框是否校验失败

</docs>
<template>
  <div>
    <LyInput ref="input" v-model="inputValue" required :validator="validateInput" />
  </div>
  <div style="margin-top: 20px">
    <Ly-button @click="validate" type="primary">validate</Ly-button>
    <Ly-button @click="clearValid" type="danger">clearValid</Ly-button>
    <Ly-button @click="reset" type="info">reset</Ly-button>
    <Ly-button @click="getIsValidFailed">isValidFailed</Ly-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import { InputInstance } from '@lucky-ui/com/input';

const inputValue = ref('');
const input = shallowRef<InputInstance>();

const validate = () => input.value.validate();

const clearValid = () => input.value.clearValid();

const reset = () => input.value.reset();

const getIsValidFailed = () => alert(input.value.isValidFailed);

const validateInput = (value: string) => {
  console.log((/[^\d]+/).test(value));
  if ((/[^\d]+/).test(value)) return '只允许输入数字';
  return true;
};

</script>
