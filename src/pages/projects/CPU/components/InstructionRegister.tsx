import { useMemo } from "react";
import styled from "styled-components";
import { Widget } from "../../../../components/CPU/Widget";
import { numToHex } from "../../../../helpers/strings";
import { useViewStyle } from "../hooks/configuration/useViewStyle";
import { useRetrieveInstructionRegister } from "../hooks/data/useRetrieveInstructionRegisters";

const Row = styled.div<{ $last?: boolean }>`
	padding: 3px 12px;
	font-family: var(--font-mono);
	font-size: 0.8rem;
	color: var(--color-text);
	text-transform: uppercase;
	${(p) => !p.$last && `border-bottom: 1px solid var(--color-border-subtle);`}
`;

export const InstructionRegister = () => {
	const { data: viewStyle } = useViewStyle();
	const { data: instructionsRegister, isLoading } =
		useRetrieveInstructionRegister();

	const instructions = useMemo(() => instructionsRegister.instructions, [instructionsRegister])

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
		<Widget header={"Instruction Register"}>
			<>
				{isLoading && <Row $last>loading…</Row>}
				{rows.map((r) => (
					<Row key={r.key} $last={r.last}>
						{r.text}
					</Row>
				))}
			</>
		</Widget>
	);
};
