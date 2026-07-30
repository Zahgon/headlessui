import { computed, watch, type Ref } from 'vue'
import { useStore } from '../../hooks/use-store'
import { overflows, type MetaFn } from './overflow-store'

export function useDocumentOverflowLockedEffect(
  doc: Ref<Document | null>,
  shouldBeLocked: Ref<boolean>,
  meta: MetaFn
) {
  let store = useStore(overflows)
  let locked = computed(() => {
      throw new Error("STUB");
  })

  watch(
    [doc, shouldBeLocked],
    ([doc, shouldBeLocked], [oldDoc], onInvalidate) => {
        throw new Error("STUB");
    },
    {
      immediate: true,
    }
  )

  return locked
}
