import { UuidMaker } from '@/application/protocols'
import { v4 as uuid } from 'uuid'

export class UuidAdapter implements UuidMaker {
  create (): string {
    return uuid()
  }
}
