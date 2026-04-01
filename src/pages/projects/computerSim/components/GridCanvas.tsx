import { useCallback, useEffect, useRef, useState } from "react";
import "../assets/styles/iconColors.css";
import wireNodeFalse from "../assets/svg/components/wire_node/wire_node_false.svg";
import wireNodeTrue from "../assets/svg/components/wire_node/wire_node_true.svg";
import { ComputerSimElement } from "../domains/ComputerSimElement";
import { Position } from "../domains/Position";
import { ValueSource } from "../domains/simComponents/ValueSource";

const SVG_SIZE = 50;

export const GridCanvas = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const moveValues = useRef<{
		initialDragPosition: Position;
		initialCameraPosition: Position;
	} | null>(null);
	const cameraPosition = useRef<Position>({ x: 0, y: 0 });
	const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

	const [canvaSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight - 64, // windowHeight - headerHeight
	});
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [simElements] = useState<ComputerSimElement[]>([
		new ValueSource({
			name: "test",
			inputs: [],
			outputs: [],
			position: { x: 0, y: 0 },
		}),
	]);

	useEffect(() => {
		if (!canvasRef.current) return;
		printCanvas(canvasRef.current);
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
			printCanvas(canvasRef.current!);
		}
	}, []);

	const mouseDownFunction = useCallback(() => {
		setIsMouseDown(true);
	}, []);

	const mouseUpFunction = useCallback(() => {
		setIsMouseDown(false);
	}, []);

	const clickFunction = useCallback((event: MouseEvent) => {
		const relativeClickPosition = {
			x:
				event.offsetX +
				cameraPosition.current.x -
				(canvasRef.current?.width ?? 0) / 2,
			y:
				event.offsetY +
				cameraPosition.current.y -
				(canvasRef.current?.height ?? 0) / 2,
		};

		// Trigger inner click function and rerender if any returns true.
		const elementsClicked = simElements
			.map((element) =>
				element.position.x < relativeClickPosition.x &&
					element.position.x + SVG_SIZE > relativeClickPosition.x &&
					element.position.y < relativeClickPosition.y &&
					element.position.y + SVG_SIZE > relativeClickPosition.y
					? element
					: null,
			)
			.filter((element) => !!element);

		const elementsToReRender = elementsClicked
			.map((element) => element.onClick())
			.filter((element) => !!element);

		if (elementsToReRender.length > 0 && canvasRef.current) {
			printCanvas(canvasRef.current);
		}
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
			canvas.style.cursor = "default";
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
		canvas.addEventListener("click", clickFunction);
	};

	const clearEvents = (canvas: HTMLCanvasElement) => {
		canvas.removeEventListener("mousedown", mouseDownFunction);
		document.removeEventListener("mouseup", mouseUpFunction);
		canvas.removeEventListener("click", clickFunction);
	};

	// END --- Event management ---

	useEffect(() => {
		// Init global images
		getImage(wireNodeTrue);
		getImage(wireNodeFalse);
	}, []);

	const getCoordinates = (wantedCoords: Position): Position => {
		return {
			x: wantedCoords.x + (canvaSize.width / 2 - cameraPosition.current.x),
			y: wantedCoords.y + (canvaSize.height / 2 - cameraPosition.current.y),
		};
	};

	const printCanvas = (canvas: HTMLCanvasElement) => {
		const ctx = canvas.getContext("2d");

		if (!ctx) return;

		ctx.canvas.width = canvaSize.width;
		ctx.canvas.height = canvaSize.height;
		ctx.canvas.style.width = "100%";
		ctx.canvas.style.height = "100%";

		ctx.clearRect(0, 0, canvaSize.width, canvaSize.height);

		printElements(ctx);
	};

	const printElements = (ctx: CanvasRenderingContext2D) => {
		simElements.forEach((element) => {
			const { svgSrc } = element.getCanvaElement();

			const { img } = getImage(svgSrc);

			const position = getCoordinates(element.position);
			ctx.drawImage(img!, position.x, position.y, SVG_SIZE, SVG_SIZE);

			const { img: wireNodeTrueImg } = getImage(wireNodeTrue);
			const { img: wireNodeFalseImg } = getImage(wireNodeFalse);

			if (element.outputs.length > 0) {
				const dividedHeight = SVG_SIZE / element.outputs.length;
				element.outputs.forEach((output, idx) => {
					const outputPosition = getCoordinates({
						x: element.position.x + SVG_SIZE,
						y: element.position.y + dividedHeight * idx,
					});
					ctx.drawImage(
						output.value ? wireNodeTrueImg : wireNodeFalseImg,
						outputPosition.x,
						outputPosition.y,
						10,
						10,
					);
				});
			}
		});
	};

	const getImage = (
		imgSrc: string,
	): { img: HTMLImageElement; new: boolean } => {
		let img = imageCache.current.get(imgSrc);

		if (!img) {
			// Create and cache the image if not already loaded
			img = new Image();
			img.onload = () => {
				// Store in cache once loaded
				imageCache.current.set(imgSrc, img!);
			};
			img.src = imgSrc;
			return { img, new: true };
		}
		return { img, new: false };
	};

	return (
		<canvas
			ref={canvasRef}
			style={{ height: "100%", width: "100%", cursor: "grab" }}
		/>
	);
};
