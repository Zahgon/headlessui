'use client'

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ElementType,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type Ref,
} from 'react'
import { useEvent } from '../../hooks/use-event'
import { useId } from '../../hooks/use-id'
import { useIsoMorphicEffect } from '../../hooks/use-iso-morphic-effect'
import { useSlot } from '../../hooks/use-slot'
import { useSyncRefs } from '../../hooks/use-sync-refs'
import { useDisabled } from '../../internal/disabled'
import { useProvidedId } from '../../internal/id'
import type { Props } from '../../types'
import * as DOM from '../../utils/dom'
import { forwardRefWithAs, useRender, type HasDisplayName, type RefProp } from '../../utils/render'

// ---

interface SharedData {
  slot?: {}
  name?: string
  props?: Record<string, any>
}

let LabelContext = createContext<
  ({ value: string | undefined; register(value: string): () => void } & SharedData) | null
>(null)
LabelContext.displayName = 'LabelContext'

export function useLabelContext() {
  let context = useContext(LabelContext)
  if (context === null) {
    let err = new Error('You used a <Label /> component, but it is not inside a relevant parent.')
    if (Error.captureStackTrace) Error.captureStackTrace(err, useLabelContext)
    throw err
  }
  return context
}

export function useLabelledBy(alwaysAvailableIds?: (string | undefined | null)[]) {
  let labelIds = useContext(LabelContext)?.value ?? undefined
  if ((alwaysAvailableIds?.length ?? 0) > 0) {
    return [labelIds, ...alwaysAvailableIds!].filter(Boolean).join(' ')
  }
  return labelIds
}

interface LabelProviderProps extends SharedData {
  children: ReactNode
  value?: string | undefined
}

export function useLabels({ inherit = false } = {}): [
  string | undefined,
  (props: LabelProviderProps & { inherit?: boolean }) => React.JSX.Element,
] {
  let parentLabelledBy = useLabelledBy()
  let [labelIds, setLabelIds] = useState<string[]>([])

  let allLabelIds = inherit ? [parentLabelledBy, ...labelIds].filter(Boolean) : labelIds

  return [
    // The actual id's as string or undefined.
    allLabelIds.length > 0 ? allLabelIds.join(' ') : undefined,

    // The provider component
    useMemo(() => {
        throw new Error("STUB");
    }, [setLabelIds]),
  ]
}

// ---

let DEFAULT_LABEL_TAG = 'label' as const

export type LabelProps<TTag extends ElementType = typeof DEFAULT_LABEL_TAG> = Props<TTag> & {
  passive?: boolean
  htmlFor?: string
}

function LabelFn<TTag extends ElementType = typeof DEFAULT_LABEL_TAG>(
  props: LabelProps<TTag>,
  ref: Ref<HTMLLabelElement>
) {
    throw new Error("STUB");
}

// ---

export interface _internal_ComponentLabel extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_LABEL_TAG>(
    props: LabelProps<TTag> & RefProp<typeof LabelFn>
  ): React.JSX.Element
}

let LabelRoot = forwardRefWithAs(LabelFn) as _internal_ComponentLabel

export let Label = Object.assign(LabelRoot, {
  //
})
