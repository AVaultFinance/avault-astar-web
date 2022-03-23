import React, { useCallback, useMemo, useState } from 'react';
import { Flex, Text } from '@avault/ui';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { BIG_ZERO } from 'utils/bigNumber';
import { useAppDispatch } from 'state';
import { fetchFarmUserDataAsync } from 'state/farms';
import useToast from 'hooks/useToast';
import { ActionContainer, LongButton } from './styles';
import styled from 'styled-components';
import CInput from './C_Input';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useCompounding, useCompoundingFarmUser } from 'state/vault/hooks';
import useCompoundingDeposit from 'views/Vault/hooks/useCompoundingDeposit';
import { fetchCompoundingFarmUserDataAsync } from 'state/vault';
import Loading from 'components/TransactionConfirmationModal/Loading';

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
  quoteTokenDecimals: number;
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
  quoteTokenDecimals,
  requestedApprovalSuccess,
}) => {
  const { toastSuccess, toastError } = useToast();
  const { data: compoundings } = useCompounding();

  const [pendingTx, setPendingTx] = useState(false);
  const [pendingTxSuccess, setPendingTxSuccess] = useState(true);

  const { account } = useWeb3React();
  const { onDeposit } = useCompoundingDeposit(account, contractAddress, quoteTokenDecimals);
  const dispatch = useAppDispatch();
  const [val, setVal] = useState('');
  const { stakingTokenBalance } = useCompoundingFarmUser(pid ?? 0);

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(stakingTokenBalance, quoteTokenDecimals, 6);
  }, [stakingTokenBalance, quoteTokenDecimals]);
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
      console.log({ result });
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
    dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
  }, [val, account, compoundings, dispatch, lpSymbol, onDeposit, pid, toastError, toastSuccess]);
  const disabled =
    requestedApproval ||
    stakingTokenBalance.eq(BIG_ZERO) ||
    pendingTx ||
    !userDataReady ||
    !valNumber.isFinite() ||
    valNumber.eq(0) ||
    valNumber.gt(fullBalanceNumber);
  return (
    <div>
      <Text textAlign="right" fontSize="12px" marginBottom="8px" fontWeight="500">
        {/* {lpSymbol ?? ''} */}
        LP Balance: {displayBalance}
      </Text>
      <ActionContainer smallBorder={disabled ? false : true}>
        <FlexStyled>
          <CInput value={val} onSelectMax={handleSelectMax} onChange={handleChange} />
          {!isApproved ? (
            <LongButton
              disabled={requestedApproval || !userDataReady}
              className={requestedApproval ? 'loading' : ''}
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
      </ActionContainer>
    </div>
  );
};

export default HarvestAction;
