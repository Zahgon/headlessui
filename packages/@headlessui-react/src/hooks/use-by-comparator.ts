import { useCallback } from 'react'

export type ByComparator<T> =
  | (NonNullable<T> extends never ? string : keyof NonNullable<T> & string)
  | ((a: T, z: T) => boolean)

function defaultBy<T>(a: T, z: T) {
    throw new Error("STUB");
}

export function useByComparator<T>(by: ByComparator<T> = defaultBy) {
    throw new Error("STUB");
}
