
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetStaticProps } from 'next'
import { CHAIN_IDS } from 'utils/wagmi'
import Marketplace from 'views/Marketplace'

const IndexPage = () => {

    
    return <Marketplace/>
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()   

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60, // 1 hour
  }
}

IndexPage.chains = CHAIN_IDS

export default IndexPage
