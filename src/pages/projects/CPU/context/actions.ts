import { Instruction } from "../domains/instruction/Instruction";
import { Signed8Int } from "../domains/Signed8Int";

export enum CPUActionType {
  UPDATE_PC = `UPDATE_PC`,
  SET_INSTR = `SET_INSTR`,
  SET_MEMORY = `SET_MEMORY`,
  SET_REGBANK = `SET_REGBANK`,
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
  payload: Signed8Int[];
}


export interface SetRegBankAction {
  type: CPUActionType.SET_REGBANK;
  payload: Signed8Int[];
}


export type CPUActions = UpdatePCAction | SetInstrAction | SetMemoryAction | SetRegBankAction;
