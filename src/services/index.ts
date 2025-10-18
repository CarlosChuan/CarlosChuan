import { SudokuGeneratorService } from "./sudoku/SudokuGeneratorService";
import { SudokuSolverService } from "./sudoku/SudokuSolverService";

export const sudokuSolverService = new SudokuSolverService();
export const sudokuGeneratorService = new SudokuGeneratorService(
	sudokuSolverService,
);
