import { Native, Token, Type } from '@sushiswap/currency'
import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { useTrade } from '../../lib/useTrade'
import { TradeLegType, TradeType, UseTradeReturn } from '@sushiswap/react-query'
import { Currency } from '@sushiswap/ui/future/components/currency'
import { Dialog } from '@sushiswap/ui/future/components/dialog'
import { UseCrossChainTradeReturn } from '../../lib/useCrossChainTrade/types'

const tokenFromRToken = (token: TradeLegType['tokenFrom']) => {
  if (token.address === '' || !token.address) return Native.onChain(Number(token.chainId))
  // TODO: move this to api, it should return a number?
  const chainId = token.chainId.toString().startsWith('Bento ')
    ? Number(token.chainId.toString().split(' ')[1])
    : Number(token.chainId)
  return new Token({
    address: token.address,
    symbol: token.symbol,
    chainId,
    decimals: 18,
  })
}

// Can render a tines multi route
export const TradeRoute: FC<{
  trade: UseTradeReturn | UseCrossChainTradeReturn | undefined
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}> = ({ open, setOpen, trade }) => {
  const onClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Content className="max-h-[320px] sm:max-h-[560px] overflow-y-scroll scroll dark:bg-slate-900 bg-white">
        <div className="flex flex-col gap-5">
          {trade?.route?.legs?.map((directPath, i) => (
            <ComplexRoutePath
              key={i}
              fromToken={tokenFromRToken(directPath.tokenFrom)}
              toToken={tokenFromRToken(directPath.tokenTo)}
              poolType={directPath.poolType}
              poolFee={directPath.poolFee}
              portion={directPath.absolutePortion}
              title={`${directPath.poolName}`}
            />
          ))}
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

interface ComplexRoutePathProps {
  fromToken: Type
  toToken: Type
  poolType: 'Stable' | 'Classic' | 'Unknown'
  poolFee: number
  portion: number
  title: string
}

const ComplexRoutePath: FC<ComplexRoutePathProps> = ({ fromToken, toToken, poolType, poolFee, portion, title }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (ref.current) {
      setWidth((ref.current.offsetWidth - 28) * Number(portion))
    }
  }, [portion])

  return (
    <div className="relative grid grid-cols-10">
      <div className="absolute inset-0 z-0 flex items-center pointer-events-none">
        <svg viewBox="850 0 300 200" width="100%" height="35" className="text-gray-300 dark:text-slate-700">
          <line
            x1="0"
            x2="3000"
            y1="100"
            y2="100"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray="1, 45"
          />
        </svg>
      </div>
      <div className="z-[10] col-span-4 flex justify-start items-center">
        <div
          ref={ref}
          className="relative flex items-center justify-between gap-2 p-2 overflow-hidden bg-white rounded-full dark:bg-slate-800 w-[150px]"
        >
          <div
            className="absolute inset-0 rounded-full pointer-events-none bg-blue/20 dark:bg-slate-700"
            style={{ width: `calc(28px + ${width}px)` }}
          />
          <div className="z-[10] flex items-center gap-1">
            <Currency.Icon disableLink currency={fromToken} width={16} height={16} />
            <span className="text-xs font-semibold text-gray-900 dark:text-slate-50 truncate">{fromToken.symbol}</span>
          </div>
          <span className="text-xs font-semibold z-[10] text-gray-900 dark:text-slate-50">
            {Number(portion * 100).toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="z-[10] col-span-3 flex justify-center items-center">
        <span className="truncate flex items-center h-5 px-1.5 text-[10px] font-semibold text-gray-900 bg-white rounded-lg whitespace-nowrap dark:bg-slate-800 dark:text-slate-400">
          {title}
        </span>
      </div>
      <div className="z-[10] col-span-3 flex justify-end items-center">
        <div className="px-2 bg-white dark:bg-slate-700 h-[32px] rounded-full flex items-center gap-1">
          <Currency.Icon disableLink currency={toToken} width={16} height={16} />
          <span className="text-xs font-semibold text-gray-900 dark:text-slate-200">{toToken.symbol}</span>
        </div>
      </div>
    </div>
  )
}
