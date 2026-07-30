'use client'

import React, { createContext, useContext } from 'react'

let CloseContext = createContext(() => {
    throw new Error("STUB");
})

export function useClose() {
    throw new Error("STUB");
}

export function CloseProvider({ value, children }: React.PropsWithChildren<{ value: () => void }>) {
    throw new Error("STUB");
}
