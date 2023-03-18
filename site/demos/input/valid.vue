<docs>
---
title: 校验
---

你可以指定required属性指定input不允许输入空字符串, 也可以通过validator属性传入一个校验函数

</docs>
<template>
  <div>
    <LyInput v-model="inputValue" required />
  </div>
  <div style="margin-top: 20px">
    <LyInput v-model="inputValue1" :validator="validateValue1" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const inputValue = ref('');
const inputValue1 = ref('');

const validateValue1 = (value: string) => {
  if (value.match(/[abcd]/)) return '不允许输入abcd';
  return true;
};
</script>
