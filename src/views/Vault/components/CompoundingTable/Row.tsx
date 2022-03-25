import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, HelpIcon, Text, useMatchBreakpoints, useTooltip } from '@avault/ui';
import useDelayedUnmount from 'hooks/useDelayedUnmount';
import Apr, { AprProps } from './Apr';
import Earned, { EarnedProps } from './Earned';
import Details from './Details';
import Multiplier, { MultiplierProps } from './Multiplier';
import Liquidity, { LiquidityProps } from './Liquidity';
import ActionPanel from './Actions/ActionPanel';
import CellLayout from './CellLayout';
import { DesktopColumnSchema } from '../types';
import Compounding, { CompoundingProps } from './Compounding';
import { ICompounding } from 'state/vault/types';
import BigNumber from 'bignumber.js';
import { getBalanceNumber } from 'utils/formatBalance';
import Balance from 'components/Balance';
import { showDecimals } from 'views/Vault/utils';

export interface RowProps {
  apr: AprProps;
  compounding: CompoundingProps;
  earned: EarnedProps;
  net: {
    net: string;
  };
  multiplier: MultiplierProps;
  liquidity: LiquidityProps;
  details: ICompounding;
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean;
  userDataLoaded: boolean;
  isLast: boolean;
}

const cells = {
  apr: Apr,
  compounding: Compounding,
  earned: Earned,
  details: Details,
  multiplier: Multiplier,
  liquidity: Liquidity,
};

const StyledDetailTr = styled.tr`
  border-radius: 0 0 12px 12px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
  border-top: none;
  // display: block;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    box-shadow: none;
    border: none;
    border-radius: 0;
    display: table-row;
  }
`;
const TextStyled = styled(Text)`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 12px;
  padding: 0 12px;
  height: 24px;
  line-height: 24px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background02};
`;
const StyledTr = styled.tr<{ isLast: boolean }>`
  background: ${({ theme }) => theme.card.background};
  border-radius: 12px 12px 0 0;
  margin-top: 16px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
  border-bottom: none;
  display: block;
  ${({ theme }) => theme.mediaQueries.md} {
    box-shadow: none;
    border: none;
    border-radius: 0;
    cursor: pointer;
    display: table-row;
  }
  td: first-child {
    padding-left: 16px;
    ${({ theme }) => theme.mediaQueries.xs},
    ${({ theme }) => theme.mediaQueries.sm} {
      padding-right: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      padding-left: 40px;
      width: 180px;
    }
  }
  td: nth-child(3) {
    width: 120px;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 200px;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 100px;
    }
  }
  td: last-child {
    padding-right: 16px;
    width: 60px;
    ${({ theme }) => theme.mediaQueries.sm} {
      padding-right: 40px;
    }
  }
  td {
    padding-top: 20px;
    padding-bottom: 10px;
    white-space: wrap;
    padding-left: 18px;

    ${({ theme }) => theme.mediaQueries.md} {
      padding-bottom: 20px;
      white-space: nowrap;
    }
  }
`;

const QuestionWrapper = styled.div`
  padding-left: 6px;

  :hover,
  :focus {
    opacity: 0.7;
  }
`;

const Row: React.FunctionComponent<RowPropsWithLoading> = (props) => {
  const { details, userDataReady, userDataLoaded } = props;
  const hasStakedAmount = false;
  const [actionPanelExpanded, setActionPanelExpanded] = useState(false);
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300);

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    `1 ${details.compounding.symbol} = ${details.compounding.lpToCLpRate} ${details.lpSymbol}`,
    {
      trigger: 'hover',
      tootipStyle: { padding: '10px', whiteSpace: 'break-spaces', textAlign: 'center', fontSize: '14px' },
      // tootipStyle: { padding: '10px 20px 20px' },
      placement: 'top-end',
      hideArrow: true,
      tooltipOffset: [20, 10],
    },
  );

  const {
    targetRef: balanceTargetRef,
    tooltip: balanceTooltip,
    tooltipVisible: balanceTooltipVisible,
  } = useTooltip(
    `${details.compounding.symbol}: ${details.compounding.name}, an interest-bearing token synthesized by Avault`,
    {
      trigger: 'hover',
      tootipStyle: { padding: '10px', whiteSpace: 'break-spaces', textAlign: 'center', fontSize: '14px' },
      placement: 'top-end',
      hideArrow: true,
      tooltipOffset: [20, 10],
    },
  );

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded);
  };

  useEffect(() => {
    setActionPanelExpanded(hasStakedAmount);
  }, [hasStakedAmount]);

  const { isXl, isLg } = useMatchBreakpoints();

  const isMobile = !(isXl || isLg);
  const tableSchema = DesktopColumnSchema;
  const columnNames = tableSchema.map((column) => column.name);
  const handleRenderRow = () => {
    if (!isMobile) {
      return (
        <StyledTr onClick={toggleActionPanel} isLast={props.isLast}>
          {Object.keys(props).map((key) => {
            const columnIndex = columnNames.indexOf(key);
            if (columnIndex === -1) {
              return null;
            }

            switch (key) {
              case 'liquidity':
                return (
                  <td key={key}>
                    <Text color="text" bold fontSize="15px">
                      {details.compounding.liquidity}
                    </Text>
                  </td>
                );
              case 'net':
                return (
                  <td key={key}>
                    {tooltipVisible && tooltip}
                    <Flex alignItems="center" justifyContent="start" ref={targetRef}>
                      <Text color="text" bold fontSize="15px">
                        1 : {details.compounding.lpToCLpRate}
                        {/* 1 {details.compounding.symbol}={details.compounding.lpToCLpRate} {details.lpSymbol} */}
                      </Text>
                      <QuestionWrapper>
                        <HelpIcon color="textSubtle" width="18px" height="18px" />
                      </QuestionWrapper>
                    </Flex>
                  </td>
                );
              case 'earned':
                return (
                  <td key={key}>
                    {balanceTooltipVisible && balanceTooltip}
                    <Flex alignItems="center" justifyContent="start" ref={balanceTargetRef}>
                      <Balance
                        fontSize="14px"
                        color="text"
                        fontWeight="600"
                        decimals={5}
                        value={getBalanceNumber(new BigNumber(details?.farm?.userData?.avaultAddressBalance ?? '0'))}
                      />
                      <Text color="text" bold fontSize="14px" paddingLeft="4px">
                        {/* {getFullDisplayBalance(
                          new BigNumber(details?.farm?.userData?.avaultAddressBalance ?? '0'),
                          18,
                          3,
                        )} */}
                        {details.compounding.symbol}
                      </Text>
                      <QuestionWrapper>
                        <HelpIcon color="textSubtle" width="18px" height="18px" />
                      </QuestionWrapper>
                    </Flex>
                    <Flex alignItems="center" justifyContent="start">
                      <Balance
                        fontSize="14px"
                        color="text"
                        fontWeight="600"
                        decimals={showDecimals(details.lpSymbol)}
                        value={getBalanceNumber(
                          new BigNumber(
                            details?.farm?.userData?.stakingTokenBalance
                              ? details.farm.userData.stakingTokenBalance
                              : '0',
                          ),
                          details.farm.lpAddressDecimals,
                        )}
                      />
                      <Text color="text" bold fontSize="14px" paddingLeft="4px">
                        {details.lpSymbol}
                      </Text>
                    </Flex>
                  </td>
                );
              case 'details':
                return (
                  <td key={key}>
                    <Details isLoading={!userDataLoaded} actionPanelToggled={actionPanelExpanded} />
                  </td>
                );
              case 'multiplier':
                return null;

              case 'apr':
                return (
                  <td key={key}>
                    <Apr {...props.apr} hideButton={isMobile} />
                  </td>
                );
              default:
                return <td key={key}>{React.createElement(cells[key], { ...props[key], userDataReady })}</td>;
            }
          })}
        </StyledTr>
      );
    }
    return (
      <StyledTr onClick={toggleActionPanel} isLast={props.isLast}>
        <td>
          <CellLayout>
            <Compounding {...props.compounding} />
          </CellLayout>
          <TextStyled>
            1:{`${details.compounding.lpToCLpRate}`}
            {/* 1 {details.compounding.symbol}={details.compounding.lpToCLpRate} {details.lpSymbol} */}
          </TextStyled>
        </td>
        <td></td>
        <td></td>
        <td></td>
      </StyledTr>
    );
  };
  return (
    <>
      {handleRenderRow()}

      {shouldRenderChild || isMobile ? (
        <StyledDetailTr>
          <td colSpan={6}>
            <ActionPanel {...props} expanded={actionPanelExpanded || isMobile} />
          </td>
        </StyledDetailTr>
      ) : null}
    </>
  );
};

export default Row;
