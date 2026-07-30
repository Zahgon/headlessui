import { type MouseEventHandler } from 'react'
import { Machine } from '../../machine'
import { stackMachines } from '../../machines/stack-machine'
import * as DOM from '../../utils/dom'
import { getFocusableElements } from '../../utils/focus-management'
import { match } from '../../utils/match'
import { getOwnerDocument } from '../../utils/owner'

type MouseEvent<T> = Parameters<MouseEventHandler<T>>[0]

export enum PopoverStates {
  Open,
  Closed,
}

interface State {
  id: string

  popoverState: PopoverStates

  buttons: { current: Symbol[] }

  button: HTMLElement | null
  buttonId: string | null
  panel: HTMLElement | null
  panelId: string | null

  beforePanelSentinel: { current: HTMLButtonElement | null }
  afterPanelSentinel: { current: HTMLButtonElement | null }
  afterButtonSentinel: { current: HTMLButtonElement | null }

  __demoMode: boolean
}

export enum ActionTypes {
  OpenPopover,
  ClosePopover,

  SetButton,
  SetButtonId,
  SetPanel,
  SetPanelId,
}

export type Actions =
  | { type: ActionTypes.OpenPopover }
  | { type: ActionTypes.ClosePopover }
  | { type: ActionTypes.SetButton; button: HTMLElement | null }
  | { type: ActionTypes.SetButtonId; buttonId: string | null }
  | { type: ActionTypes.SetPanel; panel: HTMLElement | null }
  | { type: ActionTypes.SetPanelId; panelId: string | null }

let reducers: {
  [P in ActionTypes]: (state: State, action: Extract<Actions, { type: P }>) => State
} = {
  [ActionTypes.OpenPopover]: (state) => {
        throw new Error("STUB");
    },
  [ActionTypes.ClosePopover](state) {
      throw new Error("STUB");
  },
  [ActionTypes.SetButton](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.SetButtonId](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.SetPanel](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.SetPanelId](state, action) {
      throw new Error("STUB");
  },
}

export class PopoverMachine extends Machine<State, Actions> {
  static new({ id, __demoMode = false }: { id: string; __demoMode?: boolean }) {
    return new PopoverMachine({
      id,
      __demoMode,
      popoverState: __demoMode ? PopoverStates.Open : PopoverStates.Closed,
      buttons: { current: [] },
      button: null,
      buttonId: null,
      panel: null,
      panelId: null,
      beforePanelSentinel: { current: null },
      afterPanelSentinel: { current: null },
      afterButtonSentinel: { current: null },
    })
  }

  constructor(initialState: State) {
      throw new Error("STUB");
  }

  reduce(state: Readonly<State>, action: Actions): State {
      throw new Error("STUB");
  }

  actions = {
    close: () => { throw new Error("STUB"); },
    refocusableClose: (
      focusableElement?: HTMLElement | { current: HTMLElement | null } | MouseEvent<HTMLElement>
    ) => {
        throw new Error("STUB");
    },
    open: () => { throw new Error("STUB"); },
    setButtonId: (id: string | null) => { throw new Error("STUB"); },
    setButton: (button: HTMLElement | null) => { throw new Error("STUB"); },
    setPanelId: (id: string | null) => { throw new Error("STUB"); },
    setPanel: (panel: HTMLElement | null) => { throw new Error("STUB"); },
  }

  selectors = {
    isPortalled: (state: State) => {
          throw new Error("STUB");
      },
  }
}
