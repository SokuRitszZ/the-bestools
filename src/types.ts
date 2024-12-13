import { ReactNode } from 'react';

export interface Tool {
  icon: ReactNode;
  name: string;
  description: string;
  component: ReactNode;
}

export type Key = string | number;