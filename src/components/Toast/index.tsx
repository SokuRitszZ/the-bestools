import classNames from 'classnames';
import { ToastProps } from './types';

export const Toast = ({ visible, className, children }: ToastProps) => {
  return (
    <div
      id={'toast'}
      className={classNames(
        'text-xl bg-#0006 text-#fff font-500',
        'rounded-12px flex items-center justify-center',
        'pointer-events-none',
        'p-10',
        !visible && 'duration-400 opacity-0',
        visible && 'opacity-100',
        className,
      )}
    >
      {children}
    </div>
  );
};
