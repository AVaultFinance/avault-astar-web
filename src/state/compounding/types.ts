import { ChainId } from '@avault/sdk';
export enum IFarmProject {
  kaco = 'Kacoswap',
}
export enum IABIType {
  AVaultPCS,
}
interface IAddress {
  [ChainId.SDN_MAINNET]?: string;
  [ChainId.SDN_TESTNET]?: string;
  [ChainId.ASTR_MAINNET]?: string;
  [ChainId.ASTR_TESTNET]?: string;
  [ChainId.BSC_MAINNET]?: string;
  [ChainId.BSC_TESTNET]?: string;
}
export interface ICompoundingConfigItem {
  contractAddress: IAddress;
  fromSource: IFarmProject;
  abiType: IABIType;
}
export interface ICompoundingFarm {
  // abi
  pid: number;
  lpSymbol: string;
  lpAddresses: string;
  tokenAmountMc: string;
  token: string;
  quoteToken: string;
  quoteTokenAmountMc: string;
  tokenAmountTotal: string;
  quoteTokenAmountTotal: string;
  lpTotalInQuoteToken: string;
  lpTotalSupply: string;
  tokenPriceVsQuote: string;
  poolWeight: string;
  multiplier: string;
  quoteTokenDecimals: number;
  // calculate
  apr?: string;
  apy?: string;
  lpRewardsApr?: string;
  liquidity?: string;
  lpTokenPrice?: string;
  userData?: ICompoundingUserData;
}
export interface ICompoundingUserData {
  pid?: number;
  allowance: string;
  stakingTokenBalance: string;
  stakedBalance: string;
  pendingReward: string;
  avaultAddressBalance: string;
}
export interface ICompoundingComp {
  // abi
  symbol: string;
  name: string;
  masterChef: string;
  AVAAddress: string;
  token0Address: string;
  token1Address: string;
  fromSource: IFarmProject;
  wantAddress: string;
  earnedAddress: string;
  wantLockedTotal: string;
  totalSupply: string;
  decimals: number;
  balance?: string;
  liquidity?: string;
  // calculate
  lpToCLpRate?: string;
}
export interface ICompounding {
  contractAddress: IAddress;
  fromSource: IFarmProject;
  abiType: IABIType;
  compounding: ICompoundingComp;
  farm: ICompoundingFarm;
}
