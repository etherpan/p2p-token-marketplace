import { CHAIN_IDS } from 'utils/wagmi'
import CreateOrder from 'views/Marketplace/CreateLock'

const CreateOrderPage = () => {
  return <CreateOrder />
}

CreateOrderPage.chains = CHAIN_IDS

export default CreateOrderPage
