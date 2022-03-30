import BigNumber from 'bignumber.js';
import React, { useCallback, useMemo, useState } from 'react';
import { Button, Modal, Text, useMatchBreakpoints } from '@avault/ui';
import { getFullDisplayBalance } from 'utils/formatBalance';
import CInput from './C_Input';

import styled from 'styled-components';
import Loading from 'components/TransactionConfirmationModal/Loading';
import { useWeb3React } from '@web3-react/core';
import { useCompounding } from 'state/vault/hooks';
import useToast from 'hooks/useToast';
import { useAppDispatch } from 'state';
import useCompoundingWithdraw from 'views/Vault/hooks/useCompoundingWithdraw';
import { changeLoading, changeVaultItemLoading, fetchCompoundingFarmUserDataAsync } from 'state/vault';
import { showDecimals } from 'views/Vault/utils';

interface WithdrawModalProps {
  displayEarningsBalance: string;
  max: BigNumber;
  lpSymbol: string;
  lpAddressDecimals: number;
  onDismiss?: () => void;
  contractAddress: string;
  lpToCLpRate: string;
  index: number;
}
const ModalInputStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 10px 16px 16px;
  margin-top: 8px;
`;
const WithdrawModal: React.FC<WithdrawModalProps> = ({
  onDismiss,
  max,
  displayEarningsBalance,
  lpSymbol,
  lpAddressDecimals,
  contractAddress,
  lpToCLpRate,
  index,
}) => {
  const [val, setVal] = useState('');
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, lpAddressDecimals, showDecimals(lpSymbol));
  }, [max, lpAddressDecimals, lpSymbol]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setVal],
  );

  const [pendingTx, setPendingTx] = useState(false);
  const [pendingTxSuccess, setPendingTxSuccess] = useState(true);

  const { account } = useWeb3React();
  const { data: compoundings } = useCompounding();
  const { toastSuccess, toastError } = useToast();
  const dispatch = useAppDispatch();
  const { onWithdraw } = useCompoundingWithdraw(account, contractAddress, lpAddressDecimals);

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);
  const handleWithdraw = useCallback(async () => {
    setPendingTx(true);
    let result = null;
    try {
      const _amount = new BigNumber(val)
        .times(1 / Number(lpToCLpRate))
        .times(0.99)
        .toString();
      result = await onWithdraw(_amount);
      if (result) {
        dispatch(changeLoading());
        dispatch(changeVaultItemLoading({ index }));
        dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings, index }));
        toastSuccess(`Withdraw!`, `'Your ${lpSymbol} earnings have been sent to your wallet!'`);
        setTimeout(() => {
          setPendingTxSuccess(true);
        }, 10000);
      } else {
        toastError('Error', `Your ${lpSymbol} withdraw failed!`);
        setPendingTxSuccess(false);
        setTimeout(() => {
          setPendingTxSuccess(true);
        }, 1500);
      }
    } catch (e) {
      toastError('Error', `Your ${lpSymbol} withdraw failed! `);
      setPendingTxSuccess(false);
      setTimeout(() => {
        setPendingTxSuccess(true);
      }, 1500);
    } finally {
      setVal('');
      setPendingTx(false);
    }
  }, [val, lpToCLpRate, account, index, compoundings, dispatch, lpSymbol, onWithdraw, toastError, toastSuccess]);

  const { isMd, isXl, isLg } = useMatchBreakpoints();
  const isMobile = !(isMd || isXl || isLg);
  const valNumber = new BigNumber(val);
  const fullBalanceNumber = new BigNumber(fullBalance);

  return (
    <Modal title="Withdraw" minWidth={isMobile ? '343px' : '520px'} bodyPadding="0 16px 20px" onDismiss={onDismiss}>
      <Text fontSize="12px" fontWeight="500" textAlign="right">
        LP Withdrawable: {displayEarningsBalance}
        {lpSymbol ? ` ${lpSymbol}` : ''}
      </Text>
      <ModalInputStyled>
        <CInput autoFocus={true} onSelectMax={handleSelectMax} onChange={handleChange} value={val} />
        <Button
          variant="tertiary"
          disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
          height={isMobile ? '38px' : '48px'}
          isLoading={pendingTx}
          onClick={handleWithdraw}
          width="100%"
        >
          Withdraw
          <Loading isLoading={pendingTx} success={pendingTxSuccess} />
        </Button>
      </ModalInputStyled>
    </Modal>
  );
};

export default WithdrawModal;
