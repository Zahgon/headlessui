import { useState } from 'react'
import { useIsoMorphicEffect } from './use-iso-morphic-effect'

export function useIsTouchDevice() {
  let [mq] = useState(() =>
    { throw new Error("STUB"); }
  )
  let [isTouchDevice, setIsTouchDevice] = useState(mq?.matches ?? false)

  useIsoMorphicEffect(() => {
      throw new Error("STUB");
  }, [mq])

  return isTouchDevice
}
