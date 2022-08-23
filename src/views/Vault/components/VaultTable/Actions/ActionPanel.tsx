import React, { useCallback, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { Flex, LinkExternal, useMatchBreakpoints, useModal, useWalletModal } from '@my/ui';
import DepositAction from './DepositAction';
import WithdrawAction from './WithdrawAction';
import { AprProps } from '../Apr';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'utils/bigNumber';
import { getBalanceNumber, getFullLocalDisplayBalance } from 'utils/formatBalance';
import { useWeb3React } from '@web3-react/core';
import MobileAction from './MobileAction';
import { useERC20, usePairContract } from 'hooks/useContract';
import { IABIType, IFromSource, IVault } from 'state/vault/types';
import { useVault, useVaultFarmUser } from 'state/vault/hooks';
import useAuth from 'hooks/useAuth';
import { chainId } from 'config/constants/tokens';
import { InfoContainer } from 'style/TableStyled';
import { showDecimals, showDecimalsWithType } from 'views/Vault/utils';
import AddLiquidityModal from '../modal/AddLiquidityModal';
import RemoveLiquidityModal from '../modal/RemoveLiquidityModal';
import { getBscScanLink } from 'utils';
import { avaultApprove } from 'views/Vault/utils/getvrs';
import useTransactionDeadline from 'hooks/useTransactionDeadline';
import { Contract } from 'ethers';
import { useSpecialApproveFarm } from 'views/Vault/hooks/useApproveFarm';
import { useAppDispatch } from 'state';
import useToast from 'hooks/useToast';
import { changeLoading, changeVaultItemLoading, fetchVaultFarmUserDataAsync } from 'state/vault';
import { getAddress } from 'utils/addressHelpers';
// import { registerToken } from 'utils/wallet';
export interface ActionPanelProps {
  apr: AprProps;
  details: IVault;
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
  padding: 4px 10px 4px 0;
  white-space: nowrap;
  cursor: pointer;

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
  flex-wrap: wrap;
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

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details, userDataReady, expanded, index }) => {
  const vault = details;
  const { isXl, isLg } = useMatchBreakpoints();
  const isMobile = !(isXl || isLg);
  const { t } = useTranslation();
  const { account, library } = useWeb3React();
  const { avaultAddressBalance, allowance } = useVaultFarmUser(account, vault.contractAddress[chainId]);

  const isApproved = account && allowance && allowance.isGreaterThan(0);
  // allowance handling
  const [signatureData, setSignatureData] = useState<{ v: number; r: string; s: string; deadline: number } | null>(
    null,
  );
  // const isMetaMaskInScope = !!window.ethereum?.isMetaMask;
  // const stakingBigNumber = new BigNumber(vault.farm?.userData?.stakingTokenBalance??"0");
  let earnings = BIG_ZERO;
  let displayEarningsBalance: string = '0';

  const userData = vault?.farm?.userData ?? {};
  const _userDataKey = `${account}-${chainId}`;
  const _userData = userData[_userDataKey] ?? {
    account: '',
    allowance: '0',
    stakingTokenBalance: '0',
    stakedBalance: '0',
    avaultAddressBalance: '0',
  };

  // If user didn't connect wallet default balance will be 0
  // if (isApproved) {
  const _wantLockedTotal = new BigNumber(vault.vault.wantLockedTotal);
  const _totalSupply = new BigNumber(vault.vault.totalSupply);
  // _totalSupply： 282962782793973
  // avaultAddressBalance： 89962782593973
  // _wantLockedTotal： 284598115334499
  // console.log('earnings: ', _wantLockedTotal.toString(), _totalSupply.toString(), avaultAddressBalance.toString());
  if (avaultAddressBalance.toNumber() > 0 && _totalSupply.toNumber() > 0) {
    // const scale = vault.type === 0 ? 1 : vault.vault?.scale ?? '1';
    // console.log({scale})
    // console.log(_wantLockedTotal,_totalSupply,avaultAddressBalance)
    earnings = _wantLockedTotal.dividedBy(_totalSupply).times(avaultAddressBalance);
    // earnings = getBalanceAmount(_value, vault.vault.wantAddressDecimals);
    // wantLockedTotal / totalSupply()*CLpAmount
    // earningsBusd = earnings.multipliedBy(cakePrice).toNumber();
    displayEarningsBalance = getFullLocalDisplayBalance(
      earnings,
      vault.vault.wantAddressDecimals,
      showDecimals(vault.vault.vaultSymbol, vault.abiType),
    );
  }
  // }
  const [onAddLiquidity] = useModal(
    <AddLiquidityModal account={account} vault={vault} />,
    false,
    false,
    `onAddLiquidity${index}`,
  );
  const [onRemoveLiquidity] = useModal(
    <RemoveLiquidityModal account={account} vault={vault} />,
    false,
    false,
    `onRemoveLiquidity${index}`,
  );
  const lpAddress = getAddress(vault.vault.wantAddress);
  const lpContract = useERC20(lpAddress);
  const deadline = useTransactionDeadline();
  const [requestedApproval, setRequestedApproval] = useState(false);
  // const { onApprove } = useSpecialApproveFarm(lpContract, vault.vault.masterChef);
  const { onApprove } = useSpecialApproveFarm(lpContract, vault.contractAddress[chainId]);
  const dispatch = useAppDispatch();
  const { data: vaults } = useVault();
  const { toastSuccess, toastError } = useToast();
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);
  const handleApproveV0 = useCallback(async () => {
    if (!account) {
      onPresentConnectModal();
      return;
    }
    try {
      setRequestedApproval(true);
      const result = await onApprove();
      if (typeof result === 'boolean' && result) {
        dispatch(changeLoading());
        dispatch(changeVaultItemLoading({ index }));
        dispatch(fetchVaultFarmUserDataAsync({ account, vaults, index }));
        toastSuccess('Approve!', 'Your are Approved');
      } else {
        const message = result ? result : 'Your approved failed';
        toastError('Approve Error!', message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRequestedApproval(false);
    }
  }, [onApprove, dispatch, onPresentConnectModal, index, account, vaults, toastError, toastSuccess]);

  const pairContract: Contract | null = usePairContract(details.vault.wantAddress);
  const handleApprove = useCallback(async () => {
    if (!account) {
      onPresentConnectModal();
      return;
    }
    if (deadline) {
      try {
        setRequestedApproval(true);
        const signature = await avaultApprove({
          pairContract: pairContract,
          paitAddress: details.vault.wantAddress,
          vaultContractAddress: details.contractAddress[chainId],
          library: library,
          account,
          deadline: deadline,
        });
        setSignatureData({
          v: signature.v,
          r: signature.r,
          s: signature.s,
          deadline: signature.deadline,
        });
        setRequestedApproval(false);
      } catch (err: any) {
        console.error(err);
        if (err?.code !== 4001) {
          handleApproveV0();
        } else {
          setRequestedApproval(false);
        }
      }
    }
  }, [
    details.vault.wantAddress,
    onPresentConnectModal,
    pairContract,
    deadline,
    account,
    details.contractAddress,
    library,
    handleApproveV0,
  ]);
  return (
    <Container expanded={expanded}>
      <InfoContainer>
        {details.abiType === IABIType.AVaultForStarlay ? null : (
          <StyledLinkExternal
            hideIcon={true}
            onClick={() => {
              if (!account) {
                onPresentConnectModal();
                return;
              }
              onAddLiquidity();
            }}
          >
            Add Liquidity
          </StyledLinkExternal>
        )}
        {details.abiType === IABIType.AVaultForStarlay ? null : (
          <StyledLinkExternal
            hideIcon={true}
            onClick={() => {
              if (!account) {
                onPresentConnectModal();
                return;
              }
              onRemoveLiquidity();
            }}
          >
            Remove Liquidity
          </StyledLinkExternal>
        )}
        <StyledLinkExternal href={`${getBscScanLink(vault.contractAddress[chainId], 'address')}`}>
          {t('View Contract')}
        </StyledLinkExternal>
        {/* 
        {account && isMetaMaskInScope && vault.farm.lpAddresses && (
          <StyledLinkExternal
            hideIcon={true}
            onClick={() => registerToken(vault.farm.lpAddresses, vault.farm.lpSymbol, vault.vault.wantAddressDecimals)}
          >
            Add LP to Metamask
          </StyledLinkExternal>
        )} */}
      </InfoContainer>
      <DetailContainer>
        <p>
          TVL
          <i>${vault?.vault?.liquidity ?? ''}</i>
        </p>
        <p>
          APY
          <em>
            <i className="green">
              {vault?.vault?.apy ? (vault.vault.apy === '999.99' ? '> ' + vault.vault.apy : vault.vault.apy + '%') : ''}
            </i>
            {vault.fromSource === IFromSource.starlay ? (
              <i className="grey">
                {vault.fromSource} APY: ≈{vault.vault.apy}%
              </i>
            ) : null}
            {vault.fromSource !== IFromSource.starlay ? (
              <i className="grey">
                {vault.fromSource} Fee APY: ≈{vault.vault.feeApy}%
              </i>
            ) : null}
            {vault.fromSource !== IFromSource.starlay ? (
              <i className="grey">
                {vault.fromSource} Farm APY: &nbsp;
                {vault?.vault?.farmApy
                  ? vault.vault.farmApy === '999.99'
                    ? '> ' + vault.vault.farmApy
                    : vault.vault.farmApy + '%'
                  : ''}
              </i>
            ) : null}
          </em>
        </p>
        <p>
          wallet balance
          <em>
            <i>
              {getBalanceNumber(
                new BigNumber(_userData.avaultAddressBalance),
                vault.vault.wantAddressDecimals,
              ).toLocaleString('en-US', {
                maximumFractionDigits: showDecimalsWithType(vault.vault.vaultSymbol, vault.abiType, vault.type),
              })}{' '}
              {vault?.vault.vaultSymbol}
            </i>
            <i>
              {getFullLocalDisplayBalance(
                new BigNumber(_userData.stakingTokenBalance),
                vault.vault.wantAddressDecimals,
                showDecimals(vault.vault.vaultSymbol, vault.abiType),
              )}{' '}
              {vault.vault.vaultSymbol}
            </i>
          </em>
        </p>
        <InfoContainerSmall>
          <StyledLinkExternal hideIcon={true} onClick={onAddLiquidity}>
            Add Liquidity
          </StyledLinkExternal>
          <StyledLinkExternal hideIcon={true} onClick={onRemoveLiquidity}>
            Remove Liquidity
          </StyledLinkExternal>
          <StyledLinkExternal href={`${getBscScanLink(vault.contractAddress[chainId], 'address')}`}>
            {t('View Contract')}
          </StyledLinkExternal>
        </InfoContainerSmall>
      </DetailContainer>
      {isMobile ? (
        <MobileAction
          abiType={vault.abiType}
          lpToCLpRate={vault.vault.lpToCLpRate}
          requestedApproval={requestedApproval}
          isApproved={isApproved}
          pid={vault.farm.pid}
          displayBalance={getFullLocalDisplayBalance(
            new BigNumber(_userData.stakingTokenBalance),
            vault.vault.wantAddressDecimals,
            showDecimals(vault.vault.vaultSymbol, vault.abiType),
          )}
          displayEarningsBalance={displayEarningsBalance}
          earnings={earnings}
          userDataReady={userDataReady}
          handleApprove={handleApproveV0}
          account={account}
          lpSymbol={vault.vault.symbol}
          contractAddress={vault.contractAddress[chainId]}
          stakingTokenBalance={new BigNumber(_userData.stakingTokenBalance)}
          lpAddressDecimals={vault.vault.wantAddressDecimals}
          index={index}
        />
      ) : (
        <ActionContainer style={{ justifyContent: 'end' }}>
          <DepositAction
            deadline={deadline}
            setSignatureData={setSignatureData}
            abiType={vault.abiType}
            signatureData={signatureData}
            contractAddress={vault.contractAddress[chainId]}
            lpAddressDecimals={vault.vault.wantAddressDecimals}
            requestedApproval={requestedApproval}
            isApproved={isApproved}
            displayBalance={getFullLocalDisplayBalance(
              new BigNumber(_userData.stakingTokenBalance),
              vault.vault.wantAddressDecimals,
              showDecimals(vault.vault.vaultSymbol, vault.abiType),
            )}
            displayEarningsBalance={displayEarningsBalance}
            earnings={earnings}
            handleApprove={handleApprove}
            userDataReady={userDataReady}
            pid={vault.farm.pid}
            name={vault.vault.name}
            lpSymbol={vault.vault.symbol}
            index={index}
          />
          <div className="w20"></div>
          <WithdrawAction
            abiType={vault.abiType}
            lpToCLpRate={vault.vault.lpToCLpRate}
            contractAddress={vault.contractAddress[chainId]}
            lpAddressDecimals={vault.vault.wantAddressDecimals}
            requestedApproval={requestedApproval}
            isApproved={isApproved}
            displayBalance={getFullLocalDisplayBalance(
              new BigNumber(_userData.stakingTokenBalance),
              vault.vault.wantAddressDecimals,
              showDecimals(vault.vault.vaultSymbol, vault.abiType),
            )}
            displayEarningsBalance={displayEarningsBalance}
            earnings={earnings}
            userDataReady={userDataReady}
            name={vault.vault.name}
            lpSymbol={vault.vault.symbol}
            index={index}
          />
        </ActionContainer>
      )}
    </Container>
  );
};

export default ActionPanel;
