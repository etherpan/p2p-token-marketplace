import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | FAIRBID',
  defaultTitle: 'FAIRBID',
  description:
    'FairBid P2P Token Marketplace is a Web 3.0 decentralized Token Marketplace on Base network.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@',
    site: '@',
  },
  openGraph: {
    title: 'FairBid - Crypto Marketplace 100% Decentralized Web 3.0 Marketplace On Base Network.',
    description:
      'FairBid P2P Token Marketplace is a Web 3.0 decentralized Marketplace on BSC network.',
    images: [{ url: 'https://app.fairbid.com/logo.png' }],
  },
}
