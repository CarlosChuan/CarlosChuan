type BoardValue = number | "*";
type BoardRow = [
	BoardValue,
	BoardValue,
	BoardValue,
	BoardValue,
	BoardValue,
	BoardValue,
	BoardValue,
	BoardValue,
	BoardValue,
];
export type Board = [
	BoardRow,
	BoardRow,
	BoardRow,
	BoardRow,
	BoardRow,
	BoardRow,
	BoardRow,
	BoardRow,
	BoardRow,
];

export const TestBoard: Board = [
	[1, 2, 3, 4, 5, 6, 7, 8, 9],
	[9, 1, 2, 3, 4, 5, 6, 7, 8],
	[8, 9, 1, 2, 3, 4, 5, 6, 7],
	[7, 8, 9, 1, 2, 3, 4, 5, 6],
	[6, 7, 8, 9, 1, 2, 3, 4, 5],
	[5, 6, 7, 8, 9, 1, 2, 3, 4],
	[4, 5, 6, 7, 8, 9, 1, 2, 3],
	[3, 4, 5, 6, 7, 8, 9, 1, 2],
	[2, 3, 4, 5, 6, 7, 8, 9, 1],
];
