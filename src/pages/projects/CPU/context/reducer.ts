import { Instruction } from '../domains/instruction/Instruction';
import { Signed8Int } from '../domains/Signed8Int';
import { CPUActions, CPUActionType } from './actions';

const DEFAULT_MEM_ADDR = "0000" + "0000" + "0000" + "0000"

export const initialState: CPUState = {
  PC: DEFAULT_MEM_ADDR,
  instruction: undefined,
  memory: [],
  registerBank: [],
};

export interface CPUState {
  PC: string;
  instruction?: Instruction;
  memory: Signed8Int[];
  registerBank: Signed8Int[];
}

export const CPUReducer = (state: CPUState, action: CPUActions): CPUState => {
  switch (action.type) {
    case CPUActionType.UPDATE_PC:
      return { ...state, PC: action.payload };
    case CPUActionType.SET_INSTR:
      return { ...state, instruction: action.payload };
    case CPUActionType.SET_MEMORY:
      return { ...state, memory: action.payload };
    case CPUActionType.SET_REGBANK:
      console.trace("SETTING REG DATA", action.payload)
      return { ...state, registerBank: action.payload };
    default:
      return state;
  }
};
