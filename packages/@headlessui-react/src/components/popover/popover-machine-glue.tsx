import { createContext, useContext, useMemo } from 'react'
import { useOnUnmount } from '../../hooks/use-on-unmount'
import { PopoverMachine } from './popover-machine'

export const PopoverContext = createContext<PopoverMachine | null>(null)
export function usePopoverMachineContext(component: string) {
    throw new Error("STUB");
}

export function usePopoverMachine({
  id,
  __demoMode = false,
}: {
  id: string
  __demoMode?: boolean
}) {
    throw new Error("STUB");
}
