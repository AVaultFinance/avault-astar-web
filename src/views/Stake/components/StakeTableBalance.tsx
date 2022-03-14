import React from 'react';
import BigNumber from 'bignumber.js';
import { parseUnits } from 'ethers/lib/utils';
import { formatBigNumber } from 'utils/formatBalance';
import { Text } from '@avault/ui';
import styled from 'styled-components';
import { MaxButton } from '../style/DappstakeStyle';
const TextStyle = styled(Text)`
  font-size: 12px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`;
const Balance = (props) => {
  const {
    balance = new BigNumber(0),
    decimals,
    isBalanceZero,
    symbol,
  }: {
    balance: BigNumber;
    decimals: number;
    isBalanceZero: boolean;
    symbol: string;
  } = props;
  const displayBalance = (balance: string) => {
    if (isBalanceZero) {
      return '0';
    }

    const balanceUnits = parseUnits(balance, decimals);
    return formatBigNumber(balanceUnits, decimals, decimals);
  };
  return (
    <>
      <TextStyle>
        Balance: {displayBalance(balance.toString())} {symbol}
        <MaxButton variant="text">Max</MaxButton>
      </TextStyle>
    </>
  );
};
export default Balance;
