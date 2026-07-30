'use client'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type Ref,
} from 'react'
import { useActivePress } from '../../hooks/use-active-press'
import { useControllable } from '../../hooks/use-controllable'
import { useDefaultValue } from '../../hooks/use-default-value'
import { useDisposables } from '../../hooks/use-disposables'
import { useEvent } from '../../hooks/use-event'
import { useId } from '../../hooks/use-id'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import { useSlot } from '../../hooks/use-slot'
import { useSyncRefs } from '../../hooks/use-sync-refs'
import { useDisabled } from '../../internal/disabled'
import { FormFields } from '../../internal/form-fields'
import { useProvidedId } from '../../internal/id'
import type { Props } from '../../types'
import { isDisabledReactIssue7711 } from '../../utils/bugs'
import * as DOM from '../../utils/dom'
import { attemptSubmit } from '../../utils/form'
import {
  forwardRefWithAs,
  mergeProps,
  useRender,
  type HasDisplayName,
  type RefProp,
} from '../../utils/render'
import {
  Description,
  useDescribedBy,
  useDescriptions,
  type _internal_ComponentDescription,
} from '../description/description'
import { Keys } from '../keyboard'
import { Label, useLabelledBy, useLabels, type _internal_ComponentLabel } from '../label/label'

interface StateDefinition {
  switch: HTMLButtonElement | null
  setSwitch(element: HTMLButtonElement): void
}

let GroupContext = createContext<StateDefinition | null>(null)
GroupContext.displayName = 'GroupContext'

// ---

let DEFAULT_GROUP_TAG = Fragment

export type SwitchGroupProps<TTag extends ElementType = typeof DEFAULT_GROUP_TAG> = Props<TTag>

function GroupFn<TTag extends ElementType = typeof DEFAULT_GROUP_TAG>(
  props: SwitchGroupProps<TTag>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_SWITCH_TAG = 'button' as const
type SwitchRenderPropArg = {
  checked: boolean
  hover: boolean
  focus: boolean
  active: boolean
  autofocus: boolean
  changing: boolean
  disabled: boolean
}
type SwitchPropsWeControl = 'aria-checked' | 'aria-describedby' | 'aria-labelledby' | 'role'

export type SwitchProps<TTag extends ElementType = typeof DEFAULT_SWITCH_TAG> = Props<
  TTag,
  SwitchRenderPropArg,
  SwitchPropsWeControl,
  {
    checked?: boolean
    defaultChecked?: boolean
    onChange?: (checked: boolean) => void
    name?: string
    value?: string
    form?: string
    autoFocus?: boolean
    disabled?: boolean
    tabIndex?: number
  }
>

function SwitchFn<TTag extends ElementType = typeof DEFAULT_SWITCH_TAG>(
  props: SwitchProps<TTag>,
  ref: Ref<HTMLButtonElement>
) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentSwitch extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_SWITCH_TAG>(
    props: SwitchProps<TTag> & RefProp<typeof SwitchFn>
  ): React.JSX.Element
}

export interface _internal_ComponentSwitchGroup extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_GROUP_TAG>(
    props: SwitchGroupProps<TTag> & RefProp<typeof GroupFn>
  ): React.JSX.Element
}

export interface _internal_ComponentSwitchLabel extends _internal_ComponentLabel {}
export interface _internal_ComponentSwitchDescription extends _internal_ComponentDescription {}

let SwitchRoot = forwardRefWithAs(SwitchFn) as _internal_ComponentSwitch
/** @deprecated use `<Field>` instead of `<SwitchGroup>` */
export let SwitchGroup = GroupFn as _internal_ComponentSwitchGroup
/** @deprecated use `<Label>` instead of `<SwitchLabel>` */
export let SwitchLabel = Label as _internal_ComponentSwitchLabel
/** @deprecated use `<Description>` instead of `<SwitchDescription>` */
export let SwitchDescription = Description as _internal_ComponentSwitchDescription

export let Switch = Object.assign(SwitchRoot, {
  /** @deprecated use `<Field>` instead of `<Switch.Group>` */
  Group: SwitchGroup,
  /** @deprecated use `<Label>` instead of `<Switch.Label>` */
  Label: SwitchLabel,
  /** @deprecated use `<Description>` instead of `<Switch.Description>` */
  Description: SwitchDescription,
})
