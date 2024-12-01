import { useState } from 'react'
import styled from 'styled-components'
import { Currency } from 'libraries/swap-sdk'
import { Box, Button, Card, Flex, NextLinkFromReactRouter, OpenNewIcon, Text } from 'components'
import useNativeCurrency from 'hooks/useNativeCurrency'
import Page from 'components/Layout/Page'
import { CryptoFormView, DataType } from './types'
import { InputForm } from './components/InputForm'
import { QuoteForm } from './components/QuoteForm'

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
const MultisenderPage: React.FC<React.PropsWithChildren> = () => {
  const [modalView, setModalView] = useState<CryptoFormView>(CryptoFormView.Input)

  const [data, setData] = useState<DataType[]>([])

  const [tag, setTag] = useState<string>("")

  const native = useNativeCurrency()

  const [currency, setCurrency] = useState<Currency | null>(() => native)

  return (
    <Page>
      <PageHeader>
        <Flex width="100%" justifyContent="space-between" flexDirection={["column", null, "row"]}>
          <Flex maxWidth="500px" p="24px" flexDirection="column">
            <Text fontSize="32px">
              Multi-Send Tokens
            </Text>
            <Text my="24px">
              FairBid AI is a decentralized launchpad, securing its position as the leading platform for users to initiate their own tokens and orchestrate personalized initial token sales, all without the requirement of coding expertise.
            </Text>
            <Flex>
              <Button
                as={NextLinkFromReactRouter}
                to="https://fairbidai-fairbidai-organization.gitbook.io/fairbidai-launchpad/products/fairbidai/multisender"
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
          <Box maxWidth="294px">
            <img src="/images/fairbidai/Multisender.png" alt="sales" />
          </Box>
        </Flex>
      </PageHeader>
      <Flex justifyContent="center">
        <StyledAppBody my="24px">
          {modalView === CryptoFormView.Input ? (
            <InputForm
              setModalView={setModalView}
              data={data}
              setData={setData}
              tag={tag}
              setTag={setTag}
              currency={currency}
              setCurrency={setCurrency}
            />
          ) : (
            <QuoteForm setModalView={setModalView} data={data} tag={tag} currency={currency} />
          )}
        </StyledAppBody>
      </Flex>
    </Page>
  )
}

export default MultisenderPage
