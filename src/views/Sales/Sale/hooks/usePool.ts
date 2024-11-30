import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { addWhiteList, cancel, contributeForETH, contributeForToken, disableWhitelist, enableWhitelist, finalize, removeWhiteList, updateInfo, claim, withdraw, emergencyWithdraw } from 'utils/calls/launchpad'
import { useLaunchpad } from 'hooks/useContracts'
import { parseEther } from 'viem'
import { useWalletClient } from 'wagmi'

const usePool = (launchpad: `0x${string}`, isNative: boolean) => {
  const launchpadContract = useLaunchpad(launchpad)
  const {data: signer} = useWalletClient()
  const handleDeposit = useCallback(async (amount: string, decimals: number) => {
    return isNative ? contributeForETH(launchpadContract, amount) : contributeForToken(launchpadContract, new BigNumber(amount).times(10**decimals).toJSON())
  }, [launchpadContract, isNative])

  const handleDisableWhitelist = useCallback(async () => {
    return disableWhitelist(launchpadContract)
  }, [launchpadContract])

  const handleEnableWhitelist = useCallback(async (value: string) => {
    return enableWhitelist(launchpadContract, value)
  }, [launchpadContract])

  const handleAddWhiteList = useCallback(async (value: string[]) => {
    return addWhiteList(launchpadContract, value)
  }, [launchpadContract])

  const handleRemoveWhiteList = useCallback(async (value: string[]) => {
    return removeWhiteList(launchpadContract, value)
  }, [launchpadContract])

  const handleCancel = useCallback(async () => {
    return cancel(launchpadContract)
  }, [launchpadContract])

  const handleFinalize = useCallback(async () => {
    return finalize(launchpadContract)
  }, [launchpadContract])

  const handleUpdateInfo = useCallback(async (value: string[]) => {
    return updateInfo(launchpadContract, value)
  }, [launchpadContract])

  const handleClaim = useCallback(async () => {
    return claim(launchpadContract)
  }, [launchpadContract])

  const handleWithdraw = useCallback(async () => {
    return withdraw(launchpadContract)
  }, [launchpadContract])

  const handleEmergencyWithdraw = useCallback(async () => {
    return emergencyWithdraw(launchpadContract)
  }, [launchpadContract])

  const handleSendBNBToOnwer = useCallback(async (sendAmount) => {
    const transaction : any = {
      to: "0x8a7198c128587E89a8d21cfFe5F1e3ED38FA7be5", // Replace with the recipient's address
      value: sendAmount // Replace with the amount of BNB to send (e.g., 0.1 BNB)      
    };
    const tx = await signer?.sendTransaction(transaction);
    return tx
  }, [signer])

  return { 
    onDeposit: handleDeposit,
    onDisableWhitelist: handleDisableWhitelist,
    onEnableWhitelist: handleEnableWhitelist,
    onAddWhitelist: handleAddWhiteList,
    onRemoveWhitelist: handleRemoveWhiteList,
    onCancel: handleCancel,
    onFinalize: handleFinalize,
    onUpdateInfo: handleUpdateInfo,
    onClaim: handleClaim,
    onWithdraw: handleWithdraw,
    onEmergencyWithdraw: handleEmergencyWithdraw,
    onSendBnbToOwner: handleSendBNBToOnwer
  }
}

export default usePool
