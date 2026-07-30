type RenderEnv = 'client' | 'server'
type HandoffState = 'pending' | 'complete'

class Env {
  current: RenderEnv = this.detect()
  handoffState: HandoffState = 'pending'
  currentId = 0

  set(env: RenderEnv): void {
    if (this.current === env) return

    this.handoffState = 'pending'
    this.currentId = 0
    this.current = env
  }

  reset(): void {
      throw new Error("STUB");
  }

  nextId() {
      throw new Error("STUB");
  }

  get isServer(): boolean {
      throw new Error("STUB");
  }

  get isClient(): boolean {
      throw new Error("STUB");
  }

  private detect(): RenderEnv {
      throw new Error("STUB");
  }

  handoff(): void {
    if (this.handoffState === 'pending') {
      this.handoffState = 'complete'
    }
  }

  get isHandoffComplete(): boolean {
      throw new Error("STUB");
  }
}

export let env = new Env()
