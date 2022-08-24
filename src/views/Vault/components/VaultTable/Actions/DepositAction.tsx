import React, { useCallback, useMemo, useState } from 'react';
import { AutoRenewIcon, Flex, Text } from '@my/ui';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { BIG_ZERO } from 'utils/bigNumber';
import { useAppDispatch } from 'state';
import useToast from 'hooks/useToast';
import { HelfButton, LongButton } from './styles';
import styled from 'styled-components';
import CInput from './C_Input';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useVault, useVaultFarmUser } from 'state/vault/hooks';
import useVaultDeposit from 'views/Vault/hooks/useVaultDeposit';
import { changeLoading, changeVaultItemLoading, fetchVaultFarmUserDataAsync } from 'state/vault';
import { ActionContainerBg, ActionContainerSize } from 'style/TableStyled';
import { showDecimals } from 'views/Vault/utils';
import { IABIType } from 'state/vault/types';
import { chainId, main_tokens } from 'config/constants/tokens';
import { chainKey } from 'config';

interface HarvestActionProps {
  setSignatureData: any;
  userDataReady: boolean;
  displayBalance: string | JSX.Element;
  earnings: BigNumber;
  isApproved: boolean;
  handleApprove: any;
  requestedApproval: boolean;
  pid: number;
  name: string;
  displayEarningsBalance?: string;
  lpSymbol: string;
  contractAddress: string;
  lpAddressDecimals: number;
  index: number;
  abiType: IABIType;
  deadline: number;
  wantAddress: string;
  signatureData: { v: number; r: string; s: string; deadline: number };
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
  index,
  abiType,
  signatureData,
  setSignatureData,
  deadline,
  wantAddress,
}) => {
  const { toastSuccess, toastError } = useToast();
  const { data: vaults } = useVault();

  const [pendingTx, setPendingTx] = useState(false);

  const { account } = useWeb3React();
  const { onDeposit, onDepositWithPermit } = useVaultDeposit(
    wantAddress,
    abiType,
    account,
    contractAddress,
    lpAddressDecimals,
  );
  const dispatch = useAppDispatch();
  const [val, setVal] = useState('');
  const { stakingTokenBalance } = useVaultFarmUser(account, contractAddress);

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(stakingTokenBalance, lpAddressDecimals, showDecimals(lpSymbol, abiType));
  }, [stakingTokenBalance, lpAddressDecimals, lpSymbol, abiType]);
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

      if (typeof result === 'boolean' && result) {
        dispatch(changeLoading());
        dispatch(changeVaultItemLoading({ index }));
        const _index = vaults
          .map((v) => v.vault.wantAddress)
          .indexOf(main_tokens[chainKey.toLowerCase()].address[chainId].toLowerCase());
        dispatch(fetchVaultFarmUserDataAsync({ account, vaults, index: _index }));
        dispatch(fetchVaultFarmUserDataAsync({ account, vaults, index }));
        toastSuccess(`Deposit!`, `Your ${lpSymbol} deposit!`);
      } else {
        const message = result ? result : `Your ${lpSymbol} deposit failed!`;
        toastError('Error', message);
      }
    } catch (e: any) {
      toastError('Error', e.message ? e.message : `Your ${lpSymbol} deposit failed!`);
      // toastError('Error', `Your ${lpSymbol} deposit failed!`);
    } finally {
      setVal('');
      setPendingTx(false);
    }
  }, [val, account, vaults, index, dispatch, lpSymbol, onDeposit, toastError, toastSuccess]);
  const depositWithVRS = async () => {
    if (!signatureData) {
      setSignatureData(null);
    } else {
      setPendingTx(true);
      let result = null;

      try {
        result = await onDepositWithPermit(
          val,
          signatureData.deadline,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        );
        if (typeof result === 'boolean' && result) {
          dispatch(changeLoading());
          dispatch(changeVaultItemLoading({ index }));
          const _index = vaults
            .map((v) => v.vault.wantAddress)
            .indexOf(main_tokens[chainKey.toLowerCase()].address[chainId].toLowerCase());
          dispatch(fetchVaultFarmUserDataAsync({ account, vaults, index: _index }));
          dispatch(fetchVaultFarmUserDataAsync({ account, vaults, index }));
          toastSuccess(`Deposit!`, `Your ${lpSymbol} deposit!`);
        } else {
          const message = result ? result : `Your ${lpSymbol} deposit failed!`;
          toastError('Error', message);
        }
      } catch (e: any) {
        toastError('Error', e.message ? e.message : `Your ${lpSymbol} deposit failed!`);
        // toastError('Error', `Your ${lpSymbol} deposit failed!`);
      } finally {
        setVal('');
        setPendingTx(false);
      }
    }
  };
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
        {lpSymbol.toLowerCase().indexOf(' lp') > -1 ? 'LP' : ''} Balance: {displayBalance}
      </Text>
      <ActionContainerBg smallBorder={disabled ? false : true}>
        <FlexStyled>
          <CInput value={val} onSelectMax={handleSelectMax} onChange={handleChange} />
          {!isApproved ? (
            <Flex alignItems="center" justifyContent="space-between">
              <HelfButton
                disabled={requestedApproval || !deadline || !userDataReady || signatureData || disabled}
                isLoading={requestedApproval}
                onClick={handleApprove}
                variant="secondary"
                endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
              >
                {account ? 'Approve' : 'Connect Wallet'}
              </HelfButton>
              <HelfButton
                variant="primary"
                className={pendingTx ? 'loading' : ''}
                disabled={!signatureData || disabled}
                onClick={depositWithVRS}
                endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
              >
                Deposit
              </HelfButton>
            </Flex>
          ) : (
            <LongButton
              variant="primary"
              className={pendingTx ? 'loading' : ''}
              disabled={disabled}
              onClick={handleDeposit}
              endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
            >
              Deposit
            </LongButton>
          )}
        </FlexStyled>
      </ActionContainerBg>
    </ActionContainerSize>
  );
};

export default HarvestAction;
