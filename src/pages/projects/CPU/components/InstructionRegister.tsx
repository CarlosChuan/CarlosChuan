import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { numToHex } from "../../../../helpers/strings";
import { Instruction } from "../domains/instruction/Instruction";
import { useRetrieveInstructionRegisters } from "../hooks/useRetrieveInstructionRegisters";
import { useViewStyle } from "../hooks/useViewStyle";

const Widget = styled.div`
	display: flex;
	flex-direction: column;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 8px;
	overflow: hidden;
	width: fit-content;
	min-width: 200px;
	max-height: 70vh;
`;

const WidgetHeader = styled.div`
	background: var(--color-surface-2);
	border-bottom: 1px solid var(--color-border);
	padding: 5px 12px;
	font-family: var(--font-mono);
	font-size: 0.68rem;
	letter-spacing: 1.8px;
	text-transform: uppercase;
	color: var(--color-text-muted);
`;

const WidgetBody = styled.div`
	overflow-y: auto;
	padding: 4px 0;
`;

const Row = styled.div<{ $last?: boolean }>`
	padding: 3px 12px;
	font-family: var(--font-mono);
	font-size: 0.8rem;
	color: var(--color-text);
	text-transform: uppercase;
	${(p) => !p.$last && `border-bottom: 1px solid var(--color-border-subtle);`}
`;

export const InstructionRegister = () => {
	const [instructions, setInstructions] = useState<Instruction[]>([]);
	const { data: viewStyle } = useViewStyle();
	const { data: instructionRegister, isLoading } =
		useRetrieveInstructionRegisters();

	useEffect(() => {
		if (instructionRegister && instructionRegister !== instructions) {
			setInstructions(instructionRegister);
		}
	}, [instructionRegister]);

	const rows = useMemo(
		() =>
			instructions.map((instruction, idx) => ({
				key: `ir-${viewStyle}-${idx}`,
				text: `${numToHex(idx, instructions.length)}: ${viewStyle === "raw" ? instruction.rawInstruction : instruction.readableInstruction}`,
				last: idx === instructions.length - 1,
			})),
		[instructions, viewStyle],
	);

	return (
		<Widget>
			<WidgetHeader>Instruction Register</WidgetHeader>
			<WidgetBody>
				{isLoading && <Row $last>loading…</Row>}
				{rows.map((r) => (
					<Row key={r.key} $last={r.last}>
						{r.text}
					</Row>
				))}
			</WidgetBody>
		</Widget>
	);
};
