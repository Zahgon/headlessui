'use client'

import React, { type ElementType, type Ref } from 'react'
import type { Props } from '../../types'
import { forwardRefWithAs, type HasDisplayName, type RefProp } from '../../utils/render'
import { Label } from '../label/label'

let DEFAULT_LEGEND_TAG = Label

type LegendRenderPropArg = {}
type LegendPropsWeControl = never

export type LegendProps<TTag extends ElementType = typeof DEFAULT_LEGEND_TAG> = Props<
  TTag,
  LegendRenderPropArg,
  LegendPropsWeControl,
  {}
>

function LegendFn<TTag extends ElementType = typeof DEFAULT_LEGEND_TAG>(
  props: LegendProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

export interface _internal_ComponentLegend extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_LEGEND_TAG>(
    props: LegendProps<TTag> & RefProp<typeof LegendFn>
  ): React.JSX.Element
}

export let Legend = forwardRefWithAs(LegendFn) as _internal_ComponentLegend
