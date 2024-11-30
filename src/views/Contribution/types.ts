export enum LockFormView {
  Create,
  Finish,
}

export interface FinishData {
  id: string
  hash: string
  chainId: number
}