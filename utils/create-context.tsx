import type { FC, ReactNode } from 'react';
import React, { useMemo } from 'react';

export const createContext = <T,>(displayName: string, defaultContext?: T) => {
  const Context = React.createContext(defaultContext);

  const Provider: FC<T & { children: ReactNode }> = ({
    children,
    ...value
  }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const context = useMemo(() => value, Object.values(value));

    return <Context.Provider value={context as T}>{children}</Context.Provider>;
  };

  Provider.displayName = displayName;

  const useContext = () => {
    const ctx = React.useContext(Context);

    if (ctx === undefined) {
      throw new Error(`Must be used within ${displayName}`);
    }

    return ctx;
  };

  return [Provider, useContext, Context] as const;
};
