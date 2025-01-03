import { useState } from 'react'
import styled from 'styled-components'
import { Box, Button, Card, Flex, NextLinkFromReactRouter, Text } from 'components'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'
import Page from 'components/Layout/Page'
import { FinishData, LaunchpadFormView, TokenData, Socials, Presale } from '../types'
import { routers } from '../constants'
import { VerifyTokenForm } from './components/VerifyTokenForm'
import { InformationForm } from './components/PresaleForm'
import { SocialsForm } from './components/SocialsForm'
import { ReviewForm } from './components/ReviewForm'
import { FinishForm } from './components/FinishForm'

const PageHeader = styled(Flex)`
  align-items: center;
  background: ${({ theme }) => theme.colors.gradientViolet};
  padding: 12px;
  border-radius: 16px;
`

export const StyledAppBody = styled(Card)`
  border-radius: 8px;
  max-width: 1200px;
  width: 100%;
  z-index: 1;
`
const CreateLaunchpad: React.FC<React.PropsWithChildren> = () => {
  const [modalView, setModalView] = useState<LaunchpadFormView>(LaunchpadFormView.VerifyToken)
  const native = useNativeCurrency()
  const { chainId } = useActiveChainId()

  const [tokenData, setTokenData] = useState<TokenData>({
    tokenAddress: "",
    tokenName: "",
    tokenDecimals: 0,
    tokenSymbol: "",
    currency: native,
    mainFee: "50",
    tokenFee: "0",
    listingOption: true
  })

  const [deFiData, setDeFiData] = useState<Presale>({
    presaleRate: "",
    whitelist: false,
    softCap: "",
    hardCap: "",
    minimumBuy: "",
    maximumBuy: "",
    refundType: false,
    router: routers[chainId][0].value,
    liquidity: "",
    listingRate: "",
    startTime: new Date(Date.now() + 24 * 3600 * 1000).toISOString().substring(0, 19),
    endTime: new Date(Date.now() + 15 * 24 * 3600 * 1000).toISOString().substring(0, 19),
    lockTime: "",
    totalAmount: "0",
    // isVesting: false,
    // vestingData: {
    //   vestingFirst: "0",
    //   vestingPeriod: "0",
    //   vestingEach: "0"
    // }
  })

  const [socials, setSocials] = useState<Socials>({
    website: "",
    logoUrl: "",
    facebook: "",
    twitter: "",
    github: "",
    telegram: "",
    instagram: "",
    discord: "",
    reddit: "",
    youtube: "",
    whitelist: "",
    description: "",
  })

  const [presale, setPresale] = useState<FinishData>({ address: "" })

  return (
    <Page>
      <PageHeader>
        <Flex width="100%" justifyContent="space-between" flexDirection={["column", null, "row"]}>
          <Flex maxWidth="500px" p="24px" flexDirection="column">
            <Text fontSize="32px">
              FairBid AI
            </Text>
            <Text my="24px">
              FairBid AI is a decentralized launchpad, securing its position as the leading platform for users to initiate their own tokens and orchestrate personalized initial token sales, all without the requirement of coding expertise.
            </Text>
            <Flex>
              <Button
                as={NextLinkFromReactRouter}
                to="/launchpad/presale"
                variant="primary"
                height="48px"
                mr="12px"
              >
                <Flex alignItems="center" justifyContent="center" width="100%" p="12px">
                  <Box>Create Presale</Box>
                </Flex>
              </Button>
              <Button
                as={NextLinkFromReactRouter}
                to="/launchpad/fairlaunch"
                variant="secondary"
                height="48px"
              >
                <Flex alignItems="center" justifyContent="center" width="100%" p="12px">
                  <Box>Create FairLaunch</Box>
                </Flex>
              </Button>
            </Flex>
          </Flex>
          <Box maxWidth="400px" mt="20px">
            <img src="/images/fairbidai/Sales.png" alt="sales" style={{ maxWidth: 240 }} />
          </Box>
        </Flex>
      </PageHeader>
      <StyledAppBody my="24px">
        {
          modalView === LaunchpadFormView.VerifyToken &&
          <VerifyTokenForm
            setModalView={setModalView}
            tokenData={tokenData}
            setTokenData={setTokenData}
          />
        }
        {
          modalView === LaunchpadFormView.DeFiInfo &&
          <InformationForm
            setModalView={setModalView}
            tokenData={tokenData}
            deFiData={deFiData}
            setDefiData={setDeFiData}
          />
        }
        {
          modalView === LaunchpadFormView.Socials &&
          <SocialsForm
            setModalView={setModalView}
            // tokenData={tokenData}
            deFiData={deFiData}
            socials={socials}
            setSocials={setSocials}
          />
        }
        {
          modalView === LaunchpadFormView.Review &&
          <ReviewForm
            setModalView={setModalView}
            tokenData={tokenData}
            deFiData={deFiData}
            socials={socials}
            setPresale={setPresale}
          />
        }
        {
          modalView === LaunchpadFormView.Finish &&
          <FinishForm
            setModalView={setModalView}
            setTokenData={setTokenData}
            setDefiData={setDeFiData}
            setSocials={setSocials}
            setPresale={setPresale}
            address={presale.address}
          />
        }
      </StyledAppBody>
    </Page>
  )
}

export default CreateLaunchpad
