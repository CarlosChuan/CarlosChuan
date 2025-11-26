import React, { useEffect, useRef } from "react";
import palette from "../../../../constants/Colors";
import { SudokuBoard } from "../../../../domains/sudoku/SudokuBoard";
import { Board } from "../../../../domains/sudoku/types";

const SUDOKU_BOARD_ID = "sudoku-board";
const SIDE_LENGTH =
	(window.innerHeight < window.innerWidth
		? window.innerHeight
		: window.innerWidth) * 0.8;
const MARGIN = 2;
const CELL_SIDE = (SIDE_LENGTH - MARGIN * 2) / 9;

type Props = {
	sudokuBoardRef: React.MutableRefObject<SudokuBoard>;
	selected: { row: number; col: number } | null;
	invalidMove: boolean;
	setSelected: React.Dispatch<
		React.SetStateAction<{ row: number; col: number } | null>
	>;
	solveIterator: Generator<Board> | null;
	setRepaintRef: (fn: () => void) => void;
};

export const BoardCanvas: React.FC<Props> = ({
	sudokuBoardRef,
	selected,
	invalidMove,
	setSelected,
	solveIterator,
	setRepaintRef,
}) => {
	const canvas = useRef<HTMLCanvasElement | null>(null);

	const paintCell = (
		ctx: CanvasRenderingContext2D,
		coord: { row: number; col: number },
		color: string,
	) => {
		const x = MARGIN + CELL_SIDE * coord.col;
		const y = MARGIN + CELL_SIDE * coord.row;
		ctx.fillStyle = color;
		ctx.fillRect(x, y, CELL_SIDE, CELL_SIDE);
	};

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
			const cellsToPaint = new Set<string>();

			for (let i = 0; i < 9; i++) {
				cellsToPaint.add(`${i}${selected.col}`);
				cellsToPaint.add(`${selected.row}${i}`);
			}

			const quadrantCoords = [
				Math.floor(selected.row / 3),
				Math.floor(selected.col / 3),
			];
			const quadrantCellsRange = {
				rows: [quadrantCoords[0] * 3, (quadrantCoords[0] + 1) * 3],
				cols: [quadrantCoords[1] * 3, (quadrantCoords[1] + 1) * 3],
			};

			for (
				let row = quadrantCellsRange.rows[0];
				row < quadrantCellsRange.rows[1];
				row++
			) {
				for (
					let col = quadrantCellsRange.cols[0];
					col < quadrantCellsRange.cols[1];
					col++
				) {
					cellsToPaint.add(`${row}${col}`);
				}
			}

			cellsToPaint.forEach((coord) => {
				const row = Number(coord[0]);
				const col = Number(coord[1]);
				paintCell(ctx, { row, col }, `${palette.light.primary20}20`);
			});

			paintCell(
				ctx,
				{ row: selected.row, col: selected.col },
				invalidMove
					? `${palette.light.error}88`
					: `${palette.light.primary20}88`,
			);

			const selectedValue = sudokuBoard.board[selected.row][selected.col];

			if (selectedValue) {
				const coords = sudokuBoard.board
					.flatMap((row, i) =>
						row.map((val, j) =>
							val === selectedValue ? { row: i, col: j } : null,
						),
					)
					.filter(Boolean) as { row: number; col: number }[];

				coords.forEach((coord) => {
					paintCell(ctx, coord, `${palette.light.primary00}88`);
				});
			}
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
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		sudokuBoard.board.forEach((row, rowIdx) => {
			row.forEach((value, colIdx) => {
				const isInitial = sudokuBoard.isInitialValue(rowIdx, colIdx);

				ctx.fillStyle = `${palette.light.white}DD`;

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

	const repaintCanvas = () => {
		if (!canvas.current) return;
		const ctx = canvas.current.getContext("2d");
		if (!ctx) return;

		ctx.canvas.width = SIDE_LENGTH;
		ctx.canvas.height = SIDE_LENGTH;
		ctx.canvas.style.width = "100%";
		ctx.canvas.style.height = "100%";
		printBoard(ctx, sudokuBoardRef.current);
		printData(ctx, sudokuBoardRef.current);
	};

	useEffect(() => {
		// expose repaint to parent
		setRepaintRef(repaintCanvas);
		// initial paint
		repaintCanvas();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected, invalidMove, sudokuBoardRef.current]);

	const handleCanvasClick = (ev: React.MouseEvent<HTMLCanvasElement>) => {
		if (!canvas.current || solveIterator) return;
		const rect = canvas.current.getBoundingClientRect();
		const scaleX = canvas.current.width / rect.width;
		const scaleY = canvas.current.height / rect.height;
		const x = (ev.clientX - rect.left) * scaleX;
		const y = (ev.clientY - rect.top) * scaleY;
		const col = Math.floor((x - MARGIN) / CELL_SIDE);
		const row = Math.floor((y - MARGIN) / CELL_SIDE);

		if (col >= 0 && col < 9 && row >= 0 && row < 9) {
			setSelected((prev) =>
				prev && prev.row === row && prev.col === col ? null : { row, col },
			);
		}
	};

	return (
		<canvas
			id={SUDOKU_BOARD_ID}
			ref={canvas}
			onClick={handleCanvasClick}
			style={{
				cursor: solveIterator ? "default" : "pointer",
				width: "100%",
				height: "100%",
			}}
		/>
	);
};

export default BoardCanvas;
