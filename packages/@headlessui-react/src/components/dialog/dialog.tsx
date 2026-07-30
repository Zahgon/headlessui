'use client'

// WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/
import React, {
  Fragment,
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ContextType,
  type ElementType,
  type MutableRefObject,
  type MouseEvent as ReactMouseEvent,
  type Ref,
  type RefObject,
} from 'react'
import { useEscape } from '../../hooks/use-escape'
import { useEvent } from '../../hooks/use-event'
import { useId } from '../../hooks/use-id'
import { useInertOthers } from '../../hooks/use-inert-others'
import { useIsTouchDevice } from '../../hooks/use-is-touch-device'
import { useIsoMorphicEffect } from '../../hooks/use-iso-morphic-effect'
import { useOnDisappear } from '../../hooks/use-on-disappear'
import { useOutsideClick } from '../../hooks/use-outside-click'
import { useOwnerDocument } from '../../hooks/use-owner'
import {
  MainTreeProvider,
  useMainTreeNode,
  useRootContainers,
} from '../../hooks/use-root-containers'
import { useScrollLock } from '../../hooks/use-scroll-lock'
import { useServerHandoffComplete } from '../../hooks/use-server-handoff-complete'
import { useSlot } from '../../hooks/use-slot'
import { useSyncRefs } from '../../hooks/use-sync-refs'
import { CloseProvider } from '../../internal/close-provider'
import { ResetOpenClosedProvider, State, useOpenClosed } from '../../internal/open-closed'
import { ForcePortalRoot } from '../../internal/portal-force-root'
import { stackMachines } from '../../machines/stack-machine'
import { useSlice } from '../../react-glue'
import type { Props } from '../../types'
import { match } from '../../utils/match'
import {
  RenderFeatures,
  forwardRefWithAs,
  useRender,
  type HasDisplayName,
  type PropsForFeatures,
  type RefProp,
} from '../../utils/render'
import {
  Description,
  useDescriptions,
  type _internal_ComponentDescription,
} from '../description/description'
import { FocusTrap, FocusTrapFeatures } from '../focus-trap/focus-trap'
import { Portal, PortalGroup, useNestedPortals } from '../portal/portal'
import { Transition, TransitionChild } from '../transition/transition'

enum DialogStates {
  Open,
  Closed,
}

interface StateDefinition {
  titleId: string | null
  panelRef: MutableRefObject<HTMLElement | null>
}

enum ActionTypes {
  SetTitleId,
}

type Actions = { type: ActionTypes.SetTitleId; id: string | null }

let reducers: {
  [P in ActionTypes]: (
    state: StateDefinition,
    action: Extract<Actions, { type: P }>
  ) => StateDefinition
} = {
  [ActionTypes.SetTitleId](state, action) {
        throw new Error("STUB");
    },
}

let DialogContext = createContext<
  | [
      {
        dialogState: DialogStates
        unmount: boolean
        close: () => void
        setTitleId: (id: string | null) => void
      },
      StateDefinition,
    ]
  | null
>(null)
DialogContext.displayName = 'DialogContext'

function useDialogContext(component: string) {
  let context = useContext(DialogContext)
  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Dialog /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, useDialogContext)
    throw err
  }
  return context
}

function stateReducer(state: StateDefinition, action: Actions) {
    throw new Error("STUB");
}

// ---

let InternalDialog = forwardRefWithAs(function InternalDialog<
  TTag extends ElementType = typeof DEFAULT_DIALOG_TAG,
>(props: DialogProps<TTag>, ref: Ref<HTMLElement>) {
    throw new Error("STUB");
})

// ---

let DEFAULT_DIALOG_TAG = 'div' as const
type DialogRenderPropArg = {
  open: boolean
}
type DialogPropsWeControl = 'aria-describedby' | 'aria-labelledby' | 'aria-modal'

let DialogRenderFeatures = RenderFeatures.RenderStrategy | RenderFeatures.Static

export type DialogProps<TTag extends ElementType = typeof DEFAULT_DIALOG_TAG> = Props<
  TTag,
  DialogRenderPropArg,
  DialogPropsWeControl,
  PropsForFeatures<typeof DialogRenderFeatures> & {
    open?: boolean
    onClose: (value: boolean) => void
    initialFocus?: MutableRefObject<HTMLElement | null>
    role?: 'dialog' | 'alertdialog'
    autoFocus?: boolean
    transition?: boolean
    __demoMode?: boolean
  }
>

function DialogFn<TTag extends ElementType = typeof DEFAULT_DIALOG_TAG>(
  props: DialogProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_PANEL_TAG = 'div' as const
type PanelRenderPropArg = {
  open: boolean
}

export type DialogPanelProps<TTag extends ElementType = typeof DEFAULT_PANEL_TAG> = Props<
  TTag,
  PanelRenderPropArg,
  never,
  { transition?: boolean }
>

function PanelFn<TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
  props: DialogPanelProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_BACKDROP_TAG = 'div' as const
type BackdropRenderPropArg = {
  open: boolean
}

export type DialogBackdropProps<TTag extends ElementType = typeof DEFAULT_BACKDROP_TAG> = Props<
  TTag,
  BackdropRenderPropArg,
  never,
  { transition?: boolean }
>

function BackdropFn<TTag extends ElementType = typeof DEFAULT_BACKDROP_TAG>(
  props: DialogBackdropProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_TITLE_TAG = 'h2' as const
type TitleRenderPropArg = {
  open: boolean
}

export type DialogTitleProps<TTag extends ElementType = typeof DEFAULT_TITLE_TAG> = Props<
  TTag,
  TitleRenderPropArg
>

function TitleFn<TTag extends ElementType = typeof DEFAULT_TITLE_TAG>(
  props: DialogTitleProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentDialog extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_DIALOG_TAG>(
    props: DialogProps<TTag> & RefProp<typeof DialogFn>
  ): React.JSX.Element
}

export interface _internal_ComponentDialogPanel extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
    props: DialogPanelProps<TTag> & RefProp<typeof PanelFn>
  ): React.JSX.Element
}

export interface _internal_ComponentDialogBackdrop extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_BACKDROP_TAG>(
    props: DialogBackdropProps<TTag> & RefProp<typeof BackdropFn>
  ): React.JSX.Element
}

export interface _internal_ComponentDialogTitle extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_TITLE_TAG>(
    props: DialogTitleProps<TTag> & RefProp<typeof TitleFn>
  ): React.JSX.Element
}

export interface _internal_ComponentDialogDescription extends _internal_ComponentDescription {}

let DialogRoot = forwardRefWithAs(DialogFn) as _internal_ComponentDialog
export let DialogPanel = forwardRefWithAs(PanelFn) as _internal_ComponentDialogPanel
export let DialogBackdrop = forwardRefWithAs(BackdropFn) as _internal_ComponentDialogBackdrop
export let DialogTitle = forwardRefWithAs(TitleFn) as _internal_ComponentDialogTitle
/** @deprecated use `<Description>` instead of `<DialogDescription>` */
export let DialogDescription = Description as _internal_ComponentDialogDescription

export let Dialog = Object.assign(DialogRoot, {
  /** @deprecated use `<DialogPanel>` instead of `<Dialog.Panel>` */
  Panel: DialogPanel,
  /** @deprecated use `<DialogTitle>` instead of `<Dialog.Title>` */
  Title: DialogTitle,
  /** @deprecated use `<Description>` instead of `<Dialog.Description>` */
  Description: Description as _internal_ComponentDialogDescription,
})
