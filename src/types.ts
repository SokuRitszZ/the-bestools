import { ReactNode } from 'react';

export interface Tool {
  icon: ReactNode;
  name: string;
  description: string;
  component: ReactNode;
}

export type Key = string | number;

export type BasicType = string | number | boolean;

export type Json = {
  [key: string]: BasicType | Json[] | Json;
} | (BasicType | Json)[];

export type TypeName = 
  | 'string'
  | 'number'
  | 'boolean'
  | 'array'
  | 'object'
  | 'null'
  | 'tuple'
  | 'unknown'

export interface OkJson {
  status: 'ok';
  text: string;
  item: Json;
}

export interface ErrorJson {
  status: 'error';
  text: string;
}

export type MaybeJson = OkJson | ErrorJson;