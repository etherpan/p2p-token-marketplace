import { CHAIN_IDS } from 'utils/wagmi'
import Presale from 'views/Sales/Presale'

const PresalePage = () => {
  return <Presale />
}

PresalePage.chains = CHAIN_IDS

export default PresalePage
