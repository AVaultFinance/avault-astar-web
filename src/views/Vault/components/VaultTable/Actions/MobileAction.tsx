import { AutoRenewIcon, Button, Flex, useModal } from '@my/ui';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { IABIType } from 'state/vault/types';
import styled from 'styled-components';
import DepositModal from '../modal/DepositModal';
import WithdrawModal from '../modal/WithdrawModal';
import { LongButton } from './styles';

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
  lpAddressDecimals: number;
  lpToCLpRate: string;
  index: number;
  abiType: IABIType;
  wantAddress: string;
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
  account,
  displayBalance,
  lpSymbol,
  stakingTokenBalance,
  displayEarningsBalance,
  contractAddress,
  lpAddressDecimals,
  lpToCLpRate,
  index,
  abiType,
  wantAddress,
}) => {
  const [onPresentDeposit] = useModal(
    <DepositModal
      wantAddress={wantAddress}
      abiType={abiType}
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
      wantAddress={wantAddress}
      max={earnings}
      lpSymbol={lpSymbol}
      displayEarningsBalance={displayEarningsBalance}
      lpAddressDecimals={lpAddressDecimals}
      contractAddress={contractAddress}
      lpToCLpRate={lpToCLpRate}
      index={index}
      abiType={abiType}
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
          endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
        >
          {account ? 'Approve' : 'Connect Wallet'}
        </LongButton>
      )}
    </Container>
  );
};
export default MobileAction;
