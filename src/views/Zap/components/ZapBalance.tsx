import { ETHER, Token } from '@my/sdk';
import { Flex, Skeleton } from '@my/ui';
import BigNumber from 'bignumber.js';
import { chainId } from 'config/constants/tokens';
import { useEffect, useMemo, useState } from 'react';
import { useCurrencyBalanceString } from 'state/wallet/hooks';
import styled from 'styled-components';
import { showDecimals } from 'views/Vault/utils';
import { IToken } from '../utils/types';
const ZapBalance = ({
  reNewBalanceTime,
  currency,
  setMax,
  account,
}: {
  reNewBalanceTime: number;
  currency: IToken;
  setMax?: any;
  account: string;
}) => {
  //
  const _currency =
    currency.address && currency.address[chainId]
      ? new Token(chainId, currency.address[chainId], currency.decimals ?? 18, currency.symbol, currency.name)
      : ETHER[chainId];
  const balance = useCurrencyBalanceString(account ?? undefined, _currency);
  const decimals = showDecimals(currency.symbol);
  const [_balance, _setBalance] = useState('0');
  useEffect(() => {
    // balance, setMax, decimals
    if (!balance || _balance === balance) {
      return;
    }
    if (setMax && balance && Number(balance) > 0) {
      setMax(new BigNumber(balance).toFixed(decimals, BigNumber.ROUND_DOWN));
      _setBalance(balance);
    }
  }, [_balance, balance, setMax, decimals, reNewBalanceTime]);
  return useMemo(() => {
    return (
      <BalanceStyled>
        Balance:{' '}
        {balance ? (
          Number(balance).toLocaleString('en-US', {
            maximumFractionDigits: decimals,
          })
        ) : account ? (
          <SkeletonStyled />
        ) : (
          '0'
        )}
        {currency.symbol}
      </BalanceStyled>
    );
  }, [balance, account, currency.symbol, decimals]);
};
const BalanceStyled = styled(Flex)`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSubtle};
  align-items: center;
  justify-content: space-between;
`;
const SkeletonStyled = styled(Skeleton)`
  height: 20px;
  width: 40px;
  margin: 0 4px 0 10px;
`;
export default ZapBalance;
