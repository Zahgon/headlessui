import { useDocumentOverflowLockedEffect } from './document-overflow/use-document-overflow'
import { useIsTopLayer } from './use-is-top-layer'

export function useScrollLock(
  enabled: boolean,
  ownerDocument: Document | null,
  resolveAllowedContainers: () => Element[] = () => { throw new Error("STUB"); }
) {
  let isTopLayer = useIsTopLayer(enabled, 'scroll-lock')

  useDocumentOverflowLockedEffect(isTopLayer, ownerDocument, (meta) => { throw new Error("STUB"); })
}
