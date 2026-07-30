import React, { createContext, useContext, useState, type MutableRefObject } from 'react'
import { Hidden, HiddenFeatures } from '../internal/hidden'
import * as DOM from '../utils/dom'
import { getOwnerDocument } from '../utils/owner'
import { useEvent } from './use-event'

export function useRootContainers({
  defaultContainers = [],
  portals,

  // Reference to a node in the "main" tree, not in the portalled Dialog tree.
  mainTreeNode,
}: {
  defaultContainers?: (Element | null | MutableRefObject<Element | null>)[]
  portals?: MutableRefObject<Element[]>
  mainTreeNode?: Element | null
} = {}) {
  let resolveContainers = useEvent(() => {
      throw new Error("STUB");
  })

  return {
    resolveContainers,
    contains: useEvent((element: Element) =>
      { throw new Error("STUB"); }
    ),
  }
}

let MainTreeContext = createContext<Element | null>(null)

/**
 * A provider for the main tree node.
 *
 * When a component is rendered in a `Portal`, it is no longer part of the main
 * tree. This provider helps to find the main tree node and pass it along to the
 * components that need it.
 *
 * The main tree node is used for features such as outside click behavior, where
 * we allow clicks in 3rd party containers, but not in the parent of the "main
 * tree".
 *
 * In case of a `Popover`, we can use the `PopoverButton` as a marker in the
 * "main tree", the `PopoverPanel` can't be used because it could be rendered in
 * a `Portal` (e.g. when using the `anchor` props).
 *
 * However, we can't use the `PopoverButton` when it's nested inside of another
 * `Popover`'s `PopoverPanel` component if the parent `PopoverPanel` is
 * rendered in a `Portal`.
 *
 * This is where the `MainTreeProvider` comes in. It will find the "main tree"
 * node and pass it on. The top-level `PopoverButton` will be used as a marker
 * in the "main tree" and nested `Popover` will use this button as well.
 */
export function MainTreeProvider({
  children,
  node,
}: {
  children: React.ReactNode
  node?: Element | null
}) {
    throw new Error("STUB");
}

/**
 * Get the main tree node from context or fallback to the optionally provided node.
 */
export function useMainTreeNode(fallbackMainTreeNode: Element | null = null) {
  // Prefer the main tree node from context, but fallback to the provided node.
  return useContext(MainTreeContext) ?? fallbackMainTreeNode
}
