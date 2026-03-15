import { CPUActionType } from "../context/actions";
import { useCPUContext } from "../context/context";

interface retrievePCResponse {
  data: string;
  setData: (PC: string) => void;
}

export const useRetrievePC = (): retrievePCResponse => {

  const { state, dispatch } = useCPUContext();

  const setPC = (PC: string) => {
    dispatch({
      type: CPUActionType.UPDATE_PC,
      payload: PC,
    })
  }

  return {
    data: state.PC,
    setData: setPC,
  }
}