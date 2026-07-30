'use client'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import React, {
  useCallback,
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
import { useSlot } from '../../hooks/use-slot'
import { useDisabled } from '../../internal/disabled'
import { FormFields } from '../../internal/form-fields'
import { useProvidedId } from '../../internal/id'
import type { Props } from '../../types'
import { isDisabledReactIssue7711 } from '../../utils/bugs'
import { attemptSubmit } from '../../utils/form'
import {
  forwardRefWithAs,
  mergeProps,
  useRender,
  type HasDisplayName,
  type RefProp,
} from '../../utils/render'
import { useDescribedBy } from '../description/description'
import { Keys } from '../keyboard'
import { useLabelledBy } from '../label/label'

let DEFAULT_CHECKBOX_TAG = 'span' as const
type CheckboxRenderPropArg = {
  checked: boolean
  changing: boolean
  focus: boolean
  active: boolean
  hover: boolean
  autofocus: boolean
  disabled: boolean
  indeterminate: boolean
}
type CheckboxPropsWeControl =
  | 'aria-checked'
  | 'aria-describedby'
  | 'aria-disabled'
  | 'aria-labelledby'
  | 'role'

export type CheckboxProps<
  TTag extends ElementType = typeof DEFAULT_CHECKBOX_TAG,
  TType = string,
> = Props<
  TTag,
  CheckboxRenderPropArg,
  CheckboxPropsWeControl,
  {
    value?: TType
    disabled?: boolean
    indeterminate?: boolean

    checked?: boolean
    defaultChecked?: boolean
    autoFocus?: boolean
    form?: string
    name?: string
    onChange?: (checked: boolean) => void
    tabIndex?: number
  }
>

function CheckboxFn<TTag extends ElementType = typeof DEFAULT_CHECKBOX_TAG, TType = any>(
  props: CheckboxProps<TTag, TType>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentCheckbox extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_CHECKBOX_TAG, TType = string>(
    props: CheckboxProps<TTag, TType> & RefProp<typeof CheckboxFn>
  ): React.JSX.Element
}

export let Checkbox = forwardRefWithAs(CheckboxFn) as _internal_ComponentCheckbox
