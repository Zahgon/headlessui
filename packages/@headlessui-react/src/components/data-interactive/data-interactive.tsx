'use client'

import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { Fragment, type ElementType, type Ref } from 'react'
import { useActivePress } from '../../hooks/use-active-press'
import { useSlot } from '../../hooks/use-slot'
import type { Props } from '../../types'
import {
  forwardRefWithAs,
  mergeProps,
  useRender,
  type HasDisplayName,
  type RefProp,
} from '../../utils/render'

let DEFAULT_DATA_INTERACTIVE_TAG = Fragment

type DataInteractiveRenderPropArg = {
  hover: boolean
  focus: boolean
  active: boolean
}
type DataInteractivePropsWeControl = never

export type DataInteractiveProps<TTag extends ElementType = typeof DEFAULT_DATA_INTERACTIVE_TAG> =
  Props<TTag, DataInteractiveRenderPropArg, DataInteractivePropsWeControl, {}>

function DataInteractiveFn<TTag extends ElementType = typeof DEFAULT_DATA_INTERACTIVE_TAG>(
  props: DataInteractiveProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

export interface _internal_ComponentDataInteractive extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_DATA_INTERACTIVE_TAG>(
    props: DataInteractiveProps<TTag> & RefProp<typeof DataInteractiveFn>
  ): React.JSX.Element
}

export let DataInteractive = forwardRefWithAs(
  DataInteractiveFn
) as _internal_ComponentDataInteractive
