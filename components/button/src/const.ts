import type { InjectionKey } from 'vue';
import type { ButtonGroupProps } from './button_group';

export interface ButtonGroupContext {
  size?: ButtonGroupProps['size']
  type?: ButtonGroupProps['type']
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol(
  'buttonGroupToken'
);
