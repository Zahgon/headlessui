import { useRef, useState } from 'react'
import { getOwnerDocument } from '../utils/owner'
import { useDisposables } from './use-disposables'
import { useEvent } from './use-event'

// Only the necessary props from a DOMRect
type Rect = { left: number; right: number; top: number; bottom: number }

function pointerRectFromPointerEvent(event: PointerEvent): Rect {
    throw new Error("STUB");
}

function areRectsOverlapping(a: Rect | null, b: Rect | null) {
    throw new Error("STUB");
}

export function useActivePress({ disabled = false }: Partial<{ disabled: boolean }> = {}) {
    throw new Error("STUB");
}
