import { useQuery } from "@tanstack/react-query";
import { Instruction } from "../domains/instruction/Instruction";

const IR_PATH = "/data/cpu/instructionRegister.json"

interface RetrieveInstructionRegistersResponse {
  data: Instruction[];
  isLoading: boolean;
  refetch: () => void;
}

export const useRetrieveInstructionRegisters = (): RetrieveInstructionRegistersResponse => {

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["instruction_register"],
    queryFn: async () => {
      try {
        const response = await fetch(IR_PATH);
        const jsonData = await response.json() as string[];
        if (!Array.isArray(jsonData)) {
          console.error("Register bank JSON must be an array");
          return [];
        }
        const data = jsonData.map((value) => new Instruction(value));
        return data;
      } catch (error) {
        console.error(error)
        return [];
      }
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })

  return {
    data: data ?? [],
    isLoading,
    refetch,
  }
}