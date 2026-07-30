import { useEffect } from 'react'
import { useLatestValue } from './use-latest-value'

export function useDocumentEvent<TType extends keyof DocumentEventMap>(
  enabled: boolean,
  type: TType,
  listener: (ev: DocumentEventMap[TType]) => any,
  options?: boolean | AddEventListenerOptions
) {
  let listenerRef = useLatestValue(listener)

  useEffect(() => {
      throw new Error("STUB");
  }, [enabled, type, options])
}
