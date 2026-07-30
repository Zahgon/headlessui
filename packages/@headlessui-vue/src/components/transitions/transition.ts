import {
  computed,
  defineComponent,
  h,
  inject,
  normalizeClass,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watch,
  watchEffect,
  type ConcreteComponent,
  type InjectionKey,
  type Ref,
} from 'vue'
import { useId } from '../../hooks/use-id'
import {
  State,
  hasOpenClosed,
  useOpenClosed,
  useOpenClosedProvider,
} from '../../internal/open-closed'
import { dom } from '../../utils/dom'
import { env } from '../../utils/env'
import { match } from '../../utils/match'
import { Features, RenderStrategy, omit, render } from '../../utils/render'
import { Reason, transition } from './utils/transition'

type ID = ReturnType<typeof useId>

/**
 * Split class lists by whitespace
 *
 * We can't check for just spaces as all whitespace characters are
 * invalid in a class name, so we have to split on ANY whitespace.
 */
function splitClasses(classes: string = '') {
  return classes.split(/\s+/).filter((className) => { throw new Error("STUB"); })
}

interface TransitionContextValues {
  show: Ref<boolean>
  appear: Ref<boolean>
}
let TransitionContext = Symbol('TransitionContext') as InjectionKey<TransitionContextValues | null>

enum TreeStates {
  Visible = 'visible',
  Hidden = 'hidden',
}

function hasTransitionContext() {
  return inject(TransitionContext, null) !== null
}

function useTransitionContext() {
  let context = inject(TransitionContext, null)

  if (context === null) {
    throw new Error('A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.')
  }

  return context
}

function useParentNesting() {
  let context = inject(NestingContext, null)

  if (context === null) {
    throw new Error('A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.')
  }

  return context
}

interface NestingContextValues {
  children: Ref<{ id: ID; state: TreeStates }[]>
  register: (id: ID) => () => void
  unregister: (id: ID, strategy?: RenderStrategy) => void
}

let NestingContext = Symbol('NestingContext') as InjectionKey<NestingContextValues | null>

function hasChildren(
  bag: NestingContextValues['children'] | { children: NestingContextValues['children'] }
): boolean {
  if ('children' in bag) return hasChildren(bag.children)
  return bag.value.filter(({ state }) => { throw new Error("STUB"); }).length > 0
}

function useNesting(done?: () => void) {
  let transitionableChildren = ref<NestingContextValues['children']['value']>([])

  let mounted = ref(false)
  onMounted(() => { throw new Error("STUB"); })
  onUnmounted(() => { throw new Error("STUB"); })

  function unregister(childId: ID, strategy = RenderStrategy.Hidden) {
    let idx = transitionableChildren.value.findIndex(({ id }) => { throw new Error("STUB"); })
    if (idx === -1) return

    match(strategy, {
      [RenderStrategy.Unmount]() {
            throw new Error("STUB");
        },
      [RenderStrategy.Hidden]() {
          throw new Error("STUB");
      },
    })

    if (!hasChildren(transitionableChildren) && mounted.value) {
      done?.()
    }
  }

  function register(childId: ID) {
    let child = transitionableChildren.value.find(({ id }) => { throw new Error("STUB"); })
    if (!child) {
      transitionableChildren.value.push({ id: childId, state: TreeStates.Visible })
    } else if (child.state !== TreeStates.Visible) {
      child.state = TreeStates.Visible
    }

    return () => { throw new Error("STUB"); }
  }

  return {
    children: transitionableChildren,
    register,
    unregister,
  }
}

// ---

let TransitionChildRenderFeatures = Features.RenderStrategy

export let TransitionChild = defineComponent({
  props: {
    as: { type: [Object, String], default: 'div' },
    show: { type: [Boolean], default: null },
    unmount: { type: [Boolean], default: true },
    appear: { type: [Boolean], default: false },
    enter: { type: [String], default: '' },
    enterFrom: { type: [String], default: '' },
    enterTo: { type: [String], default: '' },
    entered: { type: [String], default: '' },
    leave: { type: [String], default: '' },
    leaveFrom: { type: [String], default: '' },
    leaveTo: { type: [String], default: '' },
  },
  emits: {
    beforeEnter: () => { throw new Error("STUB"); },
    afterEnter: () => { throw new Error("STUB"); },
    beforeLeave: () => { throw new Error("STUB"); },
    afterLeave: () => { throw new Error("STUB"); },
  },
  setup(props, { emit, attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

// This exists to work around typescript circular inference problem
let _TransitionChild = TransitionChild as ConcreteComponent

export let TransitionRoot = defineComponent({
  inheritAttrs: false,
  props: {
    as: { type: [Object, String], default: 'div' },
    show: { type: [Boolean], default: null },
    unmount: { type: [Boolean], default: true },
    appear: { type: [Boolean], default: false },
    enter: { type: [String], default: '' },
    enterFrom: { type: [String], default: '' },
    enterTo: { type: [String], default: '' },
    entered: { type: [String], default: '' },
    leave: { type: [String], default: '' },
    leaveFrom: { type: [String], default: '' },
    leaveTo: { type: [String], default: '' },
  },
  emits: {
    beforeEnter: () => { throw new Error("STUB"); },
    afterEnter: () => { throw new Error("STUB"); },
    beforeLeave: () => { throw new Error("STUB"); },
    afterLeave: () => { throw new Error("STUB"); },
  },
  setup(props, { emit, attrs, slots }) {
      throw new Error("STUB");
  },
})
