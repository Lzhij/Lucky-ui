import { Ref, ref, ExtractPropTypes } from 'vue';
import { isBoolean, isString, FunctionType, isFunction } from './index';

export type ValidateState = '' | 'success' | 'failed';

export type ValidatorFn = (val: string) => boolean | string;

const defaultProps = {
  required: {
    type: Boolean
  },
  emptyMessage: {
    type: String
  },
  validator: {
    type: Function
  }
};

export type ValidatePropsType = ExtractPropTypes<typeof defaultProps>;

export const useValidate = (inputV: Ref<string>, props: ValidatePropsType, onFailed: FunctionType, onSuccess?: FunctionType) => {
  let isUnValid: boolean | null = null;
  const validateState = ref<ValidateState>('');

  const validate = () => {
    handleValidate()
      .then(() => {
        setValidateState('success');
        isFunction(onSuccess) && onSuccess();
      })
      .catch((errMsg: string) => {
        setValidateState('failed');
        isFunction(onFailed) && onFailed(errMsg);
      });
  };

  const setValidateState = (state: ValidateState) => {
    validateState.value = state;
  };

  const handleValidate = async() => {
    const str = inputV.value;
    if (str === '' && validateState.value === '' && isUnValid === true) {
      isUnValid = false;
      return;
    }
    if (props.required && !str.length) return Promise.reject(props.emptyMessage);

    if (props.validator) {
      const result = await props.validator(str);
      if (isString(result)) return Promise.reject(result);
      if ((isBoolean(result) && !result) || !result) return Promise.reject('校验失败');
    }
  };

  const reset = () => {
    isUnValid = true;
    setValidateState('');
    inputV.value = '';
  };

  const clearValid = () => {
    setValidateState('');
  };

  return {
    validateState,
    validate,
    reset,
    clearValid
  };
};
