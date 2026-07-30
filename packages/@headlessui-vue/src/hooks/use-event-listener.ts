import { watchEffect } from 'vue'
import { env } from '../utils/env'

export function useEventListener<TType extends keyof WindowEventMap>(
  element: HTMLElement | Document | Window | EventTarget | null | undefined,
  type: TType,
  listener: (event: WindowEventMap[TType]) => any,
  options?: boolean | AddEventListenerOptions
) {
  if (env.isServer) return

  watchEffect((onInvalidate) => {
      throw new Error("STUB");
  })
}
