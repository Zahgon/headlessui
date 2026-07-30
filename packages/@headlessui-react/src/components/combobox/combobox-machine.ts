import { Machine } from '../../machine'
import { ActionTypes as StackActionTypes, stackMachines } from '../../machines/stack-machine'
import type { EnsureArray } from '../../types'
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

export enum ComboboxState {
  Open,
  Closed,
}

export enum ValueMode {
  Single,
  Multi,
}

export enum ActivationTrigger {
  Pointer,
  Focus,
  Other,
}

export type ComboboxOptionDataRef<T> = MutableRefObject<{
  disabled: boolean
  value: T
  domRef: MutableRefObject<HTMLElement | null>
  order: number | null
}>

export interface State<T> {
  id: string

  dataRef: MutableRefObject<{
    value: unknown
    defaultValue: unknown
    disabled: boolean
    invalid: boolean
    mode: ValueMode
    immediate: boolean
    onChange: (value: T) => void
    onClose?: () => void
    compare(a: unknown, z: unknown): boolean
    isSelected(value: unknown): boolean

    virtual: { options: T[]; disabled: (value: T) => boolean } | null
    calculateIndex(value: unknown): number

    __demoMode: boolean

    optionsPropsRef: MutableRefObject<{
      static: boolean
      hold: boolean
    }>
  }>

  virtual: { options: T[]; disabled: (value: unknown) => boolean } | null

  comboboxState: ComboboxState

  defaultToFirstOption: boolean

  options: { id: string; dataRef: ComboboxOptionDataRef<T> }[]
  activeOptionIndex: number | null
  activationTrigger: ActivationTrigger

  isTyping: boolean

  inputElement: HTMLInputElement | null
  buttonElement: HTMLButtonElement | null
  optionsElement: HTMLElement | null

  // Track input to determine if it moved
  inputPositionState: ElementPositionState

  __demoMode: boolean
}

export enum ActionTypes {
  OpenCombobox,
  CloseCombobox,

  GoToOption,
  SetTyping,

  RegisterOption,
  UnregisterOption,

  DefaultToFirstOption,

  SetActivationTrigger,

  UpdateVirtualConfiguration,

  SetInputElement,
  SetButtonElement,
  SetOptionsElement,

  MarkInputAsMoved,
}

function adjustOrderedState<T>(
  state: State<T>,
  adjustment: (options: State<T>['options']) => State<T>['options'] = (i) => { throw new Error("STUB"); }
) {
  let currentActiveOption =
    state.activeOptionIndex !== null ? state.options[state.activeOptionIndex] : null

  let list = adjustment(state.options.slice())
  let sortedOptions =
    list.length > 0 && list[0].dataRef.current.order !== null
      ? // Prefer sorting based on the `order`
        list.sort((a, z) => { throw new Error("STUB"); })
      : // Fallback to much slower DOM order
        sortByDomNode(list, (option) => { throw new Error("STUB"); })

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
  | { type: ActionTypes.CloseCombobox }
  | { type: ActionTypes.OpenCombobox }
  | {
      type: ActionTypes.GoToOption
      focus: Focus.Specific
      idx: number
      trigger?: ActivationTrigger
    }
  | { type: ActionTypes.SetTyping; isTyping: boolean }
  | {
      type: ActionTypes.GoToOption
      focus: Exclude<Focus, Focus.Specific>
      trigger?: ActivationTrigger
    }
  | {
      type: ActionTypes.RegisterOption
      payload: { id: string; dataRef: ComboboxOptionDataRef<T> }
    }
  | { type: ActionTypes.UnregisterOption; id: string }
  | { type: ActionTypes.DefaultToFirstOption; value: boolean }
  | { type: ActionTypes.SetActivationTrigger; trigger: ActivationTrigger }
  | {
      type: ActionTypes.UpdateVirtualConfiguration
      options: T[]
      disabled: ((value: any) => boolean) | null
    }
  | { type: ActionTypes.SetInputElement; element: HTMLInputElement | null }
  | { type: ActionTypes.SetButtonElement; element: HTMLButtonElement | null }
  | { type: ActionTypes.SetOptionsElement; element: HTMLElement | null }
  | { type: ActionTypes.MarkInputAsMoved }

let reducers: {
  [P in ActionTypes]: <T>(state: State<T>, action: Extract<Actions<T>, { type: P }>) => State<T>
} = {
  [ActionTypes.CloseCombobox](state) {
        throw new Error("STUB");
    },
  [ActionTypes.OpenCombobox](state) {
      throw new Error("STUB");
  },
  [ActionTypes.SetTyping](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.GoToOption](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.RegisterOption]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.UnregisterOption]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.DefaultToFirstOption]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.SetActivationTrigger]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.UpdateVirtualConfiguration]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.SetInputElement]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.SetButtonElement]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.SetOptionsElement]: (state, action) => {
      throw new Error("STUB");
  },
  [ActionTypes.MarkInputAsMoved](state) {
      throw new Error("STUB");
  },
}

export class ComboboxMachine<T> extends Machine<State<T>, Actions<T>> {
  static new<T, TMultiple extends boolean | undefined>({
    id,
    virtual = null,
    __demoMode = false,
  }: {
    id: string
    virtual?: {
      options: TMultiple extends true ? EnsureArray<NoInfer<T>> : NoInfer<T>[]
      disabled?: (
        value: TMultiple extends true ? EnsureArray<NoInfer<T>>[number] : NoInfer<T>
      ) => boolean
    } | null
    __demoMode?: boolean
  }) {
    return new ComboboxMachine({
      id,
      // @ts-expect-error TODO: Re-structure such that we don't need to ignore this
      dataRef: { current: {} },
      comboboxState: __demoMode ? ComboboxState.Open : ComboboxState.Closed,
      isTyping: false,
      options: [],
      // @ts-expect-error TODO: Ensure we use the correct type
      virtual: virtual
        ? { options: virtual.options, disabled: virtual.disabled ?? (() => { throw new Error("STUB"); }) }
        : null,
      activeOptionIndex: null,
      activationTrigger: ActivationTrigger.Other,
      inputElement: null,
      buttonElement: null,
      optionsElement: null,
      __demoMode,
      inputPositionState: ElementPositionState.Idle,
    })
  }

  constructor(initialState: State<T>) {
      throw new Error("STUB");
  }

  actions = {
    onChange: (newValue: T) => {
          throw new Error("STUB");
      },
    registerOption: (id: string, dataRef: ComboboxOptionDataRef<T>) => {
        throw new Error("STUB");
    },
    goToOption: (
      focus: { focus: Focus.Specific; idx: number } | { focus: Exclude<Focus, Focus.Specific> },
      trigger?: ActivationTrigger
    ) => {
        throw new Error("STUB");
    },
    setIsTyping: (isTyping: boolean) => {
        throw new Error("STUB");
    },
    closeCombobox: () => {
        throw new Error("STUB");
    },
    openCombobox: () => {
        throw new Error("STUB");
    },
    setActivationTrigger: (trigger: ActivationTrigger) => {
        throw new Error("STUB");
    },
    selectActiveOption: () => {
        throw new Error("STUB");
    },
    setInputElement: (element: HTMLInputElement | null) => {
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
    activeDescendantId: (state: State<T>) => {
          throw new Error("STUB");
      },

    activeOptionIndex: (state: State<T>) => {
        throw new Error("STUB");
    },

    activeOption: (state: State<T>) => {
        throw new Error("STUB");
    },

    isActive: (state: State<T>, value: T, id: string) => {
        throw new Error("STUB");
    },

    shouldScrollIntoView: (state: State<T>, value: T, id: string): boolean => {
        throw new Error("STUB");
    },

    didInputMove(state: State<T>) {
        throw new Error("STUB");
    },
  }

  reduce(state: Readonly<State<T>>, action: Actions<T>): State<T> {
      throw new Error("STUB");
  }
}
