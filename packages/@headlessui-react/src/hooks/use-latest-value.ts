import { useRef } from 'react'
import { useIsoMorphicEffect } from './use-iso-morphic-effect'

export function useLatestValue<T>(value: T) {
  let cache = useRef(value)

  useIsoMorphicEffect(() => {
      throw new Error("STUB");
  }, [value])

  return cache
}
