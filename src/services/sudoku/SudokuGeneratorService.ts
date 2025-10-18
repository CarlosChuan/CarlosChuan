import { SudokuBoard } from "../../domains/sudoku/SudokuBoard";
import { Board, BoardValue } from "../../domains/sudoku/types";
import { SudokuSolverService } from "./SudokuSolverService";

export class SudokuGeneratorService {
	constructor(private sudokuSolver: SudokuSolverService) {}

	generateBoard(): Board {
		const fullBoard = this.generateRandomFullBoard();

		const possibleBoards: Board[] = [];

		for (let i = 0; i < 5; i++) {
			const sudokuBoard = SudokuBoard.create(fullBoard);
			const generatedBoard = this.generateBoardRecursive(
				fullBoard.flat(),
				sudokuBoard,
				0,
			);
			if (typeof generatedBoard === typeof fullBoard) {
				possibleBoards.push(generatedBoard as Board);
			}
		}

		possibleBoards.sort(
			(a, b) =>
				a.flat().filter(Boolean).length - b.flat().filter(Boolean).length,
		);
		return possibleBoards[0];
	}

	generateBoardRecursive(
		initialBoardFlat: BoardValue[],
		sudokuBoard: SudokuBoard,
		depth: number,
	): boolean | Board {
		// It never should be greater than 81.
		if (depth > 90) return true;
		const coord = sudokuBoard.board
			.flatMap((row, i) =>
				row.map((val, j) => (val !== null ? { row: i, col: j } : null)),
			)
			.filter(Boolean)[
			Math.floor(
				Math.random() * sudokuBoard.board.flat().filter(Boolean).length,
			)
		];

		if (!coord) {
			// Ending due to not more !null values in board.
			return true;
		}
		const value = sudokuBoard.board[coord.row][coord.col];

		sudokuBoard.setValue(coord.row, coord.col, null, true);

		const solvedBoard = this.sudokuSolver.solve(sudokuBoard);
		if (
			solvedBoard.isFinished() &&
			solvedBoard.board
				.flat()
				.every((solvedValue, idx) => initialBoardFlat[idx] === solvedValue)
		) {
			const recursiveReturn = this.generateBoardRecursive(
				initialBoardFlat,
				sudokuBoard,
				depth + 1,
			);
			if (recursiveReturn) {
				return recursiveReturn;
			}
		} else {
			sudokuBoard.setValue(coord.row, coord.col, value, true);
			return sudokuBoard.board;
		}
		return false;
	}

	generateRandomFullBoard(): Board {
		const sudokuBoard = SudokuBoard.createEmptyBoard();

		this.generateRandomRecursive(sudokuBoard, 0);
		return sudokuBoard.board;
	}

	generateRandomRecursive(sudokuBoard: SudokuBoard, depth: number) {
		const index = sudokuBoard.board.flat().indexOf(null);
		if (index === -1) {
			return true;
		}
		const coord = { row: Math.floor(index / 9), col: index % 9 };
		let possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		while (possibleValues.length > 0) {
			const value =
				possibleValues[Math.floor(Math.random() * possibleValues.length)];
			possibleValues = possibleValues.filter((arrVal) => arrVal !== value);
			if (sudokuBoard.isValidValue(coord.row, coord.col, value)) {
				sudokuBoard.setValue(coord.row, coord.col, value);
				if (this.generateRandomRecursive(sudokuBoard, depth + 1)) {
					return true;
				}
			}
		}
		if (sudokuBoard.board[coord.row][coord.col]) {
			sudokuBoard.setValue(coord.row, coord.col, null);
		}
		return false;
	}
}
