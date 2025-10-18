import { Board } from "./types";

export const fullBoard: Board = [
	[1, 2, 3, 4, 5, 6, 7, 8, 9],
	[4, 5, 6, 7, 8, 9, 1, 2, 3],
	[7, 8, 9, 1, 2, 3, 4, 5, 6],
	[2, 3, 4, 5, 6, 7, 8, 9, 1],
	[5, 6, 7, 8, 9, 1, 2, 3, 4],
	[8, 9, 1, 2, 3, 4, 5, 6, 7],
	[3, 4, 5, 6, 7, 8, 9, 1, 2],
	[6, 7, 8, 9, 1, 2, 3, 4, 5],
	[9, 1, 2, 3, 4, 5, 6, 7, 8],
];

export const emptyBoard: Board = [
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
];

/** Real-life boards
 * Easy: 600400308730028500805700429080049613400000000051600080946100830020306700070000100
 * Medium: 000005009690000208301020400783960042000008063940253017010000300000190004809504000
 * Extreme: 980600031007000000600540000000008374000060000000000902032007400040300010000000000
 *
 * Solutions:
 * Easy: 692415378734928561815763429287549613469831257351672984946157832128396745573284196
 * Medium: 278645139694317258351829476783961542125478963946253817412786395537192684869534721
 * Extreme: 984672531257831649613549827561928374429763185378415962832157496745396218196284753
 */

export const easyBoard: Board = [
	[6, null, null, 4, null, null, 3, null, 8],
	[7, 3, null, null, 2, 8, 5, null, null],
	[8, null, 5, 7, null, null, 4, 2, 9],
	[null, 8, null, null, 4, 9, 6, 1, 3],
	[4, null, null, null, null, null, null, null, null],
	[null, 5, 1, 6, null, null, null, 8, null],
	[9, 4, 6, 1, null, null, 8, 3, null],
	[null, 2, null, 3, null, 6, 7, null, null],
	[null, 7, null, null, null, null, 1, null, null],
];

export const mediumBoard: Board = [
	[null, null, null, null, null, 5, null, null, 9],
	[6, 9, null, null, null, null, 2, null, 8],
	[3, null, 1, null, 2, null, 4, null, null],
	[7, 8, 3, 9, 6, null, null, 4, 2],
	[null, null, null, null, null, 8, null, 6, 3],
	[9, 4, null, 2, 5, 3, null, 1, 7],
	[null, 1, null, null, null, null, 3, null, null],
	[null, null, null, 1, 9, null, null, null, 4],
	[8, null, 9, 5, null, 4, null, null, null],
];

export const extremeBoard: Board = [
	[9, 8, null, 6, null, null, null, 3, 1],
	[null, null, 7, null, null, null, null, null, null],
	[6, null, null, 5, 4, null, null, null, null],
	[null, null, null, null, null, 8, 3, 7, 4],
	[null, null, null, null, 6, null, null, null, null],
	[null, null, null, null, null, null, 9, null, 2],
	[null, 3, 2, null, null, 7, 4, null, null],
	[null, 4, null, 3, null, null, null, 1, null],
	[null, null, null, null, null, null, null, null, null],
];
