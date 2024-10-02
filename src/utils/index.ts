import { createContext } from 'react';
import { TOOLS_MAP } from '@/consts';
import { Tool } from '@/types';

export const iife = <T>(fn: () => T) => {
  return fn();
};

export const simpleContext = <T> () => {
  return createContext<T>(undefined as any);
};

export const defineTool = (tool: Tool) => {
  TOOLS_MAP[tool.name] = tool;
};