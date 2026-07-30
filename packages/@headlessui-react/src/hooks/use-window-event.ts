import { useEffect } from 'react'
import { useLatestValue } from './use-latest-value'

export function useWindowEvent<TType extends keyof WindowEventMap>(
  enabled: boolean,
  type: TType,
  listener: (ev: WindowEventMap[TType]) => any,
  options?: boolean | AddEventListenerOptions
) {
  let listenerRef = useLatestValue(listener)

  useEffect(() => {
      throw new Error("STUB");
  }, [enabled, type, options])
}
