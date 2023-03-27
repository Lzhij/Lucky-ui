<template>
  <div class="ly-table-header-wrapper">
    <table border="0" cellpadding="0" cellspacing="0" v-for="t in 1" :key="t" :align="align">
      <colgroup>
        <col v-for="item in renderCols" :key="item.field" :width="item.width + 'px'">
      </colgroup>
      <thead>
        <tr v-for="(item, index) in renderConfig" :key="index">
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
import { PropType, ref, watchEffect } from 'vue';
import { cloneDeep } from '../../../_util';

interface RenderItemType extends ColsType {
  colspan?: number;
  rowspan?: number;
  level?: number;
  children?: RenderItemType[];
}

export default {
  name: 'LyTableHeader',
  props: {
    cols: {
      type: Array as PropType<TablePropsType['cols']>,
      default: () => []
    },
    renderCols: {
      type: Array as PropType<TablePropsType['cols']>,
      default: () => []
    },
    align: {
      type: String as PropType<TablePropsType['align']>,
      default: 'left'
    }
  },
  setup(props) {
    const renderConfig = ref<RenderItemType[][]>([]);

    const getAllColumns = (columns: RenderItemType[], result = [] as RenderItemType[]) => {
      columns.forEach(column => {
        result.push(column);
        if (column.children && column.children.length) {
          getAllColumns(column.children, result);
        }
      });
      return result;
    };

    const initHeaderRenderConfig = (columns: RenderItemType[]) => {
      let maxLevel = 1;

      // 获取最大深度以及设置colspan
      const computedSpan = (column: RenderItemType, parent?: RenderItemType) => {
        if (parent) {
          column.level = parent.level + 1;
          if (maxLevel < column.level) {
            maxLevel = column.level;
          }
        }
        if (column.children && column.children?.length) {
          let colspan = 0;
          column.children.forEach(subColumn => {
            computedSpan(subColumn, column);
            colspan += subColumn.colspan;
          });
          column.colspan = colspan;
        } else {
          column.colspan = 1;
        }
      };

      columns.forEach(column => {
        column.level = 1;
        computedSpan(column, undefined);
      });

      const rows: RenderItemType[][] = [];
      for (let i = 0; i < maxLevel; i++) {
        rows.push([]);
      }

      const allColumns = getAllColumns(columns);

      // 设置rowspan
      allColumns.forEach(column => {
        if (!column.children) {
          column.rowspan = maxLevel - column.level + 1;
        } else {
          column.rowspan = 1;
        }
        rows[column.level - 1].push(column);
      });

      renderConfig.value = rows;
    };

    const getRenderConfig = () => {
      const cols = cloneDeep(props.cols);
      initHeaderRenderConfig(cols);
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
