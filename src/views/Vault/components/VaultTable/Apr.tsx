import React from 'react';
import styled from 'styled-components';
// import ApyButton from 'views/Farms/components/FarmCard/ApyButton';
// import { BASE_ADD_LIQUIDITY_URL } from 'config';
// import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts';
import { Skeleton } from '@my/ui';
import { IFromSource } from 'state/vault/types';
export interface AprProps {
  // apr: string;
  apy: string;
  farmApy: string;
  feeApy: string;
  // multiplier: string;
  lpLabel: string;
  // token0Address?: string;
  // token1Address?: string;
  // cakePrice: BigNumber;
  originalValue: number;
  hideButton?: boolean;
  // vaultSymbol: string;
  fromSource?: IFromSource;

  // apy, originalValue, fromSource
}

const Container = styled.div`
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`;

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
  color: ${({ theme }) => theme.colors.success};
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 3px;
`;
const PStyled = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
`;
const Apr: React.FC<AprProps> = ({ apy, farmApy, feeApy, originalValue, fromSource, lpLabel }) => {
  // const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAddress, tokenAddress });
  // const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`;
  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <>
          <AprWrapper>
            {apy === '999.99' ? '> ' : ''}
            {apy}%
          </AprWrapper>
          <PStyled>
            {/* {vaultSymbol} */}
            Arthswap Fee APY: ≈{feeApy}%
          </PStyled>
          <PStyled>
            {fromSource} Farm APY: {farmApy === '999.99' ? ' > ' : ''}
            {farmApy}%
          </PStyled>
          {/* <ReferenceElement ref={targetRef}>
            <HelpIcon color="textSubtle" />
          </ReferenceElement>
          {tooltipVisible && tooltip} */}
          {/* {!hideButton && (
            <ApyButton
              lpLabel={lpLabel}
              cakePrice={cakePrice}
              apr={originalValue}
              displayApr={value}
              addLiquidityUrl={addLiquidityUrl}
            />
          )} */}
        </>
      ) : (
        <AprWrapper>
          <Skeleton width={40} height={16} />
          <Skeleton width={60} height={13} marginTop="6px" />
          <Skeleton width={60} height={13} marginTop="3px" />
        </AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>
        {apy === '999.99' ? '> ' : ''}
        {apy}%
      </AprWrapper>
      <PStyled>
        {/* {vaultSymbol} */}
        Arthswap Fee APY: ≈{feeApy}%
      </PStyled>
      <PStyled>
        {fromSource} Farm APY: {farmApy === '999.99' ? ' > ' : ''}
        {farmApy}%
      </PStyled>
      {/* <ReferenceElement ref={targetRef}>
        <HelpIcon color="textSubtle" />
      </ReferenceElement> */}
      {/* {tooltipVisible && tooltip} */}
    </Container>
  );
};

export default Apr;
