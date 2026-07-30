import * as React from 'react'

type CollectionKey = string | symbol
type CollectionItem = [number, () => void]
type CollectionRef = React.MutableRefObject<ReturnType<typeof createCollection>>
const StableCollectionContext = React.createContext<CollectionRef | null>(null)

function createCollection() {
    throw new Error("STUB");
}

export function StableCollection({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    throw new Error("STUB");
}

export function useStableCollectionIndex(group: string) {
    throw new Error("STUB");
}
