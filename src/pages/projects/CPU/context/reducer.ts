import { Instruction } from '../domains/instruction/Instruction';
import { MemoryCell } from '../domains/MemoryCell';
import { CPUActions, CPUActionType } from './actions';

const DEFAULT_MEM_ADDR = "0000" + "0000" + "0000" + "0000"

export type ViewStyle = "readable" | "raw"

export const initialState: CPUState = {
  PC: DEFAULT_MEM_ADDR,
  instruction: undefined,
  memory: [],
  registerBank: [],
  viewStyle: "raw"
};

export interface CPUState {
  PC: string;
  instruction?: Instruction;
  memory: MemoryCell[];
  registerBank: MemoryCell[];
  viewStyle: ViewStyle
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
      return { ...state, registerBank: action.payload };
      case CPUActionType.SET_VIEW_STYLE:
        return { ...state, viewStyle: action.payload };
    default:
      return state;
  }
};
