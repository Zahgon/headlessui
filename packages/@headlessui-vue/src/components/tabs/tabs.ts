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
  watch,
  watchEffect,
  type InjectionKey,
  type Ref,
} from 'vue'
import { useId } from '../../hooks/use-id'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import { FocusSentinel } from '../../internal/focus-sentinel'
import { Hidden } from '../../internal/hidden'
import { Keys } from '../../keyboard'
import { dom } from '../../utils/dom'
import { Focus, FocusResult, focusIn, sortByDomNode } from '../../utils/focus-management'
import { match } from '../../utils/match'
import { microTask } from '../../utils/micro-task'
import { getOwnerDocument } from '../../utils/owner'
import { Features, omit, render } from '../../utils/render'

enum Direction {
  Forwards,
  Backwards,
}

enum Ordering {
  Less = -1,
  Equal = 0,
  Greater = 1,
}

type StateDefinition = {
  // State
  selectedIndex: Ref<number | null>
  orientation: Ref<'vertical' | 'horizontal'>
  activation: Ref<'auto' | 'manual'>

  tabs: Ref<Ref<HTMLElement | null>[]>
  panels: Ref<Ref<HTMLElement | null>[]>

  // State mutators
  setSelectedIndex(index: number): void
  registerTab(tab: Ref<HTMLElement | null>): void
  unregisterTab(tab: Ref<HTMLElement | null>): void
  registerPanel(panel: Ref<HTMLElement | null>): void
  unregisterPanel(panel: Ref<HTMLElement | null>): void
}

let TabsContext = Symbol('TabsContext') as InjectionKey<StateDefinition>

function useTabsContext(component: string) {
  let context = inject(TabsContext, null)

  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <TabGroup /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, useTabsContext)
    throw err
  }

  return context
}

let TabsSSRContext = Symbol('TabsSSRContext') as InjectionKey<
  Ref<{ tabs: string[]; panels: string[] } | null>
>

// ---

export let TabGroup = defineComponent({
  name: 'TabGroup',
  emits: {
    change: (_index: number) => { throw new Error("STUB"); },
  },
  props: {
    as: { type: [Object, String], default: 'template' },
    selectedIndex: { type: [Number], default: null },
    defaultIndex: { type: [Number], default: 0 },
    vertical: { type: [Boolean], default: false },
    manual: { type: [Boolean], default: false },
  },
  inheritAttrs: false,
  setup(props, { slots, attrs, emit }) {
      throw new Error("STUB");
  },
})

// ---

export let TabList = defineComponent({
  name: 'TabList',
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { attrs, slots }) {
      throw new Error("STUB");
  },
})

// ---

export let Tab = defineComponent({
  name: 'Tab',
  props: {
    as: { type: [Object, String], default: 'button' },
    disabled: { type: [Boolean], default: false },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let TabPanels = defineComponent({
  name: 'TabPanels',
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { slots, attrs }) {
      throw new Error("STUB");
  },
})

export let TabPanel = defineComponent({
  name: 'TabPanel',
  props: {
    as: { type: [Object, String], default: 'div' },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    id: { type: String, default: () => { throw new Error("STUB"); } },
    tabIndex: { type: Number, default: 0 },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})
