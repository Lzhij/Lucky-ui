import { ExtractPropTypes, PropType } from 'vue';

export interface ColsType {
  field: string;
  text: string;
  frozen?: boolean;
  children?: Omit<ColsType, 'frozen'>[]
}

export const tableProps = {
  idKey: {
    type: String,
    default: 'id'
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
    type: Array as PropType<Record<string, any>[]>,
    default: () => []
  }
};

export type TablePropsType = ExtractPropTypes<typeof tableProps>;
