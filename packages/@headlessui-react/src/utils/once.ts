export function once<T>(cb: (...args: T[]) => void) {
  let state = { called: false }

  return (...args: T[]) => {
      throw new Error("STUB");
  }
}
