import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  ref,
  watchEffect,
  type ComputedRef,
  type InjectionKey,
  type Ref,
  type UnwrapNestedRefs,
} from 'vue'
import { useId } from '../../hooks/use-id'
import { useOutsideClick } from '../../hooks/use-outside-click'
import { useResolveButtonType } from '../../hooks/use-resolve-button-type'
import { useTextValue } from '../../hooks/use-text-value'
import { useTrackedPointer } from '../../hooks/use-tracked-pointer'
import { useTreeWalker } from '../../hooks/use-tree-walker'
import { State, useOpenClosed, useOpenClosedProvider } from '../../internal/open-closed'
import { Keys } from '../../keyboard'
import { Focus, calculateActiveIndex } from '../../utils/calculate-active-index'
import { dom } from '../../utils/dom'
import {
  Focus as FocusManagementFocus,
  FocusableMode,
  focusFrom,
  isFocusableElement,
  restoreFocusIfNecessary,
  sortByDomNode,
} from '../../utils/focus-management'
import { match } from '../../utils/match'
import { Features, render } from '../../utils/render'

enum MenuStates {
  Open,
  Closed,
}

enum ActivationTrigger {
  Pointer,
  Other,
}

function nextFrame(cb: () => void) {
  requestAnimationFrame(() => { throw new Error("STUB"); })
}

type MenuItemData = {
  textValue: string
  disabled: boolean
  domRef: Ref<HTMLElement | null>
}
type StateDefinition = {
  // State
  menuState: Ref<MenuStates>
  buttonRef: Ref<HTMLButtonElement | null>
  itemsRef: Ref<HTMLDivElement | null>
  items: Ref<{ id: string; dataRef: ComputedRef<MenuItemData> }[]>
  searchQuery: Ref<string>
  activeItemIndex: Ref<number | null>
  activationTrigger: Ref<ActivationTrigger>

  // State mutators
  closeMenu(): void
  openMenu(): void
  goToItem(focus: Focus, id?: string, trigger?: ActivationTrigger): void
  search(value: string): void
  clearSearch(): void
  registerItem(id: string, dataRef: ComputedRef<MenuItemData>): void
  unregisterItem(id: string): void
}

let MenuContext = Symbol('MenuContext') as InjectionKey<StateDefinition>

function useMenuContext(component: string) {
  let context = inject(MenuContext, null)

  if (context === null) {
    let err = new Error(`<${component} /> is missing a parent <Menu /> component.`)
    if (Error.captureStackTrace) Error.captureStackTrace(err, useMenuContext)
    throw err
  }

  return context
}

export let Menu = defineComponent({
  name: 'Menu',
  props: { as: { type: [Object, String], default: 'template' } },
  setup(props, { slots, attrs }) {
      throw new Error("STUB");
  },
})

export let MenuButton = defineComponent({
  name: 'MenuButton',
  props: {
    disabled: { type: Boolean, default: false },
    as: { type: [Object, String], default: 'button' },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

export let MenuItems = defineComponent({
  name: 'MenuItems',
  props: {
    as: { type: [Object, String], default: 'div' },
    static: { type: Boolean, default: false },
    unmount: { type: Boolean, default: true },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { attrs, slots, expose }) {
      throw new Error("STUB");
  },
})

export let MenuItem = defineComponent({
  name: 'MenuItem',
  inheritAttrs: false,
  props: {
    as: { type: [Object, String], default: 'template' },
    disabled: { type: Boolean, default: false },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(props, { slots, attrs, expose }) {
      throw new Error("STUB");
  },
})
