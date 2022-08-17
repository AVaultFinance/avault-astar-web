import { ChainId } from '@my/sdk';
export enum IFarmProject {
  kaco = 'Kacoswap',
  starlay = 'Starlay',
  arthswap = 'Arthswap',
}
export enum ISwapLink {
  kaco = 'https://shiden.kaco.finance',
  starlay = 'https://starlay.finance/app',
  arthswap = 'https://app.arthswap.org/#/swap',
}

export enum IABIType {
  AVaultPCS = 'AVaultPCS',
  AVaultForArthswapFarm = 'AVaultForArthswapFarm',
}
interface IAddress {
  [ChainId.SDN_MAINNET]?: string;
  [ChainId.SDN_TESTNET]?: string;
  [ChainId.ASTR_MAINNET]?: string;
  [ChainId.ASTR_TESTNET]?: string;
  [ChainId.BSC_MAINNET]?: string;
  [ChainId.BSC_TESTNET]?: string;
}
export const VaultType = ['All', 'Event'];
export interface IVaultConfigItem {
  type: number; // 0 normal  1 active   2 addNew
  contractAddress: IAddress;
  fromSource: IFarmProject;
  abiType: IABIType;
  swapLink: string;
  online_at: number; //  timestamp  s
  lpDetail: {
    symbol: string;
    address: IAddress;
    decimals: number;
  };
  farm?: IVaultFarm;
  vault?: IVaultComp;
}
export interface IVaultFarm {
  // abi
  pid: number;
  lpSymbol: string;
  lpAddresses: string;
  token: string;
  quoteToken: string;
  tokenDecimals: number;
  quoteTokenDecimals: number;
  lpAddressDecimals: number;

  tokenAmountMc?: string;
  quoteTokenAmountMc?: string;
  tokenAmountTotal?: string;
  quoteTokenAmountTotal?: string;
  lpTotalInQuoteToken?: string;
  lpTotalSupply?: string;
  tokenPriceVsQuote?: string;
  poolWeight?: string;
  multiplier?: string;
  // calculate
  apr?: string;
  apy?: string;
  farmApr?: string;
  farmApy?: string;
  feeApr?: string;
  feeApy?: string;
  lpRewardsApr?: string;
  liquidity?: string;
  lpTokenPrice?: string;
  userData?: Record<string, IVaultUserData>;
}
export interface IVaultUserData {
  index?: number;
  vaultAccount?: string;
  account: string;
  allowance: string;
  stakingTokenBalance: string;
  stakedBalance: string;
  pendingReward: string;
  avaultAddressBalance: string;
}
export interface IVaultComp {
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
  wantLockedTotal?: string;
  scale?: string;
  totalSupply?: string;
  decimals: number;
  balance?: string;
  liquidity?: string;
  // calculate
  lpToCLpRate?: string;
}
export interface IVault extends IVaultConfigItem {
  vault: IVaultComp;
  farm: IVaultFarm;
  isLoading: boolean;
}
