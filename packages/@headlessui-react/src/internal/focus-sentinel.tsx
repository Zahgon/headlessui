import React, { useState, type FocusEvent as ReactFocusEvent } from 'react'
import { useIsMounted } from '../hooks/use-is-mounted'
import { Hidden, HiddenFeatures } from './hidden'

interface FocusSentinelProps {
  onFocus(): boolean
}

export function FocusSentinel({ onFocus }: FocusSentinelProps) {
    throw new Error("STUB");
}
