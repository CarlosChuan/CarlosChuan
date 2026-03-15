import { Instruction } from "../instruction/Instruction";
import { InstructionDTO } from "../instruction/InstructionDTO";

export class InstructionRegisterDomain {
  private _instructions: Instruction[];
  constructor(
    instructionsDTO: InstructionDTO[],
  ) {
    const instructions = instructionsDTO.map(({ instruction }) => new Instruction(instruction))
    this._instructions = instructions;
  }

  get instruction(): Instruction[] {
    return this._instructions;
  }
}