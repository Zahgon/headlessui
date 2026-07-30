// WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/
import {
  computed,
  defineComponent,
  h,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watchEffect,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue'
import { FocusTrap } from '../../components/focus-trap/focus-trap'
import { useDocumentOverflowLockedEffect } from '../../hooks/document-overflow/use-document-overflow'
import { useEventListener } from '../../hooks/use-event-listener'
import { useId } from '../../hooks/use-id'
import { useInert } from '../../hooks/use-inert'
import { useOutsideClick } from '../../hooks/use-outside-click'
import { useRootContainers } from '../../hooks/use-root-containers'
import { State, useOpenClosed } from '../../internal/open-closed'
import { ForcePortalRoot } from '../../internal/portal-force-root'
import { StackMessage, useStackProvider } from '../../internal/stack-context'
import { Keys } from '../../keyboard'
import { dom } from '../../utils/dom'
import { match } from '../../utils/match'
import { getOwnerDocument } from '../../utils/owner'
import { Features, render } from '../../utils/render'
import { Description, useDescriptions } from '../description/description'
import { Portal, PortalGroup, useNestedPortals } from '../portal/portal'

enum DialogStates {
  Open,
  Closed,
}

interface StateDefinition {
  dialogState: Ref<DialogStates>

  titleId: Ref<string | null>
  panelRef: Ref<HTMLDivElement | null>

  setTitleId(id: string | null): void

  close(): void
}

let DialogContext = Symbol('DialogContext') as InjectionKey<StateDefinition>

function useDialogContext(component: string) {
  let context = inject(DialogContext, null)
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Dialog /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, useDialogContext)
    throw err
  }
  return context
}

// ---

let Missing = 'DC8F892D-2EBD-447C-A4C8-A03058436FF4'

export let Dialog = defineComponent({
  name: 'Dialog',
  inheritAttrs: false, // Manually handling this
  props: {
    as: { type: [Object, String], default: 'div' },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    open: { type: [Boolean, String], default: Missing },
    initialFocus: { type: Object as PropType<HTMLElement | null>, default: null },
    id: { type: String, default: () => { throw new Error("STUB"); } },
    role: { type: String as PropType<'dialog' | 'alertdialog'>, default: 'dialog' },
  },
  emits: { close: (_close: boolean) => { throw new Error("STUB"); } },
  setup(props, { emit, attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let DialogOverlay = defineComponent({
  name: 'DialogOverlay',
  props: {
    as: { type: [Object, String], default: 'div' },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { attrs, slots }) {
      throw new Error("STUB");
  },
})

// ---

export let DialogBackdrop = defineComponent({
  name: 'DialogBackdrop',
  props: {
    as: { type: [Object, String], default: 'div' },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let DialogPanel = defineComponent({
  name: 'DialogPanel',
  props: {
    as: { type: [Object, String], default: 'div' },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let DialogTitle = defineComponent({
  name: 'DialogTitle',
  props: {
    as: { type: [Object, String], default: 'h2' },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { attrs, slots }) {
      throw new Error("STUB");
  },
})

// ---

export let DialogDescription = Description
