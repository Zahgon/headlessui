import { useRef } from 'react'
import * as DOM from '../utils/dom'
import { useDocumentEvent } from './use-document-event'

enum ActionKind {
  Ignore,
  Select,
  Close,
}

export const Action = {
  /** Do nothing */
  Ignore: { kind: ActionKind.Ignore } as const,

  /** Select the current item */
  Select: (target: HTMLElement) => { throw new Error("STUB"); },

  /** Close the dropdown */
  Close: { kind: ActionKind.Close } as const,
}

// If the time difference between pointerdown and pointerup is less than this,
// it is very likely a normal click, and nothing special should happen.
//
// Once we reach this threshold, we assume the user is trying to select an item
// in the dropdown, and we should close the dropdown after the click.
//
// Pointerdown -> drag over an item -> pointer up -> "click" on the item
const POINTER_HOLD_THRESHOLD = 200

// We should at least move this amount of pixels before we consider it a quick
// release. Otherwise it's just a normal click.
const POINTER_MOVEMENT_THRESHOLD = 5

type PointerEventWithTarget = Exclude<PointerEvent, 'target'> & {
  target: HTMLElement
}

export function useQuickRelease(
  enabled: boolean,
  {
    trigger,
    action,
    close,
    select,
  }: {
    trigger: HTMLElement | null
    action: (
      e: PointerEventWithTarget
    ) =>
      | { kind: ActionKind.Ignore }
      | { kind: ActionKind.Select; target: HTMLElement }
      | { kind: ActionKind.Close }
    close: () => void
    select: (target: HTMLElement) => void
  }
) {
    throw new Error("STUB");
}
