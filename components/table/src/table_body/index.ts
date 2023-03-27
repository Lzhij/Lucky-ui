import { isArray, isUndefined } from '../../../_util';
import { computed, defineComponent, h, inject, PropType, toRefs } from 'vue';
import { TablePropsType, TableToken, DefaultDataItemType } from '../table/index';

export default defineComponent({
  name: 'LyTableBody',
  props: {
    data: {
      type: Array as PropType<TablePropsType['data']>,
      default: () => []
    },
    renderCols: {
      type: Array as PropType<TablePropsType['cols']>,
      default: () => []
    }
  },
  setup(props, { emit, slots }) {
    const tableCtx = inject<any>(TableToken);

    const tableProps = computed<TablePropsType>(() => tableCtx.props);

    const renderColgroup = () => {
      return props.renderCols.map(col => h('col', {
        width: col.width + 'px',
        key: col.field
      }));
    };

    const renderBody = () => {
      const rowRenderList = [];
      const { data, renderCols } = toRefs(props);

      const getColRenderList = (row: DefaultDataItemType, index: number) => {
        return renderCols.value.map(col => {
          const slot = tableCtx.slots[col.field];
          const value = row[col.field];
          const cellRender = slot ? slot({ row, index, value }) : h('span', { title: value }, isUndefined(value) ? '-' : value);
          return h('td', {}, h(
            'div',
            {
              class: 'ly-table-cell'
            },
            cellRender
          ));
        });
      };

      const getRowRenderList = (rows: DefaultDataItemType[]) => {
        return rows.forEach((row, index) => {
          const key = row[tableProps.value.idKey];
          if (tableCtx.expand === 'all' || (isArray(tableCtx.expand) && tableCtx.expand.includes(row))) {
            row._children = true;
          }

          rowRenderList.push(h('tr', {
            key
          }, getColRenderList(row, index)));

          if (row._children && isArray(row.children)) {
            getRowRenderList(row.children as DefaultDataItemType[]);
          }
        });
      };

      getRowRenderList(data.value);

      return rowRenderList;
    };

    return {
      renderColgroup,
      renderBody,
      tableCtx
    };
  },
  render() {
    return h('div', {
      class: 'ly-table-body-wrapper'
    }, h('table', {
      border: 0,
      cellpadding: 0,
      cellspacing: 0,
      align: this.tableCtx.align || 'left'
    }, [
      h('colgroup', {}, this.renderColgroup()),
      h('tbody', {}, this.renderBody())
    ]));
  }
});
