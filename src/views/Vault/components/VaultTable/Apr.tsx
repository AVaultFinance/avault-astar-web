import React from 'react';
import styled from 'styled-components';
// import ApyButton from 'views/Farms/components/FarmCard/ApyButton';
// import { BASE_ADD_LIQUIDITY_URL } from 'config';
// import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts';
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
  text-align: right;
  padding-right: 40px;
  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
  .col_one {
    p:nth-child(1) {
      width: 110px;
      text-align: right;
      padding-right: 8px;
    }
    p:nth-child(2) {
      min-width: 50px;
    }
  }
  .col {
    display: flex;
    align-items: center;
    justify-content: end;
    .col_fl {
      position: relative;
      text-align: right;
      padding-right: 8px;
    }
    .col_fr {
      position: relative;
      padding-left: 10px;
      min-width: 50px;
    }
    .col_fl::before,
    .col_fl::after,
    .col_fr::before,
    .col_fr::after {
      content: '';
      display: block;
      position: absolute;
      height: calc(50% - 5px);
      width: 5px;
      border-style: solid;
      border-color: #fff;
      border-width: 0;
    }
    .col_fl::before,
    .col_fl::after {
      right: 0;
    }
    .col_fr::before,
    .col_fr::after {
      left: -1px;
    }
    .col_fl::before,
    .col_fl::after {
      border-right-width: 1px;
    }
    .col_fl::before {
      top: 0;
      border-top-right-radius: 10px;
    }
    .col_fl::after {
      bottom: 0;
      border-bottom-right-radius: 10px;
    }
    .col_fr::before,
    .col_fr::after {
      border-left-width: 1px;
    }
    .col_fr::after {
      top: 5px;
      border-bottom-left-radius: 10px;
    }
    .col_fr::before {
      bottom: 5px;
      border-top-left-radius: 10px;
    }
  }
`;

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: right;
  color: ${({ theme }) => theme.colors.success};
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;
`;
const PStyled = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
`;
const Apr: React.FC<AprProps> = ({ apy, farmApy, feeApy, originalValue, fromSource, lpLabel }) => {
  return (
    <Container>
      <AprWrapper>
        {apy === '999.99' ? '> ' : ''}
        {apy === '0' && fromSource === IFromSource.starlay ? '-' : apy}%
      </AprWrapper>
      {fromSource === IFromSource.starlay ? (
        <div className="col">
          <div className="col_fl">
            <PStyled>{fromSource} APY</PStyled>
            <PStyled>Withdraw Fee Bonus</PStyled>
          </div>
          <div className="col_fr">
            <PStyled>{apy === '0' ? '-' : apy}%</PStyled>
          </div>
        </div>
      ) : null}
      {fromSource !== IFromSource.starlay ? (
        <div className="col col_one">
          <PStyled>{fromSource} Fee Est.</PStyled>
          <PStyled>≈{feeApy}%</PStyled>
        </div>
      ) : null}
      {fromSource !== IFromSource.starlay ? (
        <div className="col">
          <div className="col_fl">
            <PStyled>{fromSource} Farm APY</PStyled>
            <PStyled>Withdraw Fee Bonus</PStyled>
          </div>
          <div className="col_fr">
            <PStyled>
              {farmApy === '999.99' ? ' > ' : ''} {farmApy}%
            </PStyled>
          </div>
        </div>
      ) : null}
    </Container>
  );
};

export default Apr;
