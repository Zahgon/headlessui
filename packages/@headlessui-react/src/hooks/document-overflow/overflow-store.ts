import { disposables, type Disposables } from '../../utils/disposables'
import { createStore } from '../../utils/store'
import { adjustScrollbarPadding } from './adjust-scrollbar-padding'
import { handleIOSLocking } from './handle-ios-locking'
import { preventScroll } from './prevent-scroll'

interface DocEntry {
  doc: Document
  count: number
  d: Disposables
  meta: Set<MetaFn>
  computedMeta: Record<string, any>
}

function buildMeta(fns: Iterable<MetaFn>) {
  let tmp = {}
  for (let fn of fns) {
    Object.assign(tmp, fn(tmp))
  }
  return tmp
}

export type MetaFn = (meta: Record<string, any>) => Record<string, any>

export interface Context<MetaType extends Record<string, any> = any> {
  doc: Document
  d: Disposables
  meta: () => MetaType
}

export interface ScrollLockStep<MetaType extends Record<string, any> = any> {
  before?: (ctx: Context<MetaType>) => void
  after?: (ctx: Context<MetaType>) => void
}

export let overflows = createStore(() => { throw new Error("STUB"); }, {
  PUSH(doc: Document, meta: MetaFn) {
        throw new Error("STUB");
    },

  POP(doc: Document, meta: MetaFn) {
      throw new Error("STUB");
  },

  SCROLL_PREVENT(entry: DocEntry) {
      throw new Error("STUB");
  },

  SCROLL_ALLOW({ d }: DocEntry) {
      throw new Error("STUB");
  },

  TEARDOWN({ doc }: DocEntry) {
      throw new Error("STUB");
  },
})

// Update the document overflow state when the store changes
// This MUST happen outside of react for this to work properly.
overflows.subscribe(() => {
    throw new Error("STUB");
})
