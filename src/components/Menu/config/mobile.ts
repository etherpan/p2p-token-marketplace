import { DropdownMenuItemType, MenuItemsType } from 'widgets/Menu'
import { DropdownMenuItems } from 'components/DropdownMenu'
import {
  TradeIcon
} from '../../Svg'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  chainId?: number,
) => ConfigMenuItemsType[] = (chainId) =>
  [
    {
      label: 'Explore',
      icon: TradeIcon,
      fillIcon: TradeIcon,
      href: '',
      showItemsOnMobile: true,
      items: [
        // {
        //   label: 'Swap',
        //   href: 'https://fairbid.finance/',
        //   type: DropdownMenuItemType.EXTERNAL_LINK
        // },
        // {
        //   label: 'Pool',
        //   href: '/pool',
        // },
        // {
        //   label: 'Farms',
        //   href: '/earn',
        // },
        // {
        //   label: 'Bonds',
        //   href: '/bonds',
        // },
        // {
        //   label: 'Launchpad',
        //   href: '/launchpad',
        // },
        {
          label: 'Token Creator',
          href: '/token',
        },
        // {
        //   label: 'Token Multi-sender',
        //   href: '/multisend',
        // },
        {
          label: 'Token Locker',
          href: '/lock',
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
