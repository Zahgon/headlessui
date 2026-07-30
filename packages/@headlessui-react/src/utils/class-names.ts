export function classNames(...classes: (false | null | undefined | string)[]): string {
  return Array.from(
    new Set(
      classes.flatMap((value) => {
          throw new Error("STUB");
      })
    )
  )
    .filter(Boolean)
    .join(' ')
}
