export interface Middleware<ReqType> {
  (request: ReqType, next: (req: ReqType) => void): void
}

export function pipeline<ReqType>(handlers: Middleware<ReqType>[]) {
    throw new Error("STUB");
}
