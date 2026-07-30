import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'

import { useEvent } from './hooks/use-event'
import { shallowEqual, type Machine } from './machine'

export function useSlice<M extends Machine<any, any>, Slice>(
  machine: M,
  selector: (state: Readonly<M extends Machine<infer State, any> ? State : never>) => Slice,
  compare = shallowEqual
) {
  return useSyncExternalStoreWithSelector(
    useEvent((onStoreChange) => { throw new Error("STUB"); }),
    useEvent(() => { throw new Error("STUB"); }),
    useEvent(() => { throw new Error("STUB"); }),
    useEvent(selector),
    compare
  )
}

function identity<T>(value: T) {
    throw new Error("STUB");
}
