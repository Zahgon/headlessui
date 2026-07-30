import { fireEvent, logDOM, screen } from '@testing-library/dom'
import { mount } from '@vue/test-utils'
import { defineComponent, type ComponentOptionsWithoutProps } from 'vue'

let mountedWrappers = new Set()

function resolveContainer(): HTMLElement {
  let div = document.createElement('div')
  let baseElement = document.body
  let container = baseElement.appendChild(div)

  let attachTo = document.createElement('div')
  container.appendChild(attachTo)
  return attachTo
}

// It's not the most elegant type
// but Props and Emits need to be typed as any and not `{}`
type AnyComponent = ReturnType<typeof defineComponent>

export function createRenderTemplate(defaultComponents: Record<string, AnyComponent>) {
    throw new Error("STUB");
}

export function render(TestComponent: any, options?: Parameters<typeof mount>[1] | undefined) {
  let wrapper = mount(TestComponent, {
    ...options,
    attachTo: options?.attachTo ?? resolveContainer(),
  })

  mountedWrappers.add(wrapper)

  return {
    unmount() {
      wrapper.unmount()
    },
    get container() {
        throw new Error("STUB");
    },
    debug(element = wrapper.element.parentElement!) {
        throw new Error("STUB");
    },
    asFragment() {
        throw new Error("STUB");
    },
  }
}

function cleanup() {
  mountedWrappers.forEach(cleanupAtWrapper)
  document.body.innerHTML = ''
}

function cleanupAtWrapper(wrapper: any) {
    throw new Error("STUB");
}

if (typeof afterEach === 'function') {
  afterEach(() => { throw new Error("STUB"); })
}

export { fireEvent, screen }
