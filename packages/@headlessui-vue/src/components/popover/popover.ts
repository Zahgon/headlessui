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
  shallowRef,
  watchEffect,
  type ComponentPublicInstance,
  type InjectionKey,
  type Ref,
} from 'vue'
import { useNestedPortals } from '../../components/portal/portal'
import { useEventListener } from '../../hooks/use-event-listener'
import { useId } from '../../hooks/use-id'
import { useOutsideClick } from '../../hooks/use-outside-click'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import { useMainTreeNode, useRootContainers } from '../../hooks/use-root-containers'
import { Direction as TabDirection, useTabDirection } from '../../hooks/use-tab-direction'
import { Hidden, Features as HiddenFeatures } from '../../internal/hidden'
import { State, useOpenClosed, useOpenClosedProvider } from '../../internal/open-closed'
import { Keys } from '../../keyboard'
import { dom } from '../../utils/dom'
import {
  Focus,
  FocusResult,
  FocusableMode,
  focusIn,
  getFocusableElements,
  isFocusableElement,
} from '../../utils/focus-management'
import { match } from '../../utils/match'
import { microTask } from '../../utils/micro-task'
import { getOwnerDocument } from '../../utils/owner'
import { Features, render } from '../../utils/render'

enum PopoverStates {
  Open,
  Closed,
}

interface StateDefinition {
  // State
  popoverState: Ref<PopoverStates>
  button: Ref<HTMLElement | null>
  buttonId: Ref<string | null>
  panel: Ref<HTMLElement | null>
  panelId: Ref<string | null>

  isPortalled: Ref<boolean>

  beforePanelSentinel: Ref<HTMLElement | null>
  afterPanelSentinel: Ref<HTMLElement | null>

  // State mutators
  togglePopover(): void
  closePopover(): void

  // Exposed functions
  close(focusableElement: HTMLElement | Ref<HTMLElement | null>): void
}

let PopoverContext = Symbol('PopoverContext') as InjectionKey<StateDefinition>
function usePopoverContext(component: string) {
  let context = inject(PopoverContext, null)
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <${Popover.name} /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, usePopoverContext)
    throw err
  }
  return context
}

let PopoverGroupContext = Symbol('PopoverGroupContext') as InjectionKey<{
  registerPopover(registerBag: PopoverRegisterBag): void
  unregisterPopover(registerBag: PopoverRegisterBag): void
  isFocusWithinPopoverGroup(): boolean
  closeOthers(buttonId: string): void
  mainTreeNodeRef: Ref<HTMLElement | null>
} | null>

function usePopoverGroupContext() {
  return inject(PopoverGroupContext, null)
}

let PopoverPanelContext = Symbol('PopoverPanelContext') as InjectionKey<Ref<string | null>>
function usePopoverPanelContext() {
  return inject(PopoverPanelContext, null)
}

interface PopoverRegisterBag {
  buttonId: Ref<string | null>
  panelId: Ref<string | null>
  close(): void
}

// ---

export let Popover = defineComponent({
  name: 'Popover',
  inheritAttrs: false,
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { slots, attrs, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let PopoverButton = defineComponent({
  name: 'PopoverButton',
  props: {
    as: { type: [Object, String], default: 'button' },
    disabled: { type: [Boolean], default: false },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let PopoverOverlay = defineComponent({
  name: 'PopoverOverlay',
  props: {
    as: { type: [Object, String], default: 'div' },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
  },
  setup(props, { attrs, slots }) {
      throw new Error("STUB");
  },
})

// ---

export let PopoverPanel = defineComponent({
  name: 'PopoverPanel',
  props: {
    as: { type: [Object, String], default: 'div' },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    focus: { type: Boolean, default: false },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let PopoverGroup = defineComponent({
  name: 'PopoverGroup',
  inheritAttrs: false,
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})
