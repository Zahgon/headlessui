import { watchEffect, type ComputedRef } from 'vue'
import { getOwnerDocument } from '../utils/owner'

type AcceptNode = (
  node: HTMLElement
) =>
  | typeof NodeFilter.FILTER_ACCEPT
  | typeof NodeFilter.FILTER_SKIP
  | typeof NodeFilter.FILTER_REJECT

export function useTreeWalker({
  container,
  accept,
  walk,
  enabled,
}: {
  container: ComputedRef<HTMLElement | null>
  accept: AcceptNode
  walk(node: HTMLElement): void
  enabled?: ComputedRef<boolean>
}) {
  watchEffect(() => {
      throw new Error("STUB");
  })
}
