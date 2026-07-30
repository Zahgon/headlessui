import { inject, onMounted, onUnmounted, provide, watch, type InjectionKey, type Ref } from 'vue'

type OnUpdate = (message: StackMessage, type: string, element: Ref<HTMLElement | null>) => void

let StackContext = Symbol('StackContext') as InjectionKey<OnUpdate>

export enum StackMessage {
  Add,
  Remove,
}

export function useStackContext() {
  return inject(StackContext, () => {
      throw new Error("STUB");
  })
}

export function useStackProvider({
  type,
  enabled,
  element,
  onUpdate,
}: {
  type: string
  enabled: Ref<boolean | undefined>
  element: Ref<HTMLElement | null>
  onUpdate?: OnUpdate
}) {
  let parentUpdate = useStackContext()

  function notify(...args: Parameters<OnUpdate>) {
    // Notify our layer
    onUpdate?.(...args)

    // Notify the parent
    parentUpdate(...args)
  }

  onMounted(() => {
      throw new Error("STUB");
  })

  onUnmounted(() => {
      throw new Error("STUB");
  })

  provide(StackContext, notify)
}
