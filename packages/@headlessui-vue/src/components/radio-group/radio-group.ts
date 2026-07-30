import {
  Fragment,
  computed,
  defineComponent,
  h,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
  toRaw,
  watch,
  type InjectionKey,
  type Ref,
  type UnwrapRef,
} from 'vue'
import { useControllable } from '../../hooks/use-controllable'
import { useId } from '../../hooks/use-id'
import { useTreeWalker } from '../../hooks/use-tree-walker'
import { Hidden, Features as HiddenFeatures } from '../../internal/hidden'
import { Keys } from '../../keyboard'
import { dom } from '../../utils/dom'
import { Focus, FocusResult, focusIn, sortByDomNode } from '../../utils/focus-management'
import { attemptSubmit, objectToFormEntries } from '../../utils/form'
import { getOwnerDocument } from '../../utils/owner'
import { compact, omit, render } from '../../utils/render'
import { Description, useDescriptions } from '../description/description'
import { Label, useLabels } from '../label/label'

function defaultComparator<T>(a: T, z: T): boolean {
  return a === z
}

interface Option {
  id: string
  element: Ref<HTMLElement | null>
  propsRef: Ref<{ value: unknown; disabled: boolean }>
}

interface StateDefinition {
  // State
  options: Ref<Option[]>
  value: Ref<unknown>
  disabled: Ref<boolean>
  firstOption: Ref<Option | undefined>
  containsCheckedOption: Ref<boolean>

  compare(a: unknown, z: unknown): boolean

  // State mutators
  change(nextValue: unknown): boolean
  registerOption(action: Option): void
  unregisterOption(id: Option['id']): void
}

let RadioGroupContext = Symbol('RadioGroupContext') as InjectionKey<StateDefinition>

function useRadioGroupContext(component: string) {
  let context = inject(RadioGroupContext, null)

  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <RadioGroup /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, useRadioGroupContext)
    throw err
  }

  return context
}

// ---

export let RadioGroup = defineComponent({
  name: 'RadioGroup',
  emits: { 'update:modelValue': (_value: any) => { throw new Error("STUB"); } },
  props: {
    as: { type: [Object, String], default: 'div' },
    disabled: { type: [Boolean], default: false },
    by: { type: [String, Function], default: () => { throw new Error("STUB"); } },
    modelValue: { type: [Object, String, Number, Boolean], default: undefined },
    defaultValue: { type: [Object, String, Number, Boolean], default: undefined },
    form: { type: String, optional: true },
    name: { type: String, optional: true },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  inheritAttrs: false,
  setup(props, { emit, attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

enum OptionState {
  Empty = 1 << 0,
  Active = 1 << 1,
}

export let RadioGroupOption = defineComponent({
  name: 'RadioGroupOption',
  props: {
    as: { type: [Object, String], default: 'div' },
    value: { type: [Object, String, Number, Boolean] },
    disabled: { type: Boolean, default: false },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let RadioGroupLabel = Label
export let RadioGroupDescription = Description
