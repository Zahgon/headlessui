import { useRef } from 'react'
import { useWindowEvent } from './use-window-event'

export enum Direction {
  Forwards,
  Backwards,
}

export function useTabDirection() {
  let direction = useRef(Direction.Forwards)
  let enabled = true

  useWindowEvent(
    enabled,
    'keydown',
    (event) => {
        throw new Error("STUB");
    },
    true
  )

  return direction
}
