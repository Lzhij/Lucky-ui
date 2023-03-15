export type ValueType = number | string;

export type ValidatorFn = (val: ValueType) => boolean | string;

export const updateEvent = 'update:modelValue';

export const inputProps = {
  modelValue: {
    type: [Number, String],
    default: ''
  },
  validator: {
    type: Function
  },
  disabled: {
    type: Boolean,
    default: false
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
