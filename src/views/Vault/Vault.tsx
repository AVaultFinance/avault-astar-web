import React, { useCallback, useState, useMemo, useRef } from 'react';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { RowType } from '@avault/ui';
import Page from 'components/Layout/Page';
import { usePriceCakeBusd } from 'state/farms/hooks';
import { getBalanceNumber } from 'utils/formatBalance';
import { getFarmApr } from 'utils/apr';
import { orderBy } from 'lodash';
import VaultTable from './components/VaultTable/VaultTable';

import { DesktopColumnSchema } from './components/types';
import useKacPerBlock from './hooks/useAvaultPerBlock';
import { OptionProps } from 'components/Select/Select';
import { ISortDir } from 'components/SortIcon';
import { RowProps } from './components/VaultTable/Row';
import { useVault, useVaultUserData, usePollVaultData } from 'state/vault/hooks';
import { IVault } from 'state/vault/types';
import { usePrice } from 'state/price/hooks';
import PageLoader from 'components/Loader/PageLoader';
// const StyledImage = styled(Image)`
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 58px;
// `;
export const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number): string => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (cakeRewardsApr === 0 && lpRewardsApr === 0) {
    return '0';
  }
  return null;
};

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
  const kacPerBlock = useKacPerBlock();
  const { data: vaultsLP, userDataLoaded } = useVault();
  const cakePrice = usePriceCakeBusd();
  const { account } = useWeb3React();
  const [sortKey, setSortKey] = useState('hot');
  const [sortDir, setSortDir] = useState(ISortDir.default);
  const chosenFarmsLength = useRef(0);

  const { priceVsBusdMap } = usePrice();
  const { data: vaults } = useVault();
  const userDataReady = !account || (!!account && userDataLoaded);
  usePollVaultData();
  useVaultUserData(vaults);
  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const vaultsList = useCallback(
    (vaultsToDisplay: IVault[]): IVault[] => {
      const vaultsToDisplayWithAPR: IVault[] = vaultsToDisplay.map((vault) => {
        const { farm } = vault;
        // if (!farm.lpTotalInQuoteToken) {
        //   return vault;
        // }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(
          priceVsBusdMap[farm.quoteToken.toLocaleLowerCase()],
        );

        const { kacRewardsApr, lpRewardsApr, kacRewardApy } = getFarmApr(
          kacPerBlock,
          new BigNumber(farm.poolWeight),
          cakePrice,
          totalLiquidity,
          farm.lpAddresses,
        );
        // console.log(
        //   `${vault.token.symbol}-${vault.token1Address.symbol}`,
        //   'kacPerBlock',
        //   kacPerBlock.toFixed(5),
        //   'cakePrice',
        //   cakePrice.toFixed(5),
        //   'totalLiquidity',
        //   totalLiquidity.toFixed(5),
        //   'apr',
        //   cakeRewardsApr,
        //   'lpRewardsApr',
        //   lpRewardsApr,
        // );
        return {
          ...vault,
          vault: {
            ...vault.vault,
          },
          farm: {
            ...vault.farm,
            apr: `${kacRewardsApr}`,
            lpRewardsApr: `${lpRewardsApr}`,
            liquidity: totalLiquidity.toString(),
            apy: `${kacRewardApy}`,
          },
        };
      });

      return vaultsToDisplayWithAPR;
    },
    [cakePrice, priceVsBusdMap, kacPerBlock],
  );

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = [];

    const sortFarms = (vaults: IVault[]): IVault[] => {
      const side = sortDir === ISortDir.default || sortDir === ISortDir.down ? 'desc' : 'asc';
      switch (sortKey) {
        case 'apy':
          return orderBy(vaults, (vault: IVault) => vault.farm.apy, side);
        case 'multiplier':
          return orderBy(
            vaults,
            (vault: IVault) => (vault.farm.multiplier ? Number(vault.farm.multiplier.slice(0, -1)) : 0),
            side,
          );
        case 'earned':
          return orderBy(
            vaults,
            (vault: IVault) => (vault.farm.userData ? Number(vault.farm?.userData?.pendingReward ?? '0') : 0),
            side,
          );
        case 'liquidity':
          console.log(vaults.map((v) => v.farm.apy));
          return orderBy(vaults, (vault: IVault) => Number(vault.vault.liquidity), side);
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
    } = vault;
    //WAIT
    const row: RowProps = {
      apr: {
        apy: getDisplayApy(Number(vault.farm.apy)),
        apr: getDisplayApr(Number(vault.farm.apr), Number(vault.farm.lpRewardsApr)),
        multiplier: vault.farm.multiplier,
        vaultSymbol: vault.vault.symbol,
        lpLabel: vault.lpDetail.symbol,
        token0Address,
        token1Address,
        cakePrice,
        originalValue: Number(vault.farm.apy),
        fromSource: vault.fromSource,
      },
      vault: {
        label: vault.lpDetail.symbol,
        token0Address: token0Address,
        token1Address: token1Address,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(vault?.farm?.userData?.pendingReward ?? '0')),
        pid: vault.farm.pid,
      },
      liquidity: {
        liquidity: vault.vault.liquidity,
      },
      net: {
        net: '333',
      },
      multiplier: {
        multiplier: vault.farm.multiplier,
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
            if (a.original.apr.apr && b.original.apr.apr) {
              return Number(a.original.apr.apr) - Number(b.original.apr.apr);
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

  // console.log('userDataLoaded: ', userDataLoaded, 'dataLoaded: ', dataLoaded);
  return (
    <Page>
      {renderContent()}
      {/* <PageLoader /> */}
      {!rowData.length ? <PageLoader /> : null}
    </Page>
  );
};

export default Vaults;
