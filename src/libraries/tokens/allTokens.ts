import { ChainId } from 'config/chains'

import { arbitrumTokens } from './constants/arb'

export const allTokens = {
  [ChainId.BSC]: arbitrumTokens,
}
