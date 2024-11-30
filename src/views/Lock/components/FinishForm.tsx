import { Dispatch, SetStateAction } from 'react'
import { Text, Box, Button, Flex, NextLinkFromReactRouter } from 'components'
import { AppHeader } from 'components/App'
import { getBlockExploreLink } from 'utils'
import { LockFormView, FinishData } from '../types'
import FormContainer from './FormContainer'

export function FinishForm({
  setModalView,
  finishData,
  setFinishData,
}: {
  setModalView: Dispatch<SetStateAction<LockFormView>>
  finishData: FinishData
  setFinishData: Dispatch<SetStateAction<FinishData>>
}) {
  const handleReturn = async () => {

    setFinishData({
      id: "",
      token: "",
      hash: "",
      chainId: 148
    })

    setModalView(LockFormView.Create)
  }

  return (
    <Box p="12px" position="inherit">
      <AppHeader title='Congratulation!' noConfig />
      <FormContainer>
        <Flex width="100%" alignItems="center" flexDirection={["column", "column", "row"]}>
          <Box mr={["0", "0", "15px"]} mb={["10px", "10px", "0"]} width="100%">
            <Button
              as={NextLinkFromReactRouter}
              to={getBlockExploreLink(finishData.hash, 'transaction', finishData.chainId)}
              target='_blink'
              width="100%"
              height="36px"
              variant="secondary"
            ><Text color="primary" fontSize="14px">View Transaction</Text></Button>
          </Box>
          <Box width="100%">
            <Button
              width="100%"
              height="36px"
              variant="primary"
              onClick={handleReturn}
            ><Text fontSize="14px">Create Other</Text></Button>
          </Box>
        </Flex>
        <Flex width="100%" alignItems="center" flexDirection={["column", "column", "row"]} mt="10px">
          <Box mr={["0", "0", "15px"]} mb={["10px", "10px", "0"]} width="100%">
            <NextLinkFromReactRouter to={`/lock/token/${finishData.token}`}>
              <Button
                width="100%"
                height="36px"
                variant="primary"
              ><Text fontSize="14px">View Token</Text></Button>
            </NextLinkFromReactRouter>
          </Box>
          <Box width="100%">
            <NextLinkFromReactRouter to={`/lock/record/${finishData.id}`}>
              <Button
                width="100%"
                height="36px"
                variant="primary"
              ><Text fontSize="14px">View Lock</Text></Button>
            </NextLinkFromReactRouter>
          </Box>
        </Flex>
      </FormContainer>
    </Box>
  )
}
