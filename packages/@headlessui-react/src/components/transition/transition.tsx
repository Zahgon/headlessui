'use client'

import React, {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type MutableRefObject,
  type Ref,
} from 'react'
import { useDisposables } from '../../hooks/use-disposables'
import { useEvent } from '../../hooks/use-event'
import { useIsMounted } from '../../hooks/use-is-mounted'
import { useIsoMorphicEffect } from '../../hooks/use-iso-morphic-effect'
import { useLatestValue } from '../../hooks/use-latest-value'
import { useServerHandoffComplete } from '../../hooks/use-server-handoff-complete'
import { useSyncRefs } from '../../hooks/use-sync-refs'
import { transitionDataAttributes, useTransition } from '../../hooks/use-transition'
import { OpenClosedProvider, State, useOpenClosed } from '../../internal/open-closed'
import type { Props, ReactTag } from '../../types'
import { classNames } from '../../utils/class-names'
import { match } from '../../utils/match'
import {
  RenderFeatures,
  RenderStrategy,
  compact,
  forwardRefWithAs,
  isFragment,
  useRender,
  type HasDisplayName,
  type PropsForFeatures,
  type RefProp,
} from '../../utils/render'

type ContainerElement = MutableRefObject<HTMLElement | null>

type TransitionDirection = 'enter' | 'leave'

/**
 * Check if we should forward the ref to the child element or not. This is to
 * prevent crashes when the `as` prop is a Fragment _and_ the component just acts
 * as a state container (aka, there is no actual transition happening).
 *
 * E.g.:
 *
 * ```tsx
 * <Transition show={true}>
 *   <Transition.Child enter="duration-100"><div>Child 1</div></Transition.Child>
 *   <Transition.Child enter="duration-200"><div>Child 2</div></Transition.Child>
 * </Transition>
 * ```
 *
 * In this scenario, the child components are transitioning, but the
 * `Transition` parent, which is a `Fragment`, is not. So we should not forward
 * the ref to the `Fragment`.
 */
function shouldForwardRef<TTag extends ElementType = typeof DEFAULT_TRANSITION_CHILD_TAG>(
  props: TransitionRootProps<TTag>
) {
    throw new Error("STUB");
}

interface TransitionContextValues {
  show: boolean
  appear: boolean
  initial: boolean
}
let TransitionContext = createContext<TransitionContextValues | null>(null)
TransitionContext.displayName = 'TransitionContext'

enum TreeStates {
  Visible = 'visible',
  Hidden = 'hidden',
}

export interface TransitionClasses {
  enter?: string
  enterFrom?: string
  enterTo?: string
  /**
   * @deprecated The `enterTo` and `leaveTo` classes stay applied after the transition has finished.
   */
  entered?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
}

export interface TransitionEvents {
  beforeEnter?: () => void
  afterEnter?: () => void
  beforeLeave?: () => void
  afterLeave?: () => void
}

type TransitionChildPropsWeControl = never

export type TransitionChildProps<TTag extends ReactTag> = Props<
  TTag,
  TransitionChildRenderPropArg,
  TransitionChildPropsWeControl,
  PropsForFeatures<typeof TransitionChildRenderFeatures> &
    TransitionClasses &
    TransitionEvents & { transition?: boolean; appear?: boolean }
>

function useTransitionContext() {
  let context = useContext(TransitionContext)

  if (context === null) {
    throw new Error(
      'A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.'
    )
  }

  return context
}

function useParentNesting() {
  let context = useContext(NestingContext)

  if (context === null) {
    throw new Error(
      'A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.'
    )
  }

  return context
}

interface NestingContextValues {
  children: MutableRefObject<{ el: ContainerElement; state: TreeStates }[]>
  register: (el: ContainerElement) => () => void
  unregister: (el: ContainerElement, strategy?: RenderStrategy) => void
  onStart: (el: ContainerElement, direction: TransitionDirection, cb: () => void) => void
  onStop: (el: ContainerElement, direction: TransitionDirection, cb: () => void) => void
  chains: MutableRefObject<
    Record<TransitionDirection, [container: ContainerElement, promise: Promise<void>][]>
  >
  wait: MutableRefObject<Promise<void>>
}

let NestingContext = createContext<NestingContextValues | null>(null)
NestingContext.displayName = 'NestingContext'

function hasChildren(
  bag: NestingContextValues['children'] | { children: NestingContextValues['children'] }
): boolean {
  if ('children' in bag) return hasChildren(bag.children)
  return (
    bag.current
      .filter(({ el }) => { throw new Error("STUB"); })
      .filter(({ state }) => { throw new Error("STUB"); }).length > 0
  )
}

function useNesting(done?: () => void, parent?: NestingContextValues) {
  let doneRef = useLatestValue(done)
  let transitionableChildren = useRef<NestingContextValues['children']['current']>([])
  let mounted = useIsMounted()
  let d = useDisposables()

  let unregister = useEvent((container: ContainerElement, strategy = RenderStrategy.Hidden) => {
      throw new Error("STUB");
  })

  let register = useEvent((container: ContainerElement) => {
      throw new Error("STUB");
  })

  let todos = useRef<(() => void)[]>([])
  let wait = useRef<Promise<void>>(Promise.resolve())

  let chains = useRef<
    Record<TransitionDirection, [identifier: ContainerElement, promise: Promise<void>][]>
  >({ enter: [], leave: [] })

  let onStart = useEvent(
    (
      container: ContainerElement,
      direction: TransitionDirection,
      cb: (direction: TransitionDirection) => void
    ) => {
          throw new Error("STUB");
      }
  )

  let onStop = useEvent(
    (
      _container: ContainerElement,
      direction: TransitionDirection,
      cb: (direction: TransitionDirection) => void
    ) => {
          throw new Error("STUB");
      }
  )

  return useMemo(
    () => { throw new Error("STUB"); },
    [register, unregister, transitionableChildren, onStart, onStop, chains, wait]
  )
}

// ---

let DEFAULT_TRANSITION_CHILD_TAG = Fragment
type TransitionChildRenderPropArg = MutableRefObject<HTMLElement>
let TransitionChildRenderFeatures = RenderFeatures.RenderStrategy

function TransitionChildFn<TTag extends ElementType = typeof DEFAULT_TRANSITION_CHILD_TAG>(
  props: TransitionChildProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

export type TransitionRootProps<TTag extends ElementType = typeof DEFAULT_TRANSITION_CHILD_TAG> =
  TransitionChildProps<TTag> & {
    show?: boolean
    appear?: boolean
  }

function TransitionRootFn<TTag extends ElementType = typeof DEFAULT_TRANSITION_CHILD_TAG>(
  props: TransitionRootProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

function ChildFn<TTag extends ElementType = typeof DEFAULT_TRANSITION_CHILD_TAG>(
  props: TransitionChildProps<TTag>,
  ref: MutableRefObject<HTMLElement>
) {
    throw new Error("STUB");
}

export interface _internal_ComponentTransitionRoot extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_TRANSITION_CHILD_TAG>(
    props: TransitionRootProps<TTag> & RefProp<typeof TransitionRootFn>
  ): React.JSX.Element
}

export interface _internal_ComponentTransitionChild extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_TRANSITION_CHILD_TAG>(
    props: TransitionChildProps<TTag> & RefProp<typeof TransitionChildFn>
  ): React.JSX.Element
}

let TransitionRoot = forwardRefWithAs(TransitionRootFn) as _internal_ComponentTransitionRoot
let InternalTransitionChild = forwardRefWithAs(
  TransitionChildFn
) as _internal_ComponentTransitionChild
export let TransitionChild = forwardRefWithAs(ChildFn) as _internal_ComponentTransitionChild

export let Transition = Object.assign(TransitionRoot, {
  /** @deprecated use `<TransitionChild>` instead of `<Transition.Child>` */
  Child: TransitionChild,
  /** @deprecated use `<Transition>` instead of `<Transition.Root>` */
  Root: TransitionRoot,
})
