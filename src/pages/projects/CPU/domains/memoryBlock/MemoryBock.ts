import { MemoryCell } from "../MemoryCell";

const MB_SIZE = 256;

export class MemoryBlock {
  private _memoryCells: MemoryCell[];
  constructor(
    memoryCells: MemoryCell[],
  ) {
    if (memoryCells.length > MB_SIZE) {
      throw Error("Memory block can have up to 256 cells.");
    }

    this._memoryCells = Array.from({ length: MB_SIZE }).map((_, idx) => {
      const existingCell = memoryCells.find((cell) => cell.addr === idx);
      return existingCell ?? MemoryCell.default(idx);
    })

  }

  static default() {
    return new MemoryBlock([]);
  }

  get memoryCells(): MemoryCell[] {
    return this._memoryCells;
  }
}