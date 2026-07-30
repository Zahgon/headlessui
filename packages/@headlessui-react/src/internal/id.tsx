import React, { createContext, useContext } from 'react'

let IdContext = createContext<string | undefined>(undefined)

export function useProvidedId() {
    throw new Error("STUB");
}

export function IdProvider({ id, children }: React.PropsWithChildren<{ id: string | undefined }>) {
    throw new Error("STUB");
}
