<template>
  <div :class="classList" @click="onClickBtn">
    <span>
      <i class="ly-iconfont ly-icon-loading" :class="prefix + 'loading-icon'" v-if="loading"></i>
      <slot name="default"></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { buttonProps, buttonEmits } from './button';
import { prefixClass } from '../../_util/index';

export default defineComponent({
  name: 'LyButton',
  props: buttonProps,
  emits: buttonEmits,
  setup(props, { emit }) {
    const btnCls = 'ly-button';

    const prefix = prefixClass(btnCls);

    const classList = computed(() => {
      const typeCls = prefix + props.type;
      const sizeCls = prefix + props.size;
      const disabledCls = prefix + 'disabled';
      const loadingCls = prefix + 'loading';
      const roundCls = prefix + 'round';
      return {
        [btnCls]: true,
        [typeCls]: true,
        [sizeCls]: true,
        [disabledCls]: props.disabled,
        [loadingCls]: props.loading,
        [roundCls]: props.round
      };
    });

    const onClickBtn = (e: Event) => {
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
