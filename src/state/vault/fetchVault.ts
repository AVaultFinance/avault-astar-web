import masterchefABI from 'config/abi/masterchef.json';
import masterchefSdnABI from 'config/abi/masterchef_Shiden.json';
import masterchefArthABI from 'config/abi/masterchef_arth.json';
import tokens, { chainId } from 'config/constants/tokens';
import { getAddress } from 'utils/addressHelpers';
import multicall from 'utils/multicall';
import { IFarmProject, IVault, IVaultConfigItem } from './types';
import AVaultPCS from 'config/abi/AVaultPCS.json';
import vault_fee_apr from './vault_fee_apr.json';
import erc20 from 'config/abi/erc20.json';
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber';
import { chainKey } from 'config';
import { CHAINKEY } from '@my/sdk';
import BigNumber from 'bignumber.js';
import { getBalanceAmount } from 'utils/formatBalance';
import { getFarmApr } from 'utils/apr';
import { aprToApy } from 'apr-tools';
const fetchVault = async (
  currentBlock: number,
  account: string,
  vault: IVaultConfigItem,
  priceVsBusdMap: Record<string, string>,
  vaultData: IVault,
): Promise<IVault> => {
  const vaultPublicData = await fetch(currentBlock, account, vault, priceVsBusdMap, vaultData);
  return { ...vault, ...vaultPublicData };
};
const fetch = async (
  currentBlock: number,
  account: string,
  vault: IVaultConfigItem,
  priceVsBusdMap: Record<string, string>,
  vaultData: IVault,
): Promise<IVault> => {
  const AVaultPCSAddress = getAddress(vault.contractAddress[chainId]);
  const {
    masterChef,
    name,
    symbol,
    pid,
    wantAddress,
    token0Address,
    token1Address,
    earnedAddress,
    AVAAddress,
    wantLockedTotal,
    vaultTotalSupply,
    vaultDecimals,
  } = await fetchVaultABI(AVaultPCSAddress);
  const { poolWeight, multiplier, perBlock } = await fetchMasterChefABI(currentBlock, masterChef, pid, vaultData);
  const lpAddresses = vaultData.lpDetail.address[chainId];
  const lpAddressSymbol = vaultData.lpDetail.symbol;
  // console.log({ vaultData, lpAddresses });
  const {
    tokenAmountMc,
    tokenAmountTotal,
    quoteTokenAmountMc,
    quoteTokenAmountTotal,
    lpTotalSupply,
    lpTotalInQuoteToken,
    tokenPriceVsQuote,
    lpSymbol,
    quoteTokenDecimals,
    liquidity,
    lpTokenPrice,
    lpAddressDecimals,
  } = await fetchFarmDataABI(masterChef, lpAddressSymbol, lpAddresses, token0Address, token1Address, priceVsBusdMap);
  // console.log(vault.lpDetail.symbol, lpAddresses, lpAddressDecimals);
  const lpToCLpRate =
    wantLockedTotal && vaultTotalSupply && wantLockedTotal > 0 && vaultTotalSupply > 0
      ? (Number(wantLockedTotal) / Number(vaultTotalSupply)).toFixed(18)
      : '1';

  // const currentSeconds = Math.floor(Date.now() / 1000);
  // 86400s/day
  // let data = Math.ceil((currentSeconds - vaultData.online_at) / 86400) - 1;
  // if (data <= 0) {
  //   data = 1;
  // }
  // state.data[index]?.online_at
  // const kacRewardsApr = (Number(lpToCLpRate) - 1) / data + 1;
  // const kacRewardApy = new BigNumber(kacRewardsApr).pow(365).times(100).minus(100).toFixed(2);

  // const kacRewardsApr = (Number(lpToCLpRate) - 1) / data;
  // const kacRewardApy = new BigNumber(kacRewardsApr).times(365).times(100).toFixed(2);
  const priceAddress =
    vaultData.fromSource === IFarmProject.arthswap ? tokens[chainKey].arsw.address[chainId].toLowerCase() : '';
  const { kacRewardsApr, kacRewardApy } = getFarmApr(
    new BigNumber(perBlock),
    new BigNumber(poolWeight),
    new BigNumber(priceVsBusdMap[priceAddress] ?? '1'),
    new BigNumber(liquidity),
    lpAddresses,
  );
  const feeApr: number = vault_fee_apr[`${vaultData.lpDetail.symbol}`];
  const feeApy = aprToApy(feeApr);

  if (vaultData.lpDetail.symbol === 'ARSW-WASTR LP') {
    console.log({ feeApr, feeApy, kacRewardsApr, kacRewardApy });
  }
  // console.log(`kacRewardsApr: ${kacRewardsApr}, kacRewardApy: ${kacRewardApy}`);
  const userData = vaultData?.farm?.userData ?? {};
  const _userDataKey = `${account}-${chainId}`;
  const _userData = userData[_userDataKey] ?? {
    account: '',
    allowance: '0',
    stakingTokenBalance: '0',
    stakedBalance: '0',
    pendingReward: '0',
    avaultAddressBalance: '0',
    userVaultSupply: '0',
  };

  return {
    isLoading: true,
    ...vault,
    vault: {
      symbol: symbol,
      name: name,
      masterChef: masterChef,
      token0Address: token0Address,
      token1Address: token1Address,
      fromSource: vault.fromSource,
      wantAddress: wantAddress,
      earnedAddress: earnedAddress,
      wantLockedTotal: wantLockedTotal,
      totalSupply: vaultTotalSupply,
      AVAAddress: AVAAddress,
      decimals: vaultDecimals,
      lpToCLpRate: lpToCLpRate,
    },
    farm: {
      pid: pid,
      lpSymbol: lpSymbol,
      lpAddresses: lpAddresses,
      token: token0Address,
      quoteToken: token1Address,
      tokenAmountMc: tokenAmountMc,
      quoteTokenAmountMc: quoteTokenAmountMc,
      tokenAmountTotal: tokenAmountTotal,
      quoteTokenAmountTotal: quoteTokenAmountTotal,
      lpTotalInQuoteToken: lpTotalInQuoteToken,
      lpTotalSupply: lpTotalSupply,
      tokenPriceVsQuote: tokenPriceVsQuote,
      poolWeight: poolWeight.toString(),
      multiplier: multiplier,
      quoteTokenDecimals: quoteTokenDecimals,
      liquidity: liquidity,
      lpTokenPrice: lpTokenPrice,
      lpAddressDecimals: lpAddressDecimals,
      apr: `${(kacRewardsApr + feeApr).toFixed(2)}`,
      apy: `${(kacRewardApy + feeApy).toFixed(2)}`,
      farmApr: `${kacRewardsApr.toFixed(2)}`,
      farmApy: `${kacRewardApy.toFixed(2)}`,
      feeApr: `${feeApr}`,
      feeApy: `${feeApy.toFixed(2)}`,
      userData: {
        _userDataKey: {
          account: _userData.account,
          allowance: _userData.allowance,
          stakingTokenBalance: _userData.stakingTokenBalance,
          stakedBalance: _userData.stakedBalance,
          pendingReward: _userData.pendingReward,
          avaultAddressBalance: _userData.avaultAddressBalance,
          userVaultSupply: _userData.userVaultSupply,
        },
      },
    },
  };
};
const fetchVaultABI = async (AVaultPCSAddress: string) => {
  const calls = [
    {
      address: AVaultPCSAddress,
      name: 'farmContractAddress',
    },
    {
      address: AVaultPCSAddress,
      name: 'name',
    },
    {
      address: AVaultPCSAddress,
      name: 'symbol',
    },

    {
      address: AVaultPCSAddress,
      name: 'pid',
    },
    {
      address: AVaultPCSAddress,
      name: 'wantAddress',
    },
    {
      address: AVaultPCSAddress,
      name: 'token0Address',
    },
    {
      address: AVaultPCSAddress,
      name: 'token1Address',
    },
    {
      address: AVaultPCSAddress,
      name: 'earnedAddress',
    },

    // {
    //   address: AVaultPCS,
    //   name: 'wethAddress',
    // },
    {
      address: AVaultPCSAddress,
      name: 'AVAAddress',
    },
    {
      address: AVaultPCSAddress,
      name: 'wantLockedTotal',
    },
    {
      address: AVaultPCSAddress,
      name: 'totalSupply',
    },
    // Quote token decimals
    {
      address: AVaultPCSAddress,
      name: 'decimals',
    },
  ];
  const [
    _masterChef,
    _name,
    _symbol,
    _pid,
    _wantAddress,
    _token0Address,
    _token1Address,
    _earnedAddress,
    _AVAAddress,
    _wantLockedTotal,
    _vaultTotalSupply,
    _vaultDecimals,
  ] = await multicall(AVaultPCS, calls);
  return {
    masterChef: _masterChef ? _masterChef[0] : null,
    name: _name ? _name[0] : null,
    symbol: _symbol ? _symbol[0] : null,
    pid: _pid ? _pid[0].toNumber() : null,
    wantAddress: _wantAddress ? _wantAddress[0] : null,
    token0Address: _token0Address ? _token0Address[0] : null,
    token1Address: _token1Address ? _token1Address[0] : null,
    earnedAddress: _earnedAddress ? _earnedAddress[0] : null,
    AVAAddress: _AVAAddress ? _AVAAddress[0] : null,
    wantLockedTotal: _wantLockedTotal ? _wantLockedTotal[0].toString() : null,
    vaultTotalSupply: _vaultTotalSupply ? _vaultTotalSupply[0].toString() : null,
    vaultDecimals: _vaultDecimals ? _vaultDecimals[0].toString() : null,
  };
};
const fetchMasterChefABI = async (currentBlock: number, masterChefAddress: string, pid: number, vaultData: IVault) => {
  const _masterchefABI =
    chainKey === CHAINKEY.SDN
      ? masterchefSdnABI
      : vaultData.fromSource === IFarmProject.arthswap
      ? masterchefArthABI
      : masterchefABI;
  // info: [
  //   lpToken (address) : 0x456c0082de0048ee883881ff61341177fa1fef40
  //   allocPoint (uint256) : 2000
  //   lastRewardBlock (uint256) : 1296996
  //   accKacPerShare (uint256) : 349319463345545
  // ]

  const [info, totalAllocPoint, getPeriod] =
    pid || pid === 0
      ? await multicall(_masterchefABI, [
          {
            address: masterChefAddress,
            name: vaultData.fromSource === IFarmProject.arthswap ? 'poolInfos' : 'poolInfo',
            params: [pid],
          },
          {
            address: masterChefAddress,
            name: 'totalAllocPoint',
          },
          {
            address: masterChefAddress,
            name: 'getPeriod',
            params: [currentBlock],
          },
          // {
          //   address: masterChefAddress,
          //   name:
          //     vaultData.fromSource === IFarmProject.arthswap
          //       ? 'ARSWPerBlock'
          //       : chainKey === CHAINKEY.SDN
          //       ? 'kacPerShidenBlock'
          //       : 'kacPerBlock',
          //   params: [pid],
          // },
        ])
      : [null, null, null];
  const _getPeriod = getPeriod.toString();
  const perBlock = await multicall(_masterchefABI, [
    {
      address: masterChefAddress,
      name: 'ARSWPerBlock',
      params: [_getPeriod],
    },
  ]);
  // console.log(`getPeriod: ${getPeriod}, perBlock:${perBlock.toString()}`);
  const allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO;
  // const lpAddresses = info ? info.lpToken : '';

  const poolWeight = totalAllocPoint
    ? allocPoint.div(new BigNumber(totalAllocPoint))
    : vaultData?.farm?.poolWeight
    ? new BigNumber(vaultData.farm.poolWeight)
    : BIG_ZERO;
  return {
    // lpAddresses,
    poolWeight,
    multiplier: `${allocPoint.div(new BigNumber(100)).toString()}X`,
    perBlock: new BigNumber(perBlock.toString()).div(BIG_TEN.pow(new BigNumber(18))).toFixed(2),
  };
};
const fetchFarmDataABI = async (
  masterChefAddress: string,
  lpAddressSymbol: string,
  lpAddress: string,
  token: string,
  quoteToken: string,
  priceVsBusdMap: Record<string, string>,
) => {
  const calls = [
    {
      address: token,
      name: 'balanceOf',
      params: [lpAddress],
    },
    {
      address: quoteToken,
      name: 'balanceOf',
      params: [lpAddress],
    },
    {
      address: lpAddress,
      name: 'balanceOf',
      params: [masterChefAddress],
    },
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    {
      address: lpAddress,
      name: 'decimals',
    },
    {
      address: token,
      name: 'decimals',
    },
    {
      address: quoteToken,
      name: 'decimals',
    },
    {
      address: lpAddress,
      name: 'symbol',
    },
  ];
  const [
    tokenBalanceLP,
    quoteTokenBalanceLp,
    lpTokenBalanceMC,
    lpTotalSupply,
    lpAddressDecimals,
    tokenDecimals,
    quoteTokenDecimals,
    lpSymbol,
  ] = await multicall(erc20, calls);
  // div 除法   times 乘法
  const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply));
  // token balance
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals));
  // quote token balance
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLp).div(BIG_TEN.pow(quoteTokenDecimals));
  //
  const tokenAmountMc = tokenAmountTotal.times(lpTokenRatio);
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio);
  // 在LP中的总质押，以报价代币价值计算
  const lpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2));
  const totalLiquidity = priceVsBusdMap[quoteToken.toLocaleLowerCase()]
    ? lpTotalInQuoteToken
        .times(priceVsBusdMap[quoteToken.toLocaleLowerCase()] ?? 1)
        .toFixed(2)
        .toString()
    : '';

  let lpTokenPrice = BIG_ZERO;
  if (lpTotalSupply && lpTotalInQuoteToken && priceVsBusdMap[token.toLocaleLowerCase()]) {
    const farmTokenPriceInUsd = priceVsBusdMap[token.toLocaleLowerCase()];
    const valueOfBaseTokenInFarm = new BigNumber(farmTokenPriceInUsd).times(tokenAmountTotal);
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2);
    const totalLpTokens = getBalanceAmount(new BigNumber(lpTotalSupply));
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens);
  }
  // else if (lpAddressSymbol.toLowerCase().indexOf('usd') > -1) {
  //   const totalLpTokens = getBalanceAmount(new BigNumber(lpTotalSupply));
  //   lpTokenPrice = quoteTokenAmountTotal.times(2).div(totalLpTokens);
  // } else if (priceVsBusdMap[quoteToken.toLocaleLowerCase()]) {
  //   const totalLpTokens = getBalanceAmount(new BigNumber(lpTotalSupply));
  //   lpTokenPrice = quoteTokenAmountTotal
  //     .times(2)
  //     .times(priceVsBusdMap[quoteToken.toLocaleLowerCase()])
  //     .div(totalLpTokens);
  // }
  return {
    tokenAmountMc: tokenAmountMc.toString(),
    tokenAmountTotal: tokenAmountTotal.toString(),
    quoteTokenAmountMc: quoteTokenAmountMc.toString(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toString(),
    lpTotalSupply: lpTotalSupply.toString(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toString(),
    liquidity: totalLiquidity,
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toString(),
    lpSymbol: lpSymbol ? lpSymbol[0] : '',
    quoteTokenDecimals: quoteTokenDecimals ? quoteTokenDecimals[0] : 18,
    lpAddressDecimals: lpAddressDecimals ? lpAddressDecimals[0] : 18,
    lpTokenPrice: lpTokenPrice.toString(),
  };
};
export default fetchVault;
