import styled from "styled-components";
import { bitToHex } from "../../../../helpers/strings";
import { ADD, Instruction, READ, WRITE } from "../domains/instruction/Instruction";
import { useRetrieveInstruction } from "../hooks/useRetrieveInstruction";
import { useRetrieveMemoryData } from "../hooks/useRetrieveMemoryData";
import { useRetrieveRegisterBank } from "../hooks/useRetrieveRegisterBank";
import { useStepHandler } from "../hooks/useStepHandler";

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

export const InstructionDecoder = () => {
	const { data: instruction } = useRetrieveInstruction();
	const { data: memoryData, setData: setMemoryData } = useRetrieveMemoryData();
	const { data: registerBank, setData: setRegisterBank } =
		useRetrieveRegisterBank();

	const row = (text: string) => <DataRow>{text}</DataRow>;

	const paramsFromOp = (instr: Instruction) => {
		switch (instr.operation) {
			case "nop":
				return null;
			case "add": {
				const params = instr.instructionObject as ADD;
				return (
					<>
						{row(`In A: ${bitToHex(params.inA, 6)}`)}
						{row(`In B: ${bitToHex(params.inB, 6)}`)}
						{row(`Out:  ${bitToHex(params.out, 6)}`)}
					</>
				);
			}
			case "read": {
				const params = instr.instructionObject as READ;
				return (
					<>
						{row(`From: ${bitToHex(params.from, 8)}`)}
						{row(`To:   ${bitToHex(params.to, 6)}`)}
					</>
				);
			}
			case "write": {
				const params = instr.instructionObject as WRITE;
				return (
					<>
						{row(`From: ${bitToHex(params.from, 6)}`)}
						{row(`To:   ${bitToHex(params.to, 8)}`)}
					</>
				);
			}
		}
	};

	const readWriteHandler = () =>
		new Promise<void>((resolve) => {
			if (
				!instruction ||
				(instruction.operation !== "read" &&
					instruction.operation !== "write")
			) {
				resolve();
				return;
			}
			switch (instruction.operation) {
				case "read": {
					const { type, ...params } = instruction.instructionObject as READ;
					const memoryCell = memoryData[parseInt(params.from, 2)];
					const registerCell = registerBank[parseInt(params.to, 2)];
					if (!memoryCell || !registerCell) { resolve(); return; }
					const newRegisterBank = [...registerBank];
					newRegisterBank[parseInt(params.to, 2)] = memoryCell;
					setRegisterBank(newRegisterBank);
					resolve();
					return;
				}
				case "write": {
					const { type, ...params } = instruction.instructionObject as WRITE;
					const registerCell = registerBank[parseInt(params.from, 2)];
					const memoryCell = memoryData[parseInt(params.to, 2)];
					if (!memoryCell || !registerCell) { resolve(); return; }
					const newMemoryData = [...memoryData];
					newMemoryData[parseInt(params.to, 2)] = registerCell;
					setMemoryData(newMemoryData);
					resolve();
					return;
				}
			}
		});

	useStepHandler(readWriteHandler);

	return (
		<Widget>
			<WidgetHeader>Instruction Decoder</WidgetHeader>
			<WidgetBody>
				{row(`Instr: ${instruction.rawInstruction}`)}
				{row(`OP:    ${instruction.operation}`)}
				{paramsFromOp(instruction)}
			</WidgetBody>
		</Widget>
	);
};
