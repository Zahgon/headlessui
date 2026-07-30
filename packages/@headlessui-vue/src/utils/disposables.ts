import { microTask } from './micro-task'

export type Disposables = ReturnType<typeof disposables>

export function disposables() {
  let _disposables: Function[] = []

  let api = {
    addEventListener<TEventName extends keyof WindowEventMap>(
      element: HTMLElement | Window | Document,
      name: TEventName,
      listener: (event: WindowEventMap[TEventName]) => any,
      options?: boolean | AddEventListenerOptions
    ) {
      element.addEventListener(name, listener as any, options)
      return api.add(() => { throw new Error("STUB"); })
    },

    requestAnimationFrame(...args: Parameters<typeof requestAnimationFrame>) {
      let raf = requestAnimationFrame(...args)
      api.add(() => { throw new Error("STUB"); })
    },

    nextFrame(...args: Parameters<typeof requestAnimationFrame>) {
      api.requestAnimationFrame(() => {
          throw new Error("STUB");
      })
    },

    setTimeout(...args: Parameters<typeof setTimeout>) {
        throw new Error("STUB");
    },

    microTask(...args: Parameters<typeof microTask>) {
      let task = { current: true }
      microTask(() => {
          throw new Error("STUB");
      })
      return api.add(() => {
          throw new Error("STUB");
      })
    },

    style(node: HTMLElement, property: string, value: string) {
      let previous = node.style.getPropertyValue(property)
      Object.assign(node.style, { [property]: value })
      return this.add(() => {
          throw new Error("STUB");
      })
    },

    group(cb: (d: typeof this) => void) {
      let d = disposables()
      cb(d)
      return this.add(() => { throw new Error("STUB"); })
    },

    add(cb: () => void) {
      _disposables.push(cb)
      return () => {
          throw new Error("STUB");
      }
    },

    dispose() {
      for (let dispose of _disposables.splice(0)) {
        dispose()
      }
    },
  }

  return api
}
