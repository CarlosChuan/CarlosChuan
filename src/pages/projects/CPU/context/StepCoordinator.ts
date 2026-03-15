export class StepCoordinator {
  private handlers = new Set<() => Promise<void>>();

  register(handler: () => Promise<void>): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  async runAll(): Promise<void> {
    await Promise.all([...this.handlers].map((h) => h()));
  }
}
