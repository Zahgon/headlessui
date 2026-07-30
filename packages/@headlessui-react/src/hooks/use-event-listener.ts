import { useEffect } from 'react'
import { useLatestValue } from './use-latest-value'

export function useEventListener<TType extends keyof WindowEventMap>(
  element: HTMLElement | Document | Window | EventTarget | null | undefined,
  type: TType,
  listener: (event: WindowEventMap[TType]) => any,
  options?: boolean | AddEventListenerOptions
) {
  let listenerRef = useLatestValue(listener)

  useEffect(() => {
      throw new Error("STUB");
  }, [element, type, options])
}
