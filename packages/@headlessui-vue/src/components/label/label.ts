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
} from 'vue'
import { useId } from '../../hooks/use-id'
import { render } from '../../utils/render'

// ---

let LabelContext = Symbol('LabelContext') as InjectionKey<{
  register(value: string): () => void
  slot: Record<string, unknown>
  name: string
  props: Record<string, unknown>
}>

function useLabelContext() {
  let context = inject(LabelContext, null)
  if (context === null) {
    let err = new Error('You used a <Label /> component, but it is not inside a parent.')
    if (Error.captureStackTrace) Error.captureStackTrace(err, useLabelContext)
    throw err
  }
  return context
}

export function useLabels({
  slot = {},
  name = 'Label',
  props = {},
}: {
  slot?: Record<string, unknown>
  name?: string
  props?: Record<string, unknown>
} = {}): ComputedRef<string | undefined> {
  let labelIds = ref<string[]>([])
  function register(value: string) {
    labelIds.value.push(value)

    return () => {
        throw new Error("STUB");
    }
  }

  provide(LabelContext, { register, slot, name, props })

  // The actual id's as string or undefined.
  return computed(() => { throw new Error("STUB"); })
}

// ---

export let Label = defineComponent({
  name: 'Label',
  props: {
    as: { type: [Object, String], default: 'label' },
    passive: { type: [Boolean], default: false },
    id: { type: String, default: () => { throw new Error("STUB"); } },
  },
  setup(myProps, { slots, attrs }) {
      throw new Error("STUB");
  },
})
