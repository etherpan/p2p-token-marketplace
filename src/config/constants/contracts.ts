import { ChainId } from 'config/chains'

export default {
  masterChef: {
    [ChainId.BSC]: '0xAd55EDBeB57fDD66DB9789FE801E5dE8BB55149E',
  },
  multiCall: {
    [ChainId.BSC]: '0xcA11bde05977b3631167028862bE2a173976CA11',
  },
  multisender: {
    [ChainId.BSC]: '0x5cce03fcbe62ac9d77b594201c5ccb7f952069e8'
  },
  locker: {
    [ChainId.BSC]: '0x7b3Bd152253C493CCC83a5e7430FAcD58088f4E5',
  },
  launchpadFactory: {
    [ChainId.BSC]: '0x4A8aD368D9439E5B66d7242eEE87dd1131e1303b',
  },
  contribution: {
    [ChainId.BSC]: '0x140C951040439276bf96Bb9bc801B83704f09E6c',
  },
  smartRouter: {
    [ChainId.BSC]: '0xE80EBc294cC42DC1ccc1FF1b5A684593c80a0b01',
  }
} as const satisfies Record<string, Record<number, `0x${string}`>>
