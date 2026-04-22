import { getBaseLog } from "./math";

export const numToBin = (val: number, totalVals?: number): string => {
  return val.toString(2).padStart(Math.ceil(getBaseLog(2, totalVals ?? 2)), '0')
}

export const numToHex = (val: number, totalVals?: number): string => {
  return val.toString(16).padStart(Math.ceil(getBaseLog(16, totalVals ?? 16)), '0').toUpperCase()
}

export const bitToHex = (bits: string, totalVals?: number): string => {
  return numToHex(bitsToNum(bits), totalVals);
}

export const bitsToNum = (bits: string): number => {
  return parseInt(bits, 2);
}

export const hexToBin = (hex: string, totalVals?: number): string => {
  return (parseInt(hex, 16).toString(2)).padStart(8 * Math.min((totalVals ?? 1)/16, 1), '0');
}