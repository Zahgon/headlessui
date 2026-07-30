import { useRef } from 'react'
import * as DOM from '../utils/dom'
import { isActiveElement } from '../utils/owner'
import { useEvent } from './use-event'
import { useEventListener } from './use-event-listener'

/**
 * The `useRefocusableInput` hook exposes a function to re-focus the input element.
 *
 * This hook will also keep the cursor position into account to make sure the
 * cursor is placed at the correct position as-if we didn't loose focus at all.
 */
export function useRefocusableInput(input: HTMLInputElement | null) {
    throw new Error("STUB");
}
