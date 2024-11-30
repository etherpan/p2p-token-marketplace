import { useState } from 'react'
import styled from 'styled-components'
import { ChainId } from 'config/chains'
import { Box, Button, Card, Flex, NextLinkFromReactRouter, OpenNewIcon, Text } from 'components'
import Page from 'components/Layout/Page'
import { FinishData, TokenData, TokenFormView } from './types'
import { VerifyTokenForm } from './components/VerifyTokenForm'
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
  padding: 4px 8px 16px 8px;
  z-index: 1;
`
const Launchpad: React.FC<React.PropsWithChildren> = () => {
  const [modalView, setModalView] = useState<TokenFormView>(TokenFormView.Create)

  const [ tokenData, setTokenData ] = useState<TokenData>({
    name: "",
    symbol: "",
    decimals: "",
    totalSupply: "",
    type: "standard",
    liquidityGen: undefined
  })

  const [finishData, setFinishData] = useState<FinishData>({
    address: "" as `0x${string}`,
    hash: "",
    chainId: ChainId.BSC
  })

  return (
    <Page>
      <PageHeader>
        <Flex width="100%" justifyContent="space-between" flexDirection={["column", null, "row"]}>
          <Flex maxWidth="500px" p="24px" flexDirection="column">
            <Text fontSize="32px">
              Create Your Token
            </Text>
            <Text my="24px">
            PattiePad is a decentralized launchpad, securing its position as the leading platform for users to initiate their own tokens and orchestrate personalized initial token sales, all without the requirement of coding expertise.
            </Text>
            <Flex>
              <Button
                as={NextLinkFromReactRouter}
                to="https://pattie-pattiepad-organization.gitbook.io/pattiepad-launchpad/products/pattiepad/tokens"
                target="_blink"
                variant="secondary"
                height="48px"
                width="150px"
              >
                <Flex alignItems="center" justifyContent="space-between" width="100%" p="12px">
                  <Box>Learn More</Box>
                  <OpenNewIcon color="primary" />
                </Flex>
              </Button>
            </Flex>
          </Flex>
          {/* <Box maxWidth="290px">
            <img src="/images/pattie/Tokens.png" alt="sales" />
          </Box> */}
        </Flex>
      </PageHeader>
      <StyledAppBody my="24px">
        {
          modalView === TokenFormView.Create && 
          <VerifyTokenForm
            setModalView={setModalView}
            tokenData={tokenData}
            setTokenData={setTokenData}
            setFinishData={setFinishData}
          />
        }
        {
          modalView === TokenFormView.Finish && 
          <FinishForm
            setModalView={setModalView}
            tokenData={tokenData}
            finishData={finishData}
            setTokenData={setTokenData}
            setFinishData={setFinishData}
          />
        }
      </StyledAppBody>
    </Page>
  )
}

export default Launchpad
