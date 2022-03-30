import { Button, Flex, useModal } from '@avault/ui';
import BigNumber from 'bignumber.js';
import Loading from 'components/TransactionConfirmationModal/Loading';
import { FC } from 'react';
import styled from 'styled-components';
import DepositModal from './DepositModal';
import { LongButton } from './styles';
import WithdrawModal from './WithdrawModal';

interface MobileActionProps {
  userDataReady: boolean;
  displayBalance: string;
  earnings: BigNumber;
  isApproved: boolean;
  handleApprove: any;
  requestedApproval: boolean;
  requestedApprovalSuccess: boolean;
  account: string;
  pid: number;
  lpSymbol?: string;
  stakingTokenBalance?: BigNumber;
  displayEarningsBalance?: string;
  contractAddress: string;
  lpAddressDecimals: number;
  lpToCLpRate: string;
  index: number;
}
const Container = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
const ButtonStyled = styled(Button)`
  width: 46%;
  height: 36px;
`;
const MobileAction: FC<MobileActionProps> = ({
  userDataReady,
  isApproved,
  handleApprove,
  earnings,
  requestedApproval,
  requestedApprovalSuccess,
  account,
  displayBalance,
  lpSymbol,
  stakingTokenBalance,
  displayEarningsBalance,
  contractAddress,
  lpAddressDecimals,
  lpToCLpRate,
  index,
}) => {
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingTokenBalance}
      lpSymbol={lpSymbol}
      displayBalance={displayBalance}
      lpAddressDecimals={lpAddressDecimals}
      contractAddress={contractAddress}
      index={index}
    />,
  );
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={earnings}
      lpSymbol={lpSymbol}
      displayEarningsBalance={displayEarningsBalance}
      lpAddressDecimals={lpAddressDecimals}
      contractAddress={contractAddress}
      lpToCLpRate={lpToCLpRate}
      index={index}
    />,
  );

  return (
    <Container>
      {isApproved ? (
        <>
          <ButtonStyled onClick={onPresentDeposit}>Deposit</ButtonStyled>
          <ButtonStyled variant="tertiary" onClick={onPresentWithdraw}>
            Withdraw
          </ButtonStyled>
        </>
      ) : (
        <LongButton
          disabled={requestedApproval || !userDataReady}
          onClick={handleApprove}
          isLoading={requestedApproval}
          variant="secondary"
        >
          {account ? 'Approve' : 'Connect Wallet'}
          <Loading isLoading={requestedApproval} success={requestedApprovalSuccess} />
        </LongButton>
      )}
    </Container>
  );
};
export default MobileAction;
