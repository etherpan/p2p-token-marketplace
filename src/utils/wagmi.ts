import { CHAINS } from 'config/chains'
import memoize from 'lodash/memoize'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi'
import { cookieStorage, createStorage } from 'wagmi'
import { publicClient } from './viem'

export const chains = CHAINS

export const noopStorage = {
  getItem: (_key: any) => '',
  setItem: (_key: any, _value: any) => {},
  removeItem: (_key: any) => {},
}

const metadata = {
  name: 'PattiePad - Crypto LaunchPad 100% Decentralized Web 3.0 IDO Launchpad On Binance Network & Solana.',
  description: 'Description: PattiePad Launchpad is a Web 3.0 decentralized IDO launchpad on BSC and Solana network that allows users to launch their own token and create their own initial token sale and listing on Multiple Network.',
  url: 'https://app.pattiepad.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const config = defaultWagmiConfig({
  chains,
  projectId: "93f48d5647f269da06b4c2f798ada741",
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})

createWeb3Modal({
  wagmiConfig: config,
  projectId: "cbc26f55d8f823d91b6df23169f49320",
  allowUnsupportedChain: false,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeVariables: {
    '--w3m-color-mix': '#443D37',
    '--w3m-color-mix-strength': 40,
    '--w3m-accent': '#e6ac00',
    '--w3m-border-radius-master': '1.5px'
  }
})

export const CHAIN_IDS = chains.map((c) => c.id)

export const isChainSupported = memoize((chainId: number) => (CHAIN_IDS as number[]).includes(chainId))
export const isChainTestnet = memoize((chainId: number) => {
  const found = chains.find((c) => c.id === chainId)
  return found ? 'testnet' in found : false
})

export { publicClient }
