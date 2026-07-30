import { ref, type Ref } from 'vue'
import { dom } from '../utils/dom'
import { getTextValue } from '../utils/get-text-value'

export function useTextValue(element: Ref<HTMLElement | null>) {
  let cacheKey = ref<string>('')
  let cacheValue = ref<string>('')

  return () => {
      throw new Error("STUB");
  }
}
