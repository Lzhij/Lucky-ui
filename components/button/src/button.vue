<template>
  <div :class="classList" @click="onClickBtn">
    <span>
      <slot name="default"></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ButtonProps, ButtonEmits } from './button';
import { prefixClass } from '../../_util/index';

export default defineComponent({
  name: 'LyButton',
  props: ButtonProps,
  emits: ButtonEmits,
  setup(props, { emit }) {
    const btnCls = 'ly-button';

    const prefix = prefixClass(btnCls);

    const classList = computed(() => {
      const typeCls = prefix + props.type;
      const sizeCls = prefix + props.size;
      const disabledCls = prefix + 'disabled';
      const loadingCls = prefix + 'loading';
      return {
        [btnCls]: true,
        [typeCls]: true,
        [sizeCls]: true,
        [disabledCls]: props.disabled,
        [loadingCls]: props.loading
      };
    });

    const onClickBtn = (e: Event) => {
      emit('onClick', e);
    };

    return {
      classList,
      onClickBtn
    };
  }
});
</script>
