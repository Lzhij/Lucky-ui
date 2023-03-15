declare module '*.vue' {
  import { defineComponent } from 'vue';
  const Component:typeof defineComponent;
  export default Component;
}
