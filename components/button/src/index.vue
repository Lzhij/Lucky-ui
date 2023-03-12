<template>
  <button :class="classList" @click="onClickBtn">
    <span>
      <slot name="default"></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'LyButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
  emits: ['onClick'],
  setup(props, { emit }) {
    const btnCls = 'ly-button';

    const classList = computed(() => {
      const typeCls = btnCls + '-' + props.type;
      const sizeCls = btnCls + '-' + props.size;
      return [
        btnCls,
        typeCls,
        sizeCls
      ];
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
