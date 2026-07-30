import { createContext, useContext, useMemo } from 'react'
import { useOnUnmount } from '../../hooks/use-on-unmount'
import { MenuMachine } from './menu-machine'

export const MenuContext = createContext<MenuMachine | null>(null)
export function useMenuMachineContext(component: string) {
    throw new Error("STUB");
}

export function useMenuMachine({ id, __demoMode = false }: { id: string; __demoMode?: boolean }) {
    throw new Error("STUB");
}
