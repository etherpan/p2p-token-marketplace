import { CHAIN_IDS } from 'utils/wagmi'
import Marketplace from 'views/Marketplace'

const MarketplacePage = () => {
  return <Marketplace />
}

MarketplacePage.chains = CHAIN_IDS

export default MarketplacePage
