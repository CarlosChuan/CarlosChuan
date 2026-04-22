import { Instruction } from "../instruction/Instruction";

const IR_SIZE = 256;

export class InstructionRegister {
  private _instructions: Instruction[];
  constructor(
    instructions: Instruction[],
  ) {
    if (instructions.length > IR_SIZE) {
      throw Error("Instruction register can have up to 256 instructions.");
    }
    if (instructions.length < IR_SIZE) {
      this._instructions = [...instructions, ...Array.from({ length: IR_SIZE - instructions.length }, () => Instruction.default())]
    } else {
      this._instructions = instructions;
    }
  }

  static default() {
    return new InstructionRegister([]);
  }

  get instructions(): Instruction[] {
    return this._instructions;
  }
}