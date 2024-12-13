import { ReactNode } from 'react';
import { TypeName } from './types';

export const ICON_MAP: Record<TypeName, ReactNode> = {
  number: <div className="i-mdi:numeric w-1.5em h-1.5em"></div>,
  string: <div className="i-mdi:format-color-text w-1.5em h-1.5em"></div>,
  boolean: <div className="i-mdi:circle-half-full w-1.5em h-1.5em"></div>,
  array: <div className="i-mdi:code-array w-1.5em h-1.5em"></div>,
  object: <div className="i-mdi:code-json w-1.5em h-1.5em"></div>,
  null: <div className="i-mdi:null-off w-1.5em h-1.5em"></div>,
  unknown: <div className="i-mdi:progress-question w-1.5em h-1.5em"></div>,
};