import { Grid } from "../../../../components/shared/Grid";
import { Text } from "../../../../components/shared/Text";
import palette from "../../../../constants/Colors";
import { bitToHex } from "../../../../helpers/strings";
import { ADD, Instruction, READ, WRITE } from "../domains/instruction/Instruction";
import { useRetrieveInstruction } from "../hooks/useRetrieveInstruction";
import { useRetrieveMemoryData } from "../hooks/useRetrieveMemoryData";
import { useRetrieveRegisterBank } from "../hooks/useRetrieveRegisterBank";
import { useStepHandler } from "../hooks/useStepHandler";

export const InstructionDecoder = () => {
  const { data: instruction } = useRetrieveInstruction();
  const { data: memoryData, setData: setMemoryData } = useRetrieveMemoryData();
  const { data: registerBank, setData: setRegisterBank } = useRetrieveRegisterBank();

  const lineText = (child: string) =>
    <Text style={{ color: palette.light.black, textAlign: "center", height: "1em", margin: 0, marginBottom: 4 }}>
      {child}
    </Text>;

  const paramsFromOp = (instr: Instruction) => {
    switch (instr.operation) {
      case 'nop':
        return null;
      case "add": {
        const params = instr.instructionObject as ADD;
        return (
          <>
            {lineText(`In A: ${bitToHex(params.inA, 6)}`)}
            {lineText(`In B: ${bitToHex(params.inB, 6)}`)}
            {lineText(`Out: ${bitToHex(params.out, 6)}`)}
          </>
        )
      }
      case "read": {
        const params = instr.instructionObject as READ;
        return (
          <>
            {lineText(`From: ${bitToHex(params.from, 8)}`)}
            {lineText(`To: ${bitToHex(params.to, 6)}`)}
          </>
        )
      }
      case "write": {
        const params = instr.instructionObject as WRITE;
        return (
          <>
            {lineText(`From: ${bitToHex(params.from, 6)}`)}
            {lineText(`To: ${bitToHex(params.to, 8)}`)}
          </>
        )
      }
    }
  }

  const readWriteHandler = () => {
    return new Promise<void>((resolve) => {
      if (!instruction || (instruction.operation !== "read" && instruction.operation !== "write")) {
        resolve();
        return;
      };
      switch (instruction.operation) {
        case "read": {
          const { type, ...params } = instruction.instructionObject as READ;
          const memoryCell = memoryData[parseInt(params.from, 2)];
          const registerCell = registerBank[parseInt(params.to, 2)];
          if (!memoryCell || !registerCell) {
            resolve();
            return;
          }
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
          if (!memoryCell || !registerCell) {
            resolve()
            return;
          };
          const newMemoryData = [...memoryData];
          newMemoryData[parseInt(params.to, 2)] = registerCell;
          setMemoryData(newMemoryData);
          resolve();
          return;
        }
      }
    })
  }

  useStepHandler(readWriteHandler);

  return (
    <Grid style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: palette.light.white, width: "fit-content", minWidth: "200px", height: "fit-content", maxHeight: "70vh" }}>
      <Text style={{ color: palette.light.black, textAlign: "center" }}>
        Instruction Decoder
      </Text>
      <Grid style={{ width: "fit-content", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: 10 }}>
        {lineText(`Instr: ${instruction.rawInstruction}`)}
        {lineText(`OP: ${instruction.operation}`)}
        {paramsFromOp(instruction)}
      </Grid>
    </Grid >
  )
}