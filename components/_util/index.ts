import { App } from 'vue';

export interface WithInstall {
  install: (app: App) => unknown
}

