import React, { useCallback, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { Flex, LinkExternal, useMatchBreakpoints, useWalletModal } from '@avault/ui';
import { getAddress } from 'utils/addressHelpers';
import DepositAction from './DepositAction';
import WithdrawAction from './WithdrawAction';
import { AprProps } from '../Apr';
import { MultiplierProps } from '../Multiplier';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'utils/bigNumber';
import { getBalanceNumber, getFullLocalDisplayBalance } from 'utils/formatBalance';
import { useWeb3React } from '@web3-react/core';
import MobileAction from './MobileAction';
import { useERC20 } from 'hooks/useContract';
import { useAppDispatch } from 'state';
import { ICompounding } from 'state/vault/types';
import { useCompounding, useCompoundingFarmUser } from 'state/vault/hooks';
import useAuth from 'hooks/useAuth';
import { chainId } from 'config/constants/tokens';
import { changeLoading, fetchCompoundingFarmUserDataAsync } from 'state/vault';
import { BASE_BSC_SCAN_URL } from 'config';
import { useSpecialApproveFarm } from 'views/Vault/hooks/useApproveFarm';
import { getDisplayApy } from 'views/Farms/Farms';
import useToast from 'hooks/useToast';
import { InfoContainer } from 'style/TableStyled';
import { showDecimals } from 'views/Vault/utils';
export interface ActionPanelProps {
  apr: AprProps;
  multiplier: MultiplierProps;
  details: ICompounding;
  userDataReady: boolean;
  expanded: boolean;
  index: number;
}

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 500px;
  }
`;

const collapseAnimation = keyframes`
  from {
    max-height: 500px;
  }
  to {
    max-height: 0px;
  }
`;

const Container = styled.div<{ expanded }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: unset;
  display: flex;
  flex-direction: column;
  margin: -44px 16px 20px;
  // border-radius: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    overflow: hidden;
    margin: 0;
    background-color: ${({ theme }) => theme.colors.background02};
    padding: 24px 64px;
  }
`;

const StyledLinkExternal = styled(LinkExternal)`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: 600;
  font-size: 12px;
  padding: 5px 10px 5px 0;
  svg {
    width: 14px;
    path {
      fill: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

const ActionContainer = styled.div`
  flex-direction: column;
  flex-flow: row wrap;
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`;
const InfoContainerSmall = styled(Flex)`
  margin-top: 10px;
  padding-top: 6px;
  justify-content: start;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const DetailContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 8px 16px;
  margin-top: 14px;
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.textSubtle};
    font-size: 12px;
    font-weight: 600;
    padding: 6px 0;
  }
  i {
    text-align: right;
    display: block;
    font-style: normal;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.colors.text};
    &.green {
      font-size: 15px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.success};
      margin-bottom: 3px;
    }
    &.grey {
      color: ${({ theme }) => theme.colors.textSubtle};
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`;

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  multiplier,
  userDataReady,
  expanded,
  index,
}) => {
  const compounding = details;
  const { isXl, isLg } = useMatchBreakpoints();
  const isMobile = !(isXl || isLg);

  const { t } = useTranslation();
  const lpAddress = getAddress(compounding.farm.lpAddresses);
  const { account } = useWeb3React();
  const { avaultAddressBalance, allowance } = useCompoundingFarmUser(compounding?.farm?.pid ?? 0);
  const isApproved = account && allowance && allowance.isGreaterThan(0);
  // const stakingBigNumber = new BigNumber(compounding.farm.userData.stakingTokenBalance);
  let earnings = BIG_ZERO;
  let displayEarningsBalance: string = '0';

  // If user didn't connect wallet default balance will be 0
  if (isApproved) {
    const _wantLockedTotal = new BigNumber(compounding.compounding.wantLockedTotal);
    const _totalSupply = new BigNumber(compounding.compounding.totalSupply);
    // _totalSupply： 282962782793973
    // avaultAddressBalance： 89962782593973
    // _wantLockedTotal： 284598115334499
    // console.log('earnings: ', _wantLockedTotal.toString(), _totalSupply.toString(), avaultAddressBalance.toString());
    if (avaultAddressBalance.toNumber() > 0 && _totalSupply.toNumber() > 0) {
      earnings = _wantLockedTotal.dividedBy(_totalSupply).times(avaultAddressBalance);
      // console.log('earnings: ', earnings);
      // earnings = getBalanceAmount(_value, compounding.farm.lpAddressDecimals);
      // wantLockedTotal / totalSupply()*CLpAmount
      // earningsBusd = earnings.multipliedBy(cakePrice).toNumber();
      displayEarningsBalance = getFullLocalDisplayBalance(
        earnings,
        compounding.farm.lpAddressDecimals,
        showDecimals(compounding.lpDetail.symbol),
      );
    }
  }

  const lpContract = useERC20(lpAddress);
  const [requestedApproval, setRequestedApproval] = useState(false);
  const [requestedApprovalSuccess, setRequestedApprovalSuccess] = useState(true);
  // const { onApprove } = useSpecialApproveFarm(lpContract, compounding.compounding.masterChef);
  const { onApprove } = useSpecialApproveFarm(lpContract, compounding.contractAddress[chainId]);
  const dispatch = useAppDispatch();
  const { data: compoundings } = useCompounding();
  const { toastSuccess, toastError } = useToast();
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);
  const handleApprove = useCallback(async () => {
    if (!account) {
      onPresentConnectModal();
      return;
    }
    // setRequestedApproval(true);
    // setTimeout(() => {
    //   setRequestedApproval(false);
    // }, 80000);
    try {
      setRequestedApproval(true);
      const result = await onApprove();
      if (result) {
        dispatch(changeLoading());
        // dispatch(changeVaultItemLoading({ index }));
        dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings, index }));
        toastSuccess('Approve!', 'Your are Approved');
        setTimeout(() => {
          setRequestedApprovalSuccess(true);
        }, 10000);
      } else {
        toastError('Approve!', 'Your approved failed');
        setRequestedApprovalSuccess(false);
        setTimeout(() => {
          setRequestedApprovalSuccess(true);
        }, 1500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRequestedApproval(false);
    }
  }, [onApprove, dispatch, onPresentConnectModal, index, account, compoundings, toastError, toastSuccess]);

  return (
    <Container expanded={expanded}>
      <InfoContainer>
        <StyledLinkExternal href={compounding.swapLink}>{t('Add Liquidity')}</StyledLinkExternal>
        <StyledLinkExternal href={`${BASE_BSC_SCAN_URL}/address/${compounding.contractAddress[chainId]}`}>
          {t('View Contract')}
        </StyledLinkExternal>
      </InfoContainer>
      <DetailContainer>
        <p>
          TVL
          <i>${compounding?.compounding?.liquidity ?? ''}</i>
        </p>
        <p>
          APY
          <em>
            <i className="green">{compounding?.farm?.apy ? getDisplayApy(Number(compounding.farm.apy)) + '%' : ''}</i>
            <i className="grey">Avault APR: 0.00%</i>
            <i className="grey">
              {compounding.lpDetail.symbol} APY: &nbsp;
              {compounding?.farm?.apy ? getDisplayApy(Number(compounding.farm.apy)) + '%' : ''}
            </i>
          </em>
        </p>
        <p>
          wallet balance
          <em>
            <i>
              {getBalanceNumber(new BigNumber(compounding?.farm?.userData?.avaultAddressBalance ?? '0')).toLocaleString(
                'en-US',
                {
                  maximumFractionDigits: showDecimals(compounding.lpDetail.symbol),
                },
              )}{' '}
              {compounding?.compounding.symbol}
            </i>
            <i>
              {getFullLocalDisplayBalance(
                new BigNumber(compounding.farm.userData.stakingTokenBalance),
                compounding.farm.lpAddressDecimals,
                showDecimals(compounding.lpDetail.symbol),
              )}{' '}
              {compounding.lpDetail.symbol}
            </i>
          </em>
        </p>
        <InfoContainerSmall>
          <StyledLinkExternal href={compounding.swapLink}>{t('Add Liquidity')}</StyledLinkExternal>
          <StyledLinkExternal href={`${BASE_BSC_SCAN_URL}/address/${compounding.contractAddress[chainId]}`}>
            {t('View Contract')}
          </StyledLinkExternal>
        </InfoContainerSmall>
      </DetailContainer>
      {isMobile ? (
        <MobileAction
          requestedApprovalSuccess={requestedApprovalSuccess}
          lpToCLpRate={compounding.compounding.lpToCLpRate}
          requestedApproval={requestedApproval}
          isApproved={isApproved}
          pid={compounding.farm.pid}
          displayBalance={getFullLocalDisplayBalance(
            new BigNumber(compounding.farm.userData.stakingTokenBalance),
            compounding.farm.lpAddressDecimals,
            showDecimals(compounding.lpDetail.symbol),
          )}
          displayEarningsBalance={displayEarningsBalance}
          earnings={earnings}
          userDataReady={userDataReady}
          handleApprove={handleApprove}
          account={account}
          lpSymbol={compounding.lpDetail.symbol}
          contractAddress={compounding.contractAddress[chainId]}
          stakingTokenBalance={new BigNumber(compounding?.farm?.userData?.stakingTokenBalance ?? '0')}
          lpAddressDecimals={compounding.farm.lpAddressDecimals}
          index={index}
        />
      ) : (
        <ActionContainer style={{ justifyContent: 'end' }}>
          <DepositAction
            contractAddress={compounding.contractAddress[chainId]}
            lpAddressDecimals={compounding.farm.lpAddressDecimals}
            requestedApproval={requestedApproval}
            requestedApprovalSuccess={requestedApprovalSuccess}
            isApproved={isApproved}
            displayBalance={getFullLocalDisplayBalance(
              new BigNumber(compounding?.farm?.userData?.stakingTokenBalance ?? '0'),
              compounding.farm.lpAddressDecimals,
              showDecimals(compounding.lpDetail.symbol),
            )}
            displayEarningsBalance={displayEarningsBalance}
            earnings={earnings}
            handleApprove={handleApprove}
            userDataReady={userDataReady}
            pid={compounding.farm.pid}
            name={compounding.compounding.name}
            lpSymbol={compounding.lpDetail.symbol}
            index={index}
          />
          <div className="w20"></div>
          <WithdrawAction
            lpToCLpRate={compounding.compounding.lpToCLpRate}
            contractAddress={compounding.contractAddress[chainId]}
            lpAddressDecimals={compounding.farm.lpAddressDecimals}
            requestedApproval={requestedApproval}
            isApproved={isApproved}
            displayBalance={getFullLocalDisplayBalance(
              new BigNumber(compounding?.farm?.userData?.stakingTokenBalance ?? '0'),
              compounding.farm.lpAddressDecimals,
              showDecimals(compounding.lpDetail.symbol),
            )}
            displayEarningsBalance={displayEarningsBalance}
            earnings={earnings}
            userDataReady={userDataReady}
            handleApprove={handleApprove}
            pid={compounding.farm.pid}
            name={compounding.compounding.name}
            lpSymbol={compounding.lpDetail.symbol}
            index={index}
          />
        </ActionContainer>
      )}
    </Container>
  );
};

export default ActionPanel;
