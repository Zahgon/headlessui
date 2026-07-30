import { useMemo } from 'react'
import { getOwnerDocument, getRootNode } from '../utils/owner'

export function useOwnerDocument(...args: Parameters<typeof getOwnerDocument>) {
  return useMemo(() => { throw new Error("STUB"); }, [...args])
}

export function useRootDocument(...args: Parameters<typeof getRootNode>) {
    throw new Error("STUB");
}
