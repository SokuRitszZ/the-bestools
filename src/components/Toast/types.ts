import { PropsWithChildren } from 'react';

export interface ToastProps extends PropsWithChildren {
  visible: boolean;
  className?: string;
}