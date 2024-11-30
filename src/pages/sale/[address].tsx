import { ChainId } from 'config/chains'
import { useRouter } from 'next/router'
import Launchpad from 'views/Sales/Sale'

const LaunchpadPage = () => {
  const router = useRouter()

  const address = router.query.address as `0x${string}`
  return <Launchpad pool={address} />
}

LaunchpadPage.chains = [ChainId.BSC]

export default LaunchpadPage