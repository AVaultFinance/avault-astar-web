import erc20ABI from 'config/abi/erc20.json';
import { ICompounding } from './types';
import BigNumber from 'bignumber.js';
import multicall from 'utils/multicall';
import masterchefABI from 'config/abi/masterchef.json';
import masterchefSdnABI from 'config/abi/masterchef_Shiden.json';
import { chainKey } from 'config';
import { CHAINKEY } from '@avault/sdk';
import { chainId } from 'config/constants/tokens';
import AVaultPCS_ABI from 'config/abi/AVaultPCS_ABI.json';
import { haveNumber } from 'utils';

export const fetchCompoundingsFarmUserAllowances = async (
  account: string,
  compoundings: ICompounding[],
  index?: number,
) => {
  const calls = !haveNumber(index)
    ? compoundings.map((compounding: ICompounding) => {
        const lpAddresses = compounding.farm.lpAddresses;
        const masterChef = compounding.contractAddress[chainId];
        return {
          address: lpAddresses,
          name: 'allowance',
          params: [account, masterChef],
        };
      })
    : [
        {
          address: compoundings[index].farm.lpAddresses,
          name: 'allowance',
          params: [account, compoundings[index].contractAddress[chainId]],
        },
      ];

  const rawLpAllowances = await multicall(erc20ABI, calls);
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toString();
  });
  return parsedLpAllowances;
};
export const fetchCompoundingsFarmUserTokenBalances = async (
  account: string,
  compoundings: ICompounding[],
  index?: number,
) => {
  const calls = !haveNumber(index)
    ? compoundings.map((compounding: ICompounding) => {
        const lpAddresses = compounding.farm.lpAddresses;
        return {
          address: lpAddresses,
          name: 'balanceOf',
          params: [account],
        };
      })
    : [
        {
          address: compoundings[index].farm.lpAddresses,
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

export const fetchCompoundingsFarmStakedBalances = async (
  account: string,
  compoundings: ICompounding[],
  index?: number,
) => {
  const calls = !haveNumber(index)
    ? compoundings.map((compounding: ICompounding) => {
        const masterChef = compounding.compounding.masterChef;
        return {
          address: masterChef,
          name: 'userInfo',
          params: [compounding.farm.pid, account],
        };
      })
    : [
        {
          address: compoundings[index].compounding.masterChef,
          name: 'userInfo',
          params: [compoundings[index].farm.pid, account],
        },
      ];
  const _masterchefABI = chainKey === CHAINKEY.SDN ? masterchefSdnABI : masterchefABI;
  const rawStakedBalances = await multicall(_masterchefABI, calls);
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON();
  });
  return parsedStakedBalances;
};
export const fetchCompoundingsFarmEarnings = async (account: string, compoundings: ICompounding[], index?: number) => {
  const calls = !haveNumber(index)
    ? compoundings.map((compounding: ICompounding) => {
        const masterChef = compounding.compounding.masterChef;
        return {
          address: masterChef,
          name: 'pendingCake',
          params: [compounding.farm.pid, account],
        };
      })
    : [
        {
          address: compoundings[index].compounding.masterChef,
          name: 'pendingCake',
          params: [compoundings[index].farm.pid, account],
        },
      ];
  const _masterchefABI = chainKey === CHAINKEY.SDN ? masterchefSdnABI : masterchefABI;
  const rawEarnings = await multicall(_masterchefABI, calls);
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON();
  });
  return parsedEarnings;
};

export const fetchCompoundingsUsers = async (account: string, compoundings: ICompounding[], index?: number) => {
  const calls01 = !haveNumber(index)
    ? compoundings.map((compounding: ICompounding) => {
        return {
          address: compounding.contractAddress[chainId],
          name: 'balanceOf',
          params: [account],
        };
      })
    : [
        {
          address: compoundings[index].contractAddress[chainId],
          name: 'balanceOf',
          params: [account],
        },
      ];
  const calls02 = !haveNumber(index)
    ? compoundings.map((compounding: ICompounding) => {
        return {
          address: compounding.contractAddress[chainId],
          name: 'totalSupply',
        };
      })
    : [
        {
          address: compoundings[index].contractAddress[chainId],
          name: 'totalSupply',
        },
      ];
  const calls03 = !haveNumber(index)
    ? compoundings.map((compounding: ICompounding) => {
        return {
          address: compounding.contractAddress[chainId],
          name: 'wantLockedTotal',
        };
      })
    : [
        {
          address: compoundings[index].contractAddress[chainId],
          name: 'wantLockedTotal',
        },
      ];

  if (calls01.length && calls02.length) {
    const rawEarnings01 = await multicall(AVaultPCS_ABI, calls01);
    const rawEarnings02 = await multicall(AVaultPCS_ABI, calls02);
    const rawEarnings03 = await multicall(AVaultPCS_ABI, calls03);
    const parsedEarnings = rawEarnings01.map((balances) => {
      return new BigNumber(balances).toJSON();
    });
    const compoundingTotalSupply = rawEarnings02.map((balances) => {
      return balances ? balances[0].toString() : null;
    });
    const compoundingWantLockedTotal = rawEarnings03.map((balances) => {
      return balances ? balances[0].toString() : null;
    });

    return [parsedEarnings, compoundingTotalSupply, compoundingWantLockedTotal];
  }
};
