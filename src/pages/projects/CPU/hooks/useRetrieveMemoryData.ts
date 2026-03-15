import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { CPUActionType } from "../context/actions";
import { useCPUContext } from "../context/context";
import { Signed8Int } from "../domains/Signed8Int";

const MEMORY_PATH = "/data/cpu/memory.json"

interface RetrieveMemoryDataResponse {
  data: Signed8Int[];
  isLoading: boolean;
  refetch: () => void;
  setData: (newData: Signed8Int[]) => void;
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
        const data = jsonData.map((value) => new Signed8Int(value));
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
    if (data && data.map((val) => val.rawInt) !== state.memory.map((val) => val.rawInt)) {
      dispatch({
        type: CPUActionType.SET_MEMORY,
        payload: data,
      })
    }
  }, [data])

  const setData = (newData: Signed8Int[]) => {
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