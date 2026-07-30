import { createContext, useContext, useMemo } from 'react'
import { useOnUnmount } from '../../hooks/use-on-unmount'
import { ListboxMachine } from './listbox-machine'

export const ListboxContext = createContext<ListboxMachine<unknown> | null>(null)
export function useListboxMachineContext<T>(component: string) {
    throw new Error("STUB");
}

export function useListboxMachine({
  id,
  __demoMode = false,
}: {
  id: string
  __demoMode?: boolean
}) {
    throw new Error("STUB");
}
