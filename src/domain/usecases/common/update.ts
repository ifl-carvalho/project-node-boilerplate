export interface Update<ParamsType, ResultType> {
  update: (params: ParamsType) => Promise<ResultType>
}
