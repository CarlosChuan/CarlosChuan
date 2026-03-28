import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { CPUActionType } from "../context/actions";
import { useCPUContext } from "../context/context";
import { MemoryCell } from "../domains/MemoryCell";

const RB_PATH = "/data/cpu/registerBank.json"

interface RetrieveRegisterBankResponse {
  data: MemoryCell[];
  isLoading: boolean;
  refetch: () => void;
  setData: (newData: MemoryCell[]) => void;
}

export const useRetrieveRegisterBank = (): RetrieveRegisterBankResponse => {
  const { state, dispatch } = useCPUContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["register_bank"],
    queryFn: async () => {
      try {
        const response = await fetch(RB_PATH);
        const jsonData = await response.json() as string[];
        if (!Array.isArray(jsonData)) {
          console.error("Register bank JSON must be an array");
          return [];
        }
        const data = jsonData.map((value, idx) => new MemoryCell(idx, value));
        return data;
      } catch (error) {
        console.error(error)
      }
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (data && data.map((val) => val.value.rawInt) !== state.registerBank.map((val) => val.value.rawInt)) {
      dispatch({
        type: CPUActionType.SET_REGBANK,
        payload: data,
      })
    }
  }, [data])

  const setData = (newData: MemoryCell[]) => {
    dispatch({
      type: CPUActionType.SET_REGBANK,
      payload: newData,
    })
  }

  return {
    data: state.registerBank,
    isLoading,
    refetch,
    setData,
  }
}