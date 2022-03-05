import { AccountModel } from '@/domain/models'
import { Create } from '@/domain/usecases'

export interface CreateAccount extends Create<CreateAccount.Params, CreateAccount.Result> {}

export namespace CreateAccount {
  export type Params = Omit<AccountModel, 'id'>
  export type Result = { hasAccountBeenCreated: boolean }
}
