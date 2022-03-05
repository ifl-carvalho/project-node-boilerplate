export interface Create<ParamsType, ResultType> {
  create: (params: ParamsType) => Promise<ResultType>
}
