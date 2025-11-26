import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "../../../../components/shared/Grid";
import { HSpacer } from "../../../../components/shared/HSpacer";
import palette from "../../../../constants/Colors";
import { routes } from "../../../../constants/Routes";
import { SudokuBoard } from "../../../../domains/sudoku/SudokuBoard";
import {
	easyBoard,
	extremeBoard,
	mediumBoard,
} from "../../../../domains/sudoku/TestBoards";
import { Board } from "../../../../domains/sudoku/types";
import {
	sudokuGeneratorService,
	sudokuSolverService,
} from "../../../../services";
import BoardCanvas from "./BoardCanvas";
import BoardControls from "./BoardControls";
import { CompletionModal } from "./CompletionModal";

export const SudokuBoardComponent: React.FC = () => {
	const navigate = useNavigate();
	const sudokuBoard = useRef<SudokuBoard>(SudokuBoard.create(easyBoard));

	const solveStepTimeRef = useRef<number>(10);
	const [solveStepTime, setSolveStepTime] = useState(solveStepTimeRef.current);

	const [invalidMove, setInvalidMove] = useState(false);
	const [selected, setSelected] = useState<{ row: number; col: number } | null>(
		null,
	);
	const [isFinished, setIsFinished] = useState(false);
	const [solveIterator, setSolveIterator] = useState<Generator<Board> | null>(
		null,
	);

	// expose repaint function from canvas
	const repaintRef = useRef<() => void>(() => {});
	const setRepaintRef = (fn: () => void) => {
		repaintRef.current = fn;
	};

	// keep a stable ref for selected for keyboard handling
	const selectedRef = useRef<{ row: number; col: number } | null>(null);
	useEffect(() => {
		selectedRef.current = selected;
	}, [selected]);

	useEffect(() => {
		solveStepTimeRef.current = solveStepTime;
	}, [solveStepTime]);

	useEffect(() => {
		if (!invalidMove) return;
		const t = setTimeout(() => setInvalidMove(false), 500);
		return () => clearTimeout(t);
	}, [invalidMove]);

	useEffect(() => {
		if (solveIterator) {
			setSelected(null);

			const stepSolveIterator = async () => {
				for (let step of solveIterator) {
					sudokuBoard.current.board = step;
					repaintRef.current?.();
					await new Promise((r) => setTimeout(r, solveStepTimeRef.current));
				}
				setIsFinished(sudokuBoard.current.isFinished());
				setSolveIterator(null);
			};

			stepSolveIterator();
		}
	}, [solveIterator]);

	// keyboard input handling
	useEffect(() => {
		const manageKeyboardInput = (event: KeyboardEvent) => {
			const s = selectedRef.current;
			if (!s || solveIterator) return;

			const keyValue = Number(event.key);
			const board = sudokuBoard.current;

			if (event.key === "Backspace") {
				board.setValue(s.row, s.col, null);
			}

			if (keyValue) {
				if (!board.isValidValue(s.row, s.col, keyValue)) {
					setInvalidMove(true);
					return;
				}

				board.setValue(s.row, s.col, keyValue);

				if (board.isFinished()) {
					setSelected(null);
					repaintRef.current?.();
					setIsFinished(true);
				}
			}

			repaintRef.current?.();
		};

		document.addEventListener("keydown", manageKeyboardInput);
		return () => document.removeEventListener("keydown", manageKeyboardInput);
	}, [solveIterator]);

	// redraw when selection or invalidMove changes
	useEffect(() => {
		repaintRef.current?.();
	}, [selected, invalidMove]);

	return (
		<Grid
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "100%",
				backgroundColor: palette.light.secondary00,
			}}
		>
			<Grid
				style={{
					height: "80vmin",
					aspectRatio: 1,
					display: "flex",
					flexDirection: "row",
				}}
			>
				<BoardCanvas
					sudokuBoardRef={sudokuBoard}
					selected={selected}
					invalidMove={invalidMove}
					setSelected={setSelected}
					solveIterator={solveIterator}
					setRepaintRef={setRepaintRef}
				/>

				<HSpacer medium />

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 15,
						width: 240,
					}}
				>
					<BoardControls
						onSolveClick={() => {
							const iterator = sudokuSolverService.solveStepper(
								sudokuBoard.current,
							);
							setSolveIterator(iterator);
						}}
						solveStepTime={solveStepTime}
						setSolveStepTime={setSolveStepTime}
						onGenerateRandom={() => {
							const board = sudokuGeneratorService.generateBoard();
							sudokuBoard.current = SudokuBoard.create(board);
							repaintRef.current?.();
						}}
						onGenerateEasy={() => {
							sudokuBoard.current = SudokuBoard.create(easyBoard);
							repaintRef.current?.();
						}}
						onGenerateMedium={() => {
							sudokuBoard.current = SudokuBoard.create(mediumBoard);
							repaintRef.current?.();
						}}
						onGenerateExtreme={() => {
							sudokuBoard.current = SudokuBoard.create(extremeBoard);
							repaintRef.current?.();
						}}
						onClear={() => {
							sudokuBoard.current.clear();
							repaintRef.current?.();
						}}
						disabled={!!solveIterator}
					/>
				</div>
			</Grid>

			<CompletionModal
				isOpen={isFinished}
				title="Congratulations!"
				subtitle="You've successfully completed the Sudoku puzzle!"
				onPlayAgain={() => {
					sudokuBoard.current = SudokuBoard.create(easyBoard);
					repaintRef.current?.();
					setIsFinished(false);
				}}
				onGoHome={() => {
					navigate(routes.getRoute("home_root"));
				}}
				onClose={() => setIsFinished(false)}
			/>
		</Grid>
	);
};

export default SudokuBoardComponent;
