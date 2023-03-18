import { isString } from '../../_util';
import { ExtractPropTypes } from 'vue';

export const updateEvent = 'update:modelValue';

export const inputProps = {
  modelValue: {
    type: String,
    default: ''
  },
  trim: {
    type: Boolean,
    default: false
  },
  validator: {
    type: Function
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  emptyMessage: {
    type: String,
    default: '该输入项不允许为空'
  }
};

export const inputEmits = {
  [updateEvent]: (value: string) => isString(value),
  'input': (value: string) => isString(value),
  'focus': (e: FocusEvent) => e instanceof FocusEvent,
  'blur': (e: FocusEvent) => e instanceof FocusEvent,
  'change': (value: string) => isString(value)
};

export type InputPropsType = ExtractPropTypes<typeof inputProps>;

export type InputEmitsType = typeof inputEmits;
