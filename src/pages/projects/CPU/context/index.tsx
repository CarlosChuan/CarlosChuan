import { PropsWithChildren, ReactElement, useReducer, useRef } from 'react';

import { CPUContext } from './context';
import { CPUReducer, initialState } from './reducer';
import { StepCoordinator } from './StepCoordinator';

export const CPUContextProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [state, dispatch] = useReducer(CPUReducer, initialState);
  const stepCoordinatorRef = useRef(new StepCoordinator());
  return (
    <CPUContext.Provider
      value={{
        state: state,
        dispatch: dispatch,
        stepCoordinator: stepCoordinatorRef.current,
      }}
    >
      {children}
    </CPUContext.Provider>
  );
};
