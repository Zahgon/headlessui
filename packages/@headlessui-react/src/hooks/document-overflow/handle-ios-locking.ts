import { disposables } from '../../utils/disposables'
import * as DOM from '../../utils/dom'
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
      function inAllowedContainer(el: Element) {
        for (let resolve of meta().containers) {
          for (let element of resolve()) {
            if (element.contains(el)) {
              return true
            }
          }
        }

        return false
      }

      d.microTask(() => {
          throw new Error("STUB");
      })
    },
  }
}
