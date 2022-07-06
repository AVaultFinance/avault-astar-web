import { ETHER, Token } from '@my/sdk';
import { Flex, Skeleton } from '@my/ui';
import { chainId } from 'config/constants/tokens';
import { useMemo } from 'react';
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
  // 1.689261AST
  // 1.688755ASTR
  // 1.688387
  const _currency =
    currency.address && currency.address[chainId]
      ? new Token(chainId, currency.address[chainId], currency.decimals ?? 18, currency.symbol, currency.name)
      : ETHER[chainId];
  const balance = useCurrencyBalanceString(account ?? undefined, _currency);
  const decimals = showDecimals(currency.symbol);

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
