import { ref } from 'vue'
import { useWindowEvent } from './use-window-event'

export enum Direction {
  Forwards,
  Backwards,
}

export function useTabDirection() {
  let direction = ref(Direction.Forwards)
  let enabled = ref(true)

  useWindowEvent(enabled, 'keydown', (event) => {
      throw new Error("STUB");
  })

  return direction
}
