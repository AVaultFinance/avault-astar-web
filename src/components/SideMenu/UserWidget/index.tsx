import React from 'react';
import styled from 'styled-components';
import { Flex, Text, useMatchBreakpoints } from '@avault/ui';
import WalletAccountInfo from './WalletAccount';
import { useCompoundingAllTotal } from 'state/compounding/hooks';
const TextLinerStyle = styled(Text)`
  font-size: 18px;
  background: linear-gradient(270deg, #fc00ff 0%, #7d49ff 100%);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 600;
  margin-bottom: 0;
  margin-top: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 10px;
    margin-top: 30px;
  }
`;
const UserWidget = () => {
  const { isMd, isSm, isXs } = useMatchBreakpoints();
  const isMobile = isMd || isSm || isXs;
  const allTotal = useCompoundingAllTotal();

  return (
    <User>
      {/* <SwitchChain /> */}
      <TextLinerStyle>{allTotal ? `TVL: $${allTotal}` : ''}</TextLinerStyle>
      {isMobile ? null : <WalletAccountInfo />}
    </User>
  );
};
const User = styled(Flex)`
  flex-direction: column;
  align-items: center;
`;

export default UserWidget;
