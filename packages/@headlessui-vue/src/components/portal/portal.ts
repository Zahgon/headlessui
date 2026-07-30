import {
  Teleport,
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  watch,
  watchEffect,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue'
import { usePortalRoot } from '../../internal/portal-force-root'
import { dom } from '../../utils/dom'
import { getOwnerDocument } from '../../utils/owner'
import { render } from '../../utils/render'

type ContextType<T> = T extends InjectionKey<infer V> ? V : never

// ---

function getPortalRoot(contextElement?: HTMLElement | null) {
  let ownerDocument = getOwnerDocument(contextElement)
  if (!ownerDocument) {
    if (contextElement === null) {
      return null
    }

    throw new Error(
      `[Headless UI]: Cannot find ownerDocument for contextElement: ${contextElement}`
    )
  }
  let existingRoot = ownerDocument.getElementById('headlessui-portal-root')
  if (existingRoot) return existingRoot

  let root = ownerDocument.createElement('div')
  root.setAttribute('id', 'headlessui-portal-root')
  return ownerDocument.body.appendChild(root)
}

export let Portal = defineComponent({
  name: 'Portal',
  props: {
    as: { type: [Object, String], default: 'div' },
  },
  setup(props, { slots, attrs }) {
      throw new Error("STUB");
  },
})

// ---

let PortalParentContext = Symbol('PortalParentContext') as InjectionKey<{
  register: (portal: HTMLElement) => () => void
  unregister: (portal: HTMLElement) => void
  portals: Ref<HTMLElement[]>
}>

export function useNestedPortals() {
  let parent = inject(PortalParentContext, null)
  let portals = ref<HTMLElement[]>([])

  function register(portal: HTMLElement) {
    portals.value.push(portal)
    if (parent) parent.register(portal)
    return () => { throw new Error("STUB"); }
  }

  function unregister(portal: HTMLElement) {
    let idx = portals.value.indexOf(portal)
    if (idx !== -1) portals.value.splice(idx, 1)
    if (parent) parent.unregister(portal)
  }

  let api = {
    register,
    unregister,
    portals,
  } as ContextType<typeof PortalParentContext>

  return [
    portals,
    defineComponent({
      name: 'PortalWrapper',
      setup(_, { slots }) {
          throw new Error("STUB");
      },
    }),
  ] as const
}

// ---

let PortalGroupContext = Symbol('PortalGroupContext') as InjectionKey<{
  resolveTarget(): HTMLElement | null
}>

export let PortalGroup = defineComponent({
  name: 'PortalGroup',
  props: {
    as: { type: [Object, String], default: 'template' },
    target: { type: Object as PropType<HTMLElement | null>, default: null },
  },
  setup(props, { attrs, slots }) {
      throw new Error("STUB");
  },
})
