import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Instruction } from "../../domains/instruction/Instruction";
import { InstructionRegister } from "../../domains/instructionRegister/InstructionRegister";

const IR_PATH = "/data/cpu/instructionRegister.json"

interface RetrieveInstructionRegistersResponse {
  data: InstructionRegister;
  isLoading: boolean;
  refetch: () => void;
  setData: (instructionRegister: InstructionRegister) => void;
}

export const useRetrieveInstructionRegister = (): RetrieveInstructionRegistersResponse => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["instruction_register"],
    queryFn: async () => {
      try {
        const response = await fetch(IR_PATH);
        const jsonData = await response.json() as string[];
        if (!Array.isArray(jsonData)) {
          console.error("Register bank JSON must be an array");
          return InstructionRegister.default();
        }
        const instructions = jsonData.map((value) => new Instruction(value));

        return new InstructionRegister(instructions);
      } catch (error) {
        console.error(error)
        return InstructionRegister.default();
      }
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  })

  const setData = (instructionRegister: InstructionRegister) => {
    queryClient.setQueryData(["instruction_register"], instructionRegister);
  }


  return {
    data: data ?? InstructionRegister.default(),
    isLoading,
    refetch,
    setData,
  }
}