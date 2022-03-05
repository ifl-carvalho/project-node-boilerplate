import { DbCreateAccount } from '@/application/usecases'
import { throwError, mockCreateAccountParams } from '@/tests/domain/mocks'
import {
  UuidMakerSpy,
  HashMakerSpy,
  CreateAccountRepositorySpy,
  CheckAccountByEmailRepositorySpy
} from '@/tests/application/mocks'

type SutType = {
  sut: DbCreateAccount
  uuidMakerSpy: UuidMakerSpy
  hashMakerSpy: HashMakerSpy
  createAccountRepositorySpy: CreateAccountRepositorySpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): SutType => {
  const uuidMakerSpy = new UuidMakerSpy()
  const hashMakerSpy = new HashMakerSpy()
  const createAccountRepositorySpy = new CreateAccountRepositorySpy()
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const sut = new DbCreateAccount(
    uuidMakerSpy,
    hashMakerSpy,
    createAccountRepositorySpy,
    checkAccountByEmailRepositorySpy
  )
  return {
    sut,
    uuidMakerSpy,
    hashMakerSpy,
    createAccountRepositorySpy,
    checkAccountByEmailRepositorySpy
  }
}

describe('DbAddUser UseCase', () => {
  test('Should call HashMaker with correct plaintext', async () => {
    const { sut, hashMakerSpy } = makeSut()
    const addAccountParams = mockCreateAccountParams()
    await sut.create(addAccountParams)
    expect(hashMakerSpy.plaintext).toBe(addAccountParams.password)
  })

  test('Should throw if HashMaker throws', async () => {
    const { sut, hashMakerSpy } = makeSut()
    jest.spyOn(hashMakerSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.create(mockCreateAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Repository with the Uuid generated by the UuidMakerSpy', async () => {
    const { sut, createAccountRepositorySpy, uuidMakerSpy } = makeSut()
    const addAccountParams = mockCreateAccountParams()
    await sut.create(addAccountParams)
    expect(createAccountRepositorySpy.params.id).toBe(uuidMakerSpy.uuid)
  })

  test('Should call CreateAccountRepository with correct values', async () => {
    const { sut, createAccountRepositorySpy, hashMakerSpy } = makeSut()
    const addAccountParams = mockCreateAccountParams()
    await sut.create(addAccountParams)
    delete createAccountRepositorySpy.params.id
    expect(createAccountRepositorySpy.params).toEqual({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: hashMakerSpy.digest
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, createAccountRepositorySpy } = makeSut()
    jest.spyOn(createAccountRepositorySpy, 'create').mockImplementationOnce(throwError)
    const promise = sut.create(mockCreateAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const { hasAccountBeenCreated } = await sut.create(mockCreateAccountParams())
    expect(hasAccountBeenCreated).toBe(true)
  })

  test('Should return false if CreateAccountRepository returns false', async () => {
    const { sut, createAccountRepositorySpy } = makeSut()
    createAccountRepositorySpy.result = false
    const { hasAccountBeenCreated } = await sut.create(mockCreateAccountParams())
    expect(hasAccountBeenCreated).toBe(false)
  })

  test('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const { hasAccountBeenCreated } = await sut.create(mockCreateAccountParams())
    expect(hasAccountBeenCreated).toBe(false)
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockCreateAccountParams()
    await sut.create(addAccountParams)
    expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })
})
