import { disposables } from '../../utils/disposables'
import { isIOS } from '../../utils/platform'
import type { ScrollLockStep } from './overflow-store'

interface ContainerMetadata {
  containers: (() => HTMLElement[])[]
}

export function handleIOSLocking(): ScrollLockStep<ContainerMetadata> {
  if (!isIOS()) {
    return {}
  }

  return {
    before({ doc, d, meta }) {
      function inAllowedContainer(el: HTMLElement) {
        return meta.containers
          .flatMap((resolve) => { throw new Error("STUB"); })
          .some((container) => { throw new Error("STUB"); })
      }

      d.microTask(() => {
          throw new Error("STUB");
      })
    },
  }
}
