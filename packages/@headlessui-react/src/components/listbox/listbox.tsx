'use client'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type MutableRefObject,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
} from 'react'
import { flushSync } from 'react-dom'
import { useActivePress } from '../../hooks/use-active-press'
import { useByComparator, type ByComparator } from '../../hooks/use-by-comparator'
import { useControllable } from '../../hooks/use-controllable'
import { useDefaultValue } from '../../hooks/use-default-value'
import { useDisposables } from '../../hooks/use-disposables'
import { useElementSize } from '../../hooks/use-element-size'
import { useEvent } from '../../hooks/use-event'
import { useHandleToggle } from '../../hooks/use-handle-toggle'
import { useId } from '../../hooks/use-id'
import { useInertOthers } from '../../hooks/use-inert-others'
import { useIsoMorphicEffect } from '../../hooks/use-iso-morphic-effect'
import { useLatestValue } from '../../hooks/use-latest-value'
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
import { useDisabled } from '../../internal/disabled'
import {
  FloatingProvider,
  useFloatingPanel,
  useFloatingPanelProps,
  useFloatingReference,
  useFloatingReferenceProps,
  useResolvedAnchor,
  type AnchorPropsWithSelection,
} from '../../internal/floating'
import { FormFields } from '../../internal/form-fields'
import { useFrozenData } from '../../internal/frozen'
import { useProvidedId } from '../../internal/id'
import { OpenClosedProvider, State, useOpenClosed } from '../../internal/open-closed'
import { stackMachines } from '../../machines/stack-machine'
import { useSlice } from '../../react-glue'
import type { EnsureArray, Props } from '../../types'
import { Focus } from '../../utils/calculate-active-index'
import { disposables } from '../../utils/disposables'
import * as DOM from '../../utils/dom'
import {
  Focus as FocusManagementFocus,
  FocusableMode,
  focusFrom,
  isFocusableElement,
} from '../../utils/focus-management'
import { attemptSubmit } from '../../utils/form'
import { match } from '../../utils/match'
import { isActiveElement } from '../../utils/owner'
import {
  RenderFeatures,
  forwardRefWithAs,
  mergeProps,
  useRender,
  type HasDisplayName,
  type PropsForFeatures,
  type RefProp,
} from '../../utils/render'
import { useDescribedBy } from '../description/description'
import { Keys } from '../keyboard'
import { Label, useLabelledBy, useLabels, type _internal_ComponentLabel } from '../label/label'
import { Portal } from '../portal/portal'
import { ActionTypes, ActivationTrigger, ListboxStates, ValueMode } from './listbox-machine'
import { ListboxContext, useListboxMachine, useListboxMachineContext } from './listbox-machine-glue'

type ListboxOptionDataRef<T> = MutableRefObject<{
  textValue?: string
  disabled: boolean
  value: T
  domRef: MutableRefObject<HTMLElement | null>
}>

let ListboxDataContext = createContext<{
  value: unknown
  disabled: boolean
  invalid: boolean
  mode: ValueMode
  orientation: 'horizontal' | 'vertical'
  onChange(value: unknown): void
  compare(a: unknown, z: unknown): boolean
  isSelected(value: unknown): boolean

  optionsPropsRef: MutableRefObject<{
    static: boolean
    hold: boolean
  }>

  listRef: MutableRefObject<Map<string, HTMLElement | null>>
} | null>(null)
ListboxDataContext.displayName = 'ListboxDataContext'

function useData(component: string) {
    throw new Error("STUB");
}
type _Data = ReturnType<typeof useData>

// ---

let DEFAULT_LISTBOX_TAG = Fragment
type ListboxRenderPropArg<T> = {
  open: boolean
  disabled: boolean
  invalid: boolean
  value: T
}

export type ListboxProps<
  TTag extends ElementType = typeof DEFAULT_LISTBOX_TAG,
  TType = string,
  TActualType = TType,
> = Props<
  TTag,
  ListboxRenderPropArg<TType>,
  'value' | 'defaultValue' | 'onChange' | 'by' | 'disabled' | 'horizontal' | 'name' | 'multiple',
  {
    value?: TType
    defaultValue?: TType
    onChange?: (value: TType) => void
    by?: ByComparator<TActualType>
    disabled?: boolean
    invalid?: boolean
    horizontal?: boolean
    form?: string
    name?: string
    multiple?: boolean

    __demoMode?: boolean
  }
>

function ListboxFn<
  TTag extends ElementType = typeof DEFAULT_LISTBOX_TAG,
  TType = string,
  TActualType = TType extends (infer U)[] ? U : TType,
>(props: ListboxProps<TTag, TType, TActualType>, ref: Ref<HTMLElement>) {
    throw new Error("STUB");
}

// ---

let DEFAULT_BUTTON_TAG = 'button' as const
type ButtonRenderPropArg = {
  disabled: boolean
  invalid: boolean
  hover: boolean
  focus: boolean
  autofocus: boolean
  open: boolean
  active: boolean
  value: any
}
type ButtonPropsWeControl =
  | 'aria-controls'
  | 'aria-expanded'
  | 'aria-haspopup'
  | 'aria-labelledby'
  | 'disabled'

export type ListboxButtonProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> = Props<
  TTag,
  ButtonRenderPropArg,
  ButtonPropsWeControl,
  {
    autoFocus?: boolean
    disabled?: boolean
  }
>

function ButtonFn<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  props: ListboxButtonProps<TTag>,
  ref: Ref<HTMLButtonElement>
) {
    throw new Error("STUB");
}

// ---

let SelectedOptionContext = createContext(false)

let DEFAULT_OPTIONS_TAG = 'div' as const
type OptionsRenderPropArg = {
  open: boolean
}
type OptionsPropsWeControl =
  | 'aria-activedescendant'
  | 'aria-labelledby'
  | 'aria-multiselectable'
  | 'aria-orientation'
  | 'role'
  | 'tabIndex'

let OptionsRenderFeatures = RenderFeatures.RenderStrategy | RenderFeatures.Static

export type ListboxOptionsProps<TTag extends ElementType = typeof DEFAULT_OPTIONS_TAG> = Props<
  TTag,
  OptionsRenderPropArg,
  OptionsPropsWeControl,
  {
    anchor?: AnchorPropsWithSelection
    portal?: boolean
    modal?: boolean
    transition?: boolean
  } & PropsForFeatures<typeof OptionsRenderFeatures>
>

function OptionsFn<TTag extends ElementType = typeof DEFAULT_OPTIONS_TAG>(
  props: ListboxOptionsProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_OPTION_TAG = 'div' as const
type OptionRenderPropArg = {
  /** @deprecated use `focus` instead */
  active: boolean
  focus: boolean
  selected: boolean
  disabled: boolean

  selectedOption: boolean
}
type OptionPropsWeControl = 'aria-disabled' | 'aria-selected' | 'role' | 'tabIndex'

export type ListboxOptionProps<
  TTag extends ElementType = typeof DEFAULT_OPTION_TAG,
  TType = string,
> = Props<
  TTag,
  OptionRenderPropArg,
  OptionPropsWeControl,
  {
    disabled?: boolean
    value: TType
  }
>

function OptionFn<
  TTag extends ElementType = typeof DEFAULT_OPTION_TAG,
  // TODO: One day we will be able to infer this type from the generic in Listbox itself.
  // But today is not that day..
  TType = Parameters<typeof ListboxRoot>[0]['value'],
>(props: ListboxOptionProps<TTag, TType>, ref: Ref<HTMLElement>) {
    throw new Error("STUB");
}

// ---

let DEFAULT_SELECTED_OPTION_TAG = Fragment
type SelectedOptionRenderPropArg = {}
type SelectedOptionPropsWeControl = never

export type ListboxSelectedOptionProps<
  TTag extends ElementType = typeof DEFAULT_SELECTED_OPTION_TAG,
> = Props<
  TTag,
  SelectedOptionRenderPropArg,
  SelectedOptionPropsWeControl,
  {
    options: React.ReactNode
    placeholder?: React.ReactNode
  }
>

function SelectedFn<TTag extends ElementType = typeof DEFAULT_SELECTED_OPTION_TAG>(
  props: ListboxSelectedOptionProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentListbox extends HasDisplayName {
  <
    TTag extends ElementType = typeof DEFAULT_LISTBOX_TAG,
    TType = string,
    TActualType = TType extends (infer U)[] ? U : TType,
  >(
    props: ListboxProps<TTag, TType, TActualType> & RefProp<typeof ListboxFn>
  ): React.JSX.Element
}

export interface _internal_ComponentListboxButton extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
    props: ListboxButtonProps<TTag> & RefProp<typeof ButtonFn>
  ): React.JSX.Element
}

export interface _internal_ComponentListboxLabel extends _internal_ComponentLabel {}

export interface _internal_ComponentListboxOptions extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_OPTIONS_TAG>(
    props: ListboxOptionsProps<TTag> & RefProp<typeof OptionsFn>
  ): React.JSX.Element
}

export interface _internal_ComponentListboxOption extends HasDisplayName {
  <
    TTag extends ElementType = typeof DEFAULT_OPTION_TAG,
    TType = Parameters<typeof ListboxRoot>[0]['value'],
  >(
    props: ListboxOptionProps<TTag, TType> & RefProp<typeof OptionFn>
  ): React.JSX.Element
}

export interface _internal_ComponentListboxSelectedOption extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_SELECTED_OPTION_TAG>(
    props: ListboxSelectedOptionProps<TTag> & RefProp<typeof SelectedFn>
  ): React.JSX.Element
}

let ListboxRoot = forwardRefWithAs(ListboxFn) as _internal_ComponentListbox
export let ListboxButton = forwardRefWithAs(ButtonFn) as _internal_ComponentListboxButton
/** @deprecated use `<Label>` instead of `<ListboxLabel>` */
export let ListboxLabel = Label as _internal_ComponentListboxLabel
export let ListboxOptions = forwardRefWithAs(OptionsFn) as _internal_ComponentListboxOptions
export let ListboxOption = forwardRefWithAs(OptionFn) as _internal_ComponentListboxOption
export let ListboxSelectedOption = forwardRefWithAs(
  SelectedFn
) as _internal_ComponentListboxSelectedOption

export let Listbox = Object.assign(ListboxRoot, {
  /** @deprecated use `<ListboxButton>` instead of `<Listbox.Button>` */
  Button: ListboxButton,
  /** @deprecated use `<Label>` instead of `<Listbox.Label>` */
  Label: ListboxLabel,
  /** @deprecated use `<ListboxOptions>` instead of `<Listbox.Options>` */
  Options: ListboxOptions,
  /** @deprecated use `<ListboxOption>` instead of `<Listbox.Option>` */
  Option: ListboxOption,
  /** @deprecated use `<ListboxSelectedOption>` instead of `<Listbox.SelectedOption>` */
  SelectedOption: ListboxSelectedOption,
})
