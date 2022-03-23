import { Button, Flex, useModal } from '@avault/ui';
import BigNumber from 'bignumber.js';
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
  account: string;
  pid: number;
  lpSymbol?: string;
  stakingTokenBalance?: BigNumber;
  displayEarningsBalance?: string;
  contractAddress: string;
  quoteTokenDecimals: number;
  lpToCLpRate: string;
}
const Container = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const ButtonStyled = styled(Button)`
  width: 45%;
  height: 36px;
`;
const MobileAction: FC<MobileActionProps> = ({
  userDataReady,
  isApproved,
  handleApprove,
  earnings,
  requestedApproval,
  account,
  displayBalance,
  lpSymbol,
  stakingTokenBalance,
  displayEarningsBalance,
  contractAddress,
  quoteTokenDecimals,
  lpToCLpRate,
}) => {
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingTokenBalance}
      lpSymbol={lpSymbol}
      displayBalance={displayBalance}
      quoteTokenDecimals={quoteTokenDecimals}
      contractAddress={contractAddress}
    />,
  );
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={earnings}
      lpSymbol={lpSymbol}
      displayEarningsBalance={displayEarningsBalance}
      quoteTokenDecimals={quoteTokenDecimals}
      contractAddress={contractAddress}
      lpToCLpRate={lpToCLpRate}
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
        <LongButton disabled={requestedApproval || !userDataReady} onClick={handleApprove} variant="secondary">
          {account ? 'Approve' : 'Connect Wallet'}
        </LongButton>
      )}
    </Container>
  );
};
export default MobileAction;
