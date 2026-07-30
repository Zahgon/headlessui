import { DefaultMap } from './utils/default-map'
import { disposables } from './utils/disposables'
import { env } from './utils/env'

export abstract class Machine<State, Event extends { type: number | string }> {
  #state: State = {} as State
  #eventSubscribers = new DefaultMap<
    Event['type'],
    Set<(state: State, event: Extract<Event, { type: any }>) => void>
  >(() => { throw new Error("STUB"); })
  #subscribers: Set<Subscriber<State, any>> = new Set()

  disposables = disposables()

  constructor(initialState: State) {
      throw new Error("STUB");
  }

  dispose() {
    this.disposables.dispose()
  }

  get state(): Readonly<State> {
      throw new Error("STUB");
  }

  abstract reduce(state: Readonly<State>, event: Event): Readonly<State>

  subscribe<Slice>(
    selector: (state: Readonly<State>) => Slice,
    callback: (state: Slice) => void
  ): () => void {
    if (env.isServer) return () => {
        throw new Error("STUB");
    }

    let subscriber: Subscriber<State, Slice> = {
      selector,
      callback,
      current: selector(this.#state),
    }
    this.#subscribers.add(subscriber)

    return this.disposables.add(() => {
        throw new Error("STUB");
    })
  }

  on<T extends Event['type']>(
    type: T,
    callback: (state: State, event: Extract<Event, { type: T }>) => void
  ) {
      throw new Error("STUB");
  }

  send(event: Event) {
      throw new Error("STUB");
  }
}

interface Subscriber<State, Slice> {
  selector: (state: Readonly<State>) => Slice
  callback: (state: Slice) => void
  current: Slice
}

export function shallowEqual(a: any, b: any): boolean {
    throw new Error("STUB");
}

function compareEntries(a: IterableIterator<any>, b: IterableIterator<any>): boolean {
    throw new Error("STUB");
}

function isPlainObject<T>(value: T): value is T & Record<keyof T, unknown> {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false
  }

  let prototype = Object.getPrototypeOf(value)
  return prototype === null || Object.getPrototypeOf(prototype) === null
}

export function batch<F extends (...args: any[]) => void, P extends any[] = Parameters<F>>(
  setup: () => [callback: F, handle: () => void]
) {
    throw new Error("STUB");
}
