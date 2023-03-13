import { App } from 'vue';

export interface WithInstall {
  install: (app: App) => unknown
}

export const prefixClass = (className: string) => {
  return `${className}-`;
};

export const checkParamType = (t: unknown): string => Object.prototype.toString.call(t).split(' ')[1].toLowerCase();

export const isUndefined = (v: unknown) => {
  return checkParamType(v) === 'undefined';
};

export const isNull = (v: unknown) => {
  return checkParamType(v) === 'null';
};

export const isNumber = (v: unknown) => {
  return checkParamType(v) === 'number';
};

export const isString = (v: unknown) => {
  return checkParamType(v) === 'string';
};

export const isArray = (v: unknown) => {
  return checkParamType(v) === 'array';
};

export const isObject = (v: unknown) => {
  return checkParamType(v) === 'object';
};

export const isFunction = (v: unknown) => {
  return checkParamType(v) === 'function';
};
