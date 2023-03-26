import { ExtractPropTypes, PropType } from 'vue';

export const TableToken = 'ly-table-token';

export type DefaultDataItemType = any;

export interface ColsType {
  field: string;
  text: string;
  fixed?: boolean;
  width?: number;
  realWidth?: number;
  children?: Omit<ColsType, 'fixed'>[]
}

const alignEnum = [
  'left',
  'center',
  'right'
] as const;

export const tableProps = {
  idKey: {
    type: String,
    default: 'id'
  },
  align: {
    type: String,
    values: alignEnum,
    default: 'left'
  },
  width: {
    type: String,
    default: '100%'
  },
  autoHeight: {
    type: Boolean,
    default: false
  },
  cols: {
    type: Array as PropType<ColsType[]>,
    default: () => [],
    required: true
  },
  data: {
    type: Array as PropType<DefaultDataItemType[]>,
    default: () => []
  }
};

export type TablePropsType = ExtractPropTypes<typeof tableProps>;
