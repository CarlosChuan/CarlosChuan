import styled from "styled-components";
import { Widget } from "../../../../components/CPU/Widget";
import { bitToHex } from "../../../../helpers/strings";
import { ADD, Instruction, READ, WRITE } from "../domains/instruction/Instruction";
import { useStepHandler } from "../hooks/actions/useStepHandler";
import { useRetrieveCurrentInstruction } from "../hooks/data/useRetrieveInstruction";
import { useRetrieveMemoryData } from "../hooks/data/useRetrieveMemoryData";
import { useRetrieveRegisterBank } from "../hooks/data/useRetrieveRegisterBank";

const DataRow = styled.div`
	padding: 2px 12px;
	font-family: var(--font-mono);
	font-size: 0.8rem;
	color: var(--color-text);
	height: 1.4em;
`;

export const InstructionDecoder = () => {
	const { data: instruction } = useRetrieveCurrentInstruction();
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
		<Widget header={"Instruction Decoder"}>
			<>
				{row(`Instr: ${instruction.rawInstruction}`)}
				{row(`OP:    ${instruction.operation}`)}
				{paramsFromOp(instruction)}
			</>
		</Widget >
	);
};
