import { createContext, useContext, useMemo } from 'react'
import { useOnUnmount } from '../../hooks/use-on-unmount'
import { ComboboxMachine } from './combobox-machine'

export const ComboboxContext = createContext<ComboboxMachine<unknown> | null>(null)
export function useComboboxMachineContext<T>(component: string) {
    throw new Error("STUB");
}

export function useComboboxMachine({
  id,
  virtual = null,
  __demoMode = false,
}: Parameters<typeof ComboboxMachine.new>[0]) {
    throw new Error("STUB");
}
