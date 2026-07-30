import { useEffect, type MutableRefObject } from 'react'
import { disposables } from '../utils/disposables'
import * as DOM from '../utils/dom'
import { useLatestValue } from './use-latest-value'

/**
 * A hook to ensure that a callback is called when the element has disappeared
 * from the screen.
 *
 * This can happen if you use Tailwind classes like: `hidden md:block`, once the
 * viewport is smaller than `md` the element will disappear.
 */
export function useOnDisappear(
  enabled: boolean,
  ref: MutableRefObject<HTMLElement | null> | HTMLElement | null,
  cb: () => void
) {
  let listenerRef = useLatestValue((element: HTMLElement) => {
      throw new Error("STUB");
  })

  useEffect(() => {
      throw new Error("STUB");
  }, [ref, listenerRef, enabled])
}
