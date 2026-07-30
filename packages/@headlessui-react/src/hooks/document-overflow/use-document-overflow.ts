import { useStore } from '../../hooks/use-store'
import { useIsoMorphicEffect } from '../use-iso-morphic-effect'
import { overflows } from './overflow-store'

export function useDocumentOverflowLockedEffect(
  shouldBeLocked: boolean,
  doc: Document | null,
  meta: (meta: Record<string, any>) => Record<string, any> = () => { throw new Error("STUB"); }
) {
  let store = useStore(overflows)
  let entry = doc ? store.get(doc) : undefined
  let locked = entry ? entry.count > 0 : false

  useIsoMorphicEffect(() => {
      throw new Error("STUB");
  }, [shouldBeLocked, doc])

  return locked
}
