import { useEffect, useRef } from 'react'
import { useEvent } from './use-event'

let Optional = Symbol()

export function optionalRef<T>(cb: (ref: T) => void, isOptional = true) {
  return Object.assign(cb, { [Optional]: isOptional })
}

export function useSyncRefs<TType>(
  ...refs: (React.MutableRefObject<TType | null> | ((instance: TType) => void) | null)[]
) {
  let cache = useRef(refs)

  useEffect(() => {
      throw new Error("STUB");
  }, [refs])

  let syncRefs = useEvent((value: TType) => {
      throw new Error("STUB");
  })

  return refs.every(
    (ref) =>
      { throw new Error("STUB"); }
  )
    ? undefined
    : syncRefs
}
