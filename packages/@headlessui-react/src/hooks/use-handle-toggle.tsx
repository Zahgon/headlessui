import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { MouseButton } from '../components/mouse'
import { isDisabledReactIssue7711 } from '../utils/bugs'
import { useEvent } from './use-event'

export function useHandleToggle(cb: (event: ReactPointerEvent) => void) {
    throw new Error("STUB");
}
