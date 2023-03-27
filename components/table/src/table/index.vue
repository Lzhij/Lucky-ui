<template>
  <div class="ly-table-wrapper ly-table-wrapper-border" ref="tableEl">
    <div class="ly-table-container">
      <LyTableHeader :cols="cols" :renderCols="renderCols" :align="align" />
      <LyTableBody :renderCols="renderCols" :data="data" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, ref, shallowRef, watchEffect, onUnmounted, getCurrentInstance } from 'vue';
import { tableProps, ColsType, TableToken } from './index';
import LyTableHeader from '../table_header/index.vue';
import LyTableBody from '../table_body/index';
import { cloneDeep } from '../../../_util';
import { observerDomResize, unBindObserverDomResize } from '../../../_util/resize_observer';

export default defineComponent({
  name: 'LyTable',
  props: tableProps,
  components: {
    LyTableHeader,
    LyTableBody
  },
  setup(props) {
    const renderCols = ref<ColsType[]>([]);
    const tableEl = shallowRef<HTMLElement>();
    const tableInstance = getCurrentInstance();

    provide(
      TableToken,
      tableInstance
    );

    // 获取实际渲染列
    const getRenderConfigs = () => {
      const arr: ColsType[] = [];

      const getRenderConfigList = (col: ColsType) => {
        if (!col.children) {
          if (col.width) {
            col.realWidth = col.width;
          }
          arr.push(col);
        } else {
          col.children.forEach(subCol => getRenderConfigList(subCol));
        }
      };

      const columns = cloneDeep(props.cols);

      columns.forEach(col => {
        getRenderConfigList(col);
      });
      renderCols.value = arr;
    };

    const bindResize = () => {
      const el = tableEl.value;
      observerDomResize(el, setRenderColsWidth);
    };

    const updateColumnsWidth = () => requestAnimationFrame(setRenderColsWidth);

    const setRenderColsWidth = () => {
      const width = tableEl.value.offsetWidth;
      let staticWidth = 0;
      const flexCols = renderCols.value.filter(col => {
        if (!col.realWidth) {
          return true;
        } else {
          staticWidth += col.realWidth;
          return false;
        }
      });

      let flexWidth = ((width - staticWidth) / flexCols.length);
      flexWidth = flexWidth > 50 ? flexWidth : 50;
      flexCols.forEach(col => {
        col.width = flexWidth;
      });
    };

    watchEffect(() => {
      getRenderConfigs();
    });

    onMounted(() => {
      updateColumnsWidth();
      bindResize();
    });

    onUnmounted(() => {
      const el = tableEl.value;
      unBindObserverDomResize(el);
    });

    return {
      renderCols,
      tableEl
    };
  }
});
</script>
