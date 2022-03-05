import { AuthToken } from '@/domain/models'

export interface Authenticate {
  auth: (account: Authenticate.Params) => Promise<Authenticate.Result>
}

export namespace Authenticate {
  export type Params = { email: string, password: string }
  export type Result = AuthToken
}
