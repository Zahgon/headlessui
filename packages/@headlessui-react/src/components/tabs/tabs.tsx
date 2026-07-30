'use client'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ElementType,
  type MutableRefObject,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type Ref,
} from 'react'
import { useActivePress } from '../../hooks/use-active-press'
import { useEvent } from '../../hooks/use-event'
import { useId } from '../../hooks/use-id'
import { useIsoMorphicEffect } from '../../hooks/use-iso-morphic-effect'
import { useLatestValue } from '../../hooks/use-latest-value'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import { useSlot } from '../../hooks/use-slot'
import { useSyncRefs } from '../../hooks/use-sync-refs'
import { FocusSentinel } from '../../internal/focus-sentinel'
import { Hidden } from '../../internal/hidden'
import type { Props } from '../../types'
import { Focus, FocusResult, focusIn, sortByDomNode } from '../../utils/focus-management'
import { match } from '../../utils/match'
import { microTask } from '../../utils/micro-task'
import { getActiveElement } from '../../utils/owner'
import {
  RenderFeatures,
  forwardRefWithAs,
  mergeProps,
  useRender,
  type HasDisplayName,
  type PropsForFeatures,
  type RefProp,
} from '../../utils/render'
import { StableCollection, useStableCollectionIndex } from '../../utils/stable-collection'
import { Keys } from '../keyboard'

enum Direction {
  Forwards,
  Backwards,
}

enum Ordering {
  Less = -1,
  Equal = 0,
  Greater = 1,
}

interface StateDefinition {
  info: MutableRefObject<{ isControlled: boolean }>
  selectedIndex: number

  tabs: MutableRefObject<HTMLElement | null>[]
  panels: MutableRefObject<HTMLElement | null>[]
}

enum ActionTypes {
  SetSelectedIndex,

  RegisterTab,
  UnregisterTab,

  RegisterPanel,
  UnregisterPanel,
}

type Actions =
  | { type: ActionTypes.SetSelectedIndex; index: number }
  | { type: ActionTypes.RegisterTab; tab: MutableRefObject<HTMLElement | null> }
  | { type: ActionTypes.UnregisterTab; tab: MutableRefObject<HTMLElement | null> }
  | { type: ActionTypes.RegisterPanel; panel: MutableRefObject<HTMLElement | null> }
  | { type: ActionTypes.UnregisterPanel; panel: MutableRefObject<HTMLElement | null> }

let reducers: {
  [P in ActionTypes]: (
    state: StateDefinition,
    action: Extract<Actions, { type: P }>
  ) => StateDefinition
} = {
  [ActionTypes.SetSelectedIndex](state, action) {
        throw new Error("STUB");
    },
  [ActionTypes.RegisterTab](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.UnregisterTab](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.RegisterPanel](state, action) {
      throw new Error("STUB");
  },
  [ActionTypes.UnregisterPanel](state, action) {
      throw new Error("STUB");
  },
}

let TabsDataContext = createContext<
  | ({
      orientation: 'horizontal' | 'vertical'
      activation: 'auto' | 'manual'
    } & StateDefinition)
  | null
>(null)
TabsDataContext.displayName = 'TabsDataContext'

function useData(component: string) {
    throw new Error("STUB");
}
type _Data = ReturnType<typeof useData>

let TabsActionsContext = createContext<{
  registerTab(tab: MutableRefObject<HTMLElement | null>): () => void
  registerPanel(panel: MutableRefObject<HTMLElement | null>): () => void
  change(index: number): void
} | null>(null)
TabsActionsContext.displayName = 'TabsActionsContext'

function useActions(component: string) {
    throw new Error("STUB");
}
type _Actions = ReturnType<typeof useActions>

function stateReducer(state: StateDefinition, action: Actions) {
    throw new Error("STUB");
}

// ---

let DEFAULT_TABS_TAG = 'div' as const
type TabsRenderPropArg = {
  selectedIndex: number
}
type TabsPropsWeControl = never

export type TabGroupProps<TTag extends ElementType = typeof DEFAULT_TABS_TAG> = Props<
  TTag,
  TabsRenderPropArg,
  TabsPropsWeControl,
  {
    defaultIndex?: number
    onChange?: (index: number) => void
    selectedIndex?: number
    vertical?: boolean
    manual?: boolean
  }
>

function GroupFn<TTag extends ElementType = typeof DEFAULT_TABS_TAG>(
  props: TabGroupProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_LIST_TAG = 'div' as const
type ListRenderPropArg = {
  selectedIndex: number
}
type ListPropsWeControl = 'aria-orientation' | 'role'

export type TabListProps<TTag extends ElementType = typeof DEFAULT_LIST_TAG> = Props<
  TTag,
  ListRenderPropArg,
  ListPropsWeControl,
  {
    //
  }
>

function ListFn<TTag extends ElementType = typeof DEFAULT_LIST_TAG>(
  props: TabListProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_TAB_TAG = 'button' as const
type TabRenderPropArg = {
  hover: boolean
  focus: boolean
  active: boolean
  autofocus: boolean
  selected: boolean
  disabled: boolean
}
type TabPropsWeControl = 'aria-controls' | 'aria-selected' | 'role' | 'tabIndex'

export type TabProps<TTag extends ElementType = typeof DEFAULT_TAB_TAG> = Props<
  TTag,
  TabRenderPropArg,
  TabPropsWeControl,
  {
    autoFocus?: boolean
    disabled?: boolean
  }
>

function TabFn<TTag extends ElementType = typeof DEFAULT_TAB_TAG>(
  props: TabProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_PANELS_TAG = 'div' as const
type PanelsRenderPropArg = {
  selectedIndex: number
}

export type TabPanelsProps<TTag extends ElementType = typeof DEFAULT_PANELS_TAG> = Props<
  TTag,
  PanelsRenderPropArg
>

function PanelsFn<TTag extends ElementType = typeof DEFAULT_PANELS_TAG>(
  props: TabPanelsProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_PANEL_TAG = 'div' as const
type PanelRenderPropArg = {
  selected: boolean
  focus: boolean
}
type PanelPropsWeControl = 'role' | 'aria-labelledby'
let PanelRenderFeatures = RenderFeatures.RenderStrategy | RenderFeatures.Static

export type TabPanelProps<TTag extends ElementType = typeof DEFAULT_PANEL_TAG> = Props<
  TTag,
  PanelRenderPropArg,
  PanelPropsWeControl,
  PropsForFeatures<typeof PanelRenderFeatures> & { id?: string; tabIndex?: number }
>

function PanelFn<TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
  props: TabPanelProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentTab extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_TAB_TAG>(
    props: TabProps<TTag> & RefProp<typeof TabFn>
  ): React.JSX.Element
}

export interface _internal_ComponentTabGroup extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_TABS_TAG>(
    props: TabGroupProps<TTag> & RefProp<typeof GroupFn>
  ): React.JSX.Element
}

export interface _internal_ComponentTabList extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_LIST_TAG>(
    props: TabListProps<TTag> & RefProp<typeof ListFn>
  ): React.JSX.Element
}

export interface _internal_ComponentTabPanels extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_PANELS_TAG>(
    props: TabPanelsProps<TTag> & RefProp<typeof PanelsFn>
  ): React.JSX.Element
}

export interface _internal_ComponentTabPanel extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
    props: TabPanelProps<TTag> & RefProp<typeof PanelFn>
  ): React.JSX.Element
}

let TabRoot = forwardRefWithAs(TabFn) as _internal_ComponentTab
export let TabGroup = forwardRefWithAs(GroupFn) as _internal_ComponentTabGroup
export let TabList = forwardRefWithAs(ListFn) as _internal_ComponentTabList
export let TabPanels = forwardRefWithAs(PanelsFn) as _internal_ComponentTabPanels
export let TabPanel = forwardRefWithAs(PanelFn) as _internal_ComponentTabPanel

export let Tab = Object.assign(TabRoot, {
  /** @deprecated use `<TabGroup>` instead of `<Tab.Group>` */
  Group: TabGroup,
  /** @deprecated use `<TabList>` instead of `<Tab.List>` */
  List: TabList,
  /** @deprecated use `<TabPanels>` instead of `<Tab.Panels>` */
  Panels: TabPanels,
  /** @deprecated use `<TabPanel>` instead of `<Tab.Panel>` */
  Panel: TabPanel,
})
