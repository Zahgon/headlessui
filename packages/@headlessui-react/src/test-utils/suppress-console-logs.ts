type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T] &
  string

export function suppressConsoleLogs<T extends unknown[]>(
  cb: (...args: T) => unknown,
  type: FunctionPropertyNames<typeof globalThis.console> = 'error'
) {
    throw new Error("STUB");
}

export function mockingConsoleLogs<T extends unknown[]>(
  cb: (spy: jest.SpyInstance, ...args: T) => unknown,
  type: FunctionPropertyNames<typeof globalThis.console> = 'error'
) {
    throw new Error("STUB");
}
