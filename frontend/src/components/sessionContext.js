import React, { useState, useEffect } from 'react';

export const Context = React.createContext();

export function ContextProvider(props) {
  const [state, setState] = useState(() => {
    const storedState = sessionStorage.getItem('contextState');
    return storedState ? JSON.parse(storedState) : {};
  });

  useEffect(() => {
    sessionStorage.setItem('contextState', JSON.stringify(state));
  }, [state]);

  return (
    <Context.Provider value={[state, setState]}>
      {props.children}
    </Context.Provider>
  );
}
