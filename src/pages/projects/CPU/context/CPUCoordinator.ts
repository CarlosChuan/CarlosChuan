export class CPUCoordinator {
  private stepHandlers = new Set<() => Promise<void>>();
  private resetHandlers = new Set<() => Promise<void>>();

  registerStep(handler: () => Promise<void>): () => void {
    this.stepHandlers.add(handler);
    return () => this.stepHandlers.delete(handler);
  }

  registerReset(handler: () => Promise<void>): () => void {
    this.resetHandlers.add(handler);
    return () => this.resetHandlers.delete(handler);
  }

  async runAll(): Promise<void> {
    await Promise.all([...this.stepHandlers].map((h) => h()));
  }

  async resetAll(): Promise<void> {
    await Promise.all([...this.resetHandlers].map((h) => h()));
  }
}
