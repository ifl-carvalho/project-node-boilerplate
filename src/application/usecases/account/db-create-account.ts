import { CreateAccount } from '@/domain/usecases'
import {
  CreateAccountRepository,
  CheckAccountByEmailRepository,
  HashMaker,
  UuidMaker
} from '@/application/protocols'

export class DbCreateAccount implements CreateAccount {
  constructor (
    private readonly uuidMaker: UuidMaker,
    private readonly hashMaker: HashMaker,
    private readonly createAccountRepository: CreateAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async create ({
    name,
    email,
    password,
    ...rest
  }: CreateAccount.Params): Promise<CreateAccount.Result> {
    const { isEmailRegistered } = await this.checkAccountByEmailRepository.checkByEmail(email)
    if (isEmailRegistered) return { hasAccountBeenCreated: false }

    const id = this.uuidMaker.create()
    const hashedPassword = await this.hashMaker.hash(password)
    const { hasAccountBeenCreated } = await this.createAccountRepository.create({
      ...rest,
      id,
      name,
      email,
      password: hashedPassword
    })

    return { hasAccountBeenCreated }
  }
}
