import { User, AuthToken } from '@/domain/models'
import { Add } from '@/domain/usecases'

export interface AddUser extends Add<AddUser.Params, AddUser.Result> {}

export namespace AddUser {
  export type Params = User
  export type Result = AuthToken
}
