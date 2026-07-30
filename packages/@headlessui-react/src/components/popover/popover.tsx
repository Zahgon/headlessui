'use client'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ContextType,
  type ElementType,
  type MouseEventHandler,
  type MutableRefObject,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type Ref,
} from 'react'
import { useActivePress } from '../../hooks/use-active-press'
import { useElementSize } from '../../hooks/use-element-size'
import { useEvent } from '../../hooks/use-event'
import { useEventListener } from '../../hooks/use-event-listener'
import { useId } from '../../hooks/use-id'
import { useIsoMorphicEffect } from '../../hooks/use-iso-morphic-effect'
import { useLatestValue } from '../../hooks/use-latest-value'
import { useOnDisappear } from '../../hooks/use-on-disappear'
import { useOutsideClick } from '../../hooks/use-outside-click'
import { useOwnerDocument, useRootDocument } from '../../hooks/use-owner'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import {
  MainTreeProvider,
  useMainTreeNode,
  useRootContainers,
} from '../../hooks/use-root-containers'
import { useScrollLock } from '../../hooks/use-scroll-lock'
import { useSlot } from '../../hooks/use-slot'
import { optionalRef, useSyncRefs } from '../../hooks/use-sync-refs'
import { Direction as TabDirection, useTabDirection } from '../../hooks/use-tab-direction'
import { transitionDataAttributes, useTransition } from '../../hooks/use-transition'
import { CloseProvider } from '../../internal/close-provider'
import {
  FloatingProvider,
  useFloatingPanel,
  useFloatingPanelProps,
  useFloatingReference,
  useResolvedAnchor,
  type AnchorProps,
} from '../../internal/floating'
import { Hidden, HiddenFeatures } from '../../internal/hidden'
import {
  OpenClosedProvider,
  ResetOpenClosedProvider,
  State,
  useOpenClosed,
} from '../../internal/open-closed'
import { useSlice } from '../../react-glue'
import type { Props } from '../../types'
import { isDisabledReactIssue7711 } from '../../utils/bugs'
import * as DOM from '../../utils/dom'
import {
  Focus,
  FocusResult,
  FocusableMode,
  focusIn,
  getFocusableElements,
  isFocusableElement,
} from '../../utils/focus-management'
import { match } from '../../utils/match'
import { microTask } from '../../utils/micro-task'
import { getActiveElement, getRootNode } from '../../utils/owner'
import {
  RenderFeatures,
  forwardRefWithAs,
  mergeProps,
  useRender,
  type HasDisplayName,
  type PropsForFeatures,
  type RefProp,
} from '../../utils/render'
import { Keys } from '../keyboard'
import { Portal, useNestedPortals } from '../portal/portal'
import { PopoverStates } from './popover-machine'
import { PopoverContext, usePopoverMachine, usePopoverMachineContext } from './popover-machine-glue'

type MouseEvent<T> = Parameters<MouseEventHandler<T>>[0]

let PopoverGroupContext = createContext<{
  registerPopover: (registerBag: PopoverRegisterBag) => void
  unregisterPopover: (registerBag: PopoverRegisterBag) => void
  isFocusWithinPopoverGroup: () => boolean
  closeOthers: (buttonId: string) => void
} | null>(null)
PopoverGroupContext.displayName = 'PopoverGroupContext'

function usePopoverGroupContext() {
  return useContext(PopoverGroupContext)
}

let PopoverPanelContext = createContext<string | null>(null)
PopoverPanelContext.displayName = 'PopoverPanelContext'

function usePopoverPanelContext() {
  return useContext(PopoverPanelContext)
}

interface PopoverRegisterBag {
  buttonId: MutableRefObject<string | null>
  panelId: MutableRefObject<string | null>
  close: () => void
}

// ---

let DEFAULT_POPOVER_TAG = 'div' as const
type PopoverRenderPropArg = {
  open: boolean
  close: (
    focusableElement?: HTMLElement | MutableRefObject<HTMLElement | null> | MouseEvent<HTMLElement>
  ) => void
}
type PopoverPropsWeControl = never

export type PopoverProps<TTag extends ElementType = typeof DEFAULT_POPOVER_TAG> = Props<
  TTag,
  PopoverRenderPropArg,
  PopoverPropsWeControl,
  {
    __demoMode?: boolean
  }
>

function PopoverFn<TTag extends ElementType = typeof DEFAULT_POPOVER_TAG>(
  props: PopoverProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_BUTTON_TAG = 'button' as const
type ButtonRenderPropArg = {
  open: boolean
  active: boolean
  hover: boolean
  focus: boolean
  disabled: boolean
  autofocus: boolean
}
type ButtonPropsWeControl = 'aria-controls' | 'aria-expanded'

export type PopoverButtonProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> = Props<
  TTag,
  ButtonRenderPropArg,
  ButtonPropsWeControl,
  {
    disabled?: boolean
    autoFocus?: boolean
  }
>

function ButtonFn<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  props: PopoverButtonProps<TTag>,
  ref: Ref<HTMLButtonElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_BACKDROP_TAG = 'div' as const
type BackdropRenderPropArg = {
  open: boolean
}
type BackdropPropsWeControl = 'aria-hidden'

let BackdropRenderFeatures = RenderFeatures.RenderStrategy | RenderFeatures.Static

export type PopoverBackdropProps<TTag extends ElementType = typeof DEFAULT_BACKDROP_TAG> = Props<
  TTag,
  BackdropRenderPropArg,
  BackdropPropsWeControl,
  { transition?: boolean } & PropsForFeatures<typeof BackdropRenderFeatures>
>

export type PopoverOverlayProps<TTag extends ElementType = typeof DEFAULT_BACKDROP_TAG> =
  PopoverBackdropProps<TTag>

function BackdropFn<TTag extends ElementType = typeof DEFAULT_BACKDROP_TAG>(
  props: PopoverBackdropProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_PANEL_TAG = 'div' as const
type PanelRenderPropArg = {
  open: boolean
  close: (focusableElement?: HTMLElement | MutableRefObject<HTMLElement | null>) => void
}

let PanelRenderFeatures = RenderFeatures.RenderStrategy | RenderFeatures.Static

type PanelPropsWeControl = 'tabIndex'

export type PopoverPanelProps<TTag extends ElementType = typeof DEFAULT_PANEL_TAG> = Props<
  TTag,
  PanelRenderPropArg,
  PanelPropsWeControl,
  {
    focus?: boolean
    anchor?: AnchorProps
    portal?: boolean
    modal?: boolean
    transition?: boolean

    // ItemsRenderFeatures
    static?: boolean
    unmount?: boolean
  }
>

function PanelFn<TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
  props: PopoverPanelProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_GROUP_TAG = 'div' as const
type GroupRenderPropArg = {}
type GroupPropsWeControl = never

export type PopoverGroupProps<TTag extends ElementType = typeof DEFAULT_GROUP_TAG> = Props<
  TTag,
  GroupRenderPropArg,
  GroupPropsWeControl
>

function GroupFn<TTag extends ElementType = typeof DEFAULT_GROUP_TAG>(
  props: PopoverGroupProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentPopover extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_POPOVER_TAG>(
    props: PopoverProps<TTag> & RefProp<typeof PopoverFn>
  ): React.JSX.Element
}

export interface _internal_ComponentPopoverButton extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
    props: PopoverButtonProps<TTag> & RefProp<typeof ButtonFn>
  ): React.JSX.Element
}

export interface _internal_ComponentPopoverBackdrop extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_BACKDROP_TAG>(
    props: PopoverBackdropProps<TTag> & RefProp<typeof BackdropFn>
  ): React.JSX.Element
}

export interface _internal_ComponentPopoverPanel extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
    props: PopoverPanelProps<TTag> & RefProp<typeof PanelFn>
  ): React.JSX.Element
}

export interface _internal_ComponentPopoverGroup extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_GROUP_TAG>(
    props: PopoverGroupProps<TTag> & RefProp<typeof GroupFn>
  ): React.JSX.Element
}

let PopoverRoot = forwardRefWithAs(PopoverFn) as _internal_ComponentPopover
export let PopoverButton = forwardRefWithAs(ButtonFn) as _internal_ComponentPopoverButton
/** @deprecated use `<PopoverBackdrop>` instead of `<PopoverOverlay>` */
export let PopoverOverlay = forwardRefWithAs(BackdropFn) as _internal_ComponentPopoverBackdrop
export let PopoverBackdrop = forwardRefWithAs(BackdropFn) as _internal_ComponentPopoverBackdrop
export let PopoverPanel = forwardRefWithAs(PanelFn) as _internal_ComponentPopoverPanel
export let PopoverGroup = forwardRefWithAs(GroupFn) as _internal_ComponentPopoverGroup

export let Popover = Object.assign(PopoverRoot, {
  /** @deprecated use `<PopoverButton>` instead of `<Popover.Button>` */
  Button: PopoverButton,
  /** @deprecated use `<PopoverBackdrop>` instead of `<Popover.Backdrop>` */
  Backdrop: PopoverBackdrop,
  /** @deprecated use `<PopoverOverlay>` instead of `<Popover.Overlay>` */
  Overlay: PopoverOverlay,
  /** @deprecated use `<PopoverPanel>` instead of `<Popover.Panel>` */
  Panel: PopoverPanel,
  /** @deprecated use `<PopoverGroup>` instead of `<Popover.Group>` */
  Group: PopoverGroup,
})
