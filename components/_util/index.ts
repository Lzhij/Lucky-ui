import { App } from 'vue';

export interface WithInstall {
  install: (app: App) => unknown
}

export type FunctionType = (...args: any[]) => any

export const prefixClass = (className: string) => {
  return `${className}-`;
};

export const checkParamType = (t: unknown): string => {
  const res = (Object
    .prototype
    .toString
    .call(t) as string)
    .split(' ')[1]
    .toLowerCase();
  return res.slice(0, res.length - 1);
};

export const isUndefined = (v: unknown): v is void => {
  return checkParamType(v) === 'undefined';
};

export const isNull = (v: unknown): v is null => {
  return checkParamType(v) === 'null';
};

export const isBoolean = (v: unknown): v is boolean => {
  return checkParamType(v) === 'boolean';
}
;
export const isNumber = (v: unknown): v is number => {
  return checkParamType(v) === 'number';
};

export const isString = (v: unknown): v is string => {
  return checkParamType(v) === 'string';
};

export const isArray = (v: unknown): v is Array<any> => {
  return checkParamType(v) === 'array';
};

export const isObject = (v: unknown): v is object => {
  return checkParamType(v) === 'object';
};

export const isFunction = (v: unknown): v is FunctionType => {
  return checkParamType(v) === 'function';
};

export const isElement = (v: unknown): v is Element => {
  return v instanceof Element;
};

export const cloneDeep = <T>(v: T): T => {
  let data: unknown;
  if (isArray(v)) {
    data = v.map((item) => cloneDeep(item));
  } else if (isObject(v)) {
    data = {};
    for (const k in v) {
      data[k] = cloneDeep(v[k]);
    }
  } else if (isFunction(v)) {
    data = v.bind(data);
  } else {
    data = v;
  }

  return data as T;
};
