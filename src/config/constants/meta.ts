import memoize from 'lodash/memoize'

export type PageMeta = {
  title: string
  description?: string
  image?: string
}

export const DEFAULT_META: PageMeta = {
  title: 'FairbidMarketplace',
  description: 'Web 3.0 Crypto Launchpad',
  image: `https://app.fairbid.com/images/web/og/hero.jpg`,
}

interface PathList {
  paths: { [path: string]: { title: string; basePath?: boolean; description?: string; image?: string } }
  defaultTitleSuffix: string
}

const getPathList = (): PathList => {
  return {
    paths: {
      '/': { title: 'Home'},
      '/swap': { basePath: true, title: 'Swap', image: `https://app.fairbidai.com/images/web/og/swap.jpg` },
      '/add': { basePath: true, title: 'Add Pool', image: `https://app.fairbidai.com/images/web/og/liquidity.jpg` },
      '/remove': { basePath: true, title: 'Remove Pool', image: `https://app.fairbidai.com/images/web/og/liquidity.jpg` },
      '/pool': { title: 'Pool', image: `https://app.fairbidai.com/images/web/og/liquidity.jpg` },
      '/find': { title: 'Import Pool' },
      '/earn': { title: 'Earn', image: `https://app.fairbidai.com/images/web/og/farms.jpg` },
      '/info': {
        title: "Overview - Info",
        description: 'View statistics for Pancakeswap exchanges.',
        image: `https://app.fairbidai.com/images/web/og/info.jpg`,
      },
      '/info/pairs': {
        title: 'Pairs - Info',
        description: 'View statistics for Pancakeswap exchanges.',
        image: `https://app.fairbidai.com/images/web/og/info.jpg`,
      },
      '/info/tokens': {
        title: "Tokens - Info",
        description: 'View statistics for Pancakeswap exchanges.',
        image: `https://app.fairbidai.com/images/web/og/info.jpg`,
      },
      '/multisend': { title: 'Multi-Sender' },
      '/multisend/history': { title: 'Multi-Send History' },
      '/bonds': { title: 'Bonds' },
      '/token': { title: 'Token Creator' },
      '/lock': { title: 'Token Locker' },
      '/lock/create': { title: 'Create a Lock' },
      '/lock/token': { basePath: true, title: 'View Token Lock' },
      '/lock/record/': { basePath: true, title: 'View Lock Info' },
    },
    defaultTitleSuffix: 'FairBidAi',
  }
}

export const getCustomMeta = memoize(
  (path: string): PageMeta | null => {
    const pathList = getPathList()
    const basePath = Object.entries(pathList.paths).find(([url, data]) => data.basePath && path.startsWith(url))?.[0]
    const pathMetadata = pathList.paths[path] ?? (basePath && pathList.paths[basePath])

    if (pathMetadata) {
      return {
        title: `${pathMetadata.title}`,
        ...(pathMetadata.description && { description: pathMetadata.description }),
        image: pathMetadata.image,
      }
    }
    return null
  },
  (path) => `${path}`,
)
