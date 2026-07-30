import { microTask } from './micro-task'

export type Disposables = ReturnType<typeof disposables>

/**
 * Disposables are a way to manage event handlers and functions like
 * `setTimeout` and `requestAnimationFrame` that need to be cleaned up when they
 * are no longer needed.
 *
 *
 * When you register a disposable function, it is added to a collection of
 * disposables. Each disposable in the collection provides a `dispose` clean up
 * function that can be called when it's no longer needed. There is also a
 * `dispose` function on the collection itself that can be used to clean up all
 * pending disposables in that collection.
 */
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
      return api.add(() => { throw new Error("STUB"); })
    },

    nextFrame(...args: Parameters<typeof requestAnimationFrame>) {
      return api.requestAnimationFrame(() => {
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

    style(node: ElementCSSInlineStyle, property: string, value: string) {
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
      // Ensure we don't add the same callback twice
      if (!_disposables.includes(cb)) {
        _disposables.push(cb)
      }

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
