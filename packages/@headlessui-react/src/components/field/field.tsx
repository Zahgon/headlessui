'use client'

import React, { type ElementType, type Ref } from 'react'
import { useId } from '../../hooks/use-id'
import { useSlot } from '../../hooks/use-slot'
import { DisabledProvider, useDisabled } from '../../internal/disabled'
import { FormFieldsProvider } from '../../internal/form-fields'
import { IdProvider } from '../../internal/id'
import type { Props } from '../../types'
import { forwardRefWithAs, useRender, type HasDisplayName, type RefProp } from '../../utils/render'
import { useDescriptions } from '../description/description'
import { useLabels } from '../label/label'

let DEFAULT_FIELD_TAG = 'div' as const

type FieldRenderPropArg = {}
type FieldPropsWeControl = never

export type FieldProps<TTag extends ElementType = typeof DEFAULT_FIELD_TAG> = Props<
  TTag,
  FieldRenderPropArg,
  FieldPropsWeControl,
  {
    disabled?: boolean
  }
>

function FieldFn<TTag extends ElementType = typeof DEFAULT_FIELD_TAG>(
  props: FieldProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

export interface _internal_ComponentField extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_FIELD_TAG>(
    props: FieldProps<TTag> & RefProp<typeof FieldFn>
  ): React.JSX.Element
}

export let Field = forwardRefWithAs(FieldFn) as _internal_ComponentField
