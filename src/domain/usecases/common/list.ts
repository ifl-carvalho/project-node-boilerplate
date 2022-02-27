export interface List<BodyType> {
  list: (params: List.Params) => Promise<List.Result<BodyType>>
}

export namespace List {
  type BaseModel = {
    page: number
    limit: number
  }

  export type Params = BaseModel

  export type Result<ResultType> = BaseModel & {
    total: number
    data: ResultType[]
  }
}
