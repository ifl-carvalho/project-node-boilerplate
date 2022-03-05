export interface UuidMaker {
  create: () => UuidMaker.Result
}

export namespace UuidMaker {
  export type Result = string
}
