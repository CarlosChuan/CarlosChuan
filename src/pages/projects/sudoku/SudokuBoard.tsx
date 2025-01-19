import { useEffect, useState } from "react";
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

	const printBoard = (ctx: CanvasRenderingContext2D, data: Board) => {
		ctx.clearRect(0, 0, SIDE_LENGTH, SIDE_LENGTH);

		ctx.fillStyle = "transparent";
		ctx.fillRect(0, 0, SIDE_LENGTH, SIDE_LENGTH);

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

		// Print table
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

	useEffect(() => {
		const canvas = document.getElementById(
			SUDOKU_BOARD_ID,
		) as HTMLCanvasElement | null;
		setCanvas(canvas);
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.canvas.width = SIDE_LENGTH;
				ctx.canvas.height = SIDE_LENGTH;
				printBoard(ctx, TestBoard);
				printData(ctx, TestBoard);
			}
		}
	}, []);

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
				<canvas id={SUDOKU_BOARD_ID} />
			</Grid>
		</Grid>
	);
};
