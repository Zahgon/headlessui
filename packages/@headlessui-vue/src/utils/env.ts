type RenderEnv = 'client' | 'server'

class Env {
  current: RenderEnv = this.detect()
  currentId = 0

  set(env: RenderEnv): void {
    if (this.current === env) return

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
}

export let env = new Env()
