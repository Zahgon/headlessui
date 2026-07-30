import {
  Fragment,
  computed,
  defineComponent,
  h,
  inject,
  onMounted,
  provide,
  ref,
  watch,
  type InjectionKey,
  type Ref,
} from 'vue'
import { useControllable } from '../../hooks/use-controllable'
import { useId } from '../../hooks/use-id'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import { Hidden, Features as HiddenFeatures } from '../../internal/hidden'
import { Keys } from '../../keyboard'
import { dom } from '../../utils/dom'
import { attemptSubmit } from '../../utils/form'
import { compact, omit, render } from '../../utils/render'
import { Description, useDescriptions } from '../description/description'
import { Label, useLabels } from '../label/label'

type StateDefinition = {
  // State
  switchRef: Ref<HTMLButtonElement | null>
  labelledby: Ref<string | undefined>
  describedby: Ref<string | undefined>
}

let GroupContext = Symbol('GroupContext') as InjectionKey<StateDefinition>

// ---

export let SwitchGroup = defineComponent({
  name: 'SwitchGroup',
  props: {
    as: { type: [Object, String], default: 'template' },
  },
  setup(props, { slots, attrs }) {
      throw new Error("STUB");
  },
})

// ---

export let Switch = defineComponent({
  name: 'Switch',
  emits: { 'update:modelValue': (_value: boolean) => { throw new Error("STUB"); } },
  props: {
    as: { type: [Object, String], default: 'button' },
    modelValue: { type: Boolean, default: undefined },
    defaultChecked: { type: Boolean, optional: true },
    form: { type: String, optional: true },
    name: { type: String, optional: true },
    value: { type: String, optional: true },
    id: { type: String, default: () => { throw new Error("STUB"); } },
    disabled: { type: Boolean, default: false },
    tabIndex: { type: Number, default: 0 },
  },
  inheritAttrs: false,
  setup(props, { emit, attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let SwitchLabel = Label
export let SwitchDescription = Description
