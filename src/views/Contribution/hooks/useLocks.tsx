import { useMemo } from 'react'
import { Address, erc20Abi, zeroAddress } from 'viem'
import { useMultipleContractSingleData, useSingleCallResult, useSingleContractMultipleData } from 'state/multicall/hooks'
import { useContributionProgram } from 'hooks/useContracts'
import { lpTokenABI } from 'config/abi/lpTokenAbi'

// returns undefined if fails to get contract,
// or contract service fee cannot be fetched
export function useTotalContribution(): string | undefined {
  const contract = useContributionProgram()

  const count: string | undefined = useSingleCallResult({contract, functionName: 'getTotalContrubution'})?.result?.toString()

  return useMemo(
    () => count,
    [count],
  )
}

export function useLocksOfUser(user?: Address): any[] {
  const contract = useContributionProgram()

  const ids = useSingleCallResult({contract, functionName: 'getLockIdsOfUser', args: useMemo(() => [user ?? zeroAddress] as const, [user])})?.result

  const lockInfos = useSingleContractMultipleData({
    contract,
    functionName: 'lockInfo',
    args: useMemo(() => (ids ?? []).map((id) => [id] as const), [ids]),
  })

	const unlockInfos = useSingleContractMultipleData({
    contract,
    functionName: 'calculateUnlockInformation',
    args: useMemo(() => (ids ?? []).map((id) => [id] as const), [ids]),
  })

	const contrs = useSingleContractMultipleData({
    contract,
    functionName: 'getContributionById',
    args: useMemo(() => (ids ?? []).map((id) => [id] as const), [ids]),
  })

	const token0s = useMultipleContractSingleData(
    {addresses: lockInfos.map((l) => l.result?.[1]),
    abi: lpTokenABI,
    functionName: 'token0',}
  )?.map((t) => t?.result)

  const token1s = useMultipleContractSingleData(
    {addresses: lockInfos.map((l) => l.result?.[1]),
    abi: lpTokenABI,
    functionName: 'token1',}
  )?.map((t) => t?.result)

  const name0s = useMultipleContractSingleData(
    {addresses: token0s?.map((r) => r),
    abi: lpTokenABI,
    functionName: 'name',}
  )?.map((t) => t?.result)

  const name1s = useMultipleContractSingleData(
    {addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'name',}
  )?.map((t) => t?.result)

  const symbol0s = useMultipleContractSingleData(
    {addresses: token0s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'symbol',}
  )?.map((t) => t?.result)

  const symbol1s = useMultipleContractSingleData(
    {addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'symbol',}
  )?.map((t) => t?.result)

  const decimals0s = useMultipleContractSingleData(
    {addresses: token0s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'decimals',}
  )?.map((t) => t?.result)

  const decimals1s = useMultipleContractSingleData(
    {addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'decimals',}
  )?.map((t) => t?.result)

  return useMemo(
    () => lockInfos.map((r, i) => {
			return {
				id: lockInfos[i].result[0].toString(),
				pair: lockInfos[i].result[1],
				token0: token0s[i],
				token1: token1s[i],
				name0: name0s[i],
				name1: name1s[i],
				symbol0: symbol0s[i],
				symbol1: symbol1s[i],
				decimals0: decimals0s[i],
				decimals1: decimals1s[i],
				owner: lockInfos[i].result[2],
				locked: lockInfos[i].result[3].toString(),
				lockDate: lockInfos[i].result[4].toString(),
				vested: lockInfos[i].result[5].toString(),
				claimed: lockInfos[i].result[6].toString(),
				withdrawable: unlockInfos[i].result[0].toString(),
				penalty: unlockInfos[i].result[1].toString(),
				contribute: contrs[i].result.toString()
			}
		}),
    [lockInfos, unlockInfos, contrs],
  )
}

export function useContributionById(id?: bigint): string | undefined {
  const contract = useContributionProgram()

  const contribution = useSingleCallResult({contract, functionName: 'getContributionById', args: useMemo(() => [id] as const, [id])})?.result

  return useMemo(
    () => contribution,
    [contribution],
  )
}

export function useAvailablePair(pair?: Address): boolean {
	const contract = useContributionProgram()

  const contribution = useSingleCallResult({contract, functionName: 'availablePairs', args: useMemo(() => [pair] as const, [pair])})?.result

	return useMemo(
    () => contribution,
    [contribution],
  )
}

export function useUnlockInformation(id?: bigint): any {
	const contract = useContributionProgram()

  const result = useSingleCallResult({contract, functionName: 'calculateUnlockInformation', args: useMemo(() => [id] as const, [id])})?.result

	return useMemo(
    () => result,
    [result],
  )
}