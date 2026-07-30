import { useRef, type MutableRefObject } from 'react'
import { getTextValue } from '../utils/get-text-value'
import { useEvent } from './use-event'

export function useTextValue(element: MutableRefObject<HTMLElement | null>) {
  let cacheKey = useRef<string>('')
  let cacheValue = useRef<string>('')

  return useEvent(() => {
      throw new Error("STUB");
  })
}
