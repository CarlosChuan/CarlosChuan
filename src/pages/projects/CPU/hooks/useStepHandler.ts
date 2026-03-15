import { useEffect } from "react";
import { useCPUContext } from "../context/context";

export const useStepHandler = (handler: () => Promise<void>) => {
  const { stepCoordinator } = useCPUContext();

  useEffect(() => {
    return stepCoordinator.register(handler);
  }, [handler, stepCoordinator]);
};
