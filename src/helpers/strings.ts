import { getBaseLog } from "./math";

export const numToHex = (val: number, totalVals?: number): string => {
  return val.toString(16).padStart(Math.ceil(getBaseLog(16, totalVals ?? 16)), '0').toUpperCase()
}

export const bitToHex = (bits: string, totalVals?: number): string => {
  return numToHex(parseInt(bits, 2), totalVals);
}