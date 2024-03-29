import React, { useCallback, useMemo, useState } from 'react';
import { AutoRenewIcon, Flex, Text } from '@my/ui';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { BIG_ZERO } from 'utils/bigNumber';
import { useAppDispatch } from 'state';
import useToast from 'hooks/useToast';
import { LongButton } from './styles';
import styled from 'styled-components';
import CInput from './C_Input';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useVault } from 'state/vault/hooks';
import useVaultWithdraw from 'views/Vault/hooks/useVaultWithdraw';
import { changeLoading, changeVaultItemLoading, fetchVaultFarmUserDataAsync } from 'state/vault';
import { ActionContainerBg, ActionContainerSize } from 'style/TableStyled';
import { showDecimals } from 'views/Vault/utils';
import { IABIType } from 'state/vault/types';
import { chainId, main_tokens } from 'config/constants/tokens';
import { chainKey } from 'config';

interface WithdrawActionProps {
  abiType: IABIType;
  userDataReady: boolean;
  displayBalance: string | JSX.Element;
  earnings: BigNumber;
  isApproved: boolean;
  requestedApproval: boolean;
  name: string;
  displayEarningsBalance?: string;
  lpSymbol: string;
  contractAddress: string;
  lpAddressDecimals: number;
  lpToCLpRate: string;
  index: number;
  wantAddress: string;
}
const FlexStyled = styled(Flex)`
  margin-top: 0;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`;

const WithdrawAction: React.FunctionComponent<WithdrawActionProps> = ({
  abiType,
  earnings,
  userDataReady,
  requestedApproval,
  displayEarningsBalance,
  lpSymbol,
  contractAddress,
  lpAddressDecimals,
  lpToCLpRate,
  index,
  wantAddress,
}) => {
  // const lpToCLpRate = '1.02819107614203074e+22';
  const { data: vaults } = useVault();
  const { toastSuccess, toastError } = useToast();

  const [pendingTx, setPendingTx] = useState(false);

  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const { onWithdraw } = useVaultWithdraw(wantAddress, abiType, account, contractAddress, lpAddressDecimals);
  const [val, setVal] = useState('');
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(earnings, lpAddressDecimals, showDecimals(lpSymbol, abiType));
  }, [earnings, lpAddressDecimals, lpSymbol, abiType]);
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
  const fullBalanceNumber = new BigNumber(fullBalance);
  const handleWithdraw = useCallback(async () => {
    setPendingTx(true);
    let result = null;
    try {
      const _amount = new BigNumber(val).div(new BigNumber(lpToCLpRate)).times(0.99999).toFixed(18);
      result = await onWithdraw(_amount);
      if (typeof result === 'boolean' && result) {
        dispatch(changeLoading());
        dispatch(changeVaultItemLoading({ index }));
        const _index = vaults
          .map((v) => v.vault.wantAddress)
          .indexOf(main_tokens[chainKey.toLowerCase()].address[chainId].toLowerCase());
        dispatch(fetchVaultFarmUserDataAsync({ account, vaults, index: _index }));
        dispatch(fetchVaultFarmUserDataAsync({ account, vaults, index }));
        toastSuccess(`Withdraw!`, `'Your ${lpSymbol} earnings have been sent to your wallet!'`);
      } else {
        const message = result ? result : `Your ${lpSymbol} withdraw failed!`;
        toastError('Error', message);
      }
    } catch (e: any) {
      toastError('Error', e.message ? e.message : `Your ${lpSymbol} withdraw failed! `);
    } finally {
      setVal('');
      setPendingTx(false);
    }
  }, [val, lpToCLpRate, account, index, vaults, dispatch, lpSymbol, onWithdraw, toastError, toastSuccess]);

  const disabled =
    requestedApproval ||
    earnings.eq(BIG_ZERO) ||
    pendingTx ||
    !userDataReady ||
    !valNumber.isFinite() ||
    valNumber.eq(0) ||
    valNumber.gt(fullBalanceNumber);

  return (
    <ActionContainerSize smallBorder={disabled ? false : true}>
      <Text textAlign="right" fontSize="12px" marginBottom="8px" fontWeight="500">
        {lpSymbol.toLowerCase().indexOf(' lp') > -1 ? 'LP' : ''} Withdrawable: {displayEarningsBalance}
        {/* {lpSymbol ? ` ${lpSymbol}` : ''} */}
      </Text>
      <ActionContainerBg smallBorder={disabled ? false : true}>
        <FlexStyled>
          <CInput value={val} onSelectMax={handleSelectMax} onChange={handleChange} />
          <LongButton
            variant="primary"
            isLoading={pendingTx}
            disabled={disabled}
            onClick={handleWithdraw}
            endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          >
            Withdraw
            {/* {pendingTx ? 'Withdrawing' : ''} */}
          </LongButton>
        </FlexStyled>
      </ActionContainerBg>
    </ActionContainerSize>
  );
};

export default WithdrawAction;
