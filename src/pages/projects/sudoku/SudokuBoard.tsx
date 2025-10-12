import React, { useEffect, useState } from "react";
import { Grid } from "../../../components/shared/Grid";
import palette from "../../../constants/Colors";
import { Board, TestBoard } from "./data";

const SUDOKU_BOARD_ID = "sudoku-board";
const SIDE_LENGTH =
	(window.innerHeight < window.innerWidth
		? window.innerHeight
		: window.innerWidth) * 0.8;
const MARGIN = 2;
const CELL_SIDE = (SIDE_LENGTH - MARGIN * 2) / 9;

export const SudokuBoard = () => {
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
	const [selected, setSelected] = useState<{ r: number; c: number } | null>(
		null,
	);

	const printBoard = (ctx: CanvasRenderingContext2D, data: Board) => {
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
		data.forEach((_row, idx) => {
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

	const printData = (ctx: CanvasRenderingContext2D, board: Board) => {
		ctx.font = "5vmin Arial";
		ctx.fillStyle = `${palette.light.white}DD`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		// Print each row
		board.forEach((row, rowIdx) => {
			row.forEach((value, valueIdx) => {
				ctx.fillText(
					`${value}`,
					MARGIN + CELL_SIDE * (valueIdx + 0.5),
					MARGIN + CELL_SIDE * (rowIdx + 0.5),
				);
			});
		});
	};

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
	}, []);

	// redraw whenever canvas or selection changes
	useEffect(() => {
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		// ensure internal canvas pixel size remains
		ctx.canvas.width = SIDE_LENGTH;
		ctx.canvas.height = SIDE_LENGTH;
		printBoard(ctx, TestBoard);
		printData(ctx, TestBoard);
	}, [canvas, selected]);

	// click handler -> map mouse position to cell index
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
