import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Flex, HelpIcon, Text, useMatchBreakpoints, useTooltip } from '@my/ui';
import useDelayedUnmount from 'hooks/useDelayedUnmount';
import Apr, { AprProps } from './Apr';
import Earned, { EarnedProps } from './Earned';
import Details from './Details';
import Liquidity, { LiquidityProps } from './Liquidity';
import ActionPanel from './Actions/ActionPanel';
import CellLayout from './CellLayout';
import { DesktopColumnSchema } from '../types';
import Vault, { VaultProps } from './Vault';
import { IVault, IVaultUserData } from 'state/vault/types';
import BigNumber from 'bignumber.js';
import { getBalanceNumber } from 'utils/formatBalance';
import Balance from 'components/Balance';
import { showDecimals, showDecimalsWithType } from 'views/Vault/utils';
import { useWeb3React } from '@web3-react/core';
import { chainId } from 'config/constants/tokens';

export interface RowProps {
  apr: AprProps;
  vault: VaultProps;
  earned: EarnedProps;
  liquidity: LiquidityProps;
  details: IVault;
  net: {
    net: string;
  };
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean;
  userDataLoaded: boolean;
  isLast: boolean;
  index: number;
}

const cells = {
  apr: Apr,
  vault: Vault,
  earned: Earned,
  details: Details,
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
  font-weight: 600;
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
      padding-top: 35px;
      padding-left: 40px;
      width: 200px;
    }
  }
  // td: nth-child(3) {
  //   width: 120px;
  //   ${({ theme }) => theme.mediaQueries.md} {
  //     width: 200px;
  //   }
  //   ${({ theme }) => theme.mediaQueries.sm} {
  //     width: 100px;
  //   }
  // }
  // td:nth-child(4) {
  //   width: 120px;
  // }
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
  const { details, userDataReady, index } = props;
  const hasStakedAmount = false;
  const [actionPanelExpanded, setActionPanelExpanded] = useState(false);
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300);
  const userData = details?.farm?.userData ?? {};
  const { account } = useWeb3React();
  const _userDataKey = `${account}-${chainId}`;
  const _userData: IVaultUserData = userData[_userDataKey] ?? {
    account: '',
    allowance: '0',
    stakingTokenBalance: '0',
    avaultAddressBalance: '0',
  };

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    `${details.type === 2 ? details.vault.scale : 1} ${details.vault.vaultSymbol} = ${
      details.type === 1 ? '$' : ''
    }${new BigNumber(details?.vault?.lpToCLpRate ?? '1')
      .times(details?.vault?.scale ?? '1')
      .toNumber()
      .toLocaleString('en-US', {
        maximumFractionDigits: 6,
      })} ${details.type !== 1 ? details.vault.symbol : ''}`,
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
    `${details.vault.vaultSymbol}: ${details.vault.name}, an interest-bearing token synthesized by Avault`,
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
                      ${details.vault.liquidity}
                    </Text>
                  </td>
                );
              case 'net':
                return (
                  <td key={key}>
                    {tooltipVisible && tooltip}
                    <Flex alignItems="center" justifyContent="start">
                      <Text color="text" bold fontSize="15px">
                        {details.type === 2 ? details?.vault?.scale ?? 1 : 1}:
                        {`${new BigNumber(details?.vault?.lpToCLpRate ?? '1')
                          .times(details?.vault?.scale ?? '1')
                          .toNumber()
                          .toLocaleString('en-US', {
                            maximumFractionDigits: 4,
                          })}`}
                        {/* 1 {details.vault.vaultSymbol}={details.vault.lpToCLpRate} {details.vault.vaultSymbol} */}
                      </Text>
                      <QuestionWrapper ref={targetRef}>
                        <HelpIcon color="textSubtle" width="18px" height="18px" />
                      </QuestionWrapper>
                    </Flex>
                  </td>
                );
              case 'earned':
                return (
                  <td key={key}>
                    {balanceTooltipVisible && balanceTooltip}
                    <Flex alignItems="center" justifyContent="start">
                      <Balance
                        fontSize="14px"
                        color="text"
                        fontWeight="600"
                        decimals={showDecimalsWithType(details.vault.vaultSymbol, details.abiType, details.type)}
                        value={getBalanceNumber(new BigNumber(_userData.avaultAddressBalance), details.vault.decimals)}
                      />
                      <Text color="text" bold fontSize="14px" paddingLeft="4px">
                        {details.vault.vaultSymbol}
                      </Text>
                      <QuestionWrapper ref={balanceTargetRef}>
                        <HelpIcon color="textSubtle" width="18px" height="18px" />
                      </QuestionWrapper>
                    </Flex>
                    <Flex alignItems="center" justifyContent="start">
                      <Balance
                        fontSize="14px"
                        color="text"
                        fontWeight="600"
                        decimals={showDecimals(details.vault.symbol, details.abiType)}
                        value={getBalanceNumber(
                          new BigNumber(_userData.stakingTokenBalance),
                          details.vault.wantAddressDecimals,
                        )}
                      />
                      <Text color="text" bold fontSize="14px" paddingLeft="4px">
                        {details.vault.symbol}
                      </Text>
                    </Flex>
                  </td>
                );
              case 'details':
                return (
                  <td key={key}>
                    <Details isLoading={details.isLoading} actionPanelToggled={actionPanelExpanded} />
                  </td>
                );
              case 'apr':
                return (
                  <td key={key}>
                    <Apr
                      lpLabel={details.vault.vaultSymbol}
                      apy={details.vault.apy}
                      farmApy={details.vault.farmApy}
                      feeApy={details.vault.feeApy}
                      originalValue={+details.vault.apy}
                      fromSource={details.fromSource}
                      hideButton={isMobile}
                    />
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
            <Vault {...props.vault} />
          </CellLayout>
          <TextStyled>
            1:
            {`${new BigNumber(details?.vault?.lpToCLpRate ?? '1').toNumber().toLocaleString('en-US', {
              maximumFractionDigits: 4,
            })}`}
            {/* 1 {details.vault.vaultSymbol}={details.vault.lpToCLpRate} {details.vault.vaultSymbol} */}
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
            <ActionPanel {...props} expanded={actionPanelExpanded || isMobile} index={index} />
          </td>
        </StyledDetailTr>
      ) : null}
    </>
  );
};

export default Row;
