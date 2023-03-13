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

export const ButtonProps = {

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

export const ButtonEmits = ['click'];
