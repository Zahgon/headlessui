'use client'

// WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/
import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
} from 'react'
import { flushSync } from 'react-dom'
import { useActivePress } from '../../hooks/use-active-press'
import { useDisposables } from '../../hooks/use-disposables'
import { useElementSize } from '../../hooks/use-element-size'
import { useEvent } from '../../hooks/use-event'
import { useHandleToggle } from '../../hooks/use-handle-toggle'
import { useId } from '../../hooks/use-id'
import { useInertOthers } from '../../hooks/use-inert-others'
import { useIsoMorphicEffect } from '../../hooks/use-iso-morphic-effect'
import { useOnDisappear } from '../../hooks/use-on-disappear'
import { useOutsideClick } from '../../hooks/use-outside-click'
import { useOwnerDocument } from '../../hooks/use-owner'
import { Action as QuickReleaseAction, useQuickRelease } from '../../hooks/use-quick-release'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import { useScrollLock } from '../../hooks/use-scroll-lock'
import { useSlot } from '../../hooks/use-slot'
import { useSyncRefs } from '../../hooks/use-sync-refs'
import { useTextValue } from '../../hooks/use-text-value'
import { useTrackedPointer } from '../../hooks/use-tracked-pointer'
import { transitionDataAttributes, useTransition } from '../../hooks/use-transition'
import { useTreeWalker } from '../../hooks/use-tree-walker'
import {
  FloatingProvider,
  useFloatingPanel,
  useFloatingPanelProps,
  useFloatingReference,
  useFloatingReferenceProps,
  useResolvedAnchor,
  type AnchorProps,
} from '../../internal/floating'
import { OpenClosedProvider, State, useOpenClosed } from '../../internal/open-closed'
import { stackMachines } from '../../machines/stack-machine'
import { useSlice } from '../../react-glue'
import type { Props } from '../../types'
import { Focus } from '../../utils/calculate-active-index'
import { disposables } from '../../utils/disposables'
import * as DOM from '../../utils/dom'
import {
  Focus as FocusManagementFocus,
  FocusableMode,
  focusFrom,
  isFocusableElement,
  restoreFocusIfNecessary,
} from '../../utils/focus-management'
import { match } from '../../utils/match'
import { isActiveElement } from '../../utils/owner'
import {
  RenderFeatures,
  forwardRefWithAs,
  mergeProps,
  useRender,
  type HasDisplayName,
  type RefProp,
} from '../../utils/render'
import { useDescriptions } from '../description/description'
import { Keys } from '../keyboard'
import { useLabelContext, useLabels } from '../label/label'
import { Portal } from '../portal/portal'
import { ActionTypes, ActivationTrigger, MenuState, type MenuItemDataRef } from './menu-machine'
import { MenuContext, useMenuMachine, useMenuMachineContext } from './menu-machine-glue'

let DEFAULT_MENU_TAG = Fragment
type MenuRenderPropArg = {
  open: boolean
  close: () => void
}
type MenuPropsWeControl = never

export type MenuProps<TTag extends ElementType = typeof DEFAULT_MENU_TAG> = Props<
  TTag,
  MenuRenderPropArg,
  MenuPropsWeControl,
  {
    __demoMode?: boolean
  }
>

function MenuFn<TTag extends ElementType = typeof DEFAULT_MENU_TAG>(
  props: MenuProps<TTag>,
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
type ButtonPropsWeControl = 'aria-controls' | 'aria-expanded' | 'aria-haspopup'

export type MenuButtonProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> = Props<
  TTag,
  ButtonRenderPropArg,
  ButtonPropsWeControl,
  {
    disabled?: boolean
    autoFocus?: boolean
  }
>

function ButtonFn<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  props: MenuButtonProps<TTag>,
  ref: Ref<HTMLButtonElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_ITEMS_TAG = 'div' as const
type ItemsRenderPropArg = {
  open: boolean
}
type ItemsPropsWeControl = 'aria-activedescendant' | 'aria-labelledby' | 'role' | 'tabIndex'

let ItemsRenderFeatures = RenderFeatures.RenderStrategy | RenderFeatures.Static

export type MenuItemsProps<TTag extends ElementType = typeof DEFAULT_ITEMS_TAG> = Props<
  TTag,
  ItemsRenderPropArg,
  ItemsPropsWeControl,
  {
    anchor?: AnchorProps
    portal?: boolean
    modal?: boolean
    transition?: boolean

    // ItemsRenderFeatures
    static?: boolean
    unmount?: boolean
  }
>

function ItemsFn<TTag extends ElementType = typeof DEFAULT_ITEMS_TAG>(
  props: MenuItemsProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_ITEM_TAG = Fragment
type ItemRenderPropArg = {
  /** @deprecated use `focus` instead */
  active: boolean
  focus: boolean
  disabled: boolean
  close: () => void
}
type ItemPropsWeControl =
  | 'aria-describedby'
  | 'aria-disabled'
  | 'aria-labelledby'
  | 'role'
  | 'tabIndex'

export type MenuItemProps<TTag extends ElementType = typeof DEFAULT_ITEM_TAG> = Props<
  TTag,
  ItemRenderPropArg,
  ItemPropsWeControl,
  {
    disabled?: boolean
  }
>

function ItemFn<TTag extends ElementType = typeof DEFAULT_ITEM_TAG>(
  props: MenuItemProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_SECTION_TAG = 'div' as const
type SectionRenderPropArg = {}
type SectionPropsWeControl = 'role' | 'aria-labelledby'

export type MenuSectionProps<TTag extends ElementType = typeof DEFAULT_SECTION_TAG> = Props<
  TTag,
  SectionRenderPropArg,
  SectionPropsWeControl
>

function SectionFn<TTag extends ElementType = typeof DEFAULT_SECTION_TAG>(
  props: MenuSectionProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// --

let DEFAULT_HEADING_TAG = 'header' as const
type HeadingRenderPropArg = {}
type HeadingPropsWeControl = 'role'

export type MenuHeadingProps<TTag extends ElementType = typeof DEFAULT_HEADING_TAG> = Props<
  TTag,
  HeadingRenderPropArg,
  HeadingPropsWeControl
>

function HeadingFn<TTag extends ElementType = typeof DEFAULT_HEADING_TAG>(
  props: MenuHeadingProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_SEPARATOR_TAG = 'div' as const
type SeparatorRenderPropArg = {}
type SeparatorPropsWeControl = 'role'

export type MenuSeparatorProps<TTag extends ElementType = typeof DEFAULT_SEPARATOR_TAG> = Props<
  TTag,
  SeparatorRenderPropArg,
  SeparatorPropsWeControl
>

function SeparatorFn<TTag extends ElementType = typeof DEFAULT_SEPARATOR_TAG>(
  props: MenuSeparatorProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentMenu extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_MENU_TAG>(
    props: MenuProps<TTag> & RefProp<typeof MenuFn>
  ): React.JSX.Element
}

export interface _internal_ComponentMenuButton extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
    props: MenuButtonProps<TTag> & RefProp<typeof ButtonFn>
  ): React.JSX.Element
}

export interface _internal_ComponentMenuItems extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_ITEMS_TAG>(
    props: MenuItemsProps<TTag> & RefProp<typeof ItemsFn>
  ): React.JSX.Element
}

export interface _internal_ComponentMenuItem extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_ITEM_TAG>(
    props: MenuItemProps<TTag> & RefProp<typeof ItemFn>
  ): React.JSX.Element
}

export interface _internal_ComponentMenuSection extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_SECTION_TAG>(
    props: MenuSectionProps<TTag> & RefProp<typeof SectionFn>
  ): React.JSX.Element
}

export interface _internal_ComponentMenuHeading extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_HEADING_TAG>(
    props: MenuHeadingProps<TTag> & RefProp<typeof HeadingFn>
  ): React.JSX.Element
}

export interface _internal_ComponentMenuSeparator extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_SEPARATOR_TAG>(
    props: MenuSeparatorProps<TTag> & RefProp<typeof SeparatorFn>
  ): React.JSX.Element
}

let MenuRoot = forwardRefWithAs(MenuFn) as _internal_ComponentMenu
export let MenuButton = forwardRefWithAs(ButtonFn) as _internal_ComponentMenuButton
export let MenuItems = forwardRefWithAs(ItemsFn) as _internal_ComponentMenuItems
export let MenuItem = forwardRefWithAs(ItemFn) as _internal_ComponentMenuItem
export let MenuSection = forwardRefWithAs(SectionFn) as _internal_ComponentMenuSection
export let MenuHeading = forwardRefWithAs(HeadingFn) as _internal_ComponentMenuHeading
export let MenuSeparator = forwardRefWithAs(SeparatorFn) as _internal_ComponentMenuSeparator

export let Menu = Object.assign(MenuRoot, {
  /** @deprecated use `<MenuButton>` instead of `<Menu.Button>` */
  Button: MenuButton,
  /** @deprecated use `<MenuItems>` instead of `<Menu.Items>` */
  Items: MenuItems,
  /** @deprecated use `<MenuItem>` instead of `<Menu.Item>` */
  Item: MenuItem,
  /** @deprecated use `<MenuSection>` instead of `<Menu.Section>` */
  Section: MenuSection,
  /** @deprecated use `<MenuHeading>` instead of `<Menu.Heading>` */
  Heading: MenuHeading,
  /** @deprecated use `<MenuSeparator>` instead of `<Menu.Separator>` */
  Separator: MenuSeparator,
})
