import { ChainId } from 'config/chains'
import { ERC20Token } from 'libraries/swap-sdk'

export const GTOKEN_ARB = new ERC20Token(
  ChainId.BSC,
  '0xcBC8e435993af38950a708Be002e1A6d1280132B',
  18,
  'GTOKEN',
  'G Token',
  'https://fairbidai.com/',
)

export const USDC_ARB = new ERC20Token(
  ChainId.BSC,
  '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  6,
  'USDC',
  'USD Coin',
)

export const USDT_BSC = new ERC20Token(
  ChainId.BSC,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const DAI_ARB = new ERC20Token(
  ChainId.BSC,
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  18,
  'DAI',
  'Dai Stablecoin',
  'https://makerdao.com/',
)

export const WBTC_ARB = new ERC20Token(
  ChainId.BSC,
  '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  8,
  'WBTC',
  'Wrapped BTC',
)

export const GTOKEN = {
  [ChainId.BSC]: GTOKEN_ARB,
}

export const USDC = {
  [ChainId.BSC]: USDC_ARB,
}

export const USDT = {
  [ChainId.BSC]: USDT_BSC,
}

export const DAI = {
  [ChainId.BSC]: DAI_ARB,
}


