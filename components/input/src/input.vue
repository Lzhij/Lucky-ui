<template>
  <div class="ly-input">
    <div :class="iptWrapperClasses">
      <input v-model="inputV" ref="inputEl" class="ly-input-native" type="text" :disabled="disabled" @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur" />
      <span v-if="isValidFailed" class="ly-input-err-msg">
        {{ validateMessage }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { useValidate } from '../../_util/validate';
import { defineComponent, ref, watch, shallowRef, onMounted, computed } from 'vue';
import { isUndefined } from '../../_util';
import { inputProps, inputEmits, ValueType, updateEvent } from './input';

export default defineComponent({
  name: 'LyInput',
  inheritAttrs: false,
  props: inputProps,
  emits: inputEmits,
  setup(props, { emit, expose }) {
    const inputV = ref<ValueType>('');
    const inputEl = shallowRef<HTMLInputElement>();
    const validateMessage = ref<string>('');
    const isIptFocus = ref(false);

    const onValidFailed = (errMsg: string) => {
      validateMessage.value = errMsg;
    };

    const {
      validateState,
      validate,
      reset,
      clearValid
    } = useValidate(inputV, props, onValidFailed);

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

    const handleChange = (e: Event) => {
      emit('change', (event.target as HTMLInputElement).value);
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
        isValidFailed.value ? wrapperClsPrefix + 'valid-error' : '',
        isIptFocus.value ? wrapperClsPrefix + 'focus' : ''
      ];
    });

    const isValidFailed = computed(() => validateState.value === 'failed');

    expose({
      validate,
      clearValid,
      reset,
      isValidFailed
    });

    return {
      iptWrapperClasses,
      inputV,
      inputEl,
      isValidFailed,
      validateMessage,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur
    };
  }
});
</script>
