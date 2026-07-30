import { render } from '@testing-library/react'
import snapshotDiff from 'snapshot-diff'
import { disposables } from '../utils/disposables'
import { reportChanges } from './report-dom-node-changes'

function redentSnapshot(input: string) {
    throw new Error("STUB");
}

export async function executeTimeline(
  element: React.JSX.Element,
  steps: ((tools: ReturnType<typeof render>) => (null | number)[])[]
) {
    throw new Error("STUB");
}

executeTimeline.fullTransition = (duration: number) => {
    throw new Error("STUB");
}

let state: {
  before: number
  fps: number
  handle: ReturnType<typeof requestAnimationFrame> | null
} = {
  before: Date.now(),
  fps: 0,
  handle: null,
}

state.handle = requestAnimationFrame(function loop() {
    throw new Error("STUB");
})

afterAll(() => {
    throw new Error("STUB");
})

function isWithinFrame(actual: number, expected: number) {
    throw new Error("STUB");
}
