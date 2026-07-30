'use client'

import React, { type ElementType, type Ref } from 'react'
import { useResolvedTag } from '../../hooks/use-resolved-tag'
import { useSlot } from '../../hooks/use-slot'
import { useSyncRefs } from '../../hooks/use-sync-refs'
import { DisabledProvider, useDisabled } from '../../internal/disabled'
import type { Props } from '../../types'
import { forwardRefWithAs, useRender, type HasDisplayName, type RefProp } from '../../utils/render'
import { useLabels } from '../label/label'

let DEFAULT_FIELDSET_TAG = 'fieldset' as const

type FieldsetRenderPropArg = {}
type FieldsetPropsWeControl = 'aria-labelledby' | 'aria-disabled' | 'role'

export type FieldsetProps<TTag extends ElementType = typeof DEFAULT_FIELDSET_TAG> = Props<
  TTag,
  FieldsetRenderPropArg,
  FieldsetPropsWeControl,
  {
    disabled?: boolean
  }
>

function FieldsetFn<TTag extends ElementType = typeof DEFAULT_FIELDSET_TAG>(
  props: FieldsetProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

export interface _internal_ComponentFieldset extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_FIELDSET_TAG>(
    props: FieldsetProps<TTag> & RefProp<typeof FieldsetFn>
  ): React.JSX.Element
}

export let Fieldset = forwardRefWithAs(FieldsetFn) as _internal_ComponentFieldset
