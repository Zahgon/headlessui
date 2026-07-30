'use client'

import React, {
  useRef,
  type ElementType,
  type MutableRefObject,
  type FocusEvent as ReactFocusEvent,
  type Ref,
} from 'react'
import { useDisposables } from '../../hooks/use-disposables'
import { useEvent } from '../../hooks/use-event'
import { useEventListener } from '../../hooks/use-event-listener'
import { useIsMounted } from '../../hooks/use-is-mounted'
import { useIsTopLayer } from '../../hooks/use-is-top-layer'
import { useOnUnmount } from '../../hooks/use-on-unmount'
import { useOwnerDocument } from '../../hooks/use-owner'
import { useServerHandoffComplete } from '../../hooks/use-server-handoff-complete'
import { useSyncRefs } from '../../hooks/use-sync-refs'
import { Direction as TabDirection, useTabDirection } from '../../hooks/use-tab-direction'
import { useWatch } from '../../hooks/use-watch'
import { Hidden, HiddenFeatures } from '../../internal/hidden'
import type { Props } from '../../types'
import { history } from '../../utils/active-element-history'
import * as DOM from '../../utils/dom'
import { Focus, FocusResult, focusElement, focusIn } from '../../utils/focus-management'
import { match } from '../../utils/match'
import { microTask } from '../../utils/micro-task'
import { isActiveElement } from '../../utils/owner'
import { forwardRefWithAs, useRender, type HasDisplayName, type RefProp } from '../../utils/render'

type Containers =
  // Lazy resolved containers
  | (() => Iterable<Element>)

  // List of containers
  | MutableRefObject<Set<MutableRefObject<Element | null>>>

function resolveContainers(containers?: Containers): Set<Element> {
  if (!containers) return new Set<HTMLElement>()
  if (typeof containers === 'function') return new Set(containers())

  let all = new Set<Element>()
  for (let container of containers.current) {
    if (DOM.isElement(container.current)) {
      all.add(container.current)
    }
  }
  return all
}

let DEFAULT_FOCUS_TRAP_TAG = 'div' as const

export enum FocusTrapFeatures {
  /** No features enabled for the focus trap. */
  None = 0,

  /** Ensure that we move focus initially into the container. */
  InitialFocus = 1 << 0,

  /** Ensure that pressing `Tab` and `Shift+Tab` is trapped within the container. */
  TabLock = 1 << 1,

  /** Ensure that programmatically moving focus outside of the container is disallowed. */
  FocusLock = 1 << 2,

  /** Ensure that we restore the focus when unmounting the focus trap. */
  RestoreFocus = 1 << 3,

  /** Initial focus should look for the `data-autofocus` */
  AutoFocus = 1 << 4,
}

type FocusTrapRenderPropArg = {}
type FocusTrapPropsWeControl = never

export type FocusTrapProps<TTag extends ElementType = typeof DEFAULT_FOCUS_TRAP_TAG> = Props<
  TTag,
  FocusTrapRenderPropArg,
  FocusTrapPropsWeControl,
  {
    initialFocus?: MutableRefObject<HTMLElement | null>
    // A fallback element to focus, but this element will be skipped when tabbing around. This is
    // only done for focusing a fallback parent container (e.g.: A `Dialog`, but you want to tab
    // *inside* the dialog excluding the dialog itself).
    initialFocusFallback?: MutableRefObject<HTMLElement | null>
    features?: FocusTrapFeatures
    containers?: Containers
  }
>

function FocusTrapFn<TTag extends ElementType = typeof DEFAULT_FOCUS_TRAP_TAG>(
  props: FocusTrapProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentFocusTrap extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_FOCUS_TRAP_TAG>(
    props: FocusTrapProps<TTag> & RefProp<typeof FocusTrapFn>
  ): React.JSX.Element
}

let FocusTrapRoot = forwardRefWithAs(FocusTrapFn) as _internal_ComponentFocusTrap

export let FocusTrap = Object.assign(FocusTrapRoot, {
  /** @deprecated use `FocusTrapFeatures` instead of `FocusTrap.features` */
  features: FocusTrapFeatures,
})

// ---

function useRestoreElement(enabled: boolean = true) {
  let localHistory = useRef(history.slice())

  useWatch(
    ([newEnabled], [oldEnabled]) => {
          throw new Error("STUB");
      },
    [enabled, history, localHistory]
  )

  // We want to return the last element that is still connected to the DOM, so we can restore the
  // focus to it.
  return useEvent(() => {
      throw new Error("STUB");
  })
}

function useRestoreFocus(
  features: FocusTrapFeatures,
  { ownerDocument }: { ownerDocument: Document | null }
) {
  let enabled = Boolean(features & FocusTrapFeatures.RestoreFocus)

  let getRestoreElement = useRestoreElement(enabled)

  // Restore the focus to the previous element when `enabled` becomes false again
  useWatch(() => {
      throw new Error("STUB");
  }, [enabled])

  // Restore the focus to the previous element when the component is unmounted
  useOnUnmount(() => {
      throw new Error("STUB");
  })
}

function useInitialFocus(
  features: FocusTrapFeatures,
  {
    ownerDocument,
    container,
    initialFocus,
    initialFocusFallback,
  }: {
    ownerDocument: Document | null
    container: MutableRefObject<HTMLElement | null>
    initialFocus?: MutableRefObject<HTMLElement | null>
    initialFocusFallback?: MutableRefObject<HTMLElement | null>
  }
) {
  let previousActiveElement = useRef<HTMLElement | null>(null)
  let enabled = useIsTopLayer(
    Boolean(features & FocusTrapFeatures.InitialFocus),
    'focus-trap#initial-focus'
  )

  let mounted = useIsMounted()

  // Handle initial focus
  useWatch(() => {
      throw new Error("STUB");
  }, [initialFocusFallback, enabled, features])

  return previousActiveElement
}

function useFocusLock(
  features: FocusTrapFeatures,
  {
    ownerDocument,
    container,
    containers,
    previousActiveElement,
  }: {
    ownerDocument: Document | null
    container: MutableRefObject<HTMLElement | null>
    containers?: Containers
    previousActiveElement: MutableRefObject<HTMLOrSVGElement | null>
  }
) {
  let mounted = useIsMounted()
  let enabled = Boolean(features & FocusTrapFeatures.FocusLock)

  // Prevent programmatically escaping the container
  useEventListener(
    ownerDocument?.defaultView,
    'focus',
    (event) => {
        throw new Error("STUB");
    },
    true
  )
}

function contains(containers: Set<Element>, element: Element) {
  for (let container of containers) {
    if (container.contains(element)) return true
  }

  return false
}
