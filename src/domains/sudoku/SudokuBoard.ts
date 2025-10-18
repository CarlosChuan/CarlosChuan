import { emptyBoard, fullBoard } from "./TestBoards";
import { Board, BoardValue } from "./types";

export class SudokuBoard {
	private _board: Board;
	private _initialValues: boolean[][];

	get board(): Board {
		return this._board;
	}

	set board(value: Board) {
		this._board = value;
	}

	get initialValues(): boolean[][] {
		return this._initialValues;
	}

	constructor(board: Board) {
		// Made to make sure it doesnt create the board as reference but as new object
		this._board = [...board.map((row) => [...row])] as Board;
		this._initialValues = board.map((row) => row.map((value) => !!value));
	}

	static create(board: Board) {
		return new SudokuBoard(board);
	}

	static createEmptyBoard(): SudokuBoard {
		return new SudokuBoard(emptyBoard);
	}
	static createFullBoard(): SudokuBoard {
		return new SudokuBoard(fullBoard);
	}

	isValidValue(row: number, col: number, value: number): boolean {
		// Check if the row is valid
		if (!this.board[row].every((rowValue) => rowValue !== value)) return false;

		// Check if the column is valid
		if (!this.board.every((row) => row[col] !== value)) return false;

		// Check if the quadrant is valid
		const quadrant = this.getQuadrant(row, col);
		if (!quadrant.flat().every((quadrantValue) => quadrantValue !== value))
			return false;

		return true;
	}

	setValue(row: number, col: number, value: BoardValue, force = false): Board {
		if (!force && this.initialValues[row][col]) return this.board;
		// if (!this.isValidMove(row, col, value)) return this.board;
		this.board[row][col] = value;
		return this.board;
	}

	clear(): Board {
		this.board = this.board.map((row, rowIdx) =>
			row.map((value, colIdx) =>
				this.initialValues[rowIdx][colIdx] ? value : null,
			),
		) as Board;
		return this.board;
	}

	isFinished(): boolean {
		return this.board.flat().every((value) => !!value);
	}

	isInitialValue(row: number, col: number) {
		return this.initialValues[row][col];
	}

	private getQuadrant(row: number, col: number): BoardValue[][] {
		const quadrantCoords = [Math.floor(row / 3), Math.floor(col / 3)];
		const quadrant = this.board
			.slice(quadrantCoords[0] * 3, (quadrantCoords[0] + 1) * 3)
			.map((row) =>
				row.slice(quadrantCoords[1] * 3, (quadrantCoords[1] + 1) * 3),
			);
		return quadrant;
	}
}
