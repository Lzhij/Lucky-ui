<template>
  <div :class="moduleCls">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { provide, reactive, toRef } from 'vue';
import { buttonGroupProps } from './button_group';
import { buttonGroupContextKey } from './const';

export default {
  name: 'LyButtonGroup',
  props: buttonGroupProps,
  setup(props) {
    const moduleCls = 'ly-button-group';

    provide(
      buttonGroupContextKey,
      reactive({
        size: toRef(props, 'size'),
        type: toRef(props, 'type')
      })
    );

    return {
      moduleCls
    };
  }
};
</script>
