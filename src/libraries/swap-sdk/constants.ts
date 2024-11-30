import { ChainId } from 'config/chains'
import { Percent } from 'libraries/swap-sdk-core'
import { ERC20Token } from './entities/token'

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const FACTORY_ADDRESS = '0xf1D7CC64Fb4452F05c498126312eBE29f30Fbcf9'

export const FACTORY_ADDRESS_MAP: Record<number, `0x${string}`> = {
  [ChainId.BSC]: FACTORY_ADDRESS,
}
export const INIT_CODE_HASH = '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f'

export const INIT_CODE_HASH_MAP: Record<number, `0x${string}`> = {
  [ChainId.BSC]: INIT_CODE_HASH,
}

export const WETH9 = {
  [ChainId.BSC]: new ERC20Token(
    ChainId.BSC,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://weth.io'
  ),
}

export const WNATIVE: Record<number, ERC20Token> = {
  [ChainId.BSC]: WETH9[ChainId.BSC],
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.BSC]: { name: 'BNB', symbol: 'BNB', decimals: 18 },
}
