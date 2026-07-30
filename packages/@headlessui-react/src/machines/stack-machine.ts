import { Machine } from '../machine'
import { DefaultMap } from '../utils/default-map'
import { match } from '../utils/match'

type Scope = string | null
type Id = string

interface State {
  stack: Id[]
}

export enum ActionTypes {
  Push,
  Pop,
}

export type Actions = { type: ActionTypes.Push; id: Id } | { type: ActionTypes.Pop; id: Id }

let reducers: {
  [P in ActionTypes]: (state: State, action: Extract<Actions, { type: P }>) => State
} = {
  [ActionTypes.Push](state, action) {
        throw new Error("STUB");
    },
  [ActionTypes.Pop](state, action) {
      throw new Error("STUB");
  },
}

class StackMachine extends Machine<State, Actions> {
  static new() {
    return new StackMachine({ stack: [] })
  }

  reduce(state: Readonly<State>, action: Actions): State {
      throw new Error("STUB");
  }

  actions = {
    push: (id: Id) => { throw new Error("STUB"); },
    pop: (id: Id) => { throw new Error("STUB"); },
  }

  selectors = {
    isTop: (state: State, id: Id) => { throw new Error("STUB"); },
    inStack: (state: State, id: Id) => { throw new Error("STUB"); },
  }
}

export const stackMachines = new DefaultMap<Scope, StackMachine>(() => { throw new Error("STUB"); })
