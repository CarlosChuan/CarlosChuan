import { useEffect } from "react";
import { useCPUContext } from "../../context/context";

export const useResetHandler = (handler: () => Promise<void>) => {
  const { coordinator: stepCoordinator } = useCPUContext();

  useEffect(() => {
    return stepCoordinator.registerReset(handler);
  }, [handler, stepCoordinator]);
};
