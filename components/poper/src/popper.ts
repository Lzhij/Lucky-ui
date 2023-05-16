import { isElement } from '@lucky-ui/com/_util';
import { VNode, onUnmounted, ref, watch } from 'vue';

export interface PopperOptions {
  target: Element | string;
  trigger?: 'hover' | 'click';
  content?: VNode | string;
  position?: 'left' | 'top' | 'bottom' | 'right';
}

const defaultPopperCls = 'popper-wrapper';

const bindTargetEvent = (el: Element, trigger: PopperOptions['trigger'], cb: () => void) => {
  if (trigger === 'hover') {
    el.addEventListener('mouseenter', cb);
    el.addEventListener('mouseleave', cb);
  } else {
    el.addEventListener('click', cb);
  }
};

const unBindTargetEvent = (el: Element, trigger: PopperOptions['trigger'], cb: () => void) => {
  if (trigger === 'hover') {
    el.removeEventListener('mouseenter', cb);
    el.removeEventListener('mouseleave', cb);
  } else {
    el.removeEventListener('click', cb);
  }
};

export const usePopper = (options: PopperOptions, popperCls?: string) => {
  const target = options.target;
  const targetEl = isElement(target) ? target : document.querySelector(target);

  if (!targetEl) throw new Error('options.target is ' + typeof target);

  const trigger = options.trigger || 'click';
  // const content = options.content || '';
  // const position = options.position || 'bottom';

  let wrapperEl: Element;
  const container: Element = document.createElement('div');

  const showPopper = ref(false);

  const toggleHandler = () => {
    showPopper.value = !showPopper.value;
  };

  bindTargetEvent(targetEl, trigger, toggleHandler);

  const createWrapperEl = () => {
    const cls = popperCls || defaultPopperCls;
    let wrapper = document.querySelector(cls);
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = cls;
    }
    wrapperEl = wrapper;
  };

  const showPopperHandler = () => {
    if (!wrapperEl) createWrapperEl();
  };

  const hidePopperHandler = () => {
    wrapperEl && wrapperEl.removeChild(container);
  };

  watch(() => showPopper.value, () => {
    if (!showPopper.value) {
      hidePopperHandler();
    } else {
      showPopperHandler();
    }
  });

  onUnmounted(() => {
    unBindTargetEvent(targetEl, trigger, toggleHandler);
  });

  return {
    showPopper

  };
};
