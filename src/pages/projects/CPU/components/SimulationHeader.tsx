import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { routes, ROUTES_DICT } from "../../../../constants/Routes";
import { useCPUContext } from "../context/context";
import { useRetrieveInstruction } from "../hooks/useRetrieveInstruction";
import { useRetrieveInstructionRegisters } from "../hooks/useRetrieveInstructionRegisters";
import { useRetrievePC } from "../hooks/useRetrievePC";
import { useViewStyle } from "../hooks/useViewStyle";

const Toolbar = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	height: 48px;
	background: var(--color-surface);
	border-bottom: 1px solid var(--color-border);
	gap: 12px;
	flex-shrink: 0;
`;

const ToolbarGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const ToolbarBtn = styled.button`
	cursor: pointer;
	padding: 5px 12px;
	border-radius: 6px;
	border: 1px solid var(--color-border);
	background: transparent;
	color: var(--color-text-muted);
	font-size: 0.8rem;
	font-family: "Courier New", Courier, monospace;
	letter-spacing: 0.3px;
	transition: background 120ms ease, border-color 120ms ease, color 120ms ease;

	&:hover {
		background: var(--color-primary-dim);
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
`;

const PlayBtn = styled.button`
	cursor: pointer;
	padding: 5px 14px;
	border-radius: 6px;
	border: none;
	background: var(--color-primary);
	color: #fff;
	font-size: 0.8rem;
	font-weight: 600;
	font-family: "Courier New", Courier, monospace;
	transition: opacity 120ms ease;

	&:hover {
		opacity: 0.85;
	}
`;

const ToggleCheckbox = styled.div<{ $active: boolean }>`
	width: 10px;
	height: 10px;
	border: 1px solid var(--color-border);
	border-radius: 2px;
	background: ${(p) =>
		p.$active ? "var(--color-primary)" : "transparent"};
	flex-shrink: 0;
	transition: background 120ms ease;
`;

const ToggleLabel = styled.span`
	font-size: 0.78rem;
	color: var(--color-text-muted);
	font-family: "Courier New", Courier, monospace;
	user-select: none;
	cursor: pointer;
`;

export const SimulationHeader = () => {
	const { stepCoordinator } = useCPUContext();
	const { data: instructionRegisters } = useRetrieveInstructionRegisters();
	const { data: PC, setData: setPC } = useRetrievePC();
	const { data: currInstruction, setData: setInstruction } =
		useRetrieveInstruction();
	const { data: viewStyle, setData: setViewStyle } = useViewStyle();

	const navigate = useNavigate();

	useEffect(() => {
		const instruction = instructionRegisters[parseInt(PC, 2)];
		if (!instruction || !currInstruction) return;
		if (instruction.rawInstruction !== currInstruction?.rawInstruction) {
			setInstruction(instruction);
		}
	}, [instructionRegisters, PC]);

	return (
		<Toolbar>
			<ToolbarGroup>
				<ToolbarBtn
					onClick={() => navigate(routes.getRoute(ROUTES_DICT.PROJECTS.CPU_SIM.IDE))}
				>
					IDE →
				</ToolbarBtn>
			</ToolbarGroup>

			<ToolbarGroup
				style={{ cursor: "pointer" }}
				onClick={() =>
					setViewStyle(viewStyle === "raw" ? "readable" : "raw")
				}
			>
				<ToggleCheckbox $active={viewStyle === "readable"} />
				<ToggleLabel>readable view</ToggleLabel>
			</ToolbarGroup>

			<ToolbarGroup>
				<ToolbarBtn>‹ prev</ToolbarBtn>
				<PlayBtn
					onClick={async () => {
						await stepCoordinator.runAll();
						const nextPC = (parseInt(PC, 2) + 1)
							.toString(2)
							.padStart(8, "0");
						setPC(nextPC);
					}}
				>
					▶ step
				</PlayBtn>
			</ToolbarGroup>
		</Toolbar>
	);
};
