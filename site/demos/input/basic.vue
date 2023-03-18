<docs>
---
title: 基础输入框
---

你可以使用v-model 指定想要绑定的值

</docs>
<template>
  <div>
    <LyInput v-model="inputValue" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const inputValue = ref('');
</script>
