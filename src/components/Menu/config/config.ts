// import { DropdownMenuItemType, MenuItemsType } from 'widgets/Menu'
import { MenuItemsType } from 'widgets/Menu'
import { DropdownMenuItems } from 'components/DropdownMenu'
import {
  // EarnFillIcon,
  // EarnIcon,
  MultisenderIcon
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
  isDark: boolean,
  chainId?: number,
) => ConfigMenuItemsType[] = (isDark, chainId) =>
  [
    // {
    //   label: 'Trade',
    //   icon: TradeIcon,
    //   fillIcon: TradeIcon,
    //   href: '/swap',
    //   showItemsOnMobile: true,
    //   items: [
    //     {
    //       label: 'Swap',
    //       href: '/swap',
    //     },
    //     {
    //       label: 'Pool',
    //       href: '/pool',
    //     },
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: 'Farms',
    //   href: '/earn',
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   image: '/images/decorations/pe2.png',
    //   showItemsOnMobile: false,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: 'Bonds',
    //   href: '/bonds',
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   image: '/images/decorations/pe2.png',
    //   showItemsOnMobile: false,
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: 'Swap',
    //   href: 'https://fairbid.finance/',      
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   image: '/images/decorations/pe2.png',
    //   type: DropdownMenuItemType.EXTERNAL_LINK
    // },
    // {
    //   label: 'Launchpad',
    //   href: '/launchpad',
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   image: '/images/decorations/pe2.png',
    //   items: [].map((item) => addMenuItemSupported(item, chainId)),
    // },
    {
      label: 'P2P Marketplace',
      href: '/marketplace',
      icon: MultisenderIcon,
      fillIcon: MultisenderIcon,
      image: '/images/decorations/pe2.png',
      items: [
        // {
        //   label: 'Token Creator',
        //   href: '/token'
        // },
        // {
        //   label: 'Token Multi-sender',
        //   href: '/multisend',
        // },
        {
          label: 'Create Order',
          href: '/marketplace/create'
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
