import { SudokuBoard } from "../../domains/sudoku/SudokuBoard";
import { Board } from "../../domains/sudoku/types";

export class SudokuSolverService {
	solve(sudokuBoard: SudokuBoard): SudokuBoard {
		/** First approach
		 * 1. Find first empty space (top->down, left->right)
		 * 2. Find first valid value (1->9)
		 * 3. Repeat steps 1 & 2 until solved or error. If error stop 4
		 * 4. Go back to last step 2, and try next value. If no more values again step 4.
		 * 5. Loop until solve or mark as unsolvable.
		 */
		// console.log("Starting SudokuBoardSolver with board", sudokuBoard);

		const solveSudokuBoard = SudokuBoard.create(sudokuBoard.board);

		const solved = this.solveRecursive(solveSudokuBoard, 0);
		if (solved) {
			return solveSudokuBoard;
		} else {
			return sudokuBoard;
		}
	}

	private solveRecursive(sudokuBoard: SudokuBoard, depth: number): boolean {
		// console.log(depth, "- solveRecursive");
		const index = sudokuBoard.board.flat().indexOf(null);
		if (index === -1) {
			// console.log(depth, "- SOLVED!", sudokuBoard);
			return true;
		}
		const coord = { row: Math.floor(index / 9), col: index % 9 };
		// console.log(depth, "- coords:", coord);
		for (let i = 1; i <= 9; i++) {
			if (sudokuBoard.isValidValue(coord.row, coord.col, i)) {
				// console.log(depth, "- settingValue", i);
				sudokuBoard.setValue(coord.row, coord.col, i);
				if (this.solveRecursive(sudokuBoard, depth + 1)) {
					return true;
				}
			}
		}
		// console.log(depth, "- Rollback");
		sudokuBoard.setValue(coord.row, coord.col, null);

		return false;
	}

	*solveStepper(sudokuBoard: SudokuBoard) {
		// console.log("STARTING STEPPER SOLVER");
		let finished = false;
		let rollback = false;
		const changeTrack: { flatIndex: number; value: number }[] = [];
		const solveSudokuBoard = SudokuBoard.create(sudokuBoard.board);
		while (!finished) {
			let lastChange: { flatIndex: number; value: number } | undefined;

			if (rollback) {
				rollback = false;
				lastChange = changeTrack.pop();
				if (lastChange === undefined) {
					// console.log("No more rollbacks. Breaking.");
					// Due to no having possible rollbacks, we consider it's not solvable
					finished = true;
					break;
				}
			}
			// if (lastChange) console.log("Rollbacking to", { lastChange });
			const index = lastChange
				? lastChange.flatIndex
				: solveSudokuBoard.board.flat().indexOf(null);
			if (index === -1) {
				// console.log("SOLVED! Breaking.");
				// If not being able to find null value, it's solved.
				finished = true;
				break;
			}

			const coord = { row: Math.floor(index / 9), col: index % 9 };
			// console.log(changeTrack.length, "INDEX & COORD", index, coord);
			let addedValue = false;
			for (let i = lastChange ? lastChange.value + 1 : 1; i <= 9; i++) {
				if (solveSudokuBoard.isValidValue(coord.row, coord.col, i)) {
					solveSudokuBoard.setValue(coord.row, coord.col, i);
					// console.log(changeTrack.length, "SETTED VALUE", i);
					yield solveSudokuBoard.board;
					changeTrack.push({ flatIndex: index, value: i });
					addedValue = true;
					break;
				}
			}
			if (!addedValue) {
				// console.log("Clearing and triggering rollback");
				if (solveSudokuBoard.board[coord.row][coord.col]) {
					solveSudokuBoard.setValue(coord.row, coord.col, null);
					yield solveSudokuBoard.board;
				}
				rollback = true;
			}
		}

		yield solveSudokuBoard.board;
	}
}
