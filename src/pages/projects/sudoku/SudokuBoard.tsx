import React, { useEffect, useRef, useState } from "react";
import { Grid } from "../../../components/shared/Grid";
import palette from "../../../constants/Colors";
import { SudokuBoard } from "../../../domains/Sudoku/SudokuBoard";

const SUDOKU_BOARD_ID = "sudoku-board";
const SIDE_LENGTH =
	(window.innerHeight < window.innerWidth
		? window.innerHeight
		: window.innerWidth) * 0.8;
const MARGIN = 2;
const CELL_SIDE = (SIDE_LENGTH - MARGIN * 2) / 9;

export const SudokuBoardComponent = () => {
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
	const [selected, setSelected] = useState<{ r: number; c: number } | null>(
		null,
	);
	const [sudokuBoard, setSudokuBoard] = useState<SudokuBoard>(
		SudokuBoard.createEmptyBoard(),
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
		if (selected) {
			const x = MARGIN + CELL_SIDE * selected.c;
			const y = MARGIN + CELL_SIDE * selected.r;
			ctx.fillStyle = `${palette.light.primary20}88`; // semi-transparent highlight
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
		ctx.font = "5vmin Arial";
		ctx.fillStyle = `${palette.light.white}DD`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		// Print each row
		sudokuBoard.board.forEach((row, rowIdx) => {
			row.forEach((value, valueIdx) => {
				ctx.fillText(
					`${value}`,
					MARGIN + CELL_SIDE * (valueIdx + 0.5),
					MARGIN + CELL_SIDE * (rowIdx + 0.5),
				);
			});
		});
	};

	// ref to hold latest selected value for stable event handler
	const selectedRef = useRef<{ r: number; c: number } | null>(null);

	// keep ref in sync with state
	useEffect(() => {
		selectedRef.current = selected;
	}, [selected]);

	// mount: find canvas and set pixel size / CSS size
	useEffect(() => {
		const c = document.getElementById(
			SUDOKU_BOARD_ID,
		) as HTMLCanvasElement | null;
		if (c) {
			// ensure high-DPI crispness
			c.width = SIDE_LENGTH;
			c.height = SIDE_LENGTH;
			c.style.width = "100%";
			c.style.height = "100%";
			setCanvas(c);
		}

		// keyboard input
		document.addEventListener("keydown", manageKeyboardInput);
		return () => {
			document.removeEventListener("keydown", manageKeyboardInput);
		};
	}, []);

	// redraw whenever canvas or selection changes
	useEffect(() => {
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		// ensure internal canvas pixel size remains
		ctx.canvas.width = SIDE_LENGTH;
		ctx.canvas.height = SIDE_LENGTH;
		printBoard(ctx, sudokuBoard);
		printData(ctx, sudokuBoard);
	}, [canvas, selected, sudokuBoard]);

	const manageKeyboardInput = (event: KeyboardEvent) => {
		const keyValue = Number(event.key);
		const selected = selectedRef.current;

		if (keyValue) {
			if (selected) {
				// Update the selected cell with the new value
				setSudokuBoard((prevBoard) => {
					prevBoard.board[selected.r][selected.c] = keyValue;
					return prevBoard;
				});
			}
		}
	};

	const handleCanvasClick = (ev: React.MouseEvent<HTMLCanvasElement>) => {
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		// account for CSS -> canvas pixels scale
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		const x = (ev.clientX - rect.left) * scaleX;
		const y = (ev.clientY - rect.top) * scaleY;
		const col = Math.floor((x - MARGIN) / CELL_SIDE);
		const row = Math.floor((y - MARGIN) / CELL_SIDE);

		if (col >= 0 && col < 9 && row >= 0 && row < 9) {
			setSelected((prev) =>
				prev && prev.r === row && prev.c === col ? null : { r: row, c: col },
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
					width: "80vmin",
					height: "80vmin",
					aspectRatio: 1,
				}}
			>
				<canvas id={SUDOKU_BOARD_ID} onClick={handleCanvasClick} />
			</Grid>
		</Grid>
	);
};
