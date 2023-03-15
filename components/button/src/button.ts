import type { ExtractPropTypes } from 'vue';

const btnTypes = [
  'default',
  'primary',
  'success',
  'info',
  'warning',
  'danger',
  'link'
] as const;

const btnSizes = [
  'normal',
  'small',
  'large'
] as const;

export const buttonProps = {
  type: {
    type: String,
    default: 'default',
    values: btnTypes
  },
  size: {
    type: String,
    default: 'normal',
    values: btnSizes
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  }
};

export const buttonEmits = {
  click: (e: Event) => void 0
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export type ButtonEmits = typeof buttonEmits;
