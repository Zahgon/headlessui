import type { Virtualizer } from '@tanstack/virtual-core'
import { useVirtualizer } from '@tanstack/vue-virtual'
import {
  Fragment,
  cloneVNode,
  computed,
  defineComponent,
  h,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  toRaw,
  watch,
  watchEffect,
  type ComputedRef,
  type InjectionKey,
  type PropType,
  type Ref,
  type UnwrapNestedRefs,
} from 'vue'
import { useControllable } from '../../hooks/use-controllable'
import { useFrameDebounce } from '../../hooks/use-frame-debounce'
import { useId } from '../../hooks/use-id'
import { useOutsideClick } from '../../hooks/use-outside-click'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import { useTrackedPointer } from '../../hooks/use-tracked-pointer'
import { useTreeWalker } from '../../hooks/use-tree-walker'
import { Hidden, Features as HiddenFeatures } from '../../internal/hidden'
import { State, useOpenClosed, useOpenClosedProvider } from '../../internal/open-closed'
import { Keys } from '../../keyboard'
import { MouseButton } from '../../mouse'
import { history } from '../../utils/active-element-history'
import { Focus, calculateActiveIndex } from '../../utils/calculate-active-index'
import { disposables } from '../../utils/disposables'
import { dom } from '../../utils/dom'
import { sortByDomNode } from '../../utils/focus-management'
import { objectToFormEntries } from '../../utils/form'
import { match } from '../../utils/match'
import { getOwnerDocument } from '../../utils/owner'
import { isMobile } from '../../utils/platform'
import { Features, compact, omit, render } from '../../utils/render'

function defaultComparator<T>(a: T, z: T): boolean {
  return a === z
}

enum ComboboxStates {
  Open,
  Closed,
}

enum ValueMode {
  Single,
  Multi,
}

enum ActivationTrigger {
  Pointer,
  Focus,
  Other,
}

type ComboboxOptionData = {
  disabled: boolean
  value: unknown
  domRef: Ref<HTMLElement | null>
  order: Ref<number | null>
}
type StateDefinition = {
  // State
  comboboxState: Ref<ComboboxStates>
  value: ComputedRef<unknown>
  defaultValue: ComputedRef<unknown>

  mode: ComputedRef<ValueMode>
  nullable: ComputedRef<boolean>
  immediate: ComputedRef<boolean>

  virtual: ComputedRef<{
    options: unknown[]
    disabled: (value: unknown) => boolean
  } | null>
  calculateIndex(value: unknown): number
  isSelected(value: unknown): boolean
  isActive(value: unknown): boolean

  compare: (a: unknown, z: unknown) => boolean

  optionsPropsRef: Ref<{ static: boolean; hold: boolean }>

  labelRef: Ref<HTMLLabelElement | null>
  inputRef: Ref<HTMLInputElement | null>
  buttonRef: Ref<HTMLButtonElement | null>
  optionsRef: Ref<HTMLDivElement | null>

  disabled: Ref<boolean>
  options: Ref<{ id: string; dataRef: ComputedRef<ComboboxOptionData> }[]>
  activeOptionIndex: Ref<number | null>
  activationTrigger: Ref<ActivationTrigger>

  // State mutators
  closeCombobox(): void
  openCombobox(): void
  setActivationTrigger(trigger: ActivationTrigger): void
  goToOption(focus: Focus, idx?: number, trigger?: ActivationTrigger): void
  change(value: unknown): void
  selectOption(id: string): void
  selectActiveOption(): void
  registerOption(id: string, dataRef: ComputedRef<ComboboxOptionData>): void
  unregisterOption(id: string, active: boolean): void
  select(value: unknown): void
}

let ComboboxContext = Symbol('ComboboxContext') as InjectionKey<StateDefinition>

function useComboboxContext(component: string) {
  let context = inject(ComboboxContext, null)

  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Combobox /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, useComboboxContext)
    throw err
  }

  return context
}

// ---

let VirtualContext = Symbol('VirtualContext') as InjectionKey<Ref<Virtualizer<any, any>> | null>

let VirtualProvider = defineComponent({
  name: 'VirtualProvider',
  setup(_, { slots }) {
      throw new Error("STUB");
  },
})

// ---

export let Combobox = defineComponent({
  name: 'Combobox',
  emits: { 'update:modelValue': (_value: any) => { throw new Error("STUB"); } },
  props: {
    as: { type: [Object, String], default: 'template' },
    disabled: { type: [Boolean], default: false },
    by: { type: [String, Function], nullable: true, default: null },
    modelValue: {
      type: [Object, String, Number, Boolean] as PropType<
        object | string | number | boolean | null
      >,
      default: undefined,
    },
    defaultValue: {
      type: [Object, String, Number, Boolean] as PropType<
        object | string | number | boolean | null
      >,
      default: undefined,
    },
    form: { type: String, optional: true },
    name: { type: String, optional: true },
    nullable: { type: Boolean, default: false },
    multiple: { type: [Boolean], default: false },
    immediate: { type: [Boolean], default: false },
    virtual: {
      type: Object as PropType<null | {
        options: unknown[]
        disabled?: (value: unknown) => boolean
      }>,
      default: null,
    },
  },
  inheritAttrs: false,
  setup(props, { slots, attrs, emit }) {
      throw new Error("STUB");
  },
})

// ---

export let ComboboxLabel = defineComponent({
  name: 'ComboboxLabel',
  props: {
    as: { type: [Object, String], default: 'label' },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { attrs, slots }) {
      throw new Error("STUB");
  },
})

// ---

export let ComboboxButton = defineComponent({
  name: 'ComboboxButton',
  props: {
    as: { type: [Object, String], default: 'button' },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let ComboboxInput = defineComponent({
  name: 'ComboboxInput',
  props: {
    as: { type: [Object, String], default: 'input' },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    displayValue: { type: Function as PropType<(item: unknown) => string> },
    defaultValue: { type: String, default: undefined },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  emits: {
    change: (_value: Event & { target: HTMLInputElement }) => { throw new Error("STUB"); },
  },
  setup(props, { emit, attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let ComboboxOptions = defineComponent({
  name: 'ComboboxOptions',
  props: {
    as: { type: [Object, String], default: 'ul' },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    hold: { type: [Boolean], default: false },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

export let ComboboxOption = defineComponent({
  name: 'ComboboxOption',
  props: {
    as: { type: [Object, String], default: 'li' },
    value: {
      type: [Object, String, Number, Boolean] as PropType<
        object | string | number | boolean | null
      >,
    },
    disabled: { type: Boolean, default: false },
    order: { type: [Number], default: null },
  },
  setup(props, { slots, attrs, expose }) {
      throw new Error("STUB");
  },
})
