export type ValueType = string;

export type ValidatorFn = (val: ValueType) => boolean | string;

export type ValidateState = '' | 'success' | 'failed';

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
    type: Function,
    default: () => true
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

export const inputEmits = [
  updateEvent,
  'click',
  'focus',
  'blur',
  'input',
  'change'
];
