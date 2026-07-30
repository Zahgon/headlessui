// WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watchEffect,
  type InjectionKey,
  type Ref,
} from 'vue'
import { useId } from '../../hooks/use-id'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import { State, useOpenClosed, useOpenClosedProvider } from '../../internal/open-closed'
import { Keys } from '../../keyboard'
import { dom } from '../../utils/dom'
import { match } from '../../utils/match'
import { Features, render } from '../../utils/render'

enum DisclosureStates {
  Open,
  Closed,
}

interface StateDefinition {
  // State
  disclosureState: Ref<DisclosureStates>
  panel: Ref<HTMLElement | null>
  panelId: Ref<string | null>
  button: Ref<HTMLButtonElement | null>
  buttonId: Ref<string | null>

  // State mutators
  toggleDisclosure(): void
  closeDisclosure(): void

  // Exposed functions
  close(focusableElement: HTMLElement | Ref<HTMLElement | null>): void
}

let DisclosureContext = Symbol('DisclosureContext') as InjectionKey<StateDefinition>

function useDisclosureContext(component: string) {
  let context = inject(DisclosureContext, null)

  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Disclosure /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, useDisclosureContext)
    throw err
  }

  return context
}

let DisclosurePanelContext = Symbol('DisclosurePanelContext') as InjectionKey<Ref<string | null>>
function useDisclosurePanelContext() {
  return inject(DisclosurePanelContext, null)
}

// ---

export let Disclosure = defineComponent({
  name: 'Disclosure',
  props: {
    as: { type: [Object, String], default: 'template' },
    defaultOpen: { type: [Boolean], default: false },
  },
  setup(props, { slots, attrs }) {
      throw new Error("STUB");
  },
})

// ---

export let DisclosureButton = defineComponent({
  name: 'DisclosureButton',
  props: {
    as: { type: [Object, String], default: 'button' },
    disabled: { type: [Boolean], default: false },
    id: { type: String, default: null },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

// ---

export let DisclosurePanel = defineComponent({
  name: 'DisclosurePanel',
  props: {
    as: { type: [Object, String], default: 'div' },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    id: { type: String, default: null },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})
