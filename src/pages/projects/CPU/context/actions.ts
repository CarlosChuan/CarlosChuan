import { Instruction } from "../domains/instruction/Instruction";
import { MemoryCell } from "../domains/MemoryCell";
import { ViewStyle } from "./reducer";

export enum CPUActionType {
  UPDATE_PC = `UPDATE_PC`,
  SET_INSTR = `SET_INSTR`,
  SET_MEMORY = `SET_MEMORY`,
  SET_REGBANK = `SET_REGBANK`,
  SET_VIEW_STYLE = "SET_VIEW_STYLE"
}

export interface UpdatePCAction {
  type: CPUActionType.UPDATE_PC;
  payload: string;
}

export interface SetInstrAction {
  type: CPUActionType.SET_INSTR;
  payload: Instruction;
}

export interface SetMemoryAction {
  type: CPUActionType.SET_MEMORY;
  payload: MemoryCell[];
}


export interface SetRegBankAction {
  type: CPUActionType.SET_REGBANK;
  payload: MemoryCell[];
}

export interface SetViewStyle {
  type: CPUActionType.SET_VIEW_STYLE;
  payload: ViewStyle;
}


export type CPUActions = UpdatePCAction | SetInstrAction | SetMemoryAction | SetRegBankAction | SetViewStyle;
