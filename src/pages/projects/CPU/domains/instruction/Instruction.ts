import { bitToHex } from "../../../../../helpers/strings";

export const INSTRUCTION_LENGTH = 16

export type OperationTypes = "read" | "write" | "add" | "nop"
const bitToOperation = {
  "00": "nop",
  "01": "add",
  "10": "read",
  "11": "write",
} as Record<string, OperationTypes>

interface Operation {
  type: OperationTypes;
}
export interface NOP extends Operation { }
export interface ADD extends Operation {
  inA: string;
  inB: string;
  out: string;
}
export interface READ extends Operation {
  from: string;
  to: string;
}
export interface WRITE extends Operation {
  from: string;
  to: string;
}

export class Instruction {
  private _instruction: string;

  constructor(
    rawInstruction: string
  ) {
    // Expect a predefined instruction length
    if (rawInstruction.length !== INSTRUCTION_LENGTH) {
      throw Error(`Instruction must have length of ${INSTRUCTION_LENGTH}`)
    }

    // Expect bit only values (0 | 1)
    Array.from(rawInstruction).forEach((char) => {
      if (char !== '0' && char !== '1') {
        throw Error("Instruction must be only of '0' and '1' values (binary).")
      }
    })

    this._instruction = rawInstruction;
  }

  static default(): Instruction {
    try {
      return new Instruction("0000000000000000")
    } catch (error) {
      console.error("ERROR", error)
      return new Instruction("0000000000000000")
    }
  }

  get rawInstruction(): string {
    return this._instruction
  }

  get operation(): OperationTypes {
    return bitToOperation[this.rawInstruction.slice(0, 2)]
  }

  get operationElements(): string[] {
    const operation = this.operation;
    switch (operation) {
      case "nop":
        return []
      case "add":
        const aRegister = this.rawInstruction.slice(2, 8);
        const bRegister = this.rawInstruction.slice(8, 14);
        const outRegister = `1111${this.rawInstruction.slice(14, 16)}`;
        return [aRegister, bRegister, outRegister]
      case "read":
        const fromMemory = this.rawInstruction.slice(2, 10)
        const toRegister = this.rawInstruction.slice(10, 16)
        return [fromMemory, toRegister]
      case "write":
        const fromRegister = this.rawInstruction.slice(2, 8)
        const toMemory = this.rawInstruction.slice(8, 16)
        return [fromRegister, toMemory]
    }
  }

  get instructionObject(): Operation {
    const operation = this.operation;
    const operationElems = this.operationElements;

    switch (operation) {
      case "nop":
        return { type: "nop" } as NOP;
      case "add":
        if (operationElems.length !== 3) throw Error("Add instruction must have three params");
        return { type: "add", inA: operationElems[0], inB: operationElems[1], out: operationElems[2] } as ADD;
      case "read":
        if (operationElems.length !== 2) throw Error("Add instruction must have two params");
        return { type: "read", from: operationElems[0], to: operationElems[1] } as READ;
      case "write":
        if (operationElems.length !== 2) throw Error("Add instruction must have two params");
        return { type: "write", from: operationElems[0], to: operationElems[1] } as WRITE;
    }
  }

  get readableInstruction(): string {
    const { type, ...params } = this.instructionObject;
    return [type, ...Object.values(params).map((val) => typeof val === "string" && bitToHex(val))].join(',')
  }
}