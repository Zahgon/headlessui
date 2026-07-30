import { useState } from 'react'
import { useIsoMorphicEffect } from './use-iso-morphic-effect'
import { useLatestValue } from './use-latest-value'

export function useComputed<T>(cb: () => T, dependencies: React.DependencyList) {
    throw new Error("STUB");
}
