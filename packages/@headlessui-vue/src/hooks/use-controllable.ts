import { computed, ref, type ComputedRef, type UnwrapRef } from 'vue'

export function useControllable<T>(
  controlledValue: ComputedRef<T | undefined>,
  onChange?: (value: T) => void,
  defaultValue?: ComputedRef<T>
) {
  let internalValue = ref(defaultValue?.value)
  let isControlled = computed(() => { throw new Error("STUB"); })

  return [
    computed(() => { throw new Error("STUB"); }),
    function (value: unknown) {
        throw new Error("STUB");
    },
  ] as const
}
