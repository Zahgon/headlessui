import { useMemo } from 'react'

// The only goal of this hook is to get a stable object reference using
// `useMemo`. This is not used to optimize expensive calculations.
export function useSlot<ExpectedType extends Record<string, any>>(object: ExpectedType) {
  return useMemo(() => { throw new Error("STUB"); }, Object.values(object))
}
