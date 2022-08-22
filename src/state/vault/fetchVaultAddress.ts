import { chainId } from 'config/constants/tokens';
import multicall from 'utils/multicall';
import { IABIType, IVault } from './types';
import FetchVaultABIAmountABI from './abi/fetchVaultABIAmount.json';
import AVaultPCS from 'config/abi/AVaultPCS.json';

export const fetchVaultABIBase = async (vaultsData: IVault[]): Promise<Record<string, any[]>> => {
  const vaultCallsArr = {
    masterChef: [],
    name: [],
    symbol: [],
    pid: [],
    wantAddress: [],
    token0Address: [],
    token1Address: [],
    earnedAddress: [],
    AVAAddress: [],
    vaultDecimals: [],
  };
  vaultCallsArr.masterChef = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'farmContractAddress',
  }));
  vaultCallsArr.name = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'name',
  }));
  vaultCallsArr.symbol = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'symbol',
  }));
  vaultCallsArr.pid = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'pid',
  }));
  vaultCallsArr.wantAddress = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'wantAddress',
  }));
  vaultCallsArr.token0Address = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'token0Address',
  }));
  vaultCallsArr.token1Address = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'token1Address',
  }));
  vaultCallsArr.earnedAddress = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'earnedAddress',
  }));
  vaultCallsArr.AVAAddress = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'AVAAddress',
  }));
  vaultCallsArr.vaultDecimals = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'decimals',
  }));
  const vaultCall = [...Object.values(vaultCallsArr)].flat(2);
  const result = await multicall(AVaultPCS, vaultCall);
  const obj = {};
  const keyArr = Object.keys(vaultCallsArr);
  for (let i = 0; i < keyArr.length; i++) {
    const start = i * vaultsData.length;
    const end = start + vaultsData.length;
    obj[`${keyArr[i]}`] = result.slice(start, end).map((v) => v[0]);
    switch (`${keyArr[i]}`) {
      case 'pid':
        obj[`${keyArr[i]}`] = result.slice(start, end).map((v) => v[0].toNumber());
        break;
      case 'vaultDecimals':
        obj[`${keyArr[i]}`] = result.slice(start, end).map((v) => v[0].toString());
        break;
      default:
        obj[`${keyArr[i]}`] = result.slice(start, end).map((v) => v[0]);
    }
  }
  return obj;
};

export const fetchVaultABIBaseSingleToken = async (vaultsData: IVault[]): Promise<Record<string, any[]>> => {
  const vaultCallsArr = {
    name: [],
    symbol: [],
    wantAddress: [],
    earnedAddress: [],
    AVAAddress: [],
    vaultDecimals: [],
  };

  vaultCallsArr.name = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'name',
  }));
  vaultCallsArr.symbol = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'symbol',
  }));

  vaultCallsArr.wantAddress = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'wantAddress',
  }));

  vaultCallsArr.earnedAddress = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'earnedAddress',
  }));
  vaultCallsArr.AVAAddress = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'AVAAddress',
  }));
  vaultCallsArr.vaultDecimals = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'decimals',
  }));
  const vaultCall = [...Object.values(vaultCallsArr)].flat(2);
  const result = await multicall(AVaultPCS, vaultCall);
  const obj = {};
  const keyArr = Object.keys(vaultCallsArr);
  for (let i = 0; i < keyArr.length; i++) {
    const start = i * vaultsData.length;
    const end = start + vaultsData.length;
    obj[`${keyArr[i]}`] = result.slice(start, end).map((v) => v[0]);
    switch (`${keyArr[i]}`) {
      case 'pid':
        obj[`${keyArr[i]}`] = result.slice(start, end).map((v) => v[0].toNumber());
        break;
      case 'vaultDecimals':
        obj[`${keyArr[i]}`] = result.slice(start, end).map((v) => v[0].toString());
        break;
      default:
        obj[`${keyArr[i]}`] = result.slice(start, end).map((v) => v[0]);
    }
  }
  return obj;
};

export const fetchVaultABIAmount = async (vaultsData: IVault[]): Promise<Record<string, any[]>> => {
  const vaultCallsArr = {
    wantLockedTotal: [],
    scale: [],
    vaultTotalSupply: [],
  };

  vaultCallsArr.scale = vaultsData.map((v) => {
    if (v.type === 0) {
      return {
        address: v.contractAddress[chainId],
        name: 'totalSupply',
      };
    } else {
      return {
        address: v.contractAddress[chainId],
        name: 'scale',
      };
    }
  });
  vaultCallsArr.wantLockedTotal = vaultsData.map((v) => {
    if (v.abiType === IABIType.AVaultForStarlay) {
      return {
        address: v.contractAddress[chainId],
        name: 'getNetAssetValue',
        params: ['0x90384334333f3356eFDD5b20016350843b90f182'],
      };
    }
    return {
      address: v.contractAddress[chainId],
      name: 'wantLockedTotal',
    };
  });
  vaultCallsArr.vaultTotalSupply = vaultsData.map((v) => ({
    address: v.contractAddress[chainId],
    name: 'totalSupply',
  }));

  const vaultCall = [...Object.values(vaultCallsArr)].flat(2);

  const result = await multicall(FetchVaultABIAmountABI, vaultCall);
  const obj = {};
  const keyArr = Object.keys(vaultCallsArr);
  for (let i = 0; i < keyArr.length; i++) {
    const start = i * vaultsData.length;
    const end = start + vaultsData.length;
    obj[`${keyArr[i]}`] = result.slice(start, end).map((v) => v[0]);
    switch (`${keyArr[i]}`) {
      case 'wantLockedTotal':
      case 'scale':
      case 'vaultTotalSupply':
        obj[`${keyArr[i]}`] = result.slice(start, end).map((v) => v[0].toString());
        break;
      default:
        obj[`${keyArr[i]}`] = result.slice(start, end).map((v) => v[0]);
    }
  }
  return obj;
};
