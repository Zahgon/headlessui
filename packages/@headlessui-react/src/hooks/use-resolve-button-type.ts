import { useMemo } from 'react'

export function useResolveButtonType<TTag>(
  props: { type?: string; as?: TTag },
  element: HTMLElement | null
) {
  return useMemo(() => {
      throw new Error("STUB");
  }, [props.type, props.as, element])
}
