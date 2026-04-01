import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ADD } from "../domains/instruction/Instruction";
import { Signed8Int } from "../domains/Signed8Int";
import { useRetrieveInstruction } from "../hooks/useRetrieveInstruction";
import { useRetrieveRegisterBank } from "../hooks/useRetrieveRegisterBank";
import { useStepHandler } from "../hooks/useStepHandler";
import { useViewStyle } from "../hooks/useViewStyle";

const getOut = (inA: string, inB: string) =>
	(parseInt(inA, 2) + parseInt(inB, 2)).toString(2).padStart(8, "0");

const Widget = styled.div`
	display: flex;
	flex-direction: column;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 8px;
	overflow: hidden;
	width: fit-content;
	min-width: 200px;
`;

const WidgetHeader = styled.div`
	background: var(--color-surface-2);
	border-bottom: 1px solid var(--color-border);
	padding: 5px 12px;
	font-family: "Courier New", Courier, monospace;
	font-size: 0.68rem;
	letter-spacing: 1.8px;
	text-transform: uppercase;
	color: var(--color-text-muted);
`;

const WidgetBody = styled.div`
	padding: 6px 0 10px;
`;

const DataRow = styled.div`
	padding: 2px 12px;
	font-family: "Courier New", Courier, monospace;
	font-size: 0.8rem;
	color: var(--color-text);
	height: 1.4em;
`;

export const ALU = () => {
	const [inA, setInA] = useState<Signed8Int>(Signed8Int.default());
	const [inB, setInB] = useState<Signed8Int>(Signed8Int.default());
	const [out, setOut] = useState<Signed8Int>(Signed8Int.default());

	const { data: viewStyle } = useViewStyle();
	const { data: registerBank, setData: setRegisterBank } =
		useRetrieveRegisterBank();
	const { data: currInstruction } = useRetrieveInstruction();

	useEffect(() => {
		if (currInstruction.operation !== "add") return;
		const { type, ...currProps } =
			currInstruction.instructionObject as ADD;
		const regA = registerBank[parseInt(currProps.inA, 2)];
		const regB = registerBank[parseInt(currProps.inB, 2)];
		if (
			(regA && regA.value.rawInt !== inA.rawInt) ||
			(regB && regB.value.rawInt !== inB.rawInt)
		) {
			setInA(regA.value);
			setInB(regB.value);
		}
	}, [registerBank, currInstruction]);

	const stepHandler = () =>
		new Promise<void>((resolve) => {
			if (!currInstruction || currInstruction.operation !== "add") {
				resolve();
				return;
			}
			const { type, ...currProps } =
				currInstruction.instructionObject as ADD;
			const newRegisterBank = [...registerBank];
			const registerCell = newRegisterBank.find(
				(cell) => cell.addr === parseInt(currProps.out, 2),
			);
			if (registerCell) {
				registerCell.value = out;
				setRegisterBank(newRegisterBank);
			}
			resolve();
		});

	useStepHandler(stepHandler);

	useEffect(() => {
		setOut(new Signed8Int(getOut(inA.rawInt, inB.rawInt)));
	}, [inA, inB]);

	const display = useMemo(
		() =>
			viewStyle === "raw"
				? { a: inA.rawInt, b: inB.rawInt, o: out.rawInt }
				: { a: inA.readableInt, b: inB.readableInt, o: out.readableInt },
		[inA, inB, out, viewStyle],
	);

	return (
		<Widget>
			<WidgetHeader>ALU (adder)</WidgetHeader>
			<WidgetBody>
				<DataRow>A: {display.a}</DataRow>
				<DataRow>B: {display.b}</DataRow>
				<DataRow>→ {display.o}</DataRow>
			</WidgetBody>
		</Widget>
	);
};
