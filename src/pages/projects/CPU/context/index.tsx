import { PropsWithChildren, ReactElement, useReducer, useRef } from 'react';

import { CPUContext } from './context';
import { CPUCoordinator } from './CPUCoordinator';
import { CPUReducer, initialState } from './reducer';

export const CPUContextProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [state, dispatch] = useReducer(CPUReducer, initialState);
  const coordinatorRef = useRef(new CPUCoordinator());
  return (
    <CPUContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
        coordinator: coordinatorRef.current,
      }}
    >
      {children}
    </CPUContext.Provider>
  );
};
