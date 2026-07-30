'use client'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { type ElementType, type Ref } from 'react'
import { useActivePress } from '../../hooks/use-active-press'
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

let DEFAULT_SELECT_TAG = 'select' as const

type SelectRenderPropArg = {
  disabled: boolean
  hover: boolean
  focus: boolean
  active: boolean
  autofocus: boolean
  invalid: boolean
}
type SelectPropsWeControl = 'aria-labelledby' | 'aria-describedby'

export type SelectProps<TTag extends ElementType = typeof DEFAULT_SELECT_TAG> = Props<
  TTag,
  SelectRenderPropArg,
  SelectPropsWeControl,
  {
    disabled?: boolean
    invalid?: boolean
    autoFocus?: boolean
  }
>

function SelectFn<TTag extends ElementType = typeof DEFAULT_SELECT_TAG>(
  props: SelectProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

export interface _internal_ComponentSelect extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_SELECT_TAG>(
    props: SelectProps<TTag> & RefProp<typeof SelectFn>
  ): React.JSX.Element
}

export let Select = forwardRefWithAs(SelectFn) as _internal_ComponentSelect
