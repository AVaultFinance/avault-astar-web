import BigNumber from 'bignumber.js';
import { ERC20_ABI } from 'config/abi/erc20';
import { chainId } from 'config/constants/tokens';
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber';
import { getBalanceAmount } from 'utils/formatBalance';
import multicall from 'utils/multicall';
import { IVault } from './types';

export const fetchFarmDataABIBase = async (vaultsData: IVault[]): Promise<Record<string, any[]>> => {
  const callArr = {
    lpAddressDecimals: [],
    tokenDecimals: [],
    quoteTokenDecimals: [],
    lpSymbol: [],
  };
  callArr.lpAddressDecimals = vaultsData.map((v) => ({
    address: v.vault.wantAddress,
    name: 'decimals',
  }));
  callArr.tokenDecimals = vaultsData.map((v) => ({
    address: v.vault.token0Address,
    name: 'decimals',
  }));
  callArr.quoteTokenDecimals = vaultsData.map((v) => ({
    address: v.vault.token1Address,
    name: 'decimals',
  }));
  callArr.lpSymbol = vaultsData.map((v) => ({
    address: v.vault.wantAddress,
    name: 'symbol',
  }));
  const vaultCall = [...Object.values(callArr)].flat(2);
  const result = await multicall(ERC20_ABI, vaultCall);
  const obj = {};
  const keyArr = Object.keys(callArr);
  for (let i = 0; i < keyArr.length; i++) {
    const start = i * vaultsData.length;
    const end = start + vaultsData.length;
    obj[`${keyArr[i]}`] = result.slice(start, end).map((v) => v[0]);
  }
  return obj;
};

export const fetchFarmDataABICalc = async (
  vaultsData: IVault[],
  priceVsBusdMap: Record<string, string>,
): Promise<Record<string, any[]>> => {
  const callArr = {
    tokenBalanceLP: [],
    quoteTokenBalanceLp: [],
    lpTokenBalanceMC: [],
    lpTotalSupply: [],
  };
  callArr.tokenBalanceLP = vaultsData.map((v) => ({
    address: v.vault.token0Address,
    name: 'balanceOf',
    params: [v.vault.wantAddress],
  }));

  callArr.quoteTokenBalanceLp = vaultsData.map((v) => ({
    address: v.vault.token1Address,
    name: 'balanceOf',
    params: [v.vault.wantAddress],
  }));

  callArr.lpTokenBalanceMC = vaultsData.map((v) => ({
    address: v.vault.wantAddress,
    name: 'balanceOf',
    params: [v.vault.masterChef],
  }));
  callArr.lpTotalSupply = vaultsData.map((v) => ({
    address: v.vault.wantAddress,
    name: 'totalSupply',
  }));

  const call = [...Object.values(callArr)].flat(2);
  const result = await multicall(ERC20_ABI, call);
  const obj = {
    tokenBalanceLP: [],
    quoteTokenBalanceLp: [],
    lpTokenBalanceMC: [],
    lpTotalSupply: [],
  };
  const keyArr = Object.keys(callArr);
  for (let i = 0; i < keyArr.length; i++) {
    const start = i * vaultsData.length;
    const end = start + vaultsData.length;
    obj[`${keyArr[i]}`] = result.slice(start, end);
  }

  const tokenAmountMc = [];
  const tokenAmountTotal = [];
  const quoteTokenAmountMc = [];
  const quoteTokenAmountTotal = [];
  const lpTotalSupply = [];
  const lpTotalInQuoteToken = [];
  const liquidity = [];
  const tokenPriceVsQuote = [];
  const lpTokenPrice = [];
  for (let i = 0; i < vaultsData.length; i++) {
    const _lpTokenBalanceMC = obj.lpTokenBalanceMC[i];
    const _tokenBalanceLP = obj.tokenBalanceLP[i];
    const _quoteTokenBalanceLp = obj.quoteTokenBalanceLp[i];
    const _lpTotalSupply = obj.lpTotalSupply[i];
    const _token = vaultsData[i].vault.token0Address;
    const _tokenDecimals = vaultsData[i].farm.tokenDecimals;
    const _quoteToken = vaultsData[i].vault.token1Address;
    const _quoteTokenDecimals = vaultsData[i].farm.quoteTokenDecimals;

    const lpTokenRatio = new BigNumber(_lpTokenBalanceMC).div(new BigNumber(_lpTotalSupply));
    // token balance
    const _tokenAmountTotal = new BigNumber(_tokenBalanceLP).div(BIG_TEN.pow(_tokenDecimals));
    // quote token balance
    const _quoteTokenAmountTotal = new BigNumber(_quoteTokenBalanceLp).div(BIG_TEN.pow(_quoteTokenDecimals));
    //
    const _tokenAmountMc = _tokenAmountTotal.times(lpTokenRatio);
    const _quoteTokenAmountMc = _quoteTokenAmountTotal.times(lpTokenRatio);
    const _lpTotalInQuoteToken = _quoteTokenAmountMc.times(new BigNumber(2));
    const _totalLiquidity = priceVsBusdMap[_quoteToken.toLocaleLowerCase()]
      ? _lpTotalInQuoteToken
          .times(priceVsBusdMap[_quoteToken.toLocaleLowerCase()] ?? 1)
          .toFixed(2)
          .toString()
      : '';

    let _lpTokenPrice = BIG_ZERO;
    if (_lpTotalSupply && _lpTotalInQuoteToken && priceVsBusdMap[_token.toLocaleLowerCase()]) {
      const farmTokenPriceInUsd = priceVsBusdMap[_token.toLocaleLowerCase()];
      const valueOfBaseTokenInFarm = new BigNumber(farmTokenPriceInUsd).times(_tokenAmountTotal);
      const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2);
      const totalLpTokens = getBalanceAmount(new BigNumber(_lpTotalSupply));
      _lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens);
    }
    tokenAmountMc.push(_tokenAmountMc.toString());
    tokenAmountTotal.push(_tokenAmountTotal.toString());
    quoteTokenAmountMc.push(_quoteTokenAmountMc.toString());
    quoteTokenAmountTotal.push(_quoteTokenAmountTotal.toString());
    lpTotalSupply.push(_lpTotalSupply.toString());
    lpTotalInQuoteToken.push(_lpTotalInQuoteToken.toString());
    liquidity.push(_totalLiquidity);
    tokenPriceVsQuote.push(_quoteTokenAmountTotal.div(_tokenAmountTotal).toString());
    lpTokenPrice.push(_lpTokenPrice.toString());
  }
  return {
    tokenAmountMc: tokenAmountMc,
    tokenAmountTotal: tokenAmountTotal,
    quoteTokenAmountMc: quoteTokenAmountMc,
    quoteTokenAmountTotal: quoteTokenAmountTotal,
    lpTotalSupply: lpTotalSupply,
    lpTotalInQuoteToken: lpTotalInQuoteToken,
    liquidity: liquidity,
    tokenPriceVsQuote: tokenPriceVsQuote,
    lpTokenPrice: lpTokenPrice,
  };
};
