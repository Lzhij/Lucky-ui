<template>
  <div class="app">
    <div class="content">
      <ly-button ref="reference" @click="showFloating = !showFloating">
        按钮
      </ly-button>
      <teleport to="body">
        <transition name="fade">
          <div v-show="showFloating" ref="floating" class="floating">
            4565626
          </div>
        </transition>
      </teleport>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'app'
};
</script>
<script lang="ts" setup>
import { autoUpdate, computePosition, offset, flip, shift } from '@floating-ui/dom';
import { DefineComponent, onMounted, ref } from 'vue';
const reference = ref<DefineComponent<any, any>>();
const floating = ref<HTMLElement>();
const showFloating = ref(false);

const updateHandler = () => {
  computePosition(reference.value.$el, floating.value, {
    placement: 'bottom',
    strategy: 'fixed',
    middleware: [
      flip(),
      shift(),
      offset({
        mainAxis: 10
      })
    ]
  }).then(({ x, y }) => {
    Object.assign(floating.value.style, {
      top: y + 'px',
      left: x + 'px'
    });
  });
};

onMounted(() => {
  autoUpdate(reference.value.$el, floating.value, updateHandler);
});
</script>

<style lang="less">
#app {
  height: 300vh;
  width: 300vw;
}
.app {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.floating {
  position: fixed;
  width: 200px;
  height: 50px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.08);
    // transition-property: top, left;
    // transition-duration: .1s;
}
</style>
