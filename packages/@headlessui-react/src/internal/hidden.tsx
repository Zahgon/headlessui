import type { ElementType, Ref } from 'react'
import type { Props } from '../types'
import { forwardRefWithAs, useRender, type HasDisplayName, type RefProp } from '../utils/render'

let DEFAULT_VISUALLY_HIDDEN_TAG = 'span' as const

export enum HiddenFeatures {
  // The default, no features.
  None = 1 << 0,

  // Whether the element should be focusable or not.
  Focusable = 1 << 1,

  // Whether it should be completely hidden, even to assistive technologies.
  Hidden = 1 << 2,
}

type HiddenRenderPropArg = {}
type HiddenPropsWeControl = never
export type HiddenProps<TTag extends ElementType = typeof DEFAULT_VISUALLY_HIDDEN_TAG> = Props<
  TTag,
  HiddenRenderPropArg,
  HiddenPropsWeControl,
  { features?: HiddenFeatures }
>

function VisuallyHidden<TTag extends ElementType = typeof DEFAULT_VISUALLY_HIDDEN_TAG>(
  props: HiddenProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

interface ComponentHidden extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_VISUALLY_HIDDEN_TAG>(
    props: HiddenProps<TTag> & RefProp<typeof VisuallyHidden>
  ): React.JSX.Element
}

export let Hidden = forwardRefWithAs(VisuallyHidden) as ComponentHidden
