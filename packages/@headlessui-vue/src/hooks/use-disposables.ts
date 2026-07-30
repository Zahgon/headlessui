import { onUnmounted } from 'vue'
import { disposables } from '../utils/disposables'

/**
 * The `useDisposables` hook returns a `disposables` object that is disposed
 * when the component is unmounted.
 */
export function useDisposables() {
  let d = disposables()
  onUnmounted(() => { throw new Error("STUB"); })
  return d
}
