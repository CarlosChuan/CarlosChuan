import { numToHex } from "../../../../helpers/strings";
import { ViewStyle } from "../context/reducer";
import { Signed8Int } from "./Signed8Int";



export class MemoryCell {
  private _addr: number;
  private _value: Signed8Int;

  constructor(addr: number, value: string) {
    if (!Number.isInteger(addr) || addr < 0) {
      throw new Error("Addr must be a positive integer.")
    }
    
    this._addr = addr;
    this._value = new Signed8Int(value);
  }

  get addr(): number {
    return this._addr;
  }

  get value(): Signed8Int {
    return this._value;
  }

  set value(newValue: Signed8Int | string) {
      if (typeof newValue === 'string') {
      this._value = new Signed8Int(newValue);
    } else {
      this._value = newValue;
    }
  }

  hexAddr(totalVals?: number): string {
    return numToHex(this._addr, totalVals);
  }

  toString(viewStyle: ViewStyle, totalVals?: number): string {
    return `${this.hexAddr(totalVals)}: ${viewStyle === 'raw' ? this.value.rawInt: this.value.readableInt}`;
  }
}