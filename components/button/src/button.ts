const btnTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'danger',
  'link'
];

const btnSizes = [
  'normal',
  'small',
  'large'
];

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
  }
};

export const ButtonEmits = ['onClick'];
