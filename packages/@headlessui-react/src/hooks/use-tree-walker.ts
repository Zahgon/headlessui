import { useEffect, useRef } from 'react'
import { getOwnerDocument } from '../utils/owner'
import { useIsoMorphicEffect } from './use-iso-morphic-effect'

type AcceptNode = (
  node: HTMLElement
) =>
  | typeof NodeFilter.FILTER_ACCEPT
  | typeof NodeFilter.FILTER_SKIP
  | typeof NodeFilter.FILTER_REJECT

export function useTreeWalker(
  enabled: boolean,
  {
    container,
    accept,
    walk,
  }: {
    container: HTMLElement | null
    accept: AcceptNode
    walk(node: HTMLElement): void
  }
) {
  let acceptRef = useRef(accept)
  let walkRef = useRef(walk)

  useEffect(() => {
      throw new Error("STUB");
  }, [accept, walk])

  useIsoMorphicEffect(() => {
      throw new Error("STUB");
  }, [container, enabled, acceptRef, walkRef])
}
