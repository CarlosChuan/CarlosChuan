/**
 * Get a log from a custom base with the form logx(y).
 */
export const getBaseLog = (x: number, y: number) => {
  return Math.log(y) / Math.log(x)
}