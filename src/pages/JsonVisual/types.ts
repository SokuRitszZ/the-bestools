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
  | 'unknown'