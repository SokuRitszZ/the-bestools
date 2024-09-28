import { Dispatch, SetStateAction } from 'react';

export type MaybePromise<T> = T | Promise<T>;

export type CallbackReturn = MaybePromise<any>;

export interface ChangeValue<T> {
  value?: T;
  onChange?: (value?: T) => CallbackReturn;
}

export type StringKeyOf<T> = {
  [K in keyof T]: K extends string ? K : never;
}[keyof T];

export type AnemicModel<T> = {
  [K in StringKeyOf<T>]: T[K];
} & {
  [K in StringKeyOf<T> as `set${Capitalize<K>}`]: Dispatch<SetStateAction<T[K] extends undefined ? T[K] | undefined : T[K]>>;
}

export type WeakRequired<T> = {
  [K in keyof Required<T>]: T[K] extends undefined ? (T[K] | undefined) : T[K];
}