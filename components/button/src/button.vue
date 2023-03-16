<template>
  <div :class="classList" @click="onClickBtn">
    <span>
      <i class="ly-iconfont ly-icon-loading" :class="prefix + 'loading-icon'" v-if="loading"></i>
      <slot name="default"></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue';
import { buttonProps, buttonEmits } from './button';
import { prefixClass } from '../../_util/index';
import { buttonGroupContextKey } from './const';

export default defineComponent({
  name: 'LyButton',
  props: buttonProps,
  emits: buttonEmits,
  setup(props, { emit }) {
    const btnCls = 'ly-button';

    const prefix = prefixClass(btnCls);

    const groupProps = inject(
      buttonGroupContextKey,
      void 0
    );

    const classList = computed(() => {
      const type = groupProps ? groupProps.type : props.type;
      const size = groupProps ? groupProps.size : props.size;
      const typeCls = prefix + type;
      const sizeCls = prefix + size;
      const disabledCls = prefix + 'disabled';
      const loadingCls = prefix + 'loading';
      const roundCls = prefix + 'round';
      return {
        [btnCls]: true,
        [typeCls]: true,
        [sizeCls]: true,
        [disabledCls]: props.disabled,
        [loadingCls]: props.loading,
        [roundCls]: !groupProps && props.round
      };
    });

    const onClickBtn = (e: MouseEvent) => {
      if (props.disabled || props.loading) return;
      emit('click', e);
    };

    return {
      classList,
      onClickBtn,
      prefix
    };
  }
});
</script>
