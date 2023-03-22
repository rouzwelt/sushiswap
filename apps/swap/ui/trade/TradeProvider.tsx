'use client'

import { ChainId } from '@sushiswap/chain'
import {
  Amount,
  currencyFromShortCurrencyName,
  defaultQuoteCurrency,
  isShortCurrencyName,
  Native,
  Token,
  tryParseAmount,
  Type,
} from '@sushiswap/currency'
import { AppType } from '@sushiswap/ui/types'
import React, { createContext, FC, ReactNode, useContext, useEffect, useMemo, useReducer } from 'react'
import { useAccount } from 'wagmi'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { useToken } from '@sushiswap/react-query'
import { isAddress } from 'ethers/lib/utils'
import { Signature } from '@ethersproject/bytes'
import { nanoid } from 'nanoid'
import { isUniswapV2FactoryChainId } from '@sushiswap/sushiswap'
import { isConstantProductPoolFactoryChainId, isStablePoolFactoryChainId } from '@sushiswap/trident'
import { SwapChainId } from 'types'
import { queryParamsSchema } from '../../lib/queryParamsSchema'
import { useTokenState } from '../TokenProvider'

interface InternalSwapState {
  isFallback: boolean
  tradeId: string
  review: boolean
  recipient: string | undefined
  value: string
  bentoboxSignature: Signature | undefined
}

interface SwapState {
  token0: Type | undefined
  token1: Type | undefined
  network0: SwapChainId
  network1: SwapChainId
  amount: Amount<Type> | undefined
  appType: AppType
  tokensLoading: boolean
}

type State = InternalSwapState & SwapState

type SwapApi = {
  setReview(value: boolean): void
  setRecipient(recipient: string): void
  setNetworks(chainId: SwapChainId): void
  setNetwork0(chainId: SwapChainId): void
  setNetwork1(chainId: ChainId): void
  setToken0(currency: Type): void
  setToken1(currency: Type): void
  setValue(value: string): void
  switchTokens(): void
  setTokens(currency0: Type, currency1: Type): void
  setAppType(appType: AppType): void
  setSearch(currency: Type): void
  setBentoboxSignature(signature: Signature | undefined): void
  setTradeId(id: string): void
  setFallback(val: boolean): void
}

export const SwapStateContext = createContext<State>({} as State)
export const SwapActionsContext = createContext<SwapApi>({} as SwapApi)

type Actions =
  | { type: 'setTradeId'; value: string }
  | { type: 'setValue'; value: string }
  | { type: 'setRecipient'; recipient: string }
  | { type: 'setReview'; value: boolean }
  | { type: 'setBentoboxSignature'; value: Signature }
  | { type: 'setFallback'; value: boolean }

const reducer = (state: InternalSwapState, action: Actions): InternalSwapState => {
  switch (action.type) {
    case 'setTradeId':
      return { ...state, tradeId: action.value }
    case 'setReview':
      return { ...state, review: action.value }
    case 'setRecipient':
      return { ...state, recipient: action.recipient }
    case 'setValue':
      return {
        ...state,
        value: action.value,
      }
    case 'setBentoboxSignature':
      return {
        ...state,
        bentoboxSignature: action.value,
      }
    case 'setFallback':
      return {
        ...state,
        isFallback: action.value,
      }
  }
}

interface SwapProviderProps {
  children: ReactNode
}

export const SwapProvider: FC<SwapProviderProps> = ({ children }) => {
  const { address } = useAccount()
  const { query, push, pathname } = useRouter()
  const {
    fromChainId,
    toChainId,
    fromCurrency,
    toCurrency,
    amount: _amount,
    recipient,
    review,
  } = queryParamsSchema.parse(query)
  const { token0, token1 } = useTokenState()

  console.log({ fromChainId, toChainId, fromCurrency, toCurrency })

  const [internalState, dispatch] = useReducer(reducer, {
    isFallback: true,
    tradeId: nanoid(),
    review: review ? review : false,
    recipient: recipient ? recipient : address ? address : undefined,
    value: !_amount || _amount === '0' ? '' : _amount,
    bentoboxSignature: undefined,
  })

  const state = useMemo(() => {
    return {
      ...internalState,
      appType: fromChainId === toChainId ? AppType.Swap : AppType.xSwap,
      token0,
      token1,
      network0: fromChainId,
      network1: toChainId,
      amount: tryParseAmount(internalState.value ? internalState.value.toString() : undefined, token0),
      tokensLoading: false,
    }
  }, [fromChainId, internalState, toChainId, token0, token1])

  const api = useMemo(() => {
    const setNetworks = (chainId: keyof typeof defaultQuoteCurrency) => {
      const token0 = state.token0?.chainId === chainId ? state.token0 : Native.onChain(chainId)
      const token1 =
        state.token1?.chainId === chainId
          ? state.token1.isNative
            ? state.token1.symbol
            : state.token1.wrapped.address
          : defaultQuoteCurrency[chainId].address

      void push(
        {
          pathname,
          query: {
            ...query,
            fromChainId: chainId,
            fromCurrency: token0.isNative ? token0.symbol : token0.wrapped.address,
            toChainId: chainId,
            toCurrency: token1,
            amount: '',
          },
        },
        undefined
      )
    }

    const setNetwork0 = (chainId: ChainId) => {
      const fromCurrency =
        state.token0?.chainId === chainId
          ? state.token0.isNative
            ? state.token0.symbol
            : state.token0.wrapped.address
          : Native.onChain(chainId).symbol

      void push(
        {
          pathname,
          query: {
            ...query,
            fromChainId: chainId,
            fromCurrency,
          },
        },
        undefined,
        { shallow: true }
      )
    }
    const setNetwork1 = (chainId: keyof typeof defaultQuoteCurrency) => {
      const toCurrency =
        state.token1?.chainId === chainId
          ? state.token1.isNative
            ? state.token1.symbol
            : state.token1.wrapped.address
          : defaultQuoteCurrency[chainId].address

      void push(
        {
          pathname,
          query: {
            ...query,
            toChainId: chainId,
            toCurrency,
          },
        },
        undefined,
        { shallow: true }
      )
    }
    const setTokens = (currency0: Type, currency1: Type) => {
      void push(
        {
          pathname,
          query: {
            ...query,
            fromChainId: currency0.chainId,
            fromCurrency: currency0.isNative ? currency0.symbol : currency0.wrapped.address,
            toChainId: currency1.chainId,
            toCurrency: currency1.isNative ? currency1.symbol : currency1.wrapped.address,
          },
        },
        undefined,
        { shallow: true }
      )
    }
    const setToken0 = (currency: Type) => {
      const fromCurrency = currency.isNative ? currency.symbol : currency.wrapped.address

      console.log({
        fromChainId: currency.chainId,
        fromCurrency,
        toChainId: query.toCurrency === fromCurrency ? fromChainId : toChainId,
        toCurrency: query.toCurrency === fromCurrency ? fromCurrency : toCurrency,
      })

      void push(
        {
          pathname,
          query: {
            ...query,
            fromChainId: currency.chainId,
            fromCurrency,
            toChainId: toCurrency === fromCurrency ? fromChainId : toChainId,
            toCurrency: toCurrency === fromCurrency ? fromCurrency : toCurrency,
          },
        },
        undefined,
        { shallow: true }
      )
    }
    const setToken1 = (currency: Type) => {
      const toCurrency = currency.isNative ? currency.symbol : currency.wrapped.address
      void push(
        {
          pathname,
          query: {
            ...query,
            fromChainId: fromCurrency === toCurrency ? toChainId : fromChainId,
            fromCurrency: fromCurrency === toCurrency ? toCurrency : fromCurrency,
            toChainId: currency.chainId,
            toCurrency,
          },
        },
        undefined,
        { shallow: true }
      )
    }
    const switchTokens = () =>
      void push(
        {
          pathname,
          query: {
            ...query,
            fromChainId: query.toChainId,
            fromCurrency: query.toCurrency,
            toChainId: query.fromChainId,
            toCurrency: query.fromCurrency,
          },
        },
        undefined,
        { shallow: true }
      )
    const setAppType = (appType: AppType) => {
      const network1 =
        appType === AppType.Swap
          ? state.network0
          : state.network1 === state.network0
          ? state.network1 === ChainId.ARBITRUM
            ? ChainId.ETHEREUM
            : ChainId.ARBITRUM
          : state.network1

      const token1 =
        state.token1?.chainId === network1
          ? state.token1.isNative
            ? state.token1.symbol
            : state.token1.wrapped.address
          : state.token0?.symbol === defaultQuoteCurrency[network1 as keyof typeof defaultQuoteCurrency].symbol
          ? Native.onChain(network1).symbol
          : defaultQuoteCurrency[network1 as keyof typeof defaultQuoteCurrency].address

      void push(
        {
          pathname,
          query: {
            ...query,
            toChainId: network1,
            toCurrency: token1,
          },
        },
        undefined,
        { shallow: true }
      )
    }
    const setSearch = (currency: Type) => {
      void push(
        {
          pathname,
          query: {
            ...query,
            fromChainId: currency.chainId,
            fromCurrency: Native.onChain(currency.chainId).symbol,
            toChainId: currency.chainId,
            toCurrency: currency.isNative ? currency.symbol : currency.wrapped.address,
          },
        },
        undefined,
        { shallow: true }
      )
    }

    const setValue = (value: string) => dispatch({ type: 'setValue', value })
    const setRecipient = (recipient: string) => dispatch({ type: 'setRecipient', recipient })
    const setReview = (value: boolean) => dispatch({ type: 'setReview', value })
    const setBentoboxSignature = (value: Signature) => dispatch({ type: 'setBentoboxSignature', value })
    const setTradeId = (value: string) => dispatch({ type: 'setTradeId', value })
    const setFallback = (value: boolean) => dispatch({ type: 'setFallback', value })

    return {
      setTradeId,
      setNetworks,
      setNetwork0,
      setNetwork1,
      setToken0,
      setToken1,
      setValue,
      switchTokens,
      setRecipient,
      setReview,
      setTokens,
      setAppType,
      setSearch,
      setBentoboxSignature,
      setFallback,
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    push,
    query,
    state.network0,
    state.network1,
    state.token1?.chainId,
    state.token1?.isNative,
    state.token1?.symbol,
    state.token1?.wrapped.address,
  ])

  useEffect(() => {
    if (_amount) {
      api.setValue(_amount)
    }
  }, [_amount, api])

  return (
    <SwapActionsContext.Provider value={api}>
      <SwapStateContext.Provider
        value={useMemo(() => ({ ...state, recipient: state.recipient ?? address }), [address, state])}
      >
        {children}
      </SwapStateContext.Provider>
    </SwapActionsContext.Provider>
  )
}

export const useSwapState = () => {
  const context = useContext(SwapStateContext)
  if (!context) {
    throw new Error('Hook can only be used inside State Context')
  }

  return context
}

export const useSwapActions = () => {
  const context = useContext(SwapActionsContext)
  if (!context) {
    throw new Error('Hook can only be used inside State Actions Context')
  }

  return context
}
