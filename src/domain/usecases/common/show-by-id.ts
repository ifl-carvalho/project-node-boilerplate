export interface ShowById<ResultType> {
  show: (id: string) => Promise<ResultType>
}
