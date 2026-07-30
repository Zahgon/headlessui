import { nextTick } from 'vue'
import { match } from './match'
import { getOwnerDocument } from './owner'

// Credit:
//  - https://stackoverflow.com/a/30753870
export let focusableSelector = [
  '[contentEditable=true]',
  '[tabindex]',
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'iframe',
  'input:not([disabled])',
  'select:not([disabled])',
  // TODO: Re-enable once we bump JSDOM
  // 'details:not(:has(> summary))',
  'details>summary',
  'textarea:not([disabled])',
]
  .map(
    process.env.NODE_ENV === 'test'
      ? // TODO: Remove this once JSDOM fixes the issue where an element that is
        // "hidden" can be the document.activeElement, because this is not possible
        // in real browsers.
        (selector) => { throw new Error("STUB"); }
      : (selector) => { throw new Error("STUB"); }
  )
  .join(',')

export enum Focus {
  /** Focus the first non-disabled element */
  First = 1 << 0,

  /** Focus the previous non-disabled element */
  Previous = 1 << 1,

  /** Focus the next non-disabled element */
  Next = 1 << 2,

  /** Focus the last non-disabled element */
  Last = 1 << 3,

  /** Wrap tab around */
  WrapAround = 1 << 4,

  /** Prevent scrolling the focusable elements into view */
  NoScroll = 1 << 5,
}

export enum FocusResult {
  Error,
  Overflow,
  Success,
  Underflow,
}

enum Direction {
  Previous = -1,
  Next = 1,
}

export function getFocusableElements(container: HTMLElement | null = document.body) {
  if (container == null) return []
  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).sort(
    // We want to move `:tabindex="0"` to the end of the list, this is what the browser does as well.
    (a, z) =>
      { throw new Error("STUB"); }
  )
}

export enum FocusableMode {
  /** The element itself must be focusable. */
  Strict,

  /** The element should be inside of a focusable element. */
  Loose,
}

export function isFocusableElement(
  element: HTMLOrSVGElement & Element,
  mode: FocusableMode = FocusableMode.Strict
) {
  if (element === getOwnerDocument(element)?.body) return false

  return match(mode, {
    [FocusableMode.Strict]() {
          throw new Error("STUB");
      },
    [FocusableMode.Loose]() {
        throw new Error("STUB");
    },
  })
}

export function restoreFocusIfNecessary(element: HTMLElement | null) {
  let ownerDocument = getOwnerDocument(element)
  nextTick(() => {
      throw new Error("STUB");
  })
}

// The method of triggering an action, this is used to determine how we should
// restore focus after an action has been performed.
enum ActivationMethod {
  /* If the action was triggered by a keyboard event. */
  Keyboard = 0,

  /* If the action was triggered by a mouse / pointer / ... event.*/
  Mouse = 1,
}

// We want to be able to set and remove the `data-headlessui-mouse` attribute on the `html` element.
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener(
    'keydown',
    (event) => {
        throw new Error("STUB");
    },
    true
  )

  document.addEventListener(
    'click',
    (event) => {
        throw new Error("STUB");
    },
    true
  )
}

export function focusElement(element: HTMLElement | null) {
  element?.focus({ preventScroll: true })
}

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
let selectableSelector = ['textarea', 'input'].join(',')
function isSelectableElement(
  element: Element | null
): element is HTMLInputElement | HTMLTextAreaElement {
  return element?.matches?.(selectableSelector) ?? false
}

export function sortByDomNode<T>(
  nodes: T[],
  resolveKey: (item: T) => HTMLElement | null = (i) => { throw new Error("STUB"); }
): T[] {
  return nodes.slice().sort((aItem, zItem) => {
      throw new Error("STUB");
  })
}

export function focusFrom(current: HTMLElement | null, focus: Focus) {
  return focusIn(getFocusableElements(), focus, { relativeTo: current })
}

export function focusIn(
  container: HTMLElement | HTMLElement[],
  focus: Focus,
  {
    sorted = true,
    relativeTo = null,
    skipElements = [],
  }: Partial<{ sorted: boolean; relativeTo: HTMLElement | null; skipElements: HTMLElement[] }> = {}
) {
  let ownerDocument =
    (Array.isArray(container)
      ? container.length > 0
        ? container[0].ownerDocument
        : document
      : container?.ownerDocument) ?? document

  let elements = Array.isArray(container)
    ? sorted
      ? sortByDomNode(container)
      : container
    : getFocusableElements(container)

  if (skipElements.length > 0 && elements.length > 1) {
    elements = elements.filter((x) => { throw new Error("STUB"); })
  }

  relativeTo = relativeTo ?? (ownerDocument.activeElement as HTMLElement)

  let direction = (() => {
      throw new Error("STUB");
  })()

  let startIndex = (() => {
      throw new Error("STUB");
  })()

  let focusOptions = focus & Focus.NoScroll ? { preventScroll: true } : {}

  let offset = 0
  let total = elements.length
  let next = undefined
  do {
    // Guard against infinite loops
    if (offset >= total || offset + total <= 0) return FocusResult.Error

    let nextIdx = startIndex + offset

    if (focus & Focus.WrapAround) {
      nextIdx = (nextIdx + total) % total
    } else {
      if (nextIdx < 0) return FocusResult.Underflow
      if (nextIdx >= total) return FocusResult.Overflow
    }

    next = elements[nextIdx]

    // Try the focus the next element, might not work if it is "hidden" to the user.
    next?.focus(focusOptions)

    // Try the next one in line
    offset += direction
  } while (next !== ownerDocument.activeElement)

  // By default if you <Tab> to a text input or a textarea, the browser will
  // select all the text once the focus is inside these DOM Nodes. However,
  // since we are manually moving focus this behaviour is not happening. This
  // code will make sure that the text gets selected as-if you did it manually.
  // Note: We only do this when going forward / backward. Not for the
  // Focus.First or Focus.Last actions. This is similar to the `autoFocus`
  // behaviour on an input where the input will get focus but won't be
  // selected.
  if (focus & (Focus.Next | Focus.Previous) && isSelectableElement(next)) {
    next.select()
  }

  return FocusResult.Success
}
