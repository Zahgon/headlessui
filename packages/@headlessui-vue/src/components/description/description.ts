import {
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
  unref,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from 'vue'
import { useId } from '../../hooks/use-id'
import { render } from '../../utils/render'

// ---

let DescriptionContext = Symbol('DescriptionContext') as InjectionKey<{
  register(value: string): () => void
  slot: Ref<Record<string, any>>
  name: string
  props: Record<string, any>
}>

function useDescriptionContext() {
  let context = inject(DescriptionContext, null)
  if (context === null) {
    throw new Error('Missing parent')
  }
  return context
}

export function useDescriptions({
  slot = ref({}),
  name = 'Description',
  props = {},
}: {
  slot?: Ref<Record<string, unknown>>
  name?: string
  props?: Record<string, unknown>
} = {}): ComputedRef<string | undefined> {
  let descriptionIds = ref<string[]>([])

  function register(value: string) {
    descriptionIds.value.push(value)

    return () => {
        throw new Error("STUB");
    }
  }

  provide(DescriptionContext, { register, slot, name, props })

  // The actual id's as string or undefined.
  return computed(() =>
    { throw new Error("STUB"); }
  )
}

// ---

export let Description = defineComponent({
  name: 'Description',
  props: {
    as: { type: [Object, String], default: 'p' },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(myProps, { attrs, slots }) {
      throw new Error("STUB");
  },
})
