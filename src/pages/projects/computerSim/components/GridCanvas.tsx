import { useCallback, useEffect, useRef, useState } from "react";
import palette from "../../../../constants/Colors";

interface Position {
	x: number;
	y: number;
}

export const GridCanvas = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const moveValues = useRef<{
		initialDragPosition: Position;
		initialCameraPosition: Position;
	} | null>(null);
	const cameraPosition = useRef<Position>({ x: 0, y: 0 });

	const [canvaSize, setCameraArea] = useState({
		width: window.innerWidth,
		height: window.innerHeight - 64, // windowHeight - headerHeight
	});
	const [isMouseDown, setIsMouseDown] = useState(false);

	useEffect(() => {
		if (!canvasRef.current) return;
		initCanvas(canvasRef.current);
	});

	// START --- Event management ---

	const mouseMoveFunction = useCallback((event: MouseEvent) => {
		if (!moveValues.current) {
			moveValues.current = {
				initialDragPosition: {
					x: event.clientX,
					y: event.clientY,
				},
				initialCameraPosition: { ...cameraPosition.current },
			};
		} else {
			const { initialDragPosition, initialCameraPosition } = moveValues.current;
			const dragVector = {
				x: initialDragPosition.x - event.clientX,
				y: initialDragPosition.y - event.clientY,
			};

			cameraPosition.current = {
				x: initialCameraPosition.x + dragVector.x,
				y: initialCameraPosition.y + dragVector.y,
			};
			initCanvas(canvasRef.current!);
		}
	}, []);

	const mouseDownFunction = useCallback(() => {
		setIsMouseDown(true);
	}, []);

	const mouseUpFunction = useCallback(() => {
		setIsMouseDown(false);
	}, []);

	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;

		if (isMouseDown) {
			canvas.addEventListener("mousemove", mouseMoveFunction);
			canvas.style.cursor = "grabbing";
		} else {
			moveValues.current = null;
			canvas.removeEventListener("mousemove", mouseMoveFunction);
			canvas.style.cursor = "grab";
		}

		return () => {
			canvas.removeEventListener("mousemove", mouseMoveFunction);
		};
	}, [isMouseDown, mouseMoveFunction]);

	useEffect(() => {
		if (!canvasRef.current) return;
		initEvents(canvasRef.current);

		return () => {
			if (!canvasRef.current) return;
			clearEvents(canvasRef.current);
		};
	}, []);

	const initEvents = (canvas: HTMLCanvasElement) => {
		canvas.addEventListener("mousedown", mouseDownFunction);
		document.addEventListener("mouseup", mouseUpFunction);
	};

	const clearEvents = (canvas: HTMLCanvasElement) => {
		canvas.removeEventListener("mousedown", mouseDownFunction);
		document.removeEventListener("mouseup", mouseUpFunction);
	};

	// END --- Event management ---

	const getCoordinates = (wantedCoords: Position): Position => {
		return {
			x: wantedCoords.x + (canvaSize.width / 2 - cameraPosition.current.x),
			y: wantedCoords.y + (canvaSize.height / 2 - cameraPosition.current.y),
		};
	};

	const initCanvas = (canvas: HTMLCanvasElement) => {
		const ctx = canvas.getContext("2d");

		if (!ctx) return;

		ctx.canvas.width = canvaSize.width;
		ctx.canvas.height = canvaSize.height;
		ctx.canvas.style.width = "100%";
		ctx.canvas.style.height = "100%";

		ctx.clearRect(0, 0, canvaSize.width, canvaSize.height);

		ctx.lineWidth = 2;
		ctx.strokeStyle = palette.light.primary30;

		const rectCoord = getCoordinates({ x: 10, y: 10 });
		ctx.beginPath();
		ctx.rect(rectCoord.x, rectCoord.y, 10, 10);
		ctx.stroke();

		const relativeCenter = getCoordinates({ x: 0, y: 0 });
		ctx.beginPath();
		ctx.moveTo(0, relativeCenter.y);
		ctx.lineTo(canvaSize.width, relativeCenter.y);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(relativeCenter.x, 0);
		ctx.lineTo(relativeCenter.x, canvaSize.height);
		ctx.stroke();
	};

	return (
		<canvas
			ref={canvasRef}
			style={{ height: "100%", width: "100%", cursor: "grab" }}
		/>
	);
};
