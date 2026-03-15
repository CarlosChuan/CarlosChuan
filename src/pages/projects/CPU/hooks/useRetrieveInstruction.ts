import { CPUActionType } from "../context/actions";
import { useCPUContext } from "../context/context";
import { Instruction } from "../domains/instruction/Instruction";

interface retrieveInstructionResponse {
  data: Instruction;
  setData: (instruction: Instruction) => void;
}

export const useRetrieveInstruction = (): retrieveInstructionResponse => {

  const { state, dispatch } = useCPUContext();

  const setInstruction = (instruction: Instruction) => {
    dispatch({
      type: CPUActionType.SET_INSTR,
      payload: instruction,
    })
  }

  return {
    data: state.instruction ?? Instruction.default(),
    setData: setInstruction,
  }
}