'use client'

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ElementType,
  type ReactNode,
  type Ref,
} from 'react'
import { useEvent } from '../../hooks/use-event'
import { useId } from '../../hooks/use-id'
import { useIsoMorphicEffect } from '../../hooks/use-iso-morphic-effect'
import { useSlot } from '../../hooks/use-slot'
import { useSyncRefs } from '../../hooks/use-sync-refs'
import { useDisabled } from '../../internal/disabled'
import type { Props } from '../../types'
import { forwardRefWithAs, useRender, type HasDisplayName, type RefProp } from '../../utils/render'

// ---

interface SharedData {
  slot?: {}
  name?: string
  props?: {}
}

let DescriptionContext = createContext<
  ({ value: string | undefined; register(value: string): () => void } & SharedData) | null
>(null)
DescriptionContext.displayName = 'DescriptionContext'

function useDescriptionContext() {
  let context = useContext(DescriptionContext)
  if (context === null) {
    let err = new Error(
      'You used a <Description /> component, but it is not inside a relevant parent.'
    )
    if (Error.captureStackTrace) Error.captureStackTrace(err, useDescriptionContext)
    throw err
  }
  return context
}

export function useDescribedBy() {
    throw new Error("STUB");
}

interface DescriptionProviderProps extends SharedData {
  children: ReactNode
  value?: string | undefined
}

export function useDescriptions(): [
  string | undefined,
  (props: DescriptionProviderProps) => React.JSX.Element,
] {
  let [descriptionIds, setDescriptionIds] = useState<string[]>([])

  return [
    // The actual id's as string or undefined
    descriptionIds.length > 0 ? descriptionIds.join(' ') : undefined,

    // The provider component
    useMemo(() => {
        throw new Error("STUB");
    }, [setDescriptionIds]),
  ]
}

// ---

let DEFAULT_DESCRIPTION_TAG = 'p' as const

export type DescriptionProps<TTag extends ElementType = typeof DEFAULT_DESCRIPTION_TAG> =
  Props<TTag>

function DescriptionFn<TTag extends ElementType = typeof DEFAULT_DESCRIPTION_TAG>(
  props: DescriptionProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---
export interface _internal_ComponentDescription extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_DESCRIPTION_TAG>(
    props: DescriptionProps<TTag> & RefProp<typeof DescriptionFn>
  ): React.JSX.Element
}

let DescriptionRoot = forwardRefWithAs(DescriptionFn) as _internal_ComponentDescription

export let Description = Object.assign(DescriptionRoot, {
  //
})
