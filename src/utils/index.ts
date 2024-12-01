import { ChainId } from 'config/chains'
import { Currency } from 'libraries/swap-sdk'
import { TokenAddressMap } from 'libraries/token-lists'
import memoize from 'lodash/memoize'
import { Address, getAddress } from 'viem'
import { arbitrum } from 'wagmi/chains'
import { routers } from 'views/Sales/constants'
import { chains } from './wagmi'

// returns the checksummed address if the address is valid, otherwise returns undefined
export const safeGetAddress = memoize((value: any): Address | undefined => {
  try {
    let value_ = value
    if (typeof value === 'string' && !value.startsWith('0x')) {
      value_ = `0x${value}`
    }
    return getAddress(value_)
  } catch {
    return undefined
  }
})

export function getBlockExploreLink(
  data: string | number | undefined | null,
  type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
  chainIdOverride?: number,
): string {
  const chainId = chainIdOverride || ChainId.BSC
  const chain = chains.find((c) => c.id === chainId)
  if (!chain || !data) return arbitrum.blockExplorers.default.url
  switch (type) {
    case 'transaction': {
      return `${chain?.blockExplorers?.default.url}/tx/${data}`
    }
    case 'token': {
      return `${chain?.blockExplorers?.default.url}/token/${data}`
    }
    case 'block': {
      return `${chain?.blockExplorers?.default.url}/block/${data}`
    }
    case 'countdown': {
      return `${chain?.blockExplorers?.default.url}/block/countdown/${data}`
    }
    default: {
      return `${chain?.blockExplorers?.default.url}/address/${data}`
    }
  }
}

export function getOnListSwapLink(data: string | number | undefined | null, token: string | number | undefined | null) {
  let swapLink;
  if(data === routers[ChainId.BSC][1].value) {
    swapLink = `https://pancakeswap.finance/swap?outputCurrency=${token}`
  } else {
    swapLink = `https://fairbidai.finance/swap?outputCurrency=${token}`
  }
  
  return swapLink;
}

export function getRouterName(data: string | number | undefined | null) {
  let routerName = "fairbidai Router";
  for (let i = 0; i < routers[ChainId.BSC].length; i++) {
    if(data === routers[ChainId.BSC][i].value) {
      routerName = routers[ChainId.BSC][i].label
    }
  }
  return routerName;
} 

export function getBlockExploreName(chainIdOverride?: number) {
  const chainId = chainIdOverride || ChainId.BSC
  const chain = chains.find((c) => c.id === chainId)

  return chain?.blockExplorers?.default.name || arbitrum.blockExplorers.default.name
}

export function getBscScanLinkForNft(collectionAddress: string | undefined, tokenId?: string): string {
  if (!collectionAddress) return ''
  return `${arbitrum.blockExplorers.default.url}/token/${collectionAddress}?a=${tokenId}`
}

// add 10%
export function calculateGasMargin(value: bigint, margin = 1000n): bigint {
  return (value * (10000n + margin)) / 10000n
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(defaultTokens: TokenAddressMap<ChainId>, currency?: Currency): boolean {
  if (currency?.isNative) return true
  return Boolean(currency?.isToken && defaultTokens[currency.chainId]?.[currency.address])
}
