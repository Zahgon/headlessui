'use client'

// WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import React, {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ContextType,
  type Dispatch,
  type ElementType,
  type MutableRefObject,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type Ref,
} from 'react'
import { useActivePress } from '../../hooks/use-active-press'
import { useEvent } from '../../hooks/use-event'
import { useId } from '../../hooks/use-id'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import { useSlot } from '../../hooks/use-slot'
import { optionalRef, useSyncRefs } from '../../hooks/use-sync-refs'
import { transitionDataAttributes, useTransition } from '../../hooks/use-transition'
import { CloseProvider } from '../../internal/close-provider'
import {
  OpenClosedProvider,
  ResetOpenClosedProvider,
  State,
  useOpenClosed,
} from '../../internal/open-closed'
import type { Props } from '../../types'
import { isDisabledReactIssue7711 } from '../../utils/bugs'
import * as DOM from '../../utils/dom'
import { match } from '../../utils/match'
import { getOwnerDocument } from '../../utils/owner'
import {
  RenderFeatures,
  forwardRefWithAs,
  isFragment,
  mergeProps,
  useRender,
  type HasDisplayName,
  type PropsForFeatures,
  type RefProp,
} from '../../utils/render'
import { startTransition } from '../../utils/start-transition'
import { Keys } from '../keyboard'

enum DisclosureStates {
  Open,
  Closed,
}

interface StateDefinition {
  disclosureState: DisclosureStates

  buttonElement: HTMLButtonElement | null
  panelElement: HTMLElement | null

  buttonId: string | null
  panelId: string | null
}

enum ActionTypes {
  ToggleDisclosure,
  CloseDisclosure,

  SetButtonId,
  SetPanelId,

  SetButtonElement,
  SetPanelElement,
}

type Actions =
  | { type: ActionTypes.ToggleDisclosure }
  | { type: ActionTypes.CloseDisclosure }
  | { type: ActionTypes.SetButtonId; buttonId: string | null }
  | { type: ActionTypes.SetPanelId; panelId: string | null }
  | { type: ActionTypes.SetButtonElement; element: HTMLButtonElement | null }
  | { type: ActionTypes.SetPanelElement; element: HTMLElement | null }

let reducers: {
  [P in ActionTypes]: (
    state: StateDefinition,
    action: Extract<Actions, { type: P }>
  ) => StateDefinition
} = {
  [ActionTypes.ToggleDisclosure]: (state) => { throw new Error("STUB"); },
  [ActionTypes.CloseDisclosure]: (state) => {
      throw new Error("STUB");
  },
  [ActionTypes.SetButtonId](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.SetPanelId](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.SetButtonElement](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.SetPanelElement](state, action) {
      throw new Error("STUB");
  },
}

let DisclosureContext = createContext<[StateDefinition, Dispatch<Actions>] | null>(null)
DisclosureContext.displayName = 'DisclosureContext'

function useDisclosureContext(component: string) {
  let context = useContext(DisclosureContext)
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Disclosure /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, useDisclosureContext)
    throw err
  }
  return context
}

let DisclosureAPIContext = createContext<{
  close: (focusableElement?: HTMLElement | MutableRefObject<HTMLElement | null>) => void
} | null>(null)
DisclosureAPIContext.displayName = 'DisclosureAPIContext'

function useDisclosureAPIContext(component: string) {
    throw new Error("STUB");
}

let DisclosurePanelContext = createContext<string | null>(null)
DisclosurePanelContext.displayName = 'DisclosurePanelContext'

function useDisclosurePanelContext() {
  return useContext(DisclosurePanelContext)
}

function stateReducer(state: StateDefinition, action: Actions) {
    throw new Error("STUB");
}

// ---

let DEFAULT_DISCLOSURE_TAG = Fragment
type DisclosureRenderPropArg = {
  open: boolean
  close: (focusableElement?: HTMLElement | MutableRefObject<HTMLElement | null>) => void
}
type DisclosurePropsWeControl = never

export type DisclosureProps<TTag extends ElementType = typeof DEFAULT_DISCLOSURE_TAG> = Props<
  TTag,
  DisclosureRenderPropArg,
  DisclosurePropsWeControl,
  {
    defaultOpen?: boolean
  }
>

function DisclosureFn<TTag extends ElementType = typeof DEFAULT_DISCLOSURE_TAG>(
  props: DisclosureProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_BUTTON_TAG = 'button' as const
type ButtonRenderPropArg = {
  open: boolean
  hover: boolean
  active: boolean
  disabled: boolean
  focus: boolean
  autofocus: boolean
}
type ButtonPropsWeControl = 'aria-controls' | 'aria-expanded'

export type DisclosureButtonProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> = Props<
  TTag,
  ButtonRenderPropArg,
  ButtonPropsWeControl,
  {
    disabled?: boolean
    autoFocus?: boolean
  }
>

function ButtonFn<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  props: DisclosureButtonProps<TTag>,
  ref: Ref<HTMLButtonElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_PANEL_TAG = 'div' as const
type PanelRenderPropArg = {
  open: boolean
  close: (focusableElement?: HTMLElement | MutableRefObject<HTMLElement | null>) => void
}
type DisclosurePanelPropsWeControl = never

let PanelRenderFeatures = RenderFeatures.RenderStrategy | RenderFeatures.Static

export type DisclosurePanelProps<TTag extends ElementType = typeof DEFAULT_PANEL_TAG> = Props<
  TTag,
  PanelRenderPropArg,
  DisclosurePanelPropsWeControl,
  { transition?: boolean } & PropsForFeatures<typeof PanelRenderFeatures>
>

function PanelFn<TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
  props: DisclosurePanelProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentDisclosure extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_DISCLOSURE_TAG>(
    props: DisclosureProps<TTag> & RefProp<typeof DisclosureFn>
  ): React.JSX.Element
}

export interface _internal_ComponentDisclosureButton extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
    props: DisclosureButtonProps<TTag> & RefProp<typeof ButtonFn>
  ): React.JSX.Element
}

export interface _internal_ComponentDisclosurePanel extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
    props: DisclosurePanelProps<TTag> & RefProp<typeof PanelFn>
  ): React.JSX.Element
}

let DisclosureRoot = forwardRefWithAs(DisclosureFn) as _internal_ComponentDisclosure
export let DisclosureButton = forwardRefWithAs(ButtonFn) as _internal_ComponentDisclosureButton
export let DisclosurePanel = forwardRefWithAs(PanelFn) as _internal_ComponentDisclosurePanel

export let Disclosure = Object.assign(DisclosureRoot, {
  /** @deprecated use `<DisclosureButton>` instead of `<Disclosure.Button>` */
  Button: DisclosureButton,
  /** @deprecated use `<DisclosurePanel>` instead of `<Disclosure.Panel>` */
  Panel: DisclosurePanel,
})
