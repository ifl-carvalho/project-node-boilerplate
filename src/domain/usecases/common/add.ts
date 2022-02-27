export interface Add<ParamsType, ResultType> {
  add: (params: ParamsType) => Promise<ResultType>
}
