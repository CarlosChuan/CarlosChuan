import { createContext, useContext } from 'react';
import { CPUActions } from './actions';
import { CPUState } from './reducer';
import { StepCoordinator } from './StepCoordinator';

export const CPUContext = createContext({
  state: {} as CPUState,
  dispatch: (action: CPUActions) => {
    // Do nothing
  },
  stepCoordinator: new StepCoordinator(),
});

CPUContext.displayName = `CPUContext`;

export const useCPUContext = () => useContext(CPUContext);
