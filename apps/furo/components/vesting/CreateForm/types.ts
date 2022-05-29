import { Currency } from '@sushiswap/currency'
import { FundSource } from '@sushiswap/hooks'
import { JSBI } from '@sushiswap/math'

export type StepConfig = {
  label: string
  time: number
}

export type CreateVestingFormData = {
  cliff: boolean
  stepConfig: StepConfig

  currency: Currency | undefined
  startDate: string | ''
  recipient: string | ''
  cliffEndDate: string | ''
  cliffAmount: number | ''
  stepPayouts: number | undefined
  stepAmount: number | ''
  fundSource: FundSource | undefined
}

export type CreateVestingFormDataValidated = {
  currency: Currency
  cliff: boolean
  startDate: string
  recipient: string
  cliffEndDate: string | undefined
  cliffAmount: number | undefined
  stepPayouts: number
  stepAmount: number
  stepConfig: StepConfig
  fundSource: FundSource
}

export type CreateVestingFormDataTransformed = Omit<
  CreateVestingFormDataValidated,
  'startDate' | 'cliffEndDate' | 'stepEndDate'
> & {
  startDate: Date
  cliffEndDate: Date | undefined
  cliffDuration: JSBI
}