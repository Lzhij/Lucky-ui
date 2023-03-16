<template>
  <div class="ly-input">
    <div :class="iptWrapperClasses">
      <input v-model="inputV" ref="inputEl" class="ly-input-native" type="text" :disabled="disabled" @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur" />
      <span v-if="isValidate" class="ly-input-err-msg">
        {{ validateMessage }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { isBoolean, isString } from '../../_util';
import { defineComponent, ref, watch, shallowRef, onMounted, computed } from 'vue';
import { isUndefined } from '../../_util';
import { inputProps, inputEmits, ValueType, updateEvent, ValidateState } from './input';
import { asyncTask } from '../../_util/async_func';

export default defineComponent({
  name: 'LyInput',
  inheritAttrs: false,
  props: inputProps,
  emits: inputEmits,
  setup(props, { emit, expose }) {
    const inputV = ref<ValueType>('');
    const inputEl = shallowRef<HTMLInputElement>();
    const validateState = ref<ValidateState>('');
    const validateMessage = ref<string>('');
    const isIptFocus = ref(false);
    let isUnValid = true;

    onMounted(() => {
      if (inputV.value !== '' || validateState.value !== '') {
        validate();
      }
    });

    watch(
      () => props.modelValue,
      newV => {
        if (inputV.value === newV) {
          return;
        }
        inputV.value = props.modelValue;
      },
      {
        immediate: true
      }
    );

    watch(
      () => inputV.value,
      (newV, oldV) => {
        if (newV === oldV) return;
        triggerUpdate(inputV.value);
        validate();
      }
    );

    const validate = () => {
      handleValidate()
        .then(() => {
          setValidateState('success');
        })
        .catch((errMsg: string) => {
          setValidateState('failed');
          validateMessage.value = errMsg;
        });
    };

    const handleValidate = async() => {
      const str = inputV.value;
      if (str === '' && validateState.value === '' && isUnValid) {
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

    const setValidateState = (state: ValidateState) => {
      validateState.value = state;
    };

    const clearValid = async() => {
      isUnValid = true;
      setValidateState('');
      inputV.value = '';
      await asyncTask();
    };

    const triggerUpdate = (v: ValueType) => {
      emit(updateEvent, v);
      emit('input', v);
    };

    const handleInput = (e: InputEvent) => {
      let { value } = e.target as HTMLInputElement;
      value = isUndefined(value) ? '' : value;
      value = props.trim ? value.trim() : value;

      value !== inputV.value && (inputV.value = value);

      triggerUpdate(value);
    };

    const handleChange = (e: InputEvent) => {
      emit('change', e);
    };

    const handleFocus = (e: FocusEvent) => {
      isIptFocus.value = true;
      emit('focus', e);
    };

    const handleBlur = (e: FocusEvent) => {
      isIptFocus.value = false;
      emit('blur', e);
    };

    const iptWrapperClasses = computed(() => {
      const wrapperClsPrefix = 'ly-input-wrapper-';
      return [
        'ly-input-wrapper',
        isValidate.value ? wrapperClsPrefix + 'valid-error' : '',
        isIptFocus.value ? wrapperClsPrefix + 'focus' : ''
      ];
    });

    const isValidate = computed(() => validateState.value === 'failed');

    expose({
      validate,
      clearValid,
      isValidate: isValidate.value
    });

    return {
      iptWrapperClasses,
      inputV,
      inputEl,
      isValidate,
      validateMessage,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur
    };
  }
});
</script>
