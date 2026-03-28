import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { CPUActionType } from "../context/actions";
import { useCPUContext } from "../context/context";
import { MemoryCell } from "../domains/MemoryCell";

const MEMORY_PATH = "/data/cpu/memory.json"

interface RetrieveMemoryDataResponse {
  data: MemoryCell[];
  isLoading: boolean;
  refetch: () => void;
  setData: (newData: MemoryCell[]) => void;
}

export const useRetrieveMemoryData = (): RetrieveMemoryDataResponse => {
  const { state, dispatch } = useCPUContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["memory_data"],
    queryFn: async () => {
      try {
        const response = await fetch(MEMORY_PATH);
        const jsonData = await response.json() as string[];
        if (!Array.isArray(jsonData)) {
          console.error("Memory JSON must be an array");
          return [];
        }
        const data = jsonData.map((value, idx) => new MemoryCell(idx ,value));
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
    if (data && data.map((val) => val.value.rawInt) !== state.memory.map((val) => val.value.rawInt)) {
      dispatch({
        type: CPUActionType.SET_MEMORY,
        payload: data,
      })
    }
  }, [data])

  const setData = (newData: MemoryCell[]) => {
    dispatch({
      type: CPUActionType.SET_MEMORY,
      payload: newData,
    })
  }

  return {
    data: state.memory,
    isLoading,
    refetch,
    setData,
  }
}