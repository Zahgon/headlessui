import { useEffect, useRef } from 'react'
import { useEvent } from './use-event'

export function useWatch<T extends any[]>(
  cb: (newValues: [...T], oldValues: [...T]) => void | (() => void),
  dependencies: [...T]
) {
  let track = useRef([] as unknown as typeof dependencies)
  let action = useEvent(cb)

  useEffect(() => {
      throw new Error("STUB");
  }, [action, ...dependencies])
}
