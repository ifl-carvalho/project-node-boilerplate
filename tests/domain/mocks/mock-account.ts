import { CreateAccount, Authenticate } from '@/domain/usecases'

import faker from '@faker-js/faker'

export const mockCreateAccountParams = (): CreateAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authenticate.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
