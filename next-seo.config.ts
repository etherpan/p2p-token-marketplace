import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | PATTIEPAD',
  defaultTitle: 'PATTIEPAD',
  description:
    'PattiePad Launchpad is a Web 3.0 decentralized IDO launchpad on BSC and Solana network that allows users to launch their own token and create their own initial token sale and listing on Multiple Network',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@',
    site: '@',
  },
  openGraph: {
    title: 'PattiePad - Crypto LaunchPad 100% Decentralized Web 3.0 IDO Launchpad On Binance Network & Solana.',
    description:
      'PattiePad Launchpad is a Web 3.0 decentralized IDO launchpad on BSC and Solana network that allows users to launch their own token and create their own initial token sale and listing on Multiple Network',
    images: [{ url: 'https://app.pattiepad.com/logo.png' }],
  },
}
