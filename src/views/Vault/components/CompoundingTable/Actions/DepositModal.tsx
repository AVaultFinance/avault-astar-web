import BigNumber from 'bignumber.js';
import React, { useCallback, useMemo, useState } from 'react';
import { Button, Modal, Text, useMatchBreakpoints } from '@avault/ui';
import { getFullDisplayBalance } from 'utils/formatBalance';
import CInput from './C_Input';
import styled from 'styled-components';
import Loading from 'components/TransactionConfirmationModal/Loading';
import { changeLoading, changeVaultItemLoading, fetchCompoundingFarmUserDataAsync } from 'state/vault';
import { useAppDispatch } from 'state';
import { useWeb3React } from '@web3-react/core';
import { useCompounding } from 'state/vault/hooks';
import useToast from 'hooks/useToast';
import useCompoundingDeposit from 'views/Vault/hooks/useCompoundingDeposit';
import { showDecimals } from 'views/Vault/utils';

interface DepositModalProps {
  lpSymbol?: string;
  max: BigNumber;
  displayBalance: string;
  lpAddressDecimals: number;
  onDismiss?: () => void;
  contractAddress: string;
  index: number;
}
const ModalInputStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 12px 16px 16px;
  margin-top: 8px;
`;
const ButtonStyled = styled(Button)<{ isLoading: boolean; isMobile: boolean }>`
  margin-top: 8px;
  width: 100%;
  // isLoading={pendingTx}
  height: ${({ isMobile }) => (isMobile ? '38px' : '48px')};
`;
const DepositModal: React.FC<DepositModalProps> = ({
  lpAddressDecimals,
  max,
  onDismiss,
  displayBalance,
  lpSymbol,
  contractAddress,
  index,
}) => {
  const [val, setVal] = useState('');
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, lpAddressDecimals, showDecimals(lpSymbol));
  }, [max, lpAddressDecimals, lpSymbol]);

  const valNumber = new BigNumber(val);
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
  const { isMd, isXl, isLg } = useMatchBreakpoints();
  const isMobile = !(isMd || isXl || isLg);
  const [pendingTx, setPendingTx] = useState(false);
  const [pendingTxSuccess, setPendingTxSuccess] = useState(true);

  const { account } = useWeb3React();
  const { data: compoundings } = useCompounding();
  const { toastSuccess, toastError } = useToast();
  const dispatch = useAppDispatch();
  const { onDeposit } = useCompoundingDeposit(account, contractAddress, lpAddressDecimals);
  const handleDeposit = useCallback(async () => {
    setPendingTx(true);
    let result = null;
    try {
      result = await onDeposit(val);
      if (result) {
        dispatch(changeLoading());
        dispatch(changeVaultItemLoading({ index }));
        dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings, index }));
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
  }, [val, account, compoundings, index, dispatch, lpSymbol, onDeposit, toastError, toastSuccess]);

  return (
    <Modal title={'Deposit'} minWidth={isMobile ? '280px' : '520px'} bodyPadding="0 24px 34px" onDismiss={onDismiss}>
      <Text fontSize="12px" fontWeight="500" textAlign="right">
        {/* {lpSymbol ?? ''} */}
        LP Balance: {displayBalance}
      </Text>
      <ModalInputStyled>
        <CInput value={val} autoFocus={true} onSelectMax={handleSelectMax} onChange={handleChange} />
        <ButtonStyled
          isLoading={pendingTx}
          isMobile={isMobile}
          disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
          onClick={handleDeposit}
        >
          Deposit
          <Loading isLoading={pendingTx} success={pendingTxSuccess} />
        </ButtonStyled>
      </ModalInputStyled>
    </Modal>
  );
};

export default DepositModal;
