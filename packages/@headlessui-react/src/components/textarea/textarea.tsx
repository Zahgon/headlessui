'use client'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { type ElementType, type Ref } from 'react'
import { useId } from '../../hooks/use-id'
import { useSlot } from '../../hooks/use-slot'
import { useDisabled } from '../../internal/disabled'
import { useProvidedId } from '../../internal/id'
import type { Props } from '../../types'
import {
  forwardRefWithAs,
  mergeProps,
  useRender,
  type HasDisplayName,
  type RefProp,
} from '../../utils/render'
import { useDescribedBy } from '../description/description'
import { useLabelledBy } from '../label/label'

let DEFAULT_TEXTAREA_TAG = 'textarea' as const

type TextareaRenderPropArg = {
  disabled: boolean
  hover: boolean
  focus: boolean
  autofocus: boolean
  invalid: boolean
}
type TextareaPropsWeControl = 'aria-labelledby' | 'aria-describedby'

export type TextareaProps<TTag extends ElementType = typeof DEFAULT_TEXTAREA_TAG> = Props<
  TTag,
  TextareaRenderPropArg,
  TextareaPropsWeControl,
  {
    disabled?: boolean
    invalid?: boolean
    autoFocus?: boolean
  }
>

function TextareaFn<TTag extends ElementType = typeof DEFAULT_TEXTAREA_TAG>(
  props: TextareaProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

export interface _internal_ComponentTextarea extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_TEXTAREA_TAG>(
    props: TextareaProps<TTag> & RefProp<typeof TextareaFn>
  ): React.JSX.Element
}

export let Textarea = forwardRefWithAs(TextareaFn) as _internal_ComponentTextarea
