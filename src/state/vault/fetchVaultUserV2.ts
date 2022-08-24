import erc20ABI from 'config/abi/erc20.json';
import { IABIType, IFromSource, IVault } from './types';
import BigNumber from 'bignumber.js';
import multicall from 'utils/multicall';
import masterchefABI from 'config/abi/masterchef.json';
import masterchefSdnABI from 'config/abi/masterchef_Shiden.json';
import masterchefArthABI from 'config/abi/masterchef_arth.json';
import { chainKey } from 'config';
import { CHAINKEY } from '@my/sdk';
import { chainId, main_tokens } from 'config/constants/tokens';
import AVaultPCS from 'config/abi/AVaultPCS.json';

import { haveNumber } from 'utils';
import { simpleRpcProvider } from 'utils/providers';
import { BIG_ZERO } from 'utils/bigNumber';

export const fetchVaultsFarmUserAllowances = async (account: string, vaults: IVault[], index?: number) => {
  const calls = !haveNumber(index)
    ? vaults.map((vault: IVault) => {
        const lpAddresses = vault.vault.wantAddress;
        const contractAddress = vault.contractAddress[chainId];
        return {
          address: lpAddresses,
          name: 'allowance',
          params: [account, contractAddress],
        };
      })
    : [
        {
          address: vaults[index].vault.wantAddress,
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
  let _index = index;
  let walletBalance = '0';
  if (
    haveNumber(index) &&
    vaults[index].vault.wantAddress.toLowerCase() === main_tokens[chainKey.toLowerCase()].address[chainId].toLowerCase()
  ) {
    //
    const walletBalance = await simpleRpcProvider.getBalance(account);
    return [new BigNumber(walletBalance.toString()).toString()];
  } else {
    if (!haveNumber(index)) {
      _index = vaults
        .map((v) => v.vault.wantAddress)
        .indexOf(main_tokens[chainKey.toLowerCase()].address[chainId].toLowerCase());
      const _walletBalance = await simpleRpcProvider.getBalance(account);
      walletBalance = new BigNumber(_walletBalance.toString()).toString();
    }
  }
  const calls = !haveNumber(index)
    ? vaults.map((vault: IVault) => {
        const lpAddresses = vault.vault.wantAddress;
        return {
          address: lpAddresses,
          name: 'balanceOf',
          params: [account],
        };
      })
    : [
        {
          address: vaults[index].vault.wantAddress,
          name: 'balanceOf',
          params: [account],
        },
      ];

  const rawTokenBalances = await multicall(erc20ABI, calls);
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance, index) => {
    return new BigNumber(tokenBalance).toString();
  });
  if (!haveNumber(index)) {
    parsedTokenBalances[_index] = walletBalance;
  }
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
        if (vault.abiType === IABIType.AVaultForStarlay) {
          return {
            address: vault.vault.wantAddress,
            name: 'balanceOf',
            params: [account],
          };
        }
        const masterChef = vault.vault.masterChef;
        return {
          address: masterChef,
          name: vault.fromSource === IFromSource.arthswap ? 'pendingARSW' : 'pendingCake',
          params: [vault.farm.pid, account],
        };
      })
    : [
        {
          address:
            vaults[index].abiType === IABIType.AVaultForStarlay
              ? vaults[index].vault.wantAddress
              : vaults[index].vault.masterChef,
          name:
            vaults[index].abiType === IABIType.AVaultForStarlay
              ? 'balanceOf'
              : vaults[index].fromSource === IFromSource.arthswap
              ? 'pendingARSW'
              : 'pendingCake',
          params: vaults[index].abiType === IABIType.AVaultForStarlay ? [account] : [vaults[index].farm.pid, account],
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
