import React, { useEffect, useRef, useState } from "react";
import { Grid } from "../../../components/shared/Grid";
import palette from "../../../constants/Colors";
import { SudokuBoard } from "../../../domains/sudoku/SudokuBoard";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../constants/Routes";
import {
	easyBoard,
	extremeBoard,
	mediumBoard,
} from "../../../domains/sudoku/TestBoards";
import { CompletionModal } from "./CompletionModal";
import { sudokuGeneratorService, sudokuSolverService } from "../../../services";
import { Board } from "../../../domains/sudoku/types";
import { HSpacer } from "../../../components/shared/HSpacer";
import { VSpacer } from "../../../components/shared/VSpacer";

const SUDOKU_BOARD_ID = "sudoku-board";
const SIDE_LENGTH =
	(window.innerHeight < window.innerWidth
		? window.innerHeight
		: window.innerWidth) * 0.8;
const MARGIN = 2;
const CELL_SIDE = (SIDE_LENGTH - MARGIN * 2) / 9;

export const SudokuBoardComponent = () => {
	const navigate = useNavigate();
	const canvas = useRef<HTMLCanvasElement | null>(null);
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

	const printBoard = (
		ctx: CanvasRenderingContext2D,
		sudokuBoard: SudokuBoard,
	) => {
		ctx.clearRect(0, 0, SIDE_LENGTH, SIDE_LENGTH);

		// optional background
		ctx.fillStyle = "transparent";
		ctx.fillRect(0, 0, SIDE_LENGTH, SIDE_LENGTH);

		// highlight selected cell (if any)
		if (selectedRef.current) {
			const x = MARGIN + CELL_SIDE * selectedRef.current.col;
			const y = MARGIN + CELL_SIDE * selectedRef.current.row;
			if (invalidMove) {
				ctx.fillStyle = `${palette.light.error}88`; // semi-transparent highlight
			} else {
				ctx.fillStyle = `${palette.light.primary20}88`; // semi-transparent highlight
			}
			ctx.fillRect(x, y, CELL_SIDE, CELL_SIDE);
		}

		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.strokeStyle = palette.light.primary20;
		ctx.rect(
			MARGIN,
			MARGIN,
			SIDE_LENGTH - MARGIN * 2,
			SIDE_LENGTH - MARGIN * 2,
		);
		ctx.stroke();

		// Print table lines
		sudokuBoard.board.forEach((_row, idx) => {
			ctx.lineWidth = idx % 3 === 0 ? 4 : 1;
			ctx.strokeStyle = palette.light.primary20;
			const padding = MARGIN + CELL_SIDE * idx;
			ctx.beginPath();
			ctx.moveTo(MARGIN, padding);
			ctx.lineTo(SIDE_LENGTH - MARGIN * 2, padding);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(padding, MARGIN);
			ctx.lineTo(padding, SIDE_LENGTH - MARGIN * 2);
			ctx.stroke();
		});
	};

	const printData = (
		ctx: CanvasRenderingContext2D,
		sudokuBoard: SudokuBoard,
	) => {
		ctx.fillStyle = `${palette.light.white}DD`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		// Print each row
		sudokuBoard.board.forEach((row, rowIdx) => {
			row.forEach((value, colIdx) => {
				const isInitial = sudokuBoard.isInitialValue(rowIdx, colIdx);

				if (isInitial) {
					ctx.font = "bold 5vmin Arial";
				} else {
					ctx.font = "5vmin Arial";
				}

				ctx.fillText(
					`${value ?? ""}`,
					MARGIN + CELL_SIDE * (colIdx + 0.5),
					MARGIN + CELL_SIDE * (rowIdx + 0.5),
				);
			});
		});
	};

	// ref to hold latest selected value for stable event handler
	const selectedRef = useRef<{ row: number; col: number } | null>(null);

	// keep ref in sync with state
	useEffect(() => {
		selectedRef.current = selected;
	}, [selected]);

	useEffect(() => {
		solveStepTimeRef.current = solveStepTime;
	}, [solveStepTime]);

	useEffect(() => {
		if (!invalidMove) return;
		setTimeout(() => {
			setInvalidMove(false);
		}, 500);
	}, [invalidMove]);

	useEffect(() => {
		if (solveIterator) {
			setSelected(null);
			const stepSolveIterator = async () => {
				for (let step of solveIterator) {
					sudokuBoard.current.board = step;
					repaintCanvas();
					await new Promise((r) => setTimeout(r, solveStepTimeRef.current));
				}
				setIsFinished(sudokuBoard.current.isFinished());
				setSolveIterator(null);
			};

			stepSolveIterator();
		}
	}, [solveIterator]);

	// mount: find canvas and set pixel size / CSS size
	useEffect(() => {
		// keyboard input
		document.addEventListener("keydown", manageKeyboardInput);
		return () => {
			document.removeEventListener("keydown", manageKeyboardInput);
		};
	}, []);

	// redraw whenever canvas or selection changes
	useEffect(() => {
		repaintCanvas();
	}, [canvas.current, selected, invalidMove]);

	const repaintCanvas = () => {
		if (!canvas.current) return;
		const ctx = canvas.current.getContext("2d");
		if (!ctx) return;

		// ensure internal canvas pixel size remains
		ctx.canvas.width = SIDE_LENGTH;
		ctx.canvas.height = SIDE_LENGTH;
		ctx.canvas.style.width = "100%";
		ctx.canvas.style.height = "100%";
		printBoard(ctx, sudokuBoard.current);
		printData(ctx, sudokuBoard.current);
	};

	const manageKeyboardInput = (event: KeyboardEvent) => {
		const selected = selectedRef.current;
		if (!selected || solveIterator) return;

		const keyValue = Number(event.key);
		const board = sudokuBoard.current;

		if (event.key === "Backspace") {
			board.setValue(selected.row, selected.col, null);
		}

		if (keyValue) {
			// Update the selected cell with the new value
			if (!board.isValidValue(selected.row, selected.col, keyValue)) {
				setInvalidMove(true);
				return;
			}

			board.setValue(selected.row, selected.col, keyValue);

			if (board.isFinished()) {
				setSelected(null);
				repaintCanvas();
				setIsFinished(true);
			}
		}
		repaintCanvas();
	};

	const handleCanvasClick = (ev: React.MouseEvent<HTMLCanvasElement>) => {
		if (!canvas.current || solveIterator) return;
		const rect = canvas.current.getBoundingClientRect();
		// account for CSS -> canvas pixels scale
		const scaleX = canvas.current.width / rect.width;
		const scaleY = canvas.current.height / rect.height;
		const x = (ev.clientX - rect.left) * scaleX;
		const y = (ev.clientY - rect.top) * scaleY;
		const col = Math.floor((x - MARGIN) / CELL_SIDE);
		const row = Math.floor((y - MARGIN) / CELL_SIDE);

		if (col >= 0 && col < 9 && row >= 0 && row < 9) {
			setSelected((prev) =>
				prev && prev.row === row && prev.col === col
					? null
					: { row: row, col: col },
			);
		}
	};

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
				<canvas
					style={{ cursor: solveIterator ? "default" : "pointer" }}
					ref={canvas}
					id={SUDOKU_BOARD_ID}
					onClick={handleCanvasClick}
				/>

				<HSpacer medium />

				<Grid
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 15,
					}}
				>
					<Grid
						style={{
							backgroundColor: `${palette.light.white}44`,
							padding: 10,
							borderRadius: 10,
							width: "100%",
						}}
					>
						<Grid
							onClick={() => {
								const iterator = sudokuSolverService.solveStepper(
									sudokuBoard.current,
								);
								setSolveIterator(iterator);
							}}
						>
							Solve
						</Grid>
						<VSpacer small />
						<input
							type="number"
							value={solveStepTime}
							onChange={(event) => {
								setSolveStepTime(Number(event.target.value));
							}}
						/>
					</Grid>
					<Grid
						style={{
							backgroundColor: `${palette.light.white}44`,
							padding: 10,
							borderRadius: 10,
							width: "100%",
						}}
					>
						<Grid
							onClick={() => {
								const board = sudokuGeneratorService.generateBoard();
								sudokuBoard.current = SudokuBoard.create(board);
								repaintCanvas();
							}}
						>
							Generate random
						</Grid>

						<VSpacer large />

						<Grid
							onClick={() => {
								sudokuBoard.current = SudokuBoard.create(easyBoard);
								repaintCanvas();
							}}
						>
							Generate easy
						</Grid>

						<VSpacer small />

						<Grid
							onClick={() => {
								sudokuBoard.current = SudokuBoard.create(mediumBoard);
								repaintCanvas();
							}}
						>
							Generate medium
						</Grid>

						<VSpacer small />

						<Grid
							onClick={() => {
								sudokuBoard.current = SudokuBoard.create(extremeBoard);
								repaintCanvas();
							}}
						>
							Generate dificult
						</Grid>
					</Grid>
					<Grid
						style={{
							backgroundColor: `${palette.light.white}44`,
							padding: 10,
							borderRadius: 10,
							width: "100%",
						}}
					>
						<Grid
							onClick={() => {
								sudokuBoard.current.clear();
								repaintCanvas();
							}}
						>
							Clear
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<CompletionModal
				isOpen={isFinished}
				title="Congratulations!"
				subtitle="You've successfully completed the Sudoku puzzle!"
				onPlayAgain={() => {
					sudokuBoard.current = SudokuBoard.create(easyBoard);
					repaintCanvas();
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
