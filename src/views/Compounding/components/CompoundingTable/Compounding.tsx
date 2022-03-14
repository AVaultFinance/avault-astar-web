import React from 'react';
import styled from 'styled-components';
// import { useTranslation } from 'contexts/Localization';
// import { Text } from '@avault/ui';
// import { getBalanceNumber } from 'utils/formatBalance';
import { TokenPairImage } from 'components/TokenImage';

export interface CompoundingProps {
  label?: string;
  token0Address: string;
  token1Address: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;
const LabelStyled = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
  p {
    margin-top: 2px;
    font-size: 12px;
    font-weight: 500;
  }
`;

const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 44px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 20px;
    width: 70px;
  }
`;

const Compounding: React.FunctionComponent<CompoundingProps> = ({ token0Address, token1Address, label }) => {
  return (
    <Container>
      <TokenWrapper>
        <TokenPairImage
          variant="inverted"
          primaryToken={token0Address}
          secondaryToken={token1Address}
          width={48}
          height={48}
        />
      </TokenWrapper>
      <LabelStyled>
        <h2>{label}</h2>
        <p>Kacoswap</p>
      </LabelStyled>
    </Container>
  );
};

export default Compounding;
