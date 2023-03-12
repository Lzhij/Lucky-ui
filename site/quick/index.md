---
layout: doc
---
### 快速上手

- 复制源代码components到项目中
- 注册组件
  ``` ts
  import { createApp  } from 'vue'
  import LuckyUI from '@/components/index'
  import App from './App.vue'

  const app = createApp(App)
  app.use(LuckyUI)
  ```