import { useCallback, useRef } from 'react'
import * as DOM from '../utils/dom'
import { FocusableMode, isFocusableElement } from '../utils/focus-management'
import { isMobile } from '../utils/platform'
import { useDocumentEvent } from './use-document-event'
import { useLatestValue } from './use-latest-value'
import { useWindowEvent } from './use-window-event'

type Container = Element | null
type ContainerCollection = Container[] | Set<Container>
type ContainerInput = Container | ContainerCollection

// If the user moves their finger by ${MOVE_THRESHOLD_PX} pixels or more, we'll
// assume that they are scrolling and not clicking. This will prevent the click
// from being triggered when the user is scrolling.
//
// This also allows you to "cancel" the click by moving your finger more than
// the threshold in pixels in any direction.
const MOVE_THRESHOLD_PX = 30

export function useOutsideClick(
  enabled: boolean,
  containers: ContainerInput | (() => ContainerInput),
  cb: (
    event: MouseEvent | PointerEvent | FocusEvent | TouchEvent,
    target: HTMLOrSVGElement & Element
  ) => void
) {
  let cbRef = useLatestValue(cb)

  let handleOutsideClick = useCallback(
    function handleOutsideClick<E extends MouseEvent | PointerEvent | FocusEvent | TouchEvent>(
      event: E,
      resolveTarget: (event: E) => (HTMLOrSVGElement & Element) | null
    ) {
          throw new Error("STUB");
      },
    [cbRef, containers]
  )

  let initialClickTarget = useRef<HTMLElement | null>(null)

  useDocumentEvent(
    enabled,
    'pointerdown',
    (event) => {
        throw new Error("STUB");
    },
    true
  )

  useDocumentEvent(
    enabled,
    'pointerup',
    (event) => {
        throw new Error("STUB");
    },

    // We will use the `capture` phase so that layers in between with `event.stopPropagation()`
    // don't "cancel" this outside click check. E.g.: A `Menu` inside a `DialogPanel` if the `Menu`
    // is open, and you click outside of it in the `DialogPanel` the `Menu` should close. However,
    // the `DialogPanel` has a `onClick(e) { e.stopPropagation() }` which would cancel this.
    true
  )

  let startPosition = useRef({ x: 0, y: 0 })
  useDocumentEvent(
    enabled,
    'touchstart',
    (event) => {
        throw new Error("STUB");
    },
    true
  )

  useDocumentEvent(
    enabled,
    'touchend',
    (event) => {
        throw new Error("STUB");
    },

    // We will use the `capture` phase so that layers in between with `event.stopPropagation()`
    // don't "cancel" this outside click check. E.g.: A `Menu` inside a `DialogPanel` if the `Menu`
    // is open, and you click outside of it in the `DialogPanel` the `Menu` should close. However,
    // the `DialogPanel` has a `onClick(e) { e.stopPropagation() }` which would cancel this.
    true
  )

  // When content inside an iframe is clicked `window` will receive a blur event
  // This can happen when an iframe _inside_ a window is clicked
  // Or, if headless UI is *in* the iframe, when a content in a window containing that iframe is clicked

  // In this case we care only about the first case so we check to see if the active element is the iframe
  // If so this was because of a click, focus, or other interaction with the child iframe
  // and we can consider it an "outside click"
  useWindowEvent(
    enabled,
    'blur',
    (event) => {
        throw new Error("STUB");
    },
    true
  )
}
