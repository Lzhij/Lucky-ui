<template>
  <div class="app">
    <LyTable :cols="cols" :data="tableData">
      <template #name="{ value }">
        <div>{{ value }}</div>
      </template>
    </LyTable>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';
const cols = [
  { field: 'name', text: '名称' },
  { field: 'count', text: '数量' },
  { field: 'id', text: 'ID' },
  { field: 'price', text: '价格', children: [
    { field: 'prevPrice', text: '税前价格', width: 150 },
    { field: 'nextPrice', text: '税后价格', width: 150 }
  ] },
  { field: 'test', text: '测试', children: [
    { field: 'test1', text: '测试1' },
    { field: 'test2', text: '测试2', children: [
      { field: 'test2-1', text: '测试2-1' },
      { field: 'test2-2', text: '测试2-2' }
    ] }
  ] }
];

const tableData = ref(Array.from(Array(20)).map((t, i) => ({
  id: i,
  name: 'name' + i,
  count: i + 10,
  prevPrice: i,
  nextPrice: i,
  test1: 'test1' + i,
  'test2-1': 'test2-1-' + i,
  'test2-2': undefined
})));
</script>

<style lang="less" scoped>
.app {
  width: 60%;
  margin: 100px auto;
}
</style>
