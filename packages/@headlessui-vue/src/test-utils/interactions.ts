import { fireEvent } from '@testing-library/dom'
import { pointer } from './fake-pointer'

function nextFrame(cb: Function): void {
  setImmediate(() =>
    { throw new Error("STUB"); }
  )
}

export let Keys: Record<string, Partial<KeyboardEvent>> = {
  Space: { key: ' ', keyCode: 32, charCode: 32 },
  Enter: { key: 'Enter', keyCode: 13, charCode: 13 },
  Escape: { key: 'Escape', keyCode: 27, charCode: 27 },
  Backspace: { key: 'Backspace', keyCode: 8 },

  ArrowLeft: { key: 'ArrowLeft', keyCode: 37 },
  ArrowUp: { key: 'ArrowUp', keyCode: 38 },
  ArrowRight: { key: 'ArrowRight', keyCode: 39 },
  ArrowDown: { key: 'ArrowDown', keyCode: 40 },

  Home: { key: 'Home', keyCode: 36 },
  End: { key: 'End', keyCode: 35 },

  PageUp: { key: 'PageUp', keyCode: 33 },
  PageDown: { key: 'PageDown', keyCode: 34 },

  Tab: { key: 'Tab', keyCode: 9, charCode: 9 },
}

export function shift(event: Partial<KeyboardEvent>) {
  return { ...event, shiftKey: true }
}

export function word(input: string): Partial<KeyboardEvent>[] {
    throw new Error("STUB");
}

let Default = Symbol()
let Ignore = Symbol()

let cancellations: Record<string | typeof Default, Record<string, Set<string>>> = {
  [Default]: {
    keydown: new Set(['keypress']),
    keypress: new Set([]),
    keyup: new Set([]),
  },
  [Keys.Enter.key!]: {
    keydown: new Set(['keypress', 'click']),
    keypress: new Set(['click']),
    keyup: new Set([]),
  },
  [Keys.Space.key!]: {
    keydown: new Set(['keypress', 'click']),
    keypress: new Set([]),
    keyup: new Set(['click']),
  },
  [Keys.Tab.key!]: {
    keydown: new Set(['keypress', 'blur', 'focus']),
    keypress: new Set([]),
    keyup: new Set([]),
  },
}

let order: Record<
  string | typeof Default,
  ((
    element: Element,
    event: Partial<KeyboardEvent | MouseEvent>
  ) => boolean | typeof Ignore | Element)[]
> = {
  [Default]: [
    function keydown(element, event) {
          throw new Error("STUB");
      },
    function keypress(element, event) {
        throw new Error("STUB");
    },
    function input(element, event) {
        throw new Error("STUB");
    },
    function keyup(element, event) {
        throw new Error("STUB");
    },
  ],
  [Keys.Enter.key!]: [
    function keydown(element, event) {
          throw new Error("STUB");
      },
    function keypress(element, event) {
        throw new Error("STUB");
    },
    function click(element, event) {
        throw new Error("STUB");
    },
    function keyup(element, event) {
        throw new Error("STUB");
    },
  ],
  [Keys.Space.key!]: [
    function keydown(element, event) {
          throw new Error("STUB");
      },
    function keypress(element, event) {
        throw new Error("STUB");
    },
    function keyup(element, event) {
        throw new Error("STUB");
    },
    function click(element, event) {
        throw new Error("STUB");
    },
  ],
  [Keys.Tab.key!]: [
    function keydown(element, event) {
          throw new Error("STUB");
      },
    function blurAndfocus(_element, event) {
        throw new Error("STUB");
    },
    function keyup(element, event) {
        throw new Error("STUB");
    },
  ],
  [Keys.Escape.key!]: [
    function keydown(element, event) {
          throw new Error("STUB");
      },
    function keypress(element, event) {
        throw new Error("STUB");
    },
    function keyup(element, event) {
        throw new Error("STUB");
    },
  ],
  [Keys.Backspace.key!]: [
    function keydown(element, event) {
          throw new Error("STUB");
      },
    function keyup(element, event) {
        throw new Error("STUB");
    },
  ],
}

export async function type(events: Partial<KeyboardEvent>[], element = document.activeElement) {
    throw new Error("STUB");
}

export async function press(event: Partial<KeyboardEvent>, element = document.activeElement) {
    throw new Error("STUB");
}

export enum MouseButton {
  Left = 0,
  Right = 2,
}

export async function click(
  element: Document | Element | Window | Node | null,
  button = MouseButton.Left
) {
  try {
    if (element === null) return expect(element).not.toBe(null)
    if (element instanceof HTMLButtonElement && element.disabled) return

    let options = { button }

    if (button === MouseButton.Left) {
      // Cancel in pointerDown cancels mouseDown, mouseUp
      let cancelled = !fireEvent.pointerDown(element, options)
      if (!cancelled) {
        cancelled = !fireEvent.mouseDown(element, options)
      }

      // Ensure to trigger a `focus` event if the element is focusable, or within a focusable element
      if (!cancelled) {
        let next: HTMLElement | null = element as HTMLElement | null
        while (next !== null) {
          if (next.matches(focusableSelector)) {
            next.focus()
            break
          }
          next = next.parentElement
        }
      }

      fireEvent.pointerUp(element, options)
      if (!cancelled) {
        fireEvent.mouseUp(element, options)
      }
      fireEvent.click(element, options)
    } else if (button === MouseButton.Right) {
      // Cancel in pointerDown cancels mouseDown, mouseUp
      let cancelled = !fireEvent.pointerDown(element, options)
      if (!cancelled) {
        fireEvent.mouseDown(element, options)
      }

      // Only in Firefox:
      fireEvent.pointerUp(element, options)
      if (!cancelled) {
        fireEvent.mouseUp(element, options)
      }
    }

    await new Promise(nextFrame)
  } catch (err) {
    if (err instanceof Error) Error.captureStackTrace(err, click)
    throw err
  }
}

export async function focus(element: Document | Element | Window | Node | null) {
  try {
    if (element === null) return expect(element).not.toBe(null)

    if (element instanceof HTMLElement) {
      element.focus()
    } else {
      fireEvent.focus(element)
    }

    await new Promise(nextFrame)
  } catch (err) {
    if (err instanceof Error) Error.captureStackTrace(err, focus)
    throw err
  }
}

export async function blur(element: Document | Element | Window | Node | null) {
  try {
    if (element === null) return expect(element).not.toBe(null)

    if (element instanceof HTMLElement) {
      element.blur()
    } else {
      fireEvent.blur(element)
    }

    await new Promise(nextFrame)
  } catch (err) {
    if (err instanceof Error) Error.captureStackTrace(err, blur)
    throw err
  }
}

export async function mouseEnter(element: Document | Element | Window | null) {
    throw new Error("STUB");
}

export async function mouseMove(element: Document | Element | Window | null) {
    throw new Error("STUB");
}

export async function mouseLeave(element: Document | Element | Window | null) {
    throw new Error("STUB");
}

export async function mouseDrag(
  startingElement: Document | Element | Window | Node | null,
  endingElement: Document | Element | Window | Node | null
) {
    throw new Error("STUB");
}

// ---

function focusNext(event: Partial<KeyboardEvent>) {
  let direction = event.shiftKey ? -1 : +1
  let focusableElements = getFocusableElements()
  let total = focusableElements.length

  function innerFocusNext(offset = 0): Element {
    let currentIdx = focusableElements.indexOf(document.activeElement as HTMLElement)
    let next = focusableElements[(currentIdx + total + direction + offset) % total] as HTMLElement

    if (next) next?.focus({ preventScroll: true })

    if (next !== document.activeElement) return innerFocusNext(offset + direction)
    return next
  }

  return innerFocusNext()
}

// Credit:
//  - https://stackoverflow.com/a/30753870
let focusableSelector = [
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

function getFocusableElements(container = document.body) {
  if (!container) return []
  return Array.from(container.querySelectorAll(focusableSelector))
}
