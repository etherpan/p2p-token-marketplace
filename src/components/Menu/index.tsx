import { Menu as AMenu } from 'widgets/Menu'
import { CHAIN_QUERY_NAME } from 'config/chains'
import { NextLinkFromReactRouter } from 'components/NextLink'
import ConnectWalletButton from 'components/ConnectWalletButton'
import PhishingWarningBanner from 'components/PhishingWarningBanner'
import { GTOKEN } from 'libraries/tokens'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useBUSDPrice from 'hooks/useBUSDPrice'
import { useRouter } from 'next/router'
// import { Button } from 'components/Button';
// import { Box, Flex } from 'components/Box';
import { usePhishingBanner } from 'utils/user'
import { useMatchBreakpoints } from 'contexts';
import { useMenuItems } from './hooks/useMenuItems'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerLinks'

const LinkComponent = (linkProps) => {
  return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
}

const Menu = (props) => {
  const { chainId } = useActiveChainId()
  const cakePriceUsd = useBUSDPrice(GTOKEN[chainId])
  const { pathname } = useRouter()

  const { menuItems, mobileItems, socialItems } = useMenuItems()

  const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  const [showPhishingWarningBanner] = usePhishingBanner()
  const { isMobile } = useMatchBreakpoints();
  return (
    <>
      <AMenu
        linkComponent={LinkComponent}
        rightSide={
          <>
            {/* <GlobalSettings mode={SettingsMode.GLOBAL} /> */}
            {/* {!isMobile &&
              <Button
                as={NextLinkFromReactRouter}
                to="https://fairbid.com"
                variant="secondary"
                height="32px"
                mr="12px"
                target='_blank'
              >
                <Flex alignItems="center" justifyContent="center" width="100%" p="12px">
                  <Box>Buy fairbidai</Box>
                </Flex>
              </Button>
            } */}
            <ConnectWalletButton />
          </>
        }
        chainId={chainId}
        banner={showPhishingWarningBanner && typeof window !== 'undefined' && <PhishingWarningBanner />}
        cakePriceUsd={cakePriceUsd}
        links={menuItems}
        mobileLinks={mobileItems}
        socialLinks={socialItems}
        subLinks={activeMenuItem?.hideSubNav || activeSubMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
        activeItem={activeMenuItem?.href}
        activeSubItem={activeSubMenuItem?.href}
        footerLinks={footerLinks()}
        buyCakeLabel='Buy CAKE'
        buyCakeLink={`/swap?chain=${CHAIN_QUERY_NAME[chainId]}`}
        {...props}
      />
    </>
  )
}

export default Menu
