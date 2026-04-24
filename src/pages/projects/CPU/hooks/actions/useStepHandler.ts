import { useEffect } from "react";
import { useCPUContext } from "../../context/context";

export const useStepHandler = (handler: () => Promise<void>) => {
  const { coordinator: stepCoordinator } = useCPUContext();

  useEffect(() => {
    return stepCoordinator.registerStep(handler);
  }, [handler, stepCoordinator]);
};
