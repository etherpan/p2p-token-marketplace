import { MenuItemsType, DropdownMenuItemType } from 'widgets/Menu'
import { DropdownMenuItems } from 'components/DropdownMenu'
import {
  MoreIcon
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
      label: '',
      icon: MoreIcon,
      fillIcon: MoreIcon,
      href: '',
      showItemsOnMobile: true,
      items: [
        {
          label: 'Twitter',
          href: 'https://x.com/pattieswap',
          type: DropdownMenuItemType.EXTERNAL_LINK
        },
        {
          label: 'Telegram',
          href: 'https://t.me/PattieswapChat',
          type: DropdownMenuItemType.EXTERNAL_LINK
        },
        {
          label: 'Reddit',
          href: 'https://reddit.com/pattieswap',
          type: DropdownMenuItemType.EXTERNAL_LINK
        },
        {
          label: 'Docs',
          href: 'https://pattie-pattiepad-organization.gitbook.io/pattiepad-launchpad/',
          type: DropdownMenuItemType.EXTERNAL_LINK
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
