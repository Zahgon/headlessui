'use client'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  type ElementType,
  type MutableRefObject,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type Ref,
} from 'react'
import { useByComparator, type ByComparator } from '../../hooks/use-by-comparator'
import { useControllable } from '../../hooks/use-controllable'
import { useDefaultValue } from '../../hooks/use-default-value'
import { useEvent } from '../../hooks/use-event'
import { useId } from '../../hooks/use-id'
import { useIsoMorphicEffect } from '../../hooks/use-iso-morphic-effect'
import { useLatestValue } from '../../hooks/use-latest-value'
import { useSlot } from '../../hooks/use-slot'
import { useSyncRefs } from '../../hooks/use-sync-refs'
import { useDisabled } from '../../internal/disabled'
import { FormFields } from '../../internal/form-fields'
import { useProvidedId } from '../../internal/id'
import type { Expand, Props } from '../../types'
import { isDisabledReactIssue7711 } from '../../utils/bugs'
import { Focus, FocusResult, focusIn, sortByDomNode } from '../../utils/focus-management'
import { attemptSubmit } from '../../utils/form'
import { match } from '../../utils/match'
import { isActiveElement } from '../../utils/owner'
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

interface Option<T = unknown> {
  id: string
  element: MutableRefObject<HTMLElement | null>
  propsRef: MutableRefObject<{ value: T; disabled: boolean }>
}

interface StateDefinition<T = unknown> {
  options: Option<T>[]
}

enum ActionTypes {
  RegisterOption,
  UnregisterOption,
}

type Actions =
  | Expand<{ type: ActionTypes.RegisterOption } & Option>
  | { type: ActionTypes.UnregisterOption; id: Option['id'] }

let reducers: {
  [P in ActionTypes]: (
    state: StateDefinition,
    action: Extract<Actions, { type: P }>
  ) => StateDefinition
} = {
  [ActionTypes.RegisterOption](state, action) {
        throw new Error("STUB");
    },
  [ActionTypes.UnregisterOption](state, action) {
      throw new Error("STUB");
  },
}

let RadioGroupDataContext = createContext<
  | ({
      value: unknown
      firstOption?: Option
      containsCheckedOption: boolean
      disabled: boolean
      compare(a: unknown, z: unknown): boolean
      tabIndex: number
    } & StateDefinition)
  | null
>(null)
RadioGroupDataContext.displayName = 'RadioGroupDataContext'

function useData(component: string) {
    throw new Error("STUB");
}
type _Data = ReturnType<typeof useData>

let RadioGroupActionsContext = createContext<{
  registerOption(option: Option): () => void
  change(value: unknown): boolean
} | null>(null)
RadioGroupActionsContext.displayName = 'RadioGroupActionsContext'

function useActions(component: string) {
    throw new Error("STUB");
}
type _Actions = ReturnType<typeof useActions>

function stateReducer<T>(state: StateDefinition<T>, action: Actions) {
    throw new Error("STUB");
}

// ---

let DEFAULT_RADIO_GROUP_TAG = 'div' as const
type RadioGroupRenderPropArg<TType> = {
  value: TType
}
type RadioGroupPropsWeControl = 'role' | 'aria-labelledby' | 'aria-describedby'

export type RadioGroupProps<
  TTag extends ElementType = typeof DEFAULT_RADIO_GROUP_TAG,
  TType = string,
> = Props<
  TTag,
  RadioGroupRenderPropArg<TType>,
  RadioGroupPropsWeControl,
  {
    value?: TType
    defaultValue?: TType
    onChange?: (value: TType) => void
    by?: ByComparator<TType>
    disabled?: boolean
    form?: string
    name?: string
  }
>

function RadioGroupFn<TTag extends ElementType = typeof DEFAULT_RADIO_GROUP_TAG, TType = string>(
  props: RadioGroupProps<TTag, TType>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_OPTION_TAG = 'div' as const
type OptionRenderPropArg = {
  checked: boolean
  /** @deprecated use `focus` instead */
  active: boolean
  hover: boolean
  focus: boolean
  autofocus: boolean
  disabled: boolean
}
type OptionPropsWeControl =
  | 'aria-checked'
  | 'aria-describedby'
  | 'aria-labelledby'
  | 'role'
  | 'tabIndex'

export type RadioOptionProps<TTag extends ElementType, TType> = Props<
  TTag,
  OptionRenderPropArg,
  OptionPropsWeControl,
  {
    value: TType
    disabled?: boolean
    autoFocus?: boolean
  }
>

function OptionFn<
  TTag extends ElementType = typeof DEFAULT_OPTION_TAG,
  // TODO: One day we will be able to infer this type from the generic in RadioGroup itself.
  // But today is not that day..
  TType = Parameters<typeof RadioGroupRoot>[0]['value'],
>(props: RadioOptionProps<TTag, TType>, ref: Ref<HTMLElement>) {
    throw new Error("STUB");
}

// ---

let DEFAULT_RADIO_TAG = 'span' as const
type RadioRenderPropArg = {
  checked: boolean
  hover: boolean
  focus: boolean
  autofocus: boolean
  disabled: boolean
}
type RadioPropsWeControl =
  | 'aria-checked'
  | 'aria-describedby'
  | 'aria-labelledby'
  | 'role'
  | 'tabIndex'

export type RadioProps<TTag extends ElementType = typeof DEFAULT_RADIO_TAG, TType = string> = Props<
  TTag,
  RadioRenderPropArg,
  RadioPropsWeControl,
  {
    value: TType
    disabled?: boolean
    autoFocus?: boolean
  }
>

function RadioFn<
  TTag extends ElementType = typeof DEFAULT_RADIO_TAG,
  // TODO: One day we will be able to infer this type from the generic in RadioGroup itself.
  // But today is not that day..
  TType = Parameters<typeof RadioGroupRoot>[0]['value'],
>(props: RadioProps<TTag, TType>, ref: Ref<HTMLElement>) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentRadioGroup extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_RADIO_GROUP_TAG, TType = string>(
    props: RadioGroupProps<TTag, TType> & RefProp<typeof RadioGroupFn>
  ): React.JSX.Element
}

export interface _internal_ComponentRadioOption extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_OPTION_TAG, TType = string>(
    props: RadioOptionProps<TTag, TType> & RefProp<typeof OptionFn>
  ): React.JSX.Element
}

export interface _internal_ComponentRadio extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_RADIO_TAG, TType = string>(
    props: RadioProps<TTag, TType> & RefProp<typeof RadioFn>
  ): React.JSX.Element
}

export interface _internal_ComponentRadioLabel extends _internal_ComponentLabel {}
export interface _internal_ComponentRadioDescription extends _internal_ComponentDescription {}

let RadioGroupRoot = forwardRefWithAs(RadioGroupFn) as _internal_ComponentRadioGroup
/** @deprecated use `<Radio>` instead of `<RadioGroupOption>` */
export let RadioGroupOption = forwardRefWithAs(OptionFn) as _internal_ComponentRadioOption
export let Radio = forwardRefWithAs(RadioFn) as _internal_ComponentRadio
/** @deprecated use `<Label>` instead of `<RadioGroupLabel>` */
export let RadioGroupLabel = Label as _internal_ComponentRadioLabel
/** @deprecated use `<Description>` instead of `<RadioGroupDescription>` */
export let RadioGroupDescription = Description as _internal_ComponentRadioDescription

export let RadioGroup = Object.assign(RadioGroupRoot, {
  /** @deprecated use `<Radio>` instead of `<RadioGroup.Option>` */
  Option: RadioGroupOption,
  /** @deprecated use `<Radio>` instead of `<RadioGroup.Radio>` */
  Radio: Radio,
  /** @deprecated use `<Label>` instead of `<RadioGroup.Label>` */
  Label: RadioGroupLabel,
  /** @deprecated use `<Description>` instead of `<RadioGroup.Description>` */
  Description: RadioGroupDescription,
})
