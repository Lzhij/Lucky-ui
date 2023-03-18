<template>
  <div class="ly-table-wrapper">
    <div class="ly-table-container">
      <LyTableHeader :cols="cols" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { tableProps } from './index';
import LyTableHeader from '../table_header/index.vue';

export default defineComponent({
  name: 'LyTable',
  props: tableProps,
  components: {
    LyTableHeader
  },
  setup(props, { expose, emit }) {
    return {};
  }
});
</script>
