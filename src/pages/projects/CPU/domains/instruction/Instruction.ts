import { bitToHex, hexToBin } from "../../../../../helpers/strings";

export const INSTRUCTION_LENGTH = 16

export type OperationTypes = "read" | "write" | "add" | "nop"
const bitToOperation = {
  "00": "nop",
  "01": "add",
  "10": "read",
  "11": "write",
} as Record<string, OperationTypes>
const operationToBits = {
  "nop": "00",
  "add": "01",
  "read": "10",
  "write": "11",
} as Record<OperationTypes, string>

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

export type InstructionGuide = (NOP | ADD | READ | WRITE) & { description: string };

export const INSTRUCTIONS_OPERATIONS: InstructionGuide[] = [
  { type: "nop", description: "No Operation instruction." },
  { type: "add", inA: "inA", inB: "inB", out: "out", description: "Adder. Both inputs and output are registers." },
  { type: "read", from: "from", to: "to", description: "Read from memory to register" },
  { type: "write", from: "from", to: "to", description: "Writes from register to memory" },
];

export class Instruction {
  private _instruction: string;

  constructor(
    rawInstruction: string
  ) {
    // Expect a predefined instruction length
    if (rawInstruction.length !== INSTRUCTION_LENGTH) {
      throw Error(`Instruction must have length of ${INSTRUCTION_LENGTH}.`)
    }

    // Expect bit only values (0 | 1)
    Array.from(rawInstruction).forEach((char) => {
      if (char !== '0' && char !== '1') {
        throw Error("Instruction must be only of '0' and '1' values (binary).")
      }
    })

    this._instruction = rawInstruction;
  }

  static createFromReadable(readableInstruction: string): Instruction {
    if (!readableInstruction) {
      // We will default an empty instruction.
      return Instruction.default()
    }
    
    const instructionParts = readableInstruction.toLowerCase().replace(' ', '').split(',')

    const operationBits = operationToBits[instructionParts[0] as OperationTypes];

    if (!operationBits) {
      throw Error(`Operation ${instructionParts[0]} didn't match with any operation type.`)
    }

    let instruction: Instruction;

    switch(instructionParts[0] as OperationTypes) {
      case "nop":
        if (instructionParts.length > 1) {
          throw Error("NOP operation cannot have parameters.")
        }
        instruction = new Instruction(operationBits.padEnd(INSTRUCTION_LENGTH, '0'))
        break;
      case "add": {
        if (instructionParts.length !== 4) {
          throw Error("ADD operation must have three parameters.")
        }

        const paramsBits = instructionParts.slice(1).map((instruction) => hexToBin(instruction))
        // Padstart to all params depending on its size
        paramsBits[0] = paramsBits[0].padStart(6, '0') // inA: 6b
        paramsBits[1] = paramsBits[1].padStart(6, '0') // inB: 6b
        paramsBits[2] = paramsBits[2].padStart(2, '0') // out: 2b

        if (paramsBits[0].length > 6) {
          throw Error("ADD 'inA' param must be a hex value from 0 to 3F")
        }

        if (paramsBits[1].length > 6) {
          throw Error("ADD 'inB' param must be a hex value from 0 to 3F")
        }

        if (paramsBits[2].length > 2) {
          throw Error("ADD 'out' param must be a hex value from 0 to 3")
        }

        const binaryInstruction = `${operationBits}${paramsBits.join('')}`;
        instruction = new Instruction(binaryInstruction);
        break;
      }
      case "read": {
        if (instructionParts.length !== 3) {
          throw Error("READ operation must have two parameters.");
        }

        const paramsBits = instructionParts.slice(1).map((instruction) => hexToBin(instruction));
        // Padstart to all params depending on its size
        paramsBits[0] = paramsBits[0].padStart(8, '0') // from: 8b
        paramsBits[1] = paramsBits[1].padStart(6, '0') // to: 6b

        if (paramsBits[0].length > 8) {
          throw Error("READ 'from' param must be a hex value from 0 to FF")
        }

        if (paramsBits[1].length > 6) {
          throw Error("READ 'to' param must be a hex value from 0 to 3F")
        }
        
        const binaryInstruction = `${operationBits}${paramsBits.join('')}`;
        instruction = new Instruction(binaryInstruction);
        break;
      }
      case "write": {
        if (instructionParts.length !== 3) {
          throw Error("WRITE operation must have two parameters.");
        }

        const paramsBits = instructionParts.slice(1).map((instruction) => hexToBin(instruction));
        // Padstart to all params depending on its size
        paramsBits[0] = paramsBits[0].padStart(6, '0') // from: 6b
        paramsBits[1] = paramsBits[1].padStart(8, '0') // to: 8b

        if (paramsBits[0].length > 6) {
          throw Error("WRITE 'from' param must be a hex value from 0 to 3F")
        }

        if (paramsBits[1].length > 8) {
          throw Error("WRITE 'to' param must be a hex value from 0 to FF")
        }

        const binaryInstruction = `${operationBits}${paramsBits.join('')}`
        instruction = new Instruction(binaryInstruction);
        break;
      }
    }
    return instruction;
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
        const outRegister = `${this.rawInstruction.slice(14, 16)}`;
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

  /**
   * 
   * @param instruction 
   * @returns True if valid instruction
   */
  static validate(instruction: string) {
    const instructionParts = instruction.split(",")
    if (instructionParts.length <= 0) return false;
    const binaryType = operationToBits[instructionParts[0] as OperationTypes];
    if (!binaryType) return false;
    
  }
}