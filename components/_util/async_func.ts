export const asyncTask = () => {
  return new Promise(r => {
    setTimeout(() => {
      r(void 0);
    });
  });
};
