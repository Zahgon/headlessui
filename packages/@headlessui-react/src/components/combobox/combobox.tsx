'use client'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { Virtualizer, useVirtualizer } from '@tanstack/react-virtual'
import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type MutableRefObject,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
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
import { useRefocusableInput } from '../../hooks/use-refocusable-input'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import { useScrollLock } from '../../hooks/use-scroll-lock'
import { useSlot } from '../../hooks/use-slot'
import { useSyncRefs } from '../../hooks/use-sync-refs'
import { useTrackedPointer } from '../../hooks/use-tracked-pointer'
import { transitionDataAttributes, useTransition } from '../../hooks/use-transition'
import { useTreeWalker } from '../../hooks/use-tree-walker'
import { useWatch } from '../../hooks/use-watch'
import { useDisabled } from '../../internal/disabled'
import {
  FloatingProvider,
  useFloatingPanel,
  useFloatingPanelProps,
  useFloatingReference,
  useResolvedAnchor,
  type AnchorProps,
} from '../../internal/floating'
import { FormFields } from '../../internal/form-fields'
import { Frozen, useFrozenData } from '../../internal/frozen'
import { useProvidedId } from '../../internal/id'
import { OpenClosedProvider, State, useOpenClosed } from '../../internal/open-closed'
import { stackMachines } from '../../machines/stack-machine'
import { useSlice } from '../../react-glue'
import type { EnsureArray, Props } from '../../types'
import { history } from '../../utils/active-element-history'
import { Focus } from '../../utils/calculate-active-index'
import { disposables } from '../../utils/disposables'
import * as DOM from '../../utils/dom'
import { match } from '../../utils/match'
import { isActiveElement } from '../../utils/owner'
import { isMobile } from '../../utils/platform'
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
import { MouseButton } from '../mouse'
import { Portal } from '../portal/portal'
import {
  ActionTypes,
  ActivationTrigger,
  ComboboxState,
  ValueMode,
  type ComboboxOptionDataRef,
} from './combobox-machine'
import {
  ComboboxContext,
  useComboboxMachine,
  useComboboxMachineContext,
} from './combobox-machine-glue'

let ComboboxDataContext = createContext<{
  value: unknown
  defaultValue: unknown
  disabled: boolean
  invalid: boolean
  mode: ValueMode
  immediate: boolean

  virtual: { options: unknown[]; disabled: (value: unknown) => boolean } | null
  calculateIndex(value: unknown): number
  compare(a: unknown, z: unknown): boolean
  isSelected(value: unknown): boolean
  onChange(value: unknown): void

  __demoMode: boolean

  optionsPropsRef: MutableRefObject<{
    static: boolean
    hold: boolean
  }>
} | null>(null)
ComboboxDataContext.displayName = 'ComboboxDataContext'

function useData(component: string) {
    throw new Error("STUB");
}
type _Data = ReturnType<typeof useData>

let VirtualContext = createContext<Virtualizer<any, any> | null>(null)

function VirtualProvider(props: {
  slot: OptionsRenderPropArg
  children: (data: { option: unknown; open: boolean }) => React.ReactElement
}) {
    throw new Error("STUB");
}

// ---

let DEFAULT_COMBOBOX_TAG = Fragment
type ComboboxRenderPropArg<TValue, TActive = TValue> = {
  open: boolean
  disabled: boolean
  invalid: boolean
  activeIndex: number | null
  activeOption: TActive | null
  value: TValue
}

export type ComboboxProps<
  TValue,
  TMultiple extends boolean | undefined,
  TTag extends ElementType = typeof DEFAULT_COMBOBOX_TAG,
> = Props<
  TTag,
  ComboboxRenderPropArg<NoInfer<TValue>>,
  'value' | 'defaultValue' | 'multiple' | 'onChange' | 'by',
  {
    value?: TMultiple extends true ? EnsureArray<TValue> : TValue
    defaultValue?: TMultiple extends true ? EnsureArray<NoInfer<TValue>> : NoInfer<TValue>

    onChange?: (value: TMultiple extends true ? EnsureArray<TValue> : TValue | null) => void
    by?: ByComparator<
      TMultiple extends true ? EnsureArray<NoInfer<TValue>>[number] : NoInfer<TValue>
    >

    /** @deprecated The `<Combobox />` is now nullable default */
    nullable?: boolean

    multiple?: TMultiple
    disabled?: boolean
    invalid?: boolean
    form?: string
    name?: string
    immediate?: boolean
    virtual?: {
      options: TMultiple extends true ? EnsureArray<NoInfer<TValue>> : NoInfer<TValue>[]
      disabled?: (
        value: TMultiple extends true ? EnsureArray<NoInfer<TValue>>[number] : NoInfer<TValue>
      ) => boolean
    } | null

    onClose?: () => void

    __demoMode?: boolean
  }
>

function ComboboxFn<TValue, TTag extends ElementType = typeof DEFAULT_COMBOBOX_TAG>(
  props: ComboboxProps<TValue, boolean | undefined, TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_INPUT_TAG = 'input' as const
type InputRenderPropArg = {
  open: boolean
  disabled: boolean
  invalid: boolean
  hover: boolean
  focus: boolean
  autofocus: boolean
}
type InputPropsWeControl =
  | 'aria-activedescendant'
  | 'aria-autocomplete'
  | 'aria-controls'
  | 'aria-expanded'
  | 'aria-labelledby'
  | 'disabled'
  | 'role'

export type ComboboxInputProps<
  TTag extends ElementType = typeof DEFAULT_INPUT_TAG,
  TType = string,
> = Props<
  TTag,
  InputRenderPropArg,
  InputPropsWeControl,
  {
    defaultValue?: TType
    disabled?: boolean
    displayValue?: (item: TType) => string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    autoFocus?: boolean
  }
>

function InputFn<
  TTag extends ElementType = typeof DEFAULT_INPUT_TAG,
  // TODO: One day we will be able to infer this type from the generic in Combobox itself.
  // But today is not that day..
  TType = Parameters<typeof ComboboxRoot>[0]['value'],
>(props: ComboboxInputProps<TTag, TType>, ref: Ref<HTMLInputElement>) {
    throw new Error("STUB");
}

// ---

let DEFAULT_BUTTON_TAG = 'button' as const
type ButtonRenderPropArg = {
  open: boolean
  active: boolean
  disabled: boolean
  invalid: boolean
  value: any
  focus: boolean
  hover: boolean
}
type ButtonPropsWeControl =
  | 'aria-controls'
  | 'aria-expanded'
  | 'aria-haspopup'
  | 'aria-labelledby'
  | 'disabled'
  | 'tabIndex'

export type ComboboxButtonProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> = Props<
  TTag,
  ButtonRenderPropArg,
  ButtonPropsWeControl,
  {
    autoFocus?: boolean
    disabled?: boolean
  }
>

function ButtonFn<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  props: ComboboxButtonProps<TTag>,
  ref: Ref<HTMLButtonElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_OPTIONS_TAG = 'div' as const
type OptionsRenderPropArg = {
  open: boolean
  option: any
}
type OptionsPropsWeControl = 'aria-labelledby' | 'aria-multiselectable' | 'role' | 'tabIndex'

let OptionsRenderFeatures = RenderFeatures.RenderStrategy | RenderFeatures.Static

export type ComboboxOptionsProps<TTag extends ElementType = typeof DEFAULT_OPTIONS_TAG> = Props<
  TTag,
  OptionsRenderPropArg,
  OptionsPropsWeControl,
  PropsForFeatures<typeof OptionsRenderFeatures> & {
    hold?: boolean
    anchor?: AnchorProps
    portal?: boolean
    modal?: boolean
    transition?: boolean
  }
>

function OptionsFn<TTag extends ElementType = typeof DEFAULT_OPTIONS_TAG>(
  props: ComboboxOptionsProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_OPTION_TAG = 'div' as const
type OptionRenderPropArg = {
  focus: boolean
  /** @deprecated use `focus` instead */
  active: boolean
  selected: boolean
  disabled: boolean
}
type OptionPropsWeControl = 'role' | 'tabIndex' | 'aria-disabled' | 'aria-selected'

export type ComboboxOptionProps<
  TTag extends ElementType = typeof DEFAULT_OPTION_TAG,
  TType = string,
> = Props<
  TTag,
  OptionRenderPropArg,
  OptionPropsWeControl,
  {
    disabled?: boolean
    value: TType
    order?: number
  }
>

function OptionFn<
  TTag extends ElementType = typeof DEFAULT_OPTION_TAG,
  // TODO: One day we will be able to infer this type from the generic in Combobox itself.
  // But today is not that day..
  TType = Parameters<typeof ComboboxRoot>[0]['value'],
>(props: ComboboxOptionProps<TTag, TType>, ref: Ref<HTMLElement>) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentCombobox extends HasDisplayName {
  <
    TValue,
    TMultiple extends boolean | undefined = false,
    TTag extends ElementType = typeof DEFAULT_COMBOBOX_TAG,
  >(
    props: ComboboxProps<TValue, TMultiple, TTag> & RefProp<typeof ComboboxFn>
  ): React.JSX.Element
}

export interface _internal_ComponentComboboxButton extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
    props: ComboboxButtonProps<TTag> & RefProp<typeof ButtonFn>
  ): React.JSX.Element
}

export interface _internal_ComponentComboboxInput extends HasDisplayName {
  <TType, TTag extends ElementType = typeof DEFAULT_INPUT_TAG>(
    props: ComboboxInputProps<TTag, TType> & RefProp<typeof InputFn>
  ): React.JSX.Element
}

export interface _internal_ComponentComboboxLabel extends _internal_ComponentLabel {}

export interface _internal_ComponentComboboxOptions extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_OPTIONS_TAG>(
    props: ComboboxOptionsProps<TTag> & RefProp<typeof OptionsFn>
  ): React.JSX.Element
}

export interface _internal_ComponentComboboxOption extends HasDisplayName {
  <
    TTag extends ElementType = typeof DEFAULT_OPTION_TAG,
    TType = Parameters<typeof ComboboxRoot>[0]['value'],
  >(
    props: ComboboxOptionProps<TTag, TType> & RefProp<typeof OptionFn>
  ): React.JSX.Element
}

let ComboboxRoot = forwardRefWithAs(ComboboxFn) as _internal_ComponentCombobox
export let ComboboxButton = forwardRefWithAs(ButtonFn) as _internal_ComponentComboboxButton
export let ComboboxInput = forwardRefWithAs(InputFn) as _internal_ComponentComboboxInput
/** @deprecated use `<Label>` instead of `<ComboboxLabel>` */
export let ComboboxLabel = Label as _internal_ComponentComboboxLabel
export let ComboboxOptions = forwardRefWithAs(OptionsFn) as _internal_ComponentComboboxOptions
export let ComboboxOption = forwardRefWithAs(OptionFn) as _internal_ComponentComboboxOption

export let Combobox = Object.assign(ComboboxRoot, {
  /** @deprecated use `<ComboboxInput>` instead of `<Combobox.Input>` */
  Input: ComboboxInput,
  /** @deprecated use `<ComboboxButton>` instead of `<Combobox.Button>` */
  Button: ComboboxButton,
  /** @deprecated use `<Label>` instead of `<Combobox.Label>` */
  Label: ComboboxLabel,
  /** @deprecated use `<ComboboxOptions>` instead of `<Combobox.Options>` */
  Options: ComboboxOptions,
  /** @deprecated use `<ComboboxOption>` instead of `<Combobox.Option>` */
  Option: ComboboxOption,
})
