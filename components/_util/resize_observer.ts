export type ObserverCallBackType = (rect: DOMRectReadOnly) => void

const callbackMap: Map<Element, ObserverCallBackType> = new Map();

const observer = new ResizeObserver((entries) => {
  entries.forEach(ent => {
    const callback = callbackMap.get(ent.target);
    const rect = ent.contentRect;
    callback(rect);
  });
});

// 添加dom大小变化
export const observerDomResize = <T extends Element, E extends ObserverCallBackType>(dom: T, callback: E) => {
  observer.observe(dom);
  callbackMap.set(dom, callback);
};

// 移除绑定的dom监听
export const unBindObserverDomResize = <T extends Element>(dom: T) => {
  observer.unobserve(dom);
  callbackMap.delete(dom);
};
