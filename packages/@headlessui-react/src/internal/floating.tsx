import {
  autoUpdate,
  flip as flipMiddleware,
  inner as innerMiddleware,
  offset as offsetMiddleware,
  shift as shiftMiddleware,
  size as sizeMiddleware,
  useFloating,
  useInnerOffset,
  useInteractions,
  type InnerProps,
  type UseFloatingReturn,
} from '@floating-ui/react'
import * as React from 'react'
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { useDisposables } from '../hooks/use-disposables'
import { useEvent } from '../hooks/use-event'
import { useIsoMorphicEffect } from '../hooks/use-iso-morphic-effect'
import * as DOM from '../utils/dom'

type Align = 'start' | 'end'
type Placement = 'top' | 'right' | 'bottom' | 'left'
type AnchorTo = `${Placement}` | `${Placement} ${Align}`
type AnchorToWithSelection = `${Placement | 'selection'}` | `${Placement | 'selection'} ${Align}`

type BaseAnchorProps = {
  /**
   * The `gap` is the space between the trigger and the panel.
   */
  gap: number | string // For `var()` support

  /**
   * The `offset` is the amount the panel should be nudged from its original position.
   */
  offset: number | string // For `var()` support

  /**
   * The `padding` is the minimum space between the panel and the viewport.
   */
  padding: number | string // For `var()` support
}

export type AnchorProps =
  | false // Disable entirely
  | AnchorTo // String value to define the placement
  | Partial<
      BaseAnchorProps & {
        /**
         * The `to` value defines which side of the trigger the panel should be placed on and its
         * alignment.
         */
        to: AnchorTo
      }
    >

export type AnchorPropsWithSelection =
  | false // Disable entirely
  | AnchorToWithSelection
  | Partial<
      BaseAnchorProps & {
        /**
         * The `to` value defines which side of the trigger the panel should be placed on and its
         * alignment.
         */
        to: AnchorToWithSelection
      }
    >

export type InternalFloatingPanelProps = Partial<{
  inner: {
    listRef: InnerProps['listRef']
    index: InnerProps['index']
  }
}>

let FloatingContext = createContext<{
  styles?: UseFloatingReturn<any>['floatingStyles']
  setReference: UseFloatingReturn<any>['refs']['setReference']
  setFloating: UseFloatingReturn<any>['refs']['setFloating']
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps']
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps']
  slot: Partial<{
    anchor: AnchorToWithSelection
  }>
}>({
  styles: undefined,
  setReference: () => {
      throw new Error("STUB");
  },
  setFloating: () => {
      throw new Error("STUB");
  },
  getReferenceProps: () => { throw new Error("STUB"); },
  getFloatingProps: () => { throw new Error("STUB"); },
  slot: {},
})
FloatingContext.displayName = 'FloatingContext'
let PlacementContext = createContext<
  ((value: Exclude<AnchorPropsWithSelection, boolean> | null) => void) | null
>(null)
PlacementContext.displayName = 'PlacementContext'

export function useResolvedAnchor<T extends AnchorProps | AnchorPropsWithSelection>(
  anchor?: T
): Exclude<T, boolean | string> | null {
    throw new Error("STUB");
}

export function useFloatingReference() {
    throw new Error("STUB");
}

export function useFloatingReferenceProps() {
    throw new Error("STUB");
}

export function useFloatingPanelProps() {
    throw new Error("STUB");
}

export function useFloatingPanel(
  placement: (AnchorPropsWithSelection & InternalFloatingPanelProps) | null = null
) {
    throw new Error("STUB");
}

// TODO: Make this a config part of the `config`. Just need to decide on a name.
let MINIMUM_ITEMS_VISIBLE = 4

export function FloatingProvider({
  children,
  enabled = true,
}: {
  children: React.ReactNode
  enabled?: boolean
}) {
    throw new Error("STUB");
}

function useFixScrollingPixel(element: HTMLElement | null) {
    throw new Error("STUB");
}

function useResolvedConfig(
  config: (Exclude<AnchorPropsWithSelection, boolean | string> & InternalFloatingPanelProps) | null,
  element?: HTMLElement | null
) {
    throw new Error("STUB");
}

function useResolvePxValue(
  input?: string | number,
  element?: HTMLElement | null,
  defaultValue: number | undefined = undefined
) {
    throw new Error("STUB");
}

function resolveVariables(value: string): string[] {
    throw new Error("STUB");
}

function resolveCSSVariablePxValue(input: string, element: HTMLElement) {
    throw new Error("STUB");
}
