import { chainId } from 'config/constants/tokens';
import { IFromSource, IVault } from './types';
import masterchefArthABI from 'config/abi/masterchef_arth.json';
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber';
import BigNumber from 'bignumber.js';
import multicall from 'utils/multicall';

export const fetchMasterChefABI = async (
  currentBlock: number,
  vaultsData: IVault[],
): Promise<Record<string, any[]>> => {
  const multicall01Data = vaultsData.filter((v) => v.fromSource === IFromSource.arthswap);
  let result = {};
  if (multicall01Data.length) {
    const _result = await arthswap(currentBlock, multicall01Data);
    result = { ...result, ..._result };
  }
  const poolWeight: string[] = [];
  const multiplier: string[] = [];
  const perBlock: string[] = [];
  for (let i = 0; i < vaultsData.length; i++) {
    const vaultAddress = vaultsData[i].contractAddress[chainId];
    poolWeight.push(result[vaultAddress].poolWeight);
    multiplier.push(result[vaultAddress].multiplier);
    perBlock.push(result[vaultAddress].perBlock);
  }
  return {
    poolWeight,
    multiplier,
    perBlock,
  };
};
const arthswap = async (currentBlock: number, vaultsData: IVault[]): Promise<Record<string, any[]>> => {
  const multicallCallArr = {
    poolWeight: [],
    multiplier: [],
    perBlock: [],
  };

  const len = vaultsData.length;
  multicallCallArr.poolWeight = vaultsData.map((v) => ({
    address: v.vault.masterChef,
    name: 'poolInfos',
    params: [v.farm.pid],
  }));
  multicallCallArr.multiplier = vaultsData.map((v) => ({
    address: v.vault.masterChef,
    name: 'totalAllocPoint',
  }));
  multicallCallArr.perBlock = vaultsData.map((v) => ({
    address: v.vault.masterChef,
    name: 'getPeriod',
    params: [currentBlock],
  }));
  const vaultCall = [...Object.values(multicallCallArr)].flat(2);

  const result = await multicall(masterchefArthABI, vaultCall);

  const info = result.slice(0, len);
  const totalAllocPoint = result.slice(1 * len, 2 * len);
  const getPeriod = result.slice(2 * len, 3 * len).map((v) => v.toString());
  const perBlockCall = vaultsData.map((v, index) => ({
    address: v.vault.masterChef,
    name: 'ARSWPerBlock',
    params: [getPeriod[index]],
  }));
  const perBlock = await multicall(masterchefArthABI, perBlockCall);

  const allocPoint = vaultsData.map((v, index) => {
    return info[index] ? new BigNumber(info[index].allocPoint?._hex) : BIG_ZERO;
  });
  // const lpAddresses = info ? info.lpToken : '';
  // const poolWeight = vaultsData.map((v, index) => {
  //   return totalAllocPoint[index]
  //     ? allocPoint[index].div(new BigNumber(totalAllocPoint[index])).toString()
  //     : v?.farm?.poolWeight
  //     ? new BigNumber(v.farm.poolWeight).toString()
  //     : BIG_ZERO.toString();
  // });
  const obj = {};
  for (let i = 0; i < vaultsData.length; i++) {
    obj[`${vaultsData[i].contractAddress[chainId]}`] = {
      // poolWeight: poolWeight[i],
      multiplier: `${allocPoint[i].div(new BigNumber(100)).toString()}X`,
      perBlock: new BigNumber(perBlock[i].toString()).div(BIG_TEN.pow(new BigNumber(18))).toFixed(2),
    };
  }
  return obj;
};
