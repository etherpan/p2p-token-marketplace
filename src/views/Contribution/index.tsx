import { useAccount } from 'wagmi'
import {
  Text,
  Box,
  Flex,
  Button,
  NextLinkFromReactRouter,
  Card
} from 'components'
import styled from 'styled-components'
import Page from 'components/Layout/Page'
import BigNumber from 'bignumber.js'
import {  useLocksOfUser, useTotalContribution } from './hooks/useLocks'
import TokenLockTable from './components/TokenLockTable'

export const StyledAppBody = styled(Box)`
  background: ${({ theme }) => theme.colors.background};
  margin: auto;  
  border-radius: 8px;
  max-width: 1080px;
  width: 100%;
  padding: 16px 20px 28px 20px;
  z-index: 1;
`

export const StyledCard = styled(Card)`
  margin: auto;
  text-align: center;
  border-radius: 16px;
  max-width: 360px;
  width: 100%;
  padding: 20px;
`

const Locks: React.FC<React.PropsWithChildren> = () => {
  const { address: account } = useAccount()
  const locks = useLocksOfUser(account)

  const totalContribution = useTotalContribution()

  return (
    <Page>
      <StyledAppBody>
        <Flex justifyContent="space-between" alignItems="center" mb="12px">
          <Text fontSize="16px" color="text">
            Contributor Program
          </Text>
        </Flex>

        <Flex>
          <StyledCard>
            <Text>Total Contributed</Text>
            <Text color="primary">${new BigNumber(totalContribution ?? "0").div(10 ** 18).decimalPlaces(0, 1).toNumber().toLocaleString()}</Text>
          </StyledCard>
          <StyledCard>
            <Text>Total PAT Rewards</Text>
            <Text color="primary">5,000,000 PAT</Text>
          </StyledCard>
        </Flex>

        {locks && <Box mt="20px">
          <Flex justifyContent="space-between" mb="12px">
            <Text color="text" small mt="12px">
              My Contributions
            </Text>
            <Button
              as={NextLinkFromReactRouter}
              to="/cp/create"
              variant='primary'
              width="150px"
              height="36px"
            >
              Contribute
            </Button>
          </Flex>
          <TokenLockTable
            data={locks}
            length={locks.length}
          />
        </Box>}
      </StyledAppBody>
    </Page>
  )
}

export default Locks