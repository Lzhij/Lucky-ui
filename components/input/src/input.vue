<template>
  <div class="inputCls">
    <input ref="inputEl" type="text" :disabled="disabled" @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick, onMounted, shallowRef } from 'vue';
import { prefixClass, isUndefined } from '../../_util';
import { inputProps, inputEmits, ValueType, updateEvent } from './input';

export default defineComponent({
  name: 'LyInput',
  inheritAttrs: false,
  props: inputProps,
  emits: inputEmits,
  setup(props, { emit }) {
    const inputCls = 'ly-input';
    const prefix = prefixClass(inputCls);
    const inputV = ref<ValueType>('');

    const inputEl = shallowRef<HTMLInputElement>(null);

    onMounted(() => {
      handleInputValueChange(props.modelValue);
    });

    watch(
      () => props.modelValue,
      (newV) => {
        if (inputV.value === newV) {
          return;
        }
        handleInputValueChange(newV);
      }
    );

    watch(() => inputV, (newV) => {
      handleInputValueChange(newV);
    });

    const handleInputValueChange = async(newV) => {
      inputV.value = newV;
      await nextTick();
      inputEl.value.value = String(newV);
    };

    const handleInput = (e: InputEvent) => {
      let { value } = e.target as HTMLInputElement;
      value = isUndefined(value) ? '' : value;

      emit(updateEvent, value);
      emit('input', value);
    };

    const handleChange = (e: InputEvent) => {
      emit('change', e);
    };

    const handleFocus = (e: FocusEvent) => {
      emit('focus', e);
    };

    const handleBlur = (e: Event) => {
      emit('blur', e);
    };
    return {
      inputCls,
      prefix,
      inputV,
      inputEl,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur
    };
  }
});
</script>
