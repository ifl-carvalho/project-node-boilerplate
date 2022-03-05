import { UuidMaker } from '@/application/protocols'

import faker from '@faker-js/faker'

export class UuidMakerSpy implements UuidMaker {
  uuid = faker.datatype.uuid()

  create (): string {
    return this.uuid
  }
}
