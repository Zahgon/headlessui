import { Machine, batch } from '../../machine'
import { ActionTypes as StackActionTypes, stackMachines } from '../../machines/stack-machine'
import { Focus, calculateActiveIndex } from '../../utils/calculate-active-index'
import {
  ElementPositionState,
  computeVisualPosition,
  detectMovement,
} from '../../utils/element-movement'
import { sortByDomNode } from '../../utils/focus-management'
import { match } from '../../utils/match'

export enum MenuState {
  Open,
  Closed,
}

export enum ActivationTrigger {
  Pointer,
  Other,
}

export type MenuItemDataRef = {
  current: {
    textValue?: string
    disabled: boolean
    domRef: { current: HTMLElement | null }
  }
}

export interface State {
  id: string

  __demoMode: boolean
  menuState: MenuState

  buttonElement: HTMLButtonElement | null
  itemsElement: HTMLElement | null

  items: { id: string; dataRef: MenuItemDataRef }[]
  searchQuery: string
  activeItemIndex: number | null
  activationTrigger: ActivationTrigger

  pendingShouldSort: boolean
  pendingFocus: { focus: Exclude<Focus, Focus.Specific> } | { focus: Focus.Specific; id: string }

  // Track button to determine if it moved
  buttonPositionState: ElementPositionState
}

export enum ActionTypes {
  OpenMenu,
  CloseMenu,

  GoToItem,
  Search,
  ClearSearch,
  RegisterItems,
  UnregisterItems,

  SetButtonElement,
  SetItemsElement,

  SortItems,

  MarkButtonAsMoved,
}

function adjustOrderedState(
  state: State,
  adjustment: (items: State['items']) => State['items'] = (i) => { throw new Error("STUB"); }
) {
  let currentActiveItem = state.activeItemIndex !== null ? state.items[state.activeItemIndex] : null

  let sortedItems = sortByDomNode(
    adjustment(state.items.slice()),
    (item) => { throw new Error("STUB"); }
  )

  // If we inserted an item before the current active item then the active item index
  // would be wrong. To fix this, we will re-lookup the correct index.
  let adjustedActiveItemIndex = currentActiveItem ? sortedItems.indexOf(currentActiveItem) : null

  // Reset to `null` in case the currentActiveItem was removed.
  if (adjustedActiveItemIndex === -1) {
    adjustedActiveItemIndex = null
  }

  return {
    items: sortedItems,
    activeItemIndex: adjustedActiveItemIndex,
  }
}

export type Actions =
  | { type: ActionTypes.CloseMenu }
  | {
      type: ActionTypes.OpenMenu
      focus: { focus: Exclude<Focus, Focus.Specific> } | { focus: Focus.Specific; id: string }
      trigger?: ActivationTrigger
    }
  | { type: ActionTypes.GoToItem; focus: Focus.Specific; id: string; trigger?: ActivationTrigger }
  | {
      type: ActionTypes.GoToItem
      focus: Exclude<Focus, Focus.Specific>
      trigger?: ActivationTrigger
    }
  | { type: ActionTypes.Search; value: string }
  | { type: ActionTypes.ClearSearch }
  | { type: ActionTypes.RegisterItems; items: { id: string; dataRef: MenuItemDataRef }[] }
  | { type: ActionTypes.UnregisterItems; items: string[] }
  | { type: ActionTypes.SetButtonElement; element: HTMLButtonElement | null }
  | { type: ActionTypes.SetItemsElement; element: HTMLElement | null }
  | { type: ActionTypes.SortItems }
  | { type: ActionTypes.MarkButtonAsMoved }

let reducers: {
  [P in ActionTypes]: (state: State, action: Extract<Actions, { type: P }>) => State
} = {
  [ActionTypes.CloseMenu](state) {
        throw new Error("STUB");
    },
  [ActionTypes.OpenMenu](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.GoToItem]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.Search]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.ClearSearch](state) {
      throw new Error("STUB");
  },
  [ActionTypes.RegisterItems]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.UnregisterItems]: (state, action) => {
      throw new Error("STUB");
  },

  [ActionTypes.SetButtonElement]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.SetItemsElement]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.SortItems]: (state) => {
      throw new Error("STUB");
  },
  [ActionTypes.MarkButtonAsMoved](state) {
      throw new Error("STUB");
  },
}

export class MenuMachine extends Machine<State, Actions> {
  static new({ id, __demoMode = false }: { id: string; __demoMode?: boolean }) {
    return new MenuMachine({
      id,
      __demoMode,
      menuState: __demoMode ? MenuState.Open : MenuState.Closed,
      buttonElement: null,
      itemsElement: null,
      items: [],
      searchQuery: '',
      activeItemIndex: null,
      activationTrigger: ActivationTrigger.Other,
      pendingShouldSort: false,
      pendingFocus: { focus: Focus.Nothing },
      buttonPositionState: ElementPositionState.Idle,
    })
  }

  constructor(initialState: State) {
      throw new Error("STUB");
  }

  reduce(state: Readonly<State>, action: Actions): State {
      throw new Error("STUB");
  }

  actions = {
    // Batched version to register multiple items at the same time
    registerItem: batch(() => {
        throw new Error("STUB");
    }),
    unregisterItem: batch(() => {
        throw new Error("STUB");
    }),
  }

  selectors = {
    activeDescendantId(state: State) {
          throw new Error("STUB");
      },

    isActive(state: State, id: string) {
        throw new Error("STUB");
    },

    shouldScrollIntoView(state: State, id: string) {
        throw new Error("STUB");
    },

    didButtonMove(state: State) {
        throw new Error("STUB");
    },
  }
}
