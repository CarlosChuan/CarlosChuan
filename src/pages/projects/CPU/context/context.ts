import { createContext, useContext } from 'react';
import { CPUActions } from './actions';
import { CPUCoordinator } from './CPUCoordinator';
import { CPUState } from './reducer';

export const CPUContext = createContext({
  state: {} as CPUState,
  dispatch: (_: CPUActions) => {
    // Do nothing
  },
  coordinator: new CPUCoordinator(),
});

CPUContext.displayName = `CPUContext`;

export const useCPUContext = () => useContext(CPUContext);
