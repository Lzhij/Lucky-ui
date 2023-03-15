import { ExtractPropTypes } from 'vue';

const btnGroupSizes = [
  'small',
  'normal',
  'large'
] as const;

const btnGroupTypes = [
  'default',
  'primary',
  'success',
  'info',
  'warning',
  'danger'
] as const;

export const buttonGroupProps = {
  size: {
    type: String,
    values: btnGroupSizes,
    default: 'normal'
  },
  type: {
    type: String,
    values: btnGroupTypes,
    default: 'default'
  }
};

export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>
