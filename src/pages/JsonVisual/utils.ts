import { isArray, isBoolean, isNull, isNumber, isObject, isString } from 'lodash';
import { Json, TypeName } from '@/types';

export const isJson = (item: unknown): item is Json => {
  return isArray(item) || isObject(item);
};

export const getType = (value: unknown): TypeName => {
  if (isArray(value)) {
    return 'array';
  }
  if (isObject(value)) {
    return 'object';
  }
  if (isString(value)) {
    return 'string';
  }
  if (isNumber(value)) {
    return 'number';
  }
  if (isBoolean(value)) {
    return 'boolean';
  }
  if (isNull(value)) {
    return 'null';
  }
  return 'unknown';
};
