import { ChainId } from "config/chains"
import { ChainMap } from "config/constants/types"

export const fee: ChainMap<string> = {
	[ChainId.BSC]: '0.2',
}

export const routers: ChainMap<any> = {
	[ChainId.BSC]: [
		{
			label: "PattieSwap Router",
			value: "0x3c49457b9BF1E0C4Df6B0a23bD794D7DC2fCCECe",
		},
		{
			label: "Pancakeswap Router",
			value: "0x10ED43C718714eb63d5aA57B78B54704E256024E"
		}
	],
}