import { ref, watchEffect, type Ref } from 'vue'
import { dom } from '../utils/dom'

let originals = new Map<HTMLElement, { 'aria-hidden': string | null; inert: boolean }>()
let counts = new Map<HTMLElement, number>()

export function useInert<TElement extends HTMLElement>(
  node: Ref<TElement | null>,
  enabled: Ref<boolean> = ref(true)
) {
  watchEffect((onInvalidate) => {
      throw new Error("STUB");
  })
}
