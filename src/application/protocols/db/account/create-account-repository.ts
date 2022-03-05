
import { AccountModel } from '@/domain/models'
import { CreateAccount } from '@/domain/usecases'

export interface CreateAccountRepository extends CreateAccount {
  create: (params: CreateAccountRepository.Params) => Promise<CreateAccountRepository.Result>
}

export namespace CreateAccountRepository {
  export type Params = AccountModel
  export type Result = CreateAccount.Result
}
