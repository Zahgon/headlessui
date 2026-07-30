'use client'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import React, {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
  useSyncExternalStore,
  type ElementType,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
} from 'react'
import { useDisposables } from '../../hooks/use-disposables'
import { useEvent } from '../../hooks/use-event'
import { useSlot } from '../../hooks/use-slot'
import { useSyncRefs } from '../../hooks/use-sync-refs'
import {
  FloatingProvider,
  useFloatingPanel,
  useFloatingReference,
  useResolvedAnchor,
  type AnchorProps,
} from '../../internal/floating'
import { State, useOpenClosed } from '../../internal/open-closed'
import type { Props } from '../../types'
import { match } from '../../utils/match'
import {
  RenderFeatures,
  forwardRefWithAs,
  mergeProps,
  useRender,
  type HasDisplayName,
  type PropsForFeatures,
  type RefProp,
} from '../../utils/render'
import { Description, useDescribedBy, useDescriptions } from '../description/description'
import { Keys } from '../keyboard'
import { Portal } from '../portal/portal'

enum TooltipState {
  // Completely hidden
  Hidden,

  // Will be visible after a delay
  Initiated,

  // Completely visible
  Visible,

  // Visible, but will be hidden after a delay
  Hiding,
}

enum When {
  // Show the tooltip after a delay
  Delayed,

  // Show the tooltip immediately
  Immediate,
}

type ActiveTooltipId = string | null
class TooltipStore {
  private _state: ActiveTooltipId = null
  private _listeners: ((state: ActiveTooltipId) => void)[] = []

  subscribe = (listener: (state: ActiveTooltipId) => void) => {
    this._listeners.push(listener)
    return () => {
        throw new Error("STUB");
    }
  }

  getSnapshot = () => {
    return this._state
  }

  getServerSnapshot = () => {
      throw new Error("STUB");
  }

  setTooltipId = (state: ActiveTooltipId) => {
      throw new Error("STUB");
  }
}

let tooltipStore = new TooltipStore()

interface StateDefinition {
  id: string
  tooltipState: TooltipState
}

enum ActionTypes {
  ShowTooltip,
  HideTooltip,
}

type Actions =
  | { type: ActionTypes.ShowTooltip; when: When }
  | { type: ActionTypes.HideTooltip; when: When }

let reducers: {
  [P in ActionTypes]: (
    state: StateDefinition,
    action: Extract<Actions, { type: P }>
  ) => StateDefinition
} = {
  [ActionTypes.ShowTooltip](state, action) {
        throw new Error("STUB");
    },
  [ActionTypes.HideTooltip](state, action) {
      throw new Error("STUB");
  },
}

let TooltipActionsContext = createContext<{
  showTooltip(when: When): void
  hideTooltip(when: When): void
} | null>(null)
TooltipActionsContext.displayName = 'TooltipActionsContext'

function useActions(component: string) {
    throw new Error("STUB");
}
type _Actions = ReturnType<typeof useActions>

let TooltipDataContext = createContext<({ visible: boolean } & StateDefinition) | null>(null)
TooltipDataContext.displayName = 'TooltipDataContext'

function useData(component: string) {
    throw new Error("STUB");
}
type _Data = ReturnType<typeof useData>

function stateReducer(state: StateDefinition, action: Actions) {
    throw new Error("STUB");
}

// ---

let DEFAULT_TOOLTIP_TAG = Fragment

type TooltipRenderPropArg = {}
type TooltipPropsWeControl = never

export type TooltipProps<TTag extends ElementType = typeof DEFAULT_TOOLTIP_TAG> = Props<
  TTag,
  TooltipRenderPropArg,
  TooltipPropsWeControl,
  {
    showDelayMs?: number
    hideDelayMs?: number
  }
>

function TooltipFn<TTag extends ElementType = typeof DEFAULT_TOOLTIP_TAG>(
  props: TooltipProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_TRIGGER_TAG = Fragment

type TriggerRenderPropArg = { hover: boolean; focus: boolean; autofocus: boolean }
type TriggerPropsWeControl = 'aria-describedby'

export type TooltipTriggerProps<TTag extends ElementType = typeof DEFAULT_TRIGGER_TAG> = Props<
  TTag,
  TriggerRenderPropArg,
  TriggerPropsWeControl,
  { autoFocus?: boolean; disabled?: boolean }
>

function TriggerFn<TTag extends ElementType = typeof DEFAULT_TRIGGER_TAG>(
  props: TooltipTriggerProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_PANEL_TAG = Description

type PanelRenderPropArg = {}
type PanelPropsWeControl = 'role'
let PanelRenderFeatures = RenderFeatures.RenderStrategy | RenderFeatures.Static

export type TooltipPanelProps<TTag extends ElementType = typeof DEFAULT_PANEL_TAG> = Props<
  TTag,
  PanelRenderPropArg,
  PanelPropsWeControl,
  { anchor?: AnchorProps } & PropsForFeatures<typeof PanelRenderFeatures>
>

function PanelFn<TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
  props: TooltipPanelProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentTooltip extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_TOOLTIP_TAG>(
    props: TooltipProps<TTag> & RefProp<typeof TooltipFn>
  ): React.JSX.Element
}

export interface _internal_ComponentTrigger extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_TRIGGER_TAG>(
    props: TooltipTriggerProps<TTag> & RefProp<typeof TriggerFn>
  ): React.JSX.Element
}

export interface _internal_ComponentPanel extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
    props: TooltipPanelProps<TTag> & RefProp<typeof PanelFn>
  ): React.JSX.Element
}

export let Tooltip = forwardRefWithAs(TooltipFn) as _internal_ComponentTooltip
export let TooltipTrigger = forwardRefWithAs(TriggerFn) as _internal_ComponentTrigger
export let TooltipPanel = forwardRefWithAs(PanelFn) as _internal_ComponentPanel
