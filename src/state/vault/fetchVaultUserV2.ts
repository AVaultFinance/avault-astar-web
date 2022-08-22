import erc20ABI from 'config/abi/erc20.json';
import { IFromSource, IVault } from './types';
import BigNumber from 'bignumber.js';
import multicall from 'utils/multicall';
import masterchefABI from 'config/abi/masterchef.json';
import masterchefSdnABI from 'config/abi/masterchef_Shiden.json';
import masterchefArthABI from 'config/abi/masterchef_arth.json';
import { chainKey } from 'config';
import { CHAINKEY } from '@my/sdk';
import { chainId } from 'config/constants/tokens';
import AVaultPCS from 'config/abi/AVaultPCS.json';

import { haveNumber } from 'utils';

export const fetchVaultsFarmUserAllowances = async (account: string, vaults: IVault[], index?: number) => {
  const calls = !haveNumber(index)
    ? vaults.map((vault: IVault) => {
        const lpAddresses = vault.lpDetail.address[chainId];
        const contractAddress = vault.contractAddress[chainId];
        return {
          address: lpAddresses,
          name: 'allowance',
          params: [account, contractAddress],
        };
      })
    : [
        {
          address: vaults[index].lpDetail.address[chainId],
          name: 'allowance',
          params: [account, vaults[index].contractAddress[chainId]],
        },
      ];

  const rawLpAllowances = await multicall(erc20ABI, calls);
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toString();
  });
  return parsedLpAllowances;
};
export const fetchVaultsFarmUserTokenBalances = async (account: string, vaults: IVault[], index?: number) => {
  const calls = !haveNumber(index)
    ? vaults.map((vault: IVault) => {
        const lpAddresses = vault.lpDetail.address[chainId];
        return {
          address: lpAddresses,
          name: 'balanceOf',
          params: [account],
        };
      })
    : [
        {
          address: vaults[index].lpDetail.address[chainId],
          name: 'balanceOf',
          params: [account],
        },
      ];

  const rawTokenBalances = await multicall(erc20ABI, calls);
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance, index) => {
    return new BigNumber(tokenBalance).toString();
  });
  return parsedTokenBalances;
};

export const fetchVaultsFarmStakedBalances = async (account: string, vaults: IVault[], index?: number) => {
  const calls = !haveNumber(index)
    ? vaults.map((vault: IVault) => {
        const masterChef = vault.vault.masterChef;
        return {
          address: masterChef,
          name: vault.fromSource === IFromSource.arthswap ? 'userInfos' : 'userInfo',
          params: [vault.farm.pid, account],
        };
      })
    : [
        {
          address: vaults[index].vault.masterChef,
          name: vaults[index].fromSource === IFromSource.arthswap ? 'userInfos' : 'userInfo',
          params: [vaults[index].farm.pid, account],
        },
      ];
  const _masterchefABI =
    chainKey === CHAINKEY.SDN
      ? masterchefSdnABI
      : vaults[0].fromSource === IFromSource.arthswap
      ? masterchefArthABI
      : masterchefABI;
  const rawStakedBalances = await multicall(_masterchefABI, calls);
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON();
  });
  return parsedStakedBalances;
};
export const fetchVaultsFarmEarnings = async (account: string, vaults: IVault[], index?: number) => {
  const calls = !haveNumber(index)
    ? vaults.map((vault: IVault) => {
        const masterChef = vault.vault.masterChef;
        return {
          address: masterChef,
          name: vault.fromSource === IFromSource.arthswap ? 'pendingARSW' : 'pendingCake',
          params: [vault.farm.pid, account],
        };
      })
    : [
        {
          address: vaults[index].vault.masterChef,
          name: vaults[index].fromSource === IFromSource.arthswap ? 'pendingARSW' : 'pendingCake',
          params: [vaults[index].farm.pid, account],
        },
      ];
  const _masterchefABI =
    chainKey === CHAINKEY.SDN
      ? masterchefSdnABI
      : vaults[0].fromSource === IFromSource.arthswap
      ? masterchefArthABI
      : masterchefABI;
  const rawEarnings = await multicall(_masterchefABI, calls);
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON();
  });
  return parsedEarnings;
};

export const fetchVaultsUsersV2 = async (account: string, vaults: IVault[], index?: number) => {
  const calls01 = !haveNumber(index)
    ? vaults.map((vault: IVault) => {
        return {
          address: vault.contractAddress[chainId],
          name: 'balanceOf',
          params: [account],
        };
      })
    : [
        {
          address: vaults[index].contractAddress[chainId],
          name: 'balanceOf',
          params: [account],
        },
      ];

  if (calls01.length) {
    const rawEarnings01 = await multicall(AVaultPCS, calls01);
    const parsedEarnings = rawEarnings01.map((balances) => {
      return new BigNumber(balances).toJSON();
    });

    return [parsedEarnings];
  }
};
