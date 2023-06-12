<template>
  <div class="app">
    <a-button type="primary">Primary Button</a-button>
    <a-table :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'age'">
          <a-input v-model:value.number="record.age" placeholder="年龄" />
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a :href="void 0" @click="deleteHandler(record)">删除</a>
        </template>
      </template>
    </a-table>
    <!-- <LyTable :cols="cols" :data="tableData">
      <template #name="{ value }">
        <div>{{ value }}</div>
      </template>
    </LyTable> -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';
const dataSource = ref([
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }
]);

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action'
  }
]);

const deleteHandler = (row: any) => {
  const idx = dataSource.value.findIndex(t => t.key === row.key);
  idx !== -1 && dataSource.value.splice(idx, 1);
};
// const cols = [
//   { field: 'name', text: '名称' },
//   { field: 'count', text: '数量' },
//   { field: 'id', text: 'ID' },
//   { field: 'price', text: '价格', children: [
//     { field: 'prevPrice', text: '税前价格', width: 150 },
//     { field: 'nextPrice', text: '税后价格', width: 150 }
//   ] },
//   { field: 'test', text: '测试', children: [
//     { field: 'test1', text: '测试1' },
//     { field: 'test2', text: '测试2', children: [
//       { field: 'test2-1', text: '测试2-1' },
//       { field: 'test2-2', text: '测试2-2' }
//     ] }
//   ] }
// ];

// const tableData = ref(Array.from(Array(20)).map((t, i) => ({
//   id: i,
//   name: 'name' + i,
//   count: i + 10,
//   prevPrice: i,
//   nextPrice: i,
//   test1: 'test1' + i,
//   'test2-1': 'test2-1-' + i,
//   'test2-2': undefined
// })));
</script>

<style lang="less" scoped>
.app {
  width: 60%;
  margin: 100px auto;
}
</style>
