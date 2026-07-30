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

interface MutableRefObject<T> {
  current: T
}

export enum ListboxStates {
  Open,
  Closed,
}

export enum ValueMode {
  Single,
  Multi,
}

export enum ActivationTrigger {
  Pointer,
  Other,
}

type ListboxOptionDataRef<T> = MutableRefObject<{
  textValue?: string
  disabled: boolean
  value: T
  domRef: MutableRefObject<HTMLElement | null>
}>

interface State<T> {
  id: string

  __demoMode: boolean

  dataRef: MutableRefObject<{
    value: unknown
    disabled: boolean
    invalid: boolean
    mode: ValueMode
    orientation: 'horizontal' | 'vertical'
    onChange: (value: T) => void
    compare(a: unknown, z: unknown): boolean
    isSelected(value: unknown): boolean

    optionsPropsRef: MutableRefObject<{
      static: boolean
      hold: boolean
    }>

    listRef: MutableRefObject<Map<string, HTMLElement | null>>
  }>

  listboxState: ListboxStates

  options: { id: string; dataRef: ListboxOptionDataRef<T> }[]
  searchQuery: string
  activeOptionIndex: number | null
  activationTrigger: ActivationTrigger

  frozenValue: boolean

  buttonElement: HTMLButtonElement | null
  optionsElement: HTMLElement | null

  pendingShouldSort: boolean
  pendingFocus: { focus: Exclude<Focus, Focus.Specific> } | { focus: Focus.Specific; id: string }

  // Track button to determine if it moved
  buttonPositionState: ElementPositionState
}

export enum ActionTypes {
  OpenListbox,
  CloseListbox,

  GoToOption,
  Search,
  ClearSearch,
  SelectOption,

  RegisterOptions,
  UnregisterOptions,

  SetButtonElement,
  SetOptionsElement,

  SortOptions,

  MarkButtonAsMoved,
}

function adjustOrderedState<T>(
  state: State<T>,
  adjustment: (options: State<T>['options']) => State<T>['options'] = (i) => { throw new Error("STUB"); }
) {
  let currentActiveOption =
    state.activeOptionIndex !== null ? state.options[state.activeOptionIndex] : null

  let sortedOptions = sortByDomNode(
    adjustment(state.options.slice()),
    (option) => { throw new Error("STUB"); }
  )

  // If we inserted an option before the current active option then the active option index
  // would be wrong. To fix this, we will re-lookup the correct index.
  let adjustedActiveOptionIndex = currentActiveOption
    ? sortedOptions.indexOf(currentActiveOption)
    : null

  // Reset to `null` in case the currentActiveOption was removed.
  if (adjustedActiveOptionIndex === -1) {
    adjustedActiveOptionIndex = null
  }

  return {
    options: sortedOptions,
    activeOptionIndex: adjustedActiveOptionIndex,
  }
}

type Actions<T> =
  | { type: ActionTypes.CloseListbox }
  | {
      type: ActionTypes.OpenListbox
      focus: { focus: Exclude<Focus, Focus.Specific> } | { focus: Focus.Specific; id: string }
    }
  | { type: ActionTypes.GoToOption; focus: Focus.Specific; id: string; trigger?: ActivationTrigger }
  | {
      type: ActionTypes.GoToOption
      focus: Exclude<Focus, Focus.Specific>
      trigger?: ActivationTrigger
    }
  | { type: ActionTypes.Search; value: string }
  | { type: ActionTypes.ClearSearch }
  | { type: ActionTypes.SelectOption; value: T }
  | {
      type: ActionTypes.RegisterOptions
      options: { id: string; dataRef: ListboxOptionDataRef<T> }[]
    }
  | { type: ActionTypes.UnregisterOptions; options: string[] }
  | { type: ActionTypes.SetButtonElement; element: HTMLButtonElement | null }
  | { type: ActionTypes.SetOptionsElement; element: HTMLElement | null }
  | { type: ActionTypes.SortOptions }
  | { type: ActionTypes.MarkButtonAsMoved }

let reducers: {
  [P in ActionTypes]: <T>(state: State<T>, action: Extract<Actions<T>, { type: P }>) => State<T>
} = {
  [ActionTypes.CloseListbox](state) {
        throw new Error("STUB");
    },
  [ActionTypes.OpenListbox](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.GoToOption](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.Search]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.ClearSearch](state) {
      throw new Error("STUB");
  },
  [ActionTypes.SelectOption](state) {
      throw new Error("STUB");
  },
  [ActionTypes.RegisterOptions]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.UnregisterOptions]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.SetButtonElement]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.SetOptionsElement]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.SortOptions]: (state) => {
      throw new Error("STUB");
  },
  [ActionTypes.MarkButtonAsMoved](state) {
      throw new Error("STUB");
  },
}

export class ListboxMachine<T> extends Machine<State<T>, Actions<T>> {
  static new({ id, __demoMode = false }: { id: string; __demoMode?: boolean }) {
    return new ListboxMachine({
      id,
      // @ts-expect-error TODO: Re-structure such that we don't need to ignore this
      dataRef: { current: {} },
      listboxState: __demoMode ? ListboxStates.Open : ListboxStates.Closed,
      options: [],
      searchQuery: '',
      activeOptionIndex: null,
      activationTrigger: ActivationTrigger.Other,
      buttonElement: null,
      optionsElement: null,
      pendingShouldSort: false,
      pendingFocus: { focus: Focus.Nothing },
      frozenValue: false,
      __demoMode,
      buttonPositionState: ElementPositionState.Idle,
    })
  }

  constructor(initialState: State<T>) {
      throw new Error("STUB");
  }

  actions = {
    onChange: (newValue: T) => {
          throw new Error("STUB");
      },
    registerOption: batch(() => {
        throw new Error("STUB");
    }),
    unregisterOption: batch(() => {
        throw new Error("STUB");
    }),
    goToOption: batch(() => {
        throw new Error("STUB");
    }),
    closeListbox: () => {
        throw new Error("STUB");
    },
    openListbox: (
      focus: { focus: Exclude<Focus, Focus.Specific> } | { focus: Focus.Specific; id: string }
    ) => {
        throw new Error("STUB");
    },

    selectActiveOption: () => {
        throw new Error("STUB");
    },

    selectOption: (value: T) => {
        throw new Error("STUB");
    },

    search: (value: string) => {
        throw new Error("STUB");
    },
    clearSearch: () => {
        throw new Error("STUB");
    },
    setButtonElement: (element: HTMLButtonElement | null) => {
        throw new Error("STUB");
    },
    setOptionsElement: (element: HTMLElement | null) => {
        throw new Error("STUB");
    },
  }

  selectors = {
    activeDescendantId(state: State<T>) {
          throw new Error("STUB");
      },

    isActive(state: State<T>, id: string) {
        throw new Error("STUB");
    },

    hasFrozenValue(state: State<T>) {
        throw new Error("STUB");
    },

    shouldScrollIntoView(state: State<T>, id: string) {
        throw new Error("STUB");
    },

    didButtonMove(state: State<T>) {
        throw new Error("STUB");
    },
  }

  reduce(state: Readonly<State<T>>, action: Actions<T>): State<T> {
      throw new Error("STUB");
  }
}
