import { App } from 'vue';

export interface WithInstall {
  install: (app: App) => unknown
}

export const prefixClass = (className: string) => {
  return `${className}-`;
};
