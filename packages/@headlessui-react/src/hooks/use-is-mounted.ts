import { useRef } from 'react'
import { useIsoMorphicEffect } from './use-iso-morphic-effect'

export function useIsMounted() {
  let mounted = useRef(false)

  useIsoMorphicEffect(() => {
      throw new Error("STUB");
  }, [])

  return mounted
}
