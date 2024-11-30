import BigNumber from "bignumber.js";
import { useCallback, useState } from "react";
import _toNumber from "lodash/toNumber";
import { 
  Button,
  AutoRenewIcon,
  Box,
  Text,
  Input,
  Flex,
  Checkbox
} from "components";
import { Modal, ModalActions } from "widgets/Modal";
import { useToast } from "contexts";
import useCatchTxError from "hooks/useCatchTxError";
import { ToastDescriptionWithTx } from "components/Toast";
import { useAppDispatch } from "state";
import { fetchLaunchpadPublicDataAsync } from "state/launchpad";
import { parseEther } from "viem";
import usePool from "../hooks/usePool";

interface DepositModalProps {
  chainId: number
  pool: `0x${string}`
  endTime: number
  onDismiss?: () => void
}

const KYCAndAuditModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  chainId,
  pool,
  endTime,
  onDismiss,
}) => {
  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const [kycService, setKycService] = useState<boolean>(false)
  const [auditService, setAuditService] = useState<boolean>(false)
  const { onSendBnbToOwner } = usePool(pool, false)
  const dispatch = useAppDispatch()

  const onDone = useCallback(
    () => {
      dispatch(fetchLaunchpadPublicDataAsync({ address: pool, chainId }))
    },
    [pool, chainId, dispatch],
  )

  const onConfirm = async () => {
    const sendAmount = (kycService && auditService) ? parseEther('1') : parseEther('0.5')
    const receipt = await fetchWithCatchTxError(() => onSendBnbToOwner(sendAmount))

    if (receipt?.status) {
      toastSuccess(
        `You Paid for KYC or Audit!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          Please contact to support right now.
        </ToastDescriptionWithTx>,
      )
      onDone()
    }
  }



  return (
    <Modal title="Contact Support" onDismiss={onDismiss}>
      <Box width={["100%", "100%", "100%", "420px"]}>
        <Flex alignItems="center" mb="10px">        
          <Text ml="10px">To enhance trust and security for your presale, you can request the addition of KYC (Know Your Customer) and Audit badges. These badges will display prominently on your project, signaling to potential investors that your project has undergone thorough verification.</Text>
        </Flex>
          <Text ml="10px" color="yellow">Telegram: @Pattieswap</Text>  

      </Box>
      <Flex alignItems="center" mb="10px" onClick={() => setKycService(!kycService)}>
        <Checkbox
          scale="sm"
          checked={kycService}
          readOnly
        />
        <Text ml="10px">Request KYC Service: 0.5 BNB</Text>
      </Flex>
      <Flex alignItems="center" mb="10px" onClick={() => setAuditService(!auditService)}>
          <Checkbox
            scale="sm"
            checked={auditService}
            readOnly
          />
          <Text ml="10px">Rquest Audit Service: 0.5 BNB</Text>
        </Flex>
      
      <ModalActions>
          <Button variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx} height="48px">
            Cancel
          </Button>
          {pendingTx ? (
            <Button 
              variant="primary"
              width="100%" 
              isLoading={pendingTx} 
              endIcon={<AutoRenewIcon spin color="currentColor" />} 
              height="48px"
            >
              Confirming
            </Button>
          ) : (
            <Button
              variant="primary"
              width="100%"
              disabled={!kycService && !auditService}
              onClick={async () => {
                setPendingTx(true);
                await onConfirm();
                onDismiss?.();
                setPendingTx(false);
              }}
              height="48px"
            >
              Confirm
            </Button>
          )}
        </ModalActions>
    </Modal>
  );
};

export default KYCAndAuditModal;
