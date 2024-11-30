import { useCallback } from 'react'
import { useAccount, useWalletClient } from 'wagmi'

const useCreateToken = () => {
	const { address: account } = useAccount()
  const { data: signer } = useWalletClient()

  const handleDeploy = useCallback(
    async (abi, bytecode, args, value) => {
      return signer?.deployContract({
        abi, 
        bytecode, 
        account,
        chain: signer.chain,
        args,
        value
      })
    },
    [signer, account]
  )

  return { onDeploy: handleDeploy }
}

export default useCreateToken
