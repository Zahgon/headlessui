import React, { createContext, useContext } from 'react'

let DisabledContext = createContext<boolean | undefined>(undefined)

export function useDisabled() {
    throw new Error("STUB");
}

export function DisabledProvider({
  value,
  children,
}: React.PropsWithChildren<{ value?: boolean }>) {
    throw new Error("STUB");
}
