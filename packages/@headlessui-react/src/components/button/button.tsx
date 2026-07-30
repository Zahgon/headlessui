'use client'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { type ElementType, type Ref } from 'react'
import { useActivePress } from '../../hooks/use-active-press'
import { useSlot } from '../../hooks/use-slot'
import { useDisabled } from '../../internal/disabled'
import type { Props } from '../../types'
import {
  forwardRefWithAs,
  mergeProps,
  useRender,
  type HasDisplayName,
  type RefProp,
} from '../../utils/render'

let DEFAULT_BUTTON_TAG = 'button' as const

type ButtonRenderPropArg = {
  disabled: boolean
  hover: boolean
  focus: boolean
  active: boolean
  autofocus: boolean
}
type ButtonPropsWeControl = never

export type ButtonProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> = Props<
  TTag,
  ButtonRenderPropArg,
  ButtonPropsWeControl,
  {
    disabled?: boolean
    autoFocus?: boolean
    type?: 'button' | 'submit' | 'reset'
  }
>

function ButtonFn<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  props: ButtonProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

export interface _internal_ComponentButton extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
    props: ButtonProps<TTag> & RefProp<typeof ButtonFn>
  ): React.JSX.Element
}

export let Button = forwardRefWithAs(ButtonFn) as _internal_ComponentButton
