import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useAnemicModel } from '@/hooks/useAnemicModel';
import { AnemicModel } from '@/types/common';

type Obj = Record<string, any>;

export const createModelCtxTools = <T extends Obj>(initialValue: T): [FC<PropsWithChildren>, () => AnemicModel<T>] => {
  const Ctx = createContext<AnemicModel<T>>({} as any);
  const hook = () => useContext(Ctx);
  const provider = ({ children }: PropsWithChildren) => {
    const values = useAnemicModel<T>(initialValue);
    return <Ctx.Provider value={values}>{children}</Ctx.Provider>;
  };

  return [provider, hook];
};

export const createPropsCtxTools = <P extends Obj>(): [FC<P>, () => P] => {
  const Ctx = createContext<P>({} as any);
  const hook = () => useContext(Ctx);

  const provider = (totalProps: PropsWithChildren<P>) => {
    const { children } = totalProps;
    return <Ctx.Provider value={totalProps}>{children}</Ctx.Provider>;
  };
  return [provider, hook];
};

export const createCtxTools = <T extends Obj, P extends Obj>(
  initialModel: T,
): [FC<P>, () => AnemicModel<T>, () => P] => {
  const [ModelProvider, modelHook] = createModelCtxTools<T>(initialModel);
  const [PropsProvider, propsHook] = createPropsCtxTools<P>();
  const provider = (totalProps: PropsWithChildren<P>) => {
    const { children } = totalProps;
    return (
      <PropsProvider {...totalProps}>
        <ModelProvider>{children}</ModelProvider>
      </PropsProvider>
    );
  };
  return [provider, modelHook, propsHook];
};