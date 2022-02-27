export interface Delete<ResultType> {
  delete: (id: string) => Promise<ResultType>
}
