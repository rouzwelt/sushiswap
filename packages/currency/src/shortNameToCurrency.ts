import { ChainId } from '@sushiswap/chain'

import { DAI, FRAX, LUSD, MAI, MIM, SUSHI, UNI, USDC, USDT, WBTC, WETH9, WNATIVE } from './constants'
import { Native } from './Native'
import { Type } from './Type'

const CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY = {
  [ChainId.ETHEREUM]: {
    NATIVE: Native.onChain(ChainId.ETHEREUM),
    WNATIVE: WETH9[ChainId.ETHEREUM],
    ETH: Native.onChain(ChainId.ETHEREUM),
    WETH: WETH9[ChainId.ETHEREUM],
    WBTC: WBTC[ChainId.ETHEREUM],
    USDC: USDC[ChainId.ETHEREUM],
    USDT: USDT[ChainId.ETHEREUM],
    DAI: DAI[ChainId.ETHEREUM],
    FRAX: FRAX[ChainId.ETHEREUM],
    MIM: MIM[ChainId.ETHEREUM],
    SUSHI: SUSHI[ChainId.ETHEREUM],
    MAI: MAI[ChainId.ETHEREUM],
    UNI: UNI[ChainId.ETHEREUM],
    LUSD: LUSD[ChainId.ETHEREUM],
  },
  [ChainId.POLYGON]: {
    NATIVE: Native.onChain(ChainId.POLYGON),
    WNATIVE: WNATIVE[ChainId.POLYGON],
    MATIC: Native.onChain(ChainId.POLYGON),
    WMATIC: WNATIVE[ChainId.POLYGON],
    ETH: WETH9[ChainId.POLYGON],
    WETH: WETH9[ChainId.POLYGON],
    WBTC: WBTC[ChainId.POLYGON],
    USDC: USDC[ChainId.POLYGON],
    USDT: USDT[ChainId.POLYGON],
    DAI: DAI[ChainId.POLYGON],
    FRAX: FRAX[ChainId.POLYGON],
    MIM: MIM[ChainId.POLYGON],
    SUSHI: SUSHI[ChainId.POLYGON],
    MAI: MAI[ChainId.POLYGON],
    UNI: UNI[ChainId.POLYGON],
  },
  [ChainId.ARBITRUM]: {
    NATIVE: Native.onChain(ChainId.ARBITRUM),
    WNATIVE: WNATIVE[ChainId.ARBITRUM],
    ETH: Native.onChain(ChainId.ARBITRUM),
    WETH: WNATIVE[ChainId.ARBITRUM],
    WBTC: WBTC[ChainId.ARBITRUM],
    USDC: USDC[ChainId.ARBITRUM],
    USDT: USDT[ChainId.ARBITRUM],
    DAI: DAI[ChainId.ARBITRUM],
    FRAX: FRAX[ChainId.ARBITRUM],
    MIM: MIM[ChainId.ARBITRUM],
    SUSHI: SUSHI[ChainId.ARBITRUM],
    MAI: MAI[ChainId.ARBITRUM],
    UNI: UNI[ChainId.ARBITRUM],
  },
  [ChainId.FANTOM]: {
    NATIVE: Native.onChain(ChainId.FANTOM),
    WNATIVE: WNATIVE[ChainId.FANTOM],
    FTM: Native.onChain(ChainId.FANTOM),
    WFTM: WNATIVE[ChainId.FANTOM],
    ETH: WETH9[ChainId.FANTOM],
    WETH: WETH9[ChainId.FANTOM],
    WBTC: WBTC[ChainId.FANTOM],
    USDC: USDC[ChainId.FANTOM],
    USDT: USDT[ChainId.FANTOM],
    DAI: DAI[ChainId.FANTOM],
    FRAX: FRAX[ChainId.FANTOM],
    MIM: MIM[ChainId.FANTOM],
    SUSHI: SUSHI[ChainId.FANTOM],
    MAI: MAI[ChainId.FANTOM],
  },
} as const

export type ShortCurrencyNameChainId = keyof typeof CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY

export type ShortCurrencyName = keyof (typeof CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY)[ShortCurrencyNameChainId]

export const isShortCurrencyNameSupported = (chainId: ChainId): chainId is ShortCurrencyNameChainId =>
  chainId in CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY

export const isShortCurrencyName = (
  chainId: ChainId,
  shortCurrencyName: string
): shortCurrencyName is ShortCurrencyName => {
  return isShortCurrencyNameSupported(chainId) && shortCurrencyName in CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY[chainId]
}

export const currencyFromShortCurrencyName = (chainId: ChainId, shortCurrencyName: ShortCurrencyName): Type => {
  if (!isShortCurrencyNameSupported(chainId))
    throw new Error(`Unsupported chain id ${chainId} for short currency name ${shortCurrencyName}`)
  if (!(shortCurrencyName in CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY[chainId]))
    throw new Error(`Unsupported short currency name ${shortCurrencyName} on chain ${chainId}`)
  return CHAIN_ID_SHORT_CURRENCY_NAME_TO_CURRENCY[chainId][shortCurrencyName]
}
