import { CheckAccountByEmailRepository, CreateAccountRepository } from '@/application/protocols'

export class CreateAccountRepositorySpy implements CreateAccountRepository {
  params: CreateAccountRepository.Params
  result = true

  async create (params: CreateAccountRepository.Params): Promise<CreateAccountRepository.Result> {
    this.params = params
    return { hasAccountBeenCreated: this.result }
  }
}
export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result = false

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return { isEmailRegistered: this.result }
  }
}
