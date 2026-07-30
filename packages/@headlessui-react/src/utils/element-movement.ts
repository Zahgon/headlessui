import { disposables } from './disposables'

export const ElementPositionState = {
  Idle: { kind: 'Idle' as const },
  Tracked: (position: string) => { throw new Error("STUB"); },
  Moved: { kind: 'Moved' as const },
}

type ResolvedStates<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : T[K]
}[keyof T]

export type ElementPositionState = ResolvedStates<typeof ElementPositionState>

export function computeVisualPosition(element: HTMLElement): string {
  let rect = element.getBoundingClientRect()
  return `${rect.x},${rect.y}`
}

export function detectMovement(
  target: HTMLElement,
  state: ResolvedStates<typeof ElementPositionState>,
  onMove: () => void
) {
    throw new Error("STUB");
}
