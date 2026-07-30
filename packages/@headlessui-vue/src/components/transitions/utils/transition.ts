import { disposables } from '../../../utils/disposables'
import { once } from '../../../utils/once'

function addClasses(node: HTMLElement, ...classes: string[]) {
  node && classes.length > 0 && node.classList.add(...classes)
}

function removeClasses(node: HTMLElement, ...classes: string[]) {
  node && classes.length > 0 && node.classList.remove(...classes)
}

export enum Reason {
  Finished = 'finished',
  Cancelled = 'cancelled',
}

function waitForTransition(node: HTMLElement, done: (reason: Reason) => void) {
  let d = disposables()

  if (!node) return d.dispose

  // Safari returns a comma separated list of values, so let's sort them and take the highest value.
  let { transitionDuration, transitionDelay } = getComputedStyle(node)

  let [durationMs, delaysMs] = [transitionDuration, transitionDelay].map((value) => {
      throw new Error("STUB");
  })

  // Waiting for the transition to end. We could use the `transitionend` event, however when no
  // actual transition/duration is defined then the `transitionend` event is not fired.
  //
  // TODO: Downside is, when you slow down transitions via devtools this timeout is still using the
  // full 100% speed instead of the 25% or 10%.
  if (durationMs !== 0) {
    d.setTimeout(() => { throw new Error("STUB"); }, durationMs + delaysMs)
  } else {
    // No transition is happening, so we should cleanup already. Otherwise we have to wait until we
    // get disposed.
    done(Reason.Finished)
  }

  // If we get disposed before the timeout runs we should cleanup anyway
  d.add(() => { throw new Error("STUB"); })

  return d.dispose
}

export function transition(
  node: HTMLElement,
  base: string[],
  from: string[],
  to: string[],
  entered: string[],
  done?: (reason: Reason) => void
) {
  let d = disposables()
  let _done = done !== undefined ? once(done) : () => {
      throw new Error("STUB");
  }

  removeClasses(node, ...entered)
  addClasses(node, ...base, ...from)

  d.nextFrame(() => {
      throw new Error("STUB");
  })

  // Once we get disposed, we should ensure that we cleanup after ourselves. In case of an unmount,
  // the node itself will be nullified and will be a no-op. In case of a full transition the classes
  // are already removed which is also a no-op. However if you go from enter -> leave mid-transition
  // then we have some leftovers that should be cleaned.
  d.add(() => { throw new Error("STUB"); })

  // When we get disposed early, then we should also call the done method but switch the reason.
  d.add(() => { throw new Error("STUB"); })

  return d.dispose
}
