import {
  Fragment,
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  watch,
  watchEffect,
  type PropType,
  type Ref,
} from 'vue'
import { useEventListener } from '../../hooks/use-event-listener'
import { Direction as TabDirection, useTabDirection } from '../../hooks/use-tab-direction'
import { Hidden, Features as HiddenFeatures } from '../../internal/hidden'
import { history } from '../../utils/active-element-history'
import { dom } from '../../utils/dom'
import { Focus, FocusResult, focusElement, focusIn } from '../../utils/focus-management'
import { match } from '../../utils/match'
import { microTask } from '../../utils/micro-task'
import { getOwnerDocument } from '../../utils/owner'
import { render } from '../../utils/render'

type Containers =
  // Lazy resolved containers
  | (() => Iterable<HTMLElement>)

  // List of containers
  | Ref<Set<Ref<HTMLElement | null>>>

function resolveContainers(containers?: Containers): Set<HTMLElement> {
  if (!containers) return new Set<HTMLElement>()
  if (typeof containers === 'function') return new Set(containers())

  let all = new Set<HTMLElement>()
  for (let container of containers.value) {
    let el = dom(container)
    if (el instanceof HTMLElement) {
      all.add(el)
    }
  }
  return all
}

enum Features {
  /** No features enabled for the focus trap. */
  None = 1 << 0,

  /** Ensure that we move focus initially into the container. */
  InitialFocus = 1 << 1,

  /** Ensure that pressing `Tab` and `Shift+Tab` is trapped within the container. */
  TabLock = 1 << 2,

  /** Ensure that programmatically moving focus outside of the container is disallowed. */
  FocusLock = 1 << 3,

  /** Ensure that we restore the focus when unmounting the focus trap. */
  RestoreFocus = 1 << 4,

  /** Enable all features. */
  All = InitialFocus | TabLock | FocusLock | RestoreFocus,
}

export let FocusTrap = Object.assign(
  defineComponent({
    name: 'FocusTrap',
    props: {
      as: { type: [Object, String], default: 'div' },
      initialFocus: { type: Object as PropType<HTMLElement | null>, default: null },
      features: { type: Number as PropType<Features>, default: Features.All },
      containers: {
        type: [Object, Function] as PropType<Containers>,
        default: ref(new Set()),
      },
    },
    inheritAttrs: false,
    setup(props, { attrs, slots, expose }) {
        throw new Error("STUB");
    },
  }),
  { features: Features }
)

function useRestoreElement(enabled: Ref<boolean>) {
  let localHistory = ref<HTMLElement[]>(history.slice())

  watch(
    [enabled],
    ([newEnabled], [oldEnabled]) => {
        throw new Error("STUB");
    },
    { flush: 'post' }
  )

  // We want to return the last element that is still connected to the DOM, so we can restore the
  // focus to it.
  return () => {
      throw new Error("STUB");
  }
}

function useRestoreFocus(
  { ownerDocument }: { ownerDocument: Ref<Document | null> },
  enabled: Ref<boolean>
) {
  let getRestoreElement = useRestoreElement(enabled)

  // Restore the focus to the previous element
  onMounted(() => {
      throw new Error("STUB");
  })

  // Restore the focus when we unmount the component
  onUnmounted(() => {
      throw new Error("STUB");
  })
}

function useInitialFocus(
  {
    ownerDocument,
    container,
    initialFocus,
  }: {
    ownerDocument: Ref<Document | null>
    container: Ref<HTMLElement | null>
    initialFocus?: Ref<HTMLElement | null>
  },
  enabled: Ref<boolean>
) {
  let previousActiveElement = ref<HTMLElement | null>(null)

  let mounted = ref(false)
  onMounted(() => { throw new Error("STUB"); })
  onUnmounted(() => { throw new Error("STUB"); })

  onMounted(() => {
      throw new Error("STUB");
  })

  return previousActiveElement
}

function useFocusLock(
  {
    ownerDocument,
    container,
    containers,
    previousActiveElement,
  }: {
    ownerDocument: Ref<Document | null>
    container: Ref<HTMLElement | null>
    containers: Containers
    previousActiveElement: Ref<HTMLElement | null>
  },
  enabled: Ref<boolean>
) {
  // Prevent programmatically escaping
  useEventListener(
    ownerDocument.value?.defaultView,
    'focus',
    (event) => {
        throw new Error("STUB");
    },
    true
  )
}

function contains(containers: Set<HTMLElement>, element: HTMLElement) {
  for (let container of containers) {
    if (container.contains(element)) return true
  }

  return false
}
