import React, { cloneElement, isValidElement, useState } from 'react'

function FrozenFn(
  { children, freeze }: { children: React.ReactNode; freeze: boolean },
  ref: React.ForwardedRef<HTMLElement>
) {
    throw new Error("STUB");
}

export const Frozen = React.forwardRef(FrozenFn)

export function useFrozenData<T>(freeze: boolean, data: T) {
    throw new Error("STUB");
}
