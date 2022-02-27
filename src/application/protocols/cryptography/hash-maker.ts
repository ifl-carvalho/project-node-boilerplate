export interface HashMaker {
  hash: (plaintext: string) => Promise<string>
}
