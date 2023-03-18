<template>
  <div class="ly-table-header-wrapper">
    <table border="0" cellpadding="0" cellspacing="0" v-for="t in 1" :key="t">
      <colgroup>
        <col v-for="item in renderConfig.leftCols" :key="item.field">
      </colgroup>
      <thead>
        <tr v-for="(item, index) in renderConfig.left" :key="index">
          <th v-for="sub in item" :key="sub.field" :colspan="sub.colspan" :rowspan="sub.rowspan">
            <div class="ly-table-cell">{{ sub.text }}</div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script lang="ts">
import { TablePropsType, ColsType } from '../table/index';
import { PropType, reactive, watchEffect } from 'vue';
import { isArray, cloneDeep } from '../../../_util';

interface RenderItem extends ColsType {
  colspan?: number;
  rowspan?: number;
  children?: RenderItem[];
}

interface RenderConfigType {
  left: RenderItem[][];
  right: RenderItem[][];
  leftCols: RenderItem[];
  rightCols: RenderItem[];
}

export default {
  name: 'LyTableHeader',
  props: {
    cols: {
      type: Array as PropType<TablePropsType['cols']>,
      default: () => []
    }
  },
  setup(props) {
    const renderConfig = reactive<RenderConfigType>({
      left: [],
      leftCols: [],
      right: [],
      rightCols: []
    });
    let maxDept = 0;

    const getDept = (cols: ColsType[], dept = 0) => {
      cols.forEach(t => {
        if (isArray(t.children)) {
          dept = getDept(t.children, dept + 1);
        }
      });
      return dept;
    };

    const getCurrentColSpan = (arr: RenderItem['children']) => {
      let total = 0;
      arr.forEach(t => {
        if (isArray(t?.children) && t.children.length) {
          total += getCurrentColSpan(t.children);
        } else {
          total++;
        }
      });
      return total;
    };

    const setItemSpan = (item: RenderItem, dept: number, renderArr: RenderItem[][], colRenderArr: RenderItem[]) => {
      const childrenLen = item?.children?.length || 0;
      if (item.children && childrenLen > 0) {
        item.colspan = getCurrentColSpan(item.children);
        item.rowspan = 1;
        item.children.forEach(subIt => setItemSpan(subIt, dept - 1, renderArr, colRenderArr));
      } else {
        colRenderArr.push(item);
        item.rowspan = dept;
        item.colspan = 1;
      }

      if (renderArr[maxDept - dept]) {
        renderArr[maxDept - dept].push(item);
      } else {
        renderArr[maxDept - dept] = [item];
      }
    };

    const getConfigLeftAndRight = (cols: ColsType[], dept: number) => {
      const frozenRender: RenderItem[][] = [];
      const unFrozenRender: RenderItem[][] = [];
      const frozenColsRender: RenderItem[] = [];
      const unFrozenColsRender: RenderItem[] = [];
      cols.forEach(item => {
        if (item.frozen) {
          setItemSpan(item, dept, frozenRender, frozenColsRender);
        } else {
          setItemSpan(item, dept, unFrozenRender, unFrozenColsRender);
        }
      });

      const hasFrozen = !!frozenRender.length;
      Object.assign(renderConfig, {
        left: hasFrozen ? frozenRender : unFrozenRender,
        right: hasFrozen ? unFrozenRender : [],
        leftCols: hasFrozen ? frozenColsRender : unFrozenColsRender,
        rightCols: hasFrozen ? unFrozenColsRender : []
      });
      console.log(renderConfig);
    };

    const getRenderConfig = () => {
      const cols = cloneDeep(props.cols);
      maxDept = getDept(cols);
      getConfigLeftAndRight(cols, maxDept);
    };

    watchEffect(() => {
      getRenderConfig();
    });

    return {
      renderConfig
    };
  }
};
</script>
