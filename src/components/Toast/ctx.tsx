import { createContext, PropsWithChildren, useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { ToastProps } from './types';
import { Toast } from '.';

type ToastNoticeProps = Omit<ToastProps, 'visible'> & {
  duration?: number;
}

export interface ToastCtx {
  notice: (props: ToastNoticeProps) => void;
}

export const ToastContext = createContext<ToastCtx>({} as any);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(false);
  const [props, setProps] = useState<ToastNoticeProps>({ });
  const timerRef = useRef(0);

  const notice = ({ duration = 5000, ...props }: ToastNoticeProps) => {
    clearTimeout(timerRef.current);
    setVisible(true);
    setProps(props);
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ notice }}>
      <Toast 
        visible={visible} 
        {...props}
        className={classNames(props.className, 'z-10000 fixed top-50vw left-50vh -translate-x-50% -translate-y-50%')} 
      />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);