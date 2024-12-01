/* eslint-disable camelcase */
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import {
  Text,
  Flex,
  SearchInput,
  FlexLayout,
  Select,
  Box,
  OptionProps,
  Button,
  NextLinkFromReactRouter,
} from 'components'
import Page from 'components/Layout/Page'
import { CommitButton } from 'components/CommitButton'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useLaunchpadFactory } from 'hooks/useContracts'
import { SerializedLaunchpadData } from './types'
import { LaunchpadCard } from './components/LaunchpadCard'
import { filterPoolsByQuery } from './utils/filterBondsByQuery'
import { useLaunchpads as useLaunchpadList } from './hooks/useLaunchpads'

const PageHeader = styled(Flex)`
  align-items: center;
  background: ${({ theme }) => theme.colors.gradientViolet};
  padding: 12px;
  border-radius: 16px;
`

const StatCard = styled(Flex)`
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 12px;
  border-radius: 16px;
  min-width: 200px;
`

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const StatContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  justify-content: space-around;
  flex-direction: column;
  margin-bottom: 32px;
  
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const NUMBER_OF_FARMS_VISIBLE = 12

const Sales: React.FC<React.PropsWithChildren> = () => {
  const { chainId } = useActiveChainId()
  const { query: urlQuery } = useRouter()
  const contract = useLaunchpadFactory()
  const totalLength = useSingleCallResult(
    {
      contract,
      functionName: 'getContributionsLength',
      args: []
    }
  )?.result


  const [length, setLength] = useState(0);
  useEffect(() => {
    if (totalLength) {
      setLength(Number(totalLength))
    }
  }, [totalLength])
  const startPosition = length !== 0 ? (length >= NUMBER_OF_FARMS_VISIBLE ? (length - NUMBER_OF_FARMS_VISIBLE) : 0) : length;

  useEffect(() => {
    setPosition(startPosition)
  }, [startPosition])

  const [position, setPosition] = useState(startPosition)

  const data = useLaunchpadList(chainId, BigInt(NUMBER_OF_FARMS_VISIBLE), BigInt(position))

  const [oldData, setOldData] = useState<SerializedLaunchpadData[]>([])

  const [_query, setQuery] = useState('')
  const normalizedUrlSearch = useMemo(() => (typeof urlQuery?.search === 'string' ? urlQuery.search : ''), [urlQuery])
  const query = normalizedUrlSearch && !_query ? normalizedUrlSearch : _query

  const [filterOption, setFilterOption] = useState('')
  const [typeOption, setTypeOption] = useState('')

  const chosenPoolsLength = useRef(0)

  const [bnbPrice, setBnbPrice] = useState(0);

  const [activeData, setActiveData] = useState<SerializedLaunchpadData[]>([])

  const poolsList = useCallback(
    (bondsToQuery: SerializedLaunchpadData[]): SerializedLaunchpadData[] => {
      return filterPoolsByQuery(bondsToQuery, query)
    },
    [query],
  )

  const activePools = poolsList(activeData)

  const chosenLaunchpads = useMemo(() => {
    const sortPools = (pools: SerializedLaunchpadData[]): SerializedLaunchpadData[] => {
      switch (filterOption) {
        case 'upcoming':
          return pools.filter((pool) => pool.status === "upcoming")
        case 'live':
          return pools.filter((pool) => pool.status === "live")
        case 'success':
          return pools.filter((pool) => pool.status === "success")
        case 'ended':
          return pools.filter((pool) => pool.status === "ended")
        case 'canceled':
          return pools.filter((pool) => pool.status === "canceled")
        case 'whitelist':
          return pools.filter((pool) => pool.whitelist !== "")
        default:
          return pools
      }
    }

    return sortPools(activePools)
  }, [activePools, filterOption])

  const chosenLaunchpadsByType = useMemo(() => {
    const sortPools = (pools: SerializedLaunchpadData[]): SerializedLaunchpadData[] => {
      switch (typeOption) {
        case 'standard':
          return pools.filter((pool) => pool.presaleType === "standard")
        case 'fair':
          return pools.filter((pool) => pool.presaleType === "fair")
        default:
          return pools
      }
    }

    return sortPools(chosenLaunchpads)
  }, [chosenLaunchpads, typeOption])

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleFilterOptionChange = (option: OptionProps): void => {
    setFilterOption(option.value)
  }

  const handleSelectTypeChange = (option: OptionProps): void => {
    setTypeOption(option.value)
  }

  chosenPoolsLength.current = chosenLaunchpadsByType ? chosenLaunchpadsByType.length : 0

  useEffect(() => {
    const fetchBnbPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd'
        );
        const data_res: any = await response.json();
        setBnbPrice(data_res.binancecoin.usd); // Get BNB price in USD
      } catch {
        console.log("error")
      }
    };
    fetchBnbPrice();
  }, []);

  useEffect(() => {
    if (data?.[0]?.address !== oldData?.[0]?.address) {
      const newData = data.filter((lp) => {
        const matchedData = activeData.filter((lp1) => lp1.address === lp.address && lp1.chainId === lp.chainId)
        if (matchedData.length > 0)
          return false
        return true
      })

      setActiveData([...activeData, ...newData])
      setOldData(data)
    }
  }, [data, activeData, oldData])

  const handleLoad = () => {
    if (position < NUMBER_OF_FARMS_VISIBLE) {
      setPosition(0)
    } else {
      setPosition(position - NUMBER_OF_FARMS_VISIBLE)
    }
  }

  const getTotalRaisedAmount = () => {
    let totalAmount = 0;

    // eslint-disable-next-line array-callback-return
    chosenLaunchpadsByType.map((launchpad) => {
      let amountInUsd = 0;

      if (launchpad.buyToken === "0x0000000000000000000000000000000000000000") {
        amountInUsd = Number(launchpad.amount) * Number(bnbPrice);
      }
      else {
        amountInUsd = Number(launchpad.amount);
      }
      totalAmount += Number(amountInUsd) / 10 ** Number(launchpad.tokenDecimals);
    }
    )

    return `${totalAmount.toFixed(2)} USD`;
  }

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
      <StatContainer>
        <StatCard>
          <Flex maxWidth="300px" flexDirection="column">
            <Text fontSize="20px"> Total Liquidity Raised </Text>
            <Text color='primary' textAlign="center" fontSize="20px"> {getTotalRaisedAmount()}</Text>
          </Flex>
        </StatCard>
        <StatCard>
          <Flex maxWidth="300px" width="100%" flexDirection="column">
            <Text fontSize="20px" textAlign="center"> Total Projects </Text>
            <Text color='primary' textAlign="center" fontSize="20px"> {chosenLaunchpadsByType && (chosenLaunchpadsByType.length)}</Text>
          </Flex>
        </StatCard>
      </StatContainer>
      <ControlContainer>
        <ViewControls>
          <LabelWrapper>
            <Box mt="20px" width="100%">
              <SearchInput initialValue={normalizedUrlSearch} onChange={handleChangeQuery} placeholder="Search Launchpad" />
            </Box>
          </LabelWrapper>
        </ViewControls>
        <FilterContainer>
          <LabelWrapper style={{ marginRight: 16 }}>
            <Text textTransform="uppercase" color="textSubtle" fontSize="12px">
              Filter By
            </Text>
            <Select
              options={[
                {
                  label: 'No Filter',
                  value: '',
                },
                {
                  label: 'Upcoming',
                  value: 'upcoming',
                },
                {
                  label: 'Inprogress',
                  value: 'live',
                },
                {
                  label: 'Success',
                  value: 'success',
                },
                {
                  label: 'Ended',
                  value: 'ended',
                },
                {
                  label: 'Canceled',
                  value: 'canceled',
                },
                {
                  label: 'Whitelist',
                  value: 'whitelist',
                },
              ]}
              onOptionChange={handleFilterOptionChange}
            />
          </LabelWrapper>
          <LabelWrapper>
            <Text textTransform="uppercase" color="textSubtle" fontSize="12px">
              Pool Type
            </Text>
            <Select
              options={[
                {
                  label: 'No Filter',
                  value: '',
                },
                {
                  label: 'Launchpad',
                  value: 'standard',
                },
                {
                  label: 'Fair Launch',
                  value: 'fair',
                },
              ]}
              onOptionChange={handleSelectTypeChange}
            />
          </LabelWrapper>
        </FilterContainer>
      </ControlContainer>
      <FlexLayout>
        {chosenLaunchpadsByType && chosenLaunchpadsByType.length > 0 && chosenLaunchpadsByType.map((launchpad, index) => {

          return <LaunchpadCard
            key={launchpad.address}
            data={launchpad}
          />
        }

        )}
      </FlexLayout>
      <Flex justifyContent="center">
        <CommitButton
          variant='secondary'
          onClick={handleLoad}
          width="200px"
          id="swap-button"
          mx="10px"
        >
          Load more
        </CommitButton>
      </Flex>
      <Box mt="40px">
        <Text>
          Disclaimer: FairBid AI will never endorse or encourage that you invest in any of the projects listed and therefore, accept no liability for any loss occasioned. It is the user(s) responsibility to do their own research and seek financial advice from a professional. More information about (DYOR) can be found via <a href='https://academy.binance.com/en/glossary/do-your-own-research' style={{ color: "#FFAC26" }}>Binance Academy</a>.
        </Text>
        <Box width="100%" mt="20px" style={{ textAlign: "center" }}>
          <a href='https://www.certik.com' target='_blank' rel="noreferrer">
            <img src="/images/certik.png" width={240} alt='certik' />
          </a>
          <Text width="100%" fontSize={20}>Audit Coming Soon</Text>
        </Box>

      </Box>
    </Page>
  )
}

export default Sales