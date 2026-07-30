import {
  Fragment,
  computed,
  defineComponent,
  h,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
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
import { useId } from '../../hooks/use-id'
import { useOutsideClick } from '../../hooks/use-outside-click'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import { useTextValue } from '../../hooks/use-text-value'
import { useTrackedPointer } from '../../hooks/use-tracked-pointer'
import { Hidden, Features as HiddenFeatures } from '../../internal/hidden'
import { State, useOpenClosed, useOpenClosedProvider } from '../../internal/open-closed'
import { Keys } from '../../keyboard'
import { Focus, calculateActiveIndex } from '../../utils/calculate-active-index'
import { dom } from '../../utils/dom'
import { FocusableMode, isFocusableElement, sortByDomNode } from '../../utils/focus-management'
import { objectToFormEntries } from '../../utils/form'
import { match } from '../../utils/match'
import { Features, compact, omit, render } from '../../utils/render'

function defaultComparator<T>(a: T, z: T): boolean {
  return a === z
}

enum ListboxStates {
  Open,
  Closed,
}

enum ValueMode {
  Single,
  Multi,
}

enum ActivationTrigger {
  Pointer,
  Other,
}

function nextFrame(cb: () => void) {
  requestAnimationFrame(() => { throw new Error("STUB"); })
}

type ListboxOptionData = {
  textValue: string
  disabled: boolean
  value: unknown
  domRef: Ref<HTMLElement | null>
}

type StateDefinition = {
  // State
  listboxState: Ref<ListboxStates>
  value: ComputedRef<unknown>
  orientation: Ref<'vertical' | 'horizontal'>

  mode: ComputedRef<ValueMode>

  compare: (a: unknown, z: unknown) => boolean

  labelRef: Ref<HTMLLabelElement | null>
  buttonRef: Ref<HTMLButtonElement | null>
  optionsRef: Ref<HTMLDivElement | null>

  disabled: Ref<boolean>
  options: Ref<{ id: string; dataRef: ComputedRef<ListboxOptionData> }[]>
  searchQuery: Ref<string>
  activeOptionIndex: Ref<number | null>
  activationTrigger: Ref<ActivationTrigger>

  // State mutators
  closeListbox(): void
  openListbox(): void
  goToOption(focus: Focus, id?: string, trigger?: ActivationTrigger): void
  search(value: string): void
  clearSearch(): void
  registerOption(id: string, dataRef: ComputedRef<ListboxOptionData>): void
  unregisterOption(id: string): void
  select(value: unknown): void
}

let ListboxContext = Symbol('ListboxContext') as InjectionKey<StateDefinition>

function useListboxContext(component: string) {
  let context = inject(ListboxContext, null)

  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Listbox /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, useListboxContext)
    throw err
  }

  return context
}

// ---

export let Listbox = defineComponent({
  name: 'Listbox',
  emits: { 'update:modelValue': (_value: any) => { throw new Error("STUB"); } },
  props: {
    as: { type: [Object, String], default: 'template' },
    disabled: { type: [Boolean], default: false },
    by: { type: [String, Function], default: () => { throw new Error("STUB"); } },
    horizontal: { type: [Boolean], default: false },
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
    multiple: { type: [Boolean], default: false },
  },
  inheritAttrs: false,
  setup(props, { slots, attrs, emit }) {
      throw new Error("STUB");
  },
})

// ---

export let ListboxLabel = defineComponent({
  name: 'ListboxLabel',
  props: {
    as: { type: [Object, String], default: 'label' },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { attrs, slots }) {
      throw new Error("STUB");
  },
})

// ---

export let ListboxButton = defineComponent({
  name: 'ListboxButton',
  props: {
    as: { type: [Object, String], default: 'button' },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let ListboxOptions = defineComponent({
  name: 'ListboxOptions',
  props: {
    as: { type: [Object, String], default: 'ul' },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

export let ListboxOption = defineComponent({
  name: 'ListboxOption',
  props: {
    as: { type: [Object, String], default: 'li' },
    value: {
      type: [Object, String, Number, Boolean] as PropType<
        object | string | number | boolean | null
      >,
    },
    disabled: { type: Boolean, default: false },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { slots, attrs, expose }) {
      throw new Error("STUB");
  },
})
