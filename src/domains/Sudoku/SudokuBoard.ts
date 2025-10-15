import { emptyBoard, fullBoard } from "./TestBoards";
import { Board } from "./types";

export class SudokuBoard {
	private _board: Board;

	get board(): Board {
		return this._board;
	}

	isValidMove(row: number, col: number, value: number): boolean {
		// Check if the row is valid
		this.board[row].every((rowValue) => rowValue !== value);

		// Check if the column is valid

		return true;
	}

	set board(value: Board) {
		this._board = value;
	}

	constructor(board: Board) {
		this._board = board;
	}

	static createEmptyBoard(): SudokuBoard {
		return new SudokuBoard(emptyBoard);
	}
	static createFullBoard(): SudokuBoard {
		return new SudokuBoard(fullBoard);
	}
}
