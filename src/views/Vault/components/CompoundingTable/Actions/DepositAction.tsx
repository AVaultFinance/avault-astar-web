import React, { useCallback, useMemo, useState } from 'react';
import { Flex, Text } from '@avault/ui';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { BIG_ZERO } from 'utils/bigNumber';
import { useAppDispatch } from 'state';
import useToast from 'hooks/useToast';
import { LongButton } from './styles';
import styled from 'styled-components';
import CInput from './C_Input';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useCompounding, useCompoundingFarmUser } from 'state/vault/hooks';
import useCompoundingDeposit from 'views/Vault/hooks/useCompoundingDeposit';
import { changeLoading, fetchCompoundingFarmUserDataAsync } from 'state/vault';
import Loading from 'components/TransactionConfirmationModal/Loading';
import { ActionContainerBg, ActionContainerSize } from 'style/TableStyled';
import { showDecimals } from 'views/Vault/utils';

interface HarvestActionProps {
  userDataReady: boolean;
  displayBalance: string | JSX.Element;
  earnings: BigNumber;
  isApproved: boolean;
  handleApprove: any;
  requestedApproval: boolean;
  requestedApprovalSuccess: boolean;
  pid: number;
  name: string;
  displayEarningsBalance?: string;
  lpSymbol: string;
  contractAddress: string;
  lpAddressDecimals: number;
}
const FlexStyled = styled(Flex)`
  margin-top: 0;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`;

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({
  pid,
  earnings,
  userDataReady,
  isApproved,
  handleApprove,
  requestedApproval,
  lpSymbol,
  displayBalance,
  contractAddress,
  lpAddressDecimals,
  requestedApprovalSuccess,
}) => {
  const { toastSuccess, toastError } = useToast();
  const { data: compoundings } = useCompounding();

  const [pendingTx, setPendingTx] = useState(false);
  const [pendingTxSuccess, setPendingTxSuccess] = useState(true);

  const { account } = useWeb3React();
  const { onDeposit } = useCompoundingDeposit(account, contractAddress, lpAddressDecimals);
  const dispatch = useAppDispatch();
  const [val, setVal] = useState('');
  const { stakingTokenBalance } = useCompoundingFarmUser(pid ?? 0);

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(stakingTokenBalance, lpAddressDecimals, showDecimals(lpSymbol));
  }, [stakingTokenBalance, lpAddressDecimals, lpSymbol]);
  const fullBalanceNumber = new BigNumber(fullBalance);
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setVal],
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);
  const valNumber = new BigNumber(val);

  const handleDeposit = useCallback(async () => {
    setPendingTx(true);
    let result = null;
    try {
      result = await onDeposit(val);

      dispatch(changeLoading());
      dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings }));
      if (result) {
        toastSuccess(`Deposit!`, `Your ${lpSymbol} deposit!`);
        setTimeout(() => {
          setPendingTxSuccess(true);
        }, 10000);
      } else {
        toastError('Error', `Your ${lpSymbol} deposit failed!`);
        setPendingTxSuccess(false);
        setTimeout(() => {
          setPendingTxSuccess(true);
        }, 1500);
      }
    } catch (e) {
      toastError('Error', `Your ${lpSymbol} deposit failed!`);
      setPendingTxSuccess(false);
      setTimeout(() => {
        setPendingTxSuccess(true);
      }, 1500);
      // toastError('Error', `Your ${lpSymbol} deposit failed!`);
    } finally {
      setVal('');
      setPendingTx(false);
    }
  }, [val, account, compoundings, dispatch, lpSymbol, onDeposit, toastError, toastSuccess]);
  const disabled =
    requestedApproval ||
    stakingTokenBalance.eq(BIG_ZERO) ||
    pendingTx ||
    !userDataReady ||
    !valNumber.isFinite() ||
    valNumber.eq(0) ||
    valNumber.gt(fullBalanceNumber);
  return (
    <ActionContainerSize smallBorder={disabled ? false : true}>
      <Text textAlign="right" fontSize="12px" marginBottom="8px" fontWeight="500">
        {/* {lpSymbol ?? ''} */}
        LP Balance: {displayBalance}
      </Text>
      <ActionContainerBg smallBorder={disabled ? false : true}>
        <FlexStyled>
          <CInput value={val} onSelectMax={handleSelectMax} onChange={handleChange} />
          {!isApproved ? (
            <LongButton
              disabled={requestedApproval || !userDataReady}
              isLoading={requestedApproval}
              onClick={handleApprove}
              variant="secondary"
            >
              {account ? 'Approve' : 'Connect Wallet'}
              <Loading isLoading={requestedApproval} success={requestedApprovalSuccess} />
            </LongButton>
          ) : (
            <LongButton
              variant="primary"
              className={pendingTx ? 'loading' : ''}
              disabled={disabled}
              onClick={handleDeposit}
            >
              Deposit
              <Loading isLoading={pendingTx} success={pendingTxSuccess} />
            </LongButton>
          )}
        </FlexStyled>
      </ActionContainerBg>
    </ActionContainerSize>
  );
};

export default HarvestAction;
