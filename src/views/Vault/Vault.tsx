import React, { useCallback, useState, useMemo, useRef } from 'react';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { RowType } from '@my/ui';
import Page from 'components/Layout/Page';
import { getBalanceNumber } from 'utils/formatBalance';
import { orderBy } from 'lodash';
import VaultTable from './components/VaultTable/VaultTable';
import VaultBanner from './components/VaultBanner/VaultBanner';
import { DesktopColumnSchema } from './components/types';
import { OptionProps } from 'components/Select/Select';
import { ISortDir } from 'components/SortIcon';
import { RowProps } from './components/VaultTable/Row';
import { useVault, useVaultUserData } from 'state/vault/hooks';
import { IVault, VaultType } from 'state/vault/types';
import PageLoader from 'components/Loader/PageLoader';
import { chainId } from 'config/constants/tokens';
import styled from 'styled-components';

export const getDisplayApy = (cakeRewardsApy?: number): string => {
  if (cakeRewardsApy) {
    return cakeRewardsApy.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (cakeRewardsApy) {
    return cakeRewardsApy.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (cakeRewardsApy === 0) {
    return '0';
  }
  return null;
};

const Vaults: React.FC = () => {
  const { data: vaultsLP, userDataLoaded } = useVault();
  const { account } = useWeb3React();
  const [sortKey, setSortKey] = useState('hot');
  const [sortDir, setSortDir] = useState(ISortDir.default);
  const chosenFarmsLength = useRef(0);
  const [type, setType] = useState(0);
  const { data: vaults } = useVault();
  const userDataReady = !account || (!!account && userDataLoaded);
  useVaultUserData(vaults);
  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const changeType = useCallback((_type: number) => {
    setType(_type);
  }, []);
  const vaultsList = useCallback(
    (vaultsToDisplay: IVault[]): IVault[] => {
      const vaultsToDisplayWithAPR: IVault[] = vaultsToDisplay.map((vault) => {
        return {
          ...vault,
          vault: {
            ...vault.vault,
          },
          farm: {
            ...vault.farm,
            lpRewardsApr: `0`,
            liquidity: vault.vault.liquidity,
            apy: vault.vault.apy,
          },
        };
      });
      if (type) {
        return vaultsToDisplayWithAPR.filter((v) => v.type === type);
      }
      return vaultsToDisplayWithAPR;
    },
    [type],
  );

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = [];

    const sortFarms = (vaults: IVault[]): IVault[] => {
      const side = sortDir === ISortDir.default || sortDir === ISortDir.down ? 'desc' : 'asc';
      switch (sortKey) {
        case 'apy':
          return orderBy(vaults, (vault: IVault) => Number(vault?.vault?.apy ?? '0'), side);
        case 'earned':
          return orderBy(
            vaults,
            (vault: IVault) => (vault.farm.userData ? Number(vault.farm?.userData?.stakingTokenBalance ?? '0') : 0),
            side,
          );
        case 'liquidity':
          return orderBy(vaults, (vault: IVault) => Number(vault.vault.liquidity.replace(',', '')), side);
        default:
          return vaults;
      }
    };

    chosenFarms = vaultsList(vaultsLP);
    return sortFarms(chosenFarms);
  }, [sortKey, vaultsLP, vaultsList, sortDir]);
  chosenFarmsLength.current = chosenFarmsMemoized.length;

  const rowData = chosenFarmsMemoized.map((vault: IVault) => {
    const {
      vault: { token0Address, token1Address },
      farm: { userData = {} },
    } = vault;
    const _userDataKey = `${account}-${chainId}`;
    const _userData = userData[_userDataKey] ?? {
      stakingTokenBalance: '0',
    };
    //WAIT
    const row: RowProps = {
      apr: {
        lpLabel: vault.vault.vaultSymbol,
        apy: vault.vault.apy,
        feeApy: vault.vault.feeApy,
        farmApy: vault.vault.farmApy,
        // apr: getDisplayApy(Number(vault.farm.apy)),
        // multiplier: vault.farm.multiplier,
        // vaultSymbol: vault.vault.vaultSymbol,
        // lpLabel: vault.vault.vaultSymbol,
        // token0Address,
        // token1Address,
        // cakePrice,
        originalValue: Number(vault.vault.apy),
        fromSource: vault.fromSource,
      },
      vault: {
        label: vault.vault.symbol,
        farmProject: vault.fromSource,
        wantAddress: vault.vault.wantAddress,
        token0Address: token0Address,
        token1Address: token1Address,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(_userData.stakingTokenBalance)),
        pid: vault.farm.pid,
      },
      liquidity: {
        liquidity: vault.vault.liquidity,
      },
      net: {
        net: '333',
      },
      details: vault,
    };
    return row;
  });
  const handleSortKeyChange = (option: OptionProps): void => {
    if (option.side === ISortDir.default) {
      setSortKey('hot');
    } else {
      setSortKey(option.value);
    }
    setSortDir(option.side);
  };
  const renderContent = (): JSX.Element => {
    const columnSchema = DesktopColumnSchema;
    const columns = columnSchema.map((column) => ({
      id: column.id,
      name: column.name,
      label: column.label,
      sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
        switch (column.name) {
          case 'vault':
            return b.id - a.id;
          case 'apr':
            if (a.original.apr.apy && b.original.apr.apy) {
              return Number(a.original.apr.apy) - Number(b.original.apr.apy);
            }
            return 0;
          case 'earned':
            return a.original.earned.earnings - b.original.earned.earnings;
          default:
            return 1;
        }
      },
      sortable: column.sortable,
    }));
    return (
      <VaultTable
        onOptionChange={handleSortKeyChange}
        data={rowData}
        sortKey={sortKey}
        sortDir={sortDir}
        columns={columns}
        userDataReady={userDataReady}
        userDataLoaded={userDataLoaded}
      />
    );
  };

  return (
    <Page>
      <VaultBanner />
      <TypeList>
        {VaultType.map((v: string, index: number) => (
          <li key={v} onClick={() => changeType(index)} className={type === index ? 'on' : ''}>
            {v}
          </li>
        ))}
      </TypeList>
      {renderContent()}
      {/* <PageLoader /> */}
      {!rowData.length ? <PageLoader /> : null}
    </Page>
  );
};
const TypeList = styled.ul`
  padding-top: 16px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 36px;
  }
  li {
    background-color: #181733;
    border: 1px solid #2e2d5b;
    border-radius: 12px;
    transition: all 0.3s ease;
    font-size: 14px;
    font-weight: 500;
    height: 38px;
    line-height: 38px;
    padding: 0 28px;
    margin-right: 20px;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 18px;
      height: 48px;
      line-height: 48px;
    }
    &.on {
      background-color: #1476ff;
      border: 1px solid #1476ff;
      &:hover {
        color: #fff;
        background-color: #1476ff;
        border: 1px solid #1476ff;
      }
    }
    &:hover {
      background-color: #181733;
      color: #1476ff;
      border: 1px solid #1476ff;
    }
  }
`;
export default Vaults;
