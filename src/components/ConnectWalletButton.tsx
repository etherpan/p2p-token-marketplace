// import { useWeb3Modal } from '@web3modal/wagmi/react'
// import { useActiveChainId } from 'hooks/useActiveChainId'
// import { useAccount } from 'wagmi'
// import { Button } from './Button'
// import styled from 'styled-components';
// const accountEllipsis = (address?: string) => {
//   return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : null
// }

// const CustomW3MButton = styled('w3m-button')`
//   background-color: #fff !important; /* Custom background */
//   color: #ffffff !important;           /* Text color */
//   border-radius: 8px !important;       /* Rounded corners */
//   padding: 8px 16px !important;        /* Custom padding */
// `;

const ConnectWalletButton = () => {
  // const { open } = useWeb3Modal()
  // const { address, isConnected } = useAccount()
  // const { isWrongNetwork } = useActiveChainId()
  // if (isConnected)
  //   return <Button
  //     onClick={() => { 
  //         if (isWrongNetwork) 
  //           return open({view: 'Networks'})
  //         return open()
  //       }
  //     }
  //     height="32px"
  //     px="15px"
  //     style={{borderRadius: "12px"}}
  //     variant={isWrongNetwork ? 'danger' : 'secondary'}
  //   >
  //     {accountEllipsis(address)}
  //   </Button>
  return <w3m-button size="sm" />
}

export default ConnectWalletButton
