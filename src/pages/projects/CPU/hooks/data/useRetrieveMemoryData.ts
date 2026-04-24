import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MemoryCell } from "../../domains/MemoryCell";
import { MemoryBlock } from "../../domains/memoryBlock/MemoryBock";

const MEMORY_PATH = "/data/cpu/memory.json"

interface RetrieveMemoryDataResponse {
  data: MemoryBlock;
  isLoading: boolean;
  refetch: () => void;
  setData: (newData: MemoryCell[]) => void;
}

export const useRetrieveMemoryData = (): RetrieveMemoryDataResponse => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["memory_data"],
    queryFn: async () => {
      try {
        const response = await fetch(MEMORY_PATH);
        const jsonData = await response.json() as string[];
        if (!Array.isArray(jsonData)) {
          console.error("Memory JSON must be an array");
          return new MemoryBlock([]);
        }
        const data = jsonData.map((value, idx) => new MemoryCell(idx ,value));
        const memoryBlock = new MemoryBlock(data);
        return memoryBlock;
      } catch (error) {
        console.error(error);
        return new MemoryBlock([]);
      }
    },
    initialData: new MemoryBlock([]),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })

  const setData = (newData: MemoryCell[]) => {
    const newMemoryBlock = new MemoryBlock(newData);
    queryClient.setQueryData(["memory_data"], newMemoryBlock);
  }

  return {
    data: data,
    isLoading,
    refetch,
    setData,
  }
}