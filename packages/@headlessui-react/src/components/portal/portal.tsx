'use client'

import React, {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ContextType,
  type ElementType,
  type MutableRefObject,
  type Ref,
} from 'react'
import { createPortal } from 'react-dom'
import { useDisposables } from '../../hooks/use-disposables'
import { useEvent } from '../../hooks/use-event'
import { useOnUnmount } from '../../hooks/use-on-unmount'
import { useOwnerDocument } from '../../hooks/use-owner'
import { useServerHandoffComplete } from '../../hooks/use-server-handoff-complete'
import { optionalRef, useSyncRefs } from '../../hooks/use-sync-refs'
import { usePortalRoot } from '../../internal/portal-force-root'
import type { Props } from '../../types'
import { env } from '../../utils/env'
import { forwardRefWithAs, useRender, type HasDisplayName, type RefProp } from '../../utils/render'

function usePortalTarget(ownerDocument: Document | null): HTMLElement | null {
  let forceInRoot = usePortalRoot()
  let groupTarget = useContext(PortalGroupContext)

  let [target, setTarget] = useState(() => {
      throw new Error("STUB");
  })

  // Ensure the portal root is always in the DOM
  useEffect(() => {
      throw new Error("STUB");
  }, [target, ownerDocument])

  useEffect(() => {
      throw new Error("STUB");
  }, [groupTarget, setTarget, forceInRoot])

  return target
}

// ---

let DEFAULT_PORTAL_TAG = Fragment
type PortalRenderPropArg = {}
type PortalPropsWeControl = never

export type PortalProps<TTag extends ElementType = typeof DEFAULT_PORTAL_TAG> = Props<
  TTag,
  PortalRenderPropArg,
  PortalPropsWeControl,
  {
    enabled?: boolean
    ownerDocument?: Document | null
  }
>

let InternalPortalFn = forwardRefWithAs(function InternalPortalFn<
  TTag extends ElementType = typeof DEFAULT_PORTAL_TAG,
>(props: PortalProps<TTag>, ref: Ref<HTMLElement>) {
    throw new Error("STUB");
})

function PortalFn<TTag extends ElementType = typeof DEFAULT_PORTAL_TAG>(
  props: PortalProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let DEFAULT_GROUP_TAG = Fragment
type GroupRenderPropArg = {}
type GroupPropsWeControl = never

let PortalGroupContext = createContext<MutableRefObject<HTMLElement | null> | null>(null)

export type PortalGroupProps<TTag extends ElementType = typeof DEFAULT_GROUP_TAG> = Props<
  TTag,
  GroupRenderPropArg,
  GroupPropsWeControl,
  {
    target: MutableRefObject<HTMLElement | null>
  }
>

function GroupFn<TTag extends ElementType = typeof DEFAULT_GROUP_TAG>(
  props: PortalGroupProps<TTag>,
  ref: Ref<HTMLElement>
) {
    throw new Error("STUB");
}

// ---

let PortalParentContext = createContext<{
  register: (portal: HTMLElement) => () => void
  unregister: (portal: HTMLElement) => void
  portals: MutableRefObject<HTMLElement[]>
} | null>(null)

export function useNestedPortals() {
  let parent = useContext(PortalParentContext)
  let portals = useRef<HTMLElement[]>([])

  let register = useEvent((portal: HTMLElement) => {
      throw new Error("STUB");
  })

  let unregister = useEvent((portal: HTMLElement) => {
      throw new Error("STUB");
  })

  let api = useMemo<ContextType<typeof PortalParentContext>>(
    () => { throw new Error("STUB"); },
    [register, unregister, portals]
  )

  return [
    portals,
    useMemo(() => {
        throw new Error("STUB");
    }, [api]),
  ] as const
}

// ---

export interface _internal_ComponentPortal extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_PORTAL_TAG>(
    props: PortalProps<TTag> & RefProp<typeof PortalFn>
  ): React.JSX.Element
}

export interface _internal_ComponentPortalGroup extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_GROUP_TAG>(
    props: PortalGroupProps<TTag> & RefProp<typeof GroupFn>
  ): React.JSX.Element
}

let PortalRoot = forwardRefWithAs(PortalFn) as unknown as _internal_ComponentPortal
export let PortalGroup = forwardRefWithAs(GroupFn) as _internal_ComponentPortalGroup

export let Portal = Object.assign(PortalRoot, {
  /** @deprecated use `<PortalGroup>` instead of `<Portal.Group>` */
  Group: PortalGroup,
})
