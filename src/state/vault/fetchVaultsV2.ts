import { IVault } from './types';
import BigNumber from 'bignumber.js';
import { fetchVaultABIAmount } from './fetchVaultAddress';
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber';
import { isNaNString } from 'views/Vault/utils';
import { fetchApy, INetValueKeyItemItem, nowDate, preDate } from './fetchApy';
import { chainId } from 'config/constants/tokens';

const fetchVaultsV2 = async (
  currentBlock: number,
  priceVsBusdMap: Record<string, string>,
  vaultsData: IVault[],
): Promise<[IVault[], string]> => {
  // base
  // ----------------AVVATADDRESS Farm----------
  // const {
  //   masterChef,
  //   name,
  //   symbol,
  //   pid,
  //   wantAddress,
  //   token0Address,
  //   token1Address,
  //   earnedAddress,
  //   AVAAddress,
  //   vaultDecimals,
  // } = await fetchVaultABIBase(vaultsData);
  // console.log({
  //   masterChef,
  //   name,
  //   symbol,
  //   pid,
  //   wantAddress,
  //   token0Address,
  //   token1Address,
  //   earnedAddress,
  //   AVAAddress,
  //   vaultDecimals,
  // });
  // ----------------AVVATADDRESS SingleToken----------
  // const { name, symbol, wantAddress, earnedAddress, AVAAddress, vaultDecimals } = await fetchVaultABIBaseSingleToken(
  //   vaultsData,
  // );
  // console.log({
  //   name,
  //   symbol,
  //   wantAddress,
  //   earnedAddress,
  //   AVAAddress,
  //   vaultDecimals,
  // });

  // // pid: (22) [21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  const obj: IVault[] = [];
  const { wantLockedTotal, vaultTotalSupply, scale } = await fetchVaultABIAmount(vaultsData);
  // ----------------AVVATADDRESS  end----------
  // -------------MASTRETADDRESS--------
  // const { poolWeight, multiplier } = await fetchMasterChefABI(currentBlock, vaultsData);
  //-----------------Farm----------
  // const { lpAddressDecimals, tokenDecimals, quoteTokenDecimals, lpSymbol } = await fetchFarmDataABIBase(vaultsData);
  // const {
  //   // tokenAmountMc,
  //   // tokenAmountTotal,
  //   // quoteTokenAmountMc,
  //   // quoteTokenAmountTotal,
  //   // lpTotalSupply,
  //   // lpTotalInQuoteToken,
  //   liquidity,
  //   // tokenPriceVsQuote,
  //   // lpTokenPrice,
  // } = await fetchFarmDataABICalc(vaultsData, priceVsBusdMap);
  // calc amount cant stable
  let _total = BIG_ZERO;
  const apyArr = await fetchApy();
  let time = nowDate();

  for (let i = 0; i < vaultsData.length; i++) {
    const item = vaultsData[i];
    let _apyItem: INetValueKeyItemItem = apyArr[item.contractAddress[chainId].toLowerCase()][time];
    let ii = 1;
    while (!_apyItem) {
      time = preDate(ii);
      _apyItem = apyArr[item.contractAddress[chainId].toLowerCase()][time];
      ii++;
    }
    // console.log({ _apyItem }, item.contractAddress[chainId].toLowerCase(), time);
    // const priceAddress =
    //   item.fromSource === IFromSource.arthswap ? tokens[chainKey].arsw.address[chainId].toLowerCase() : '';
    // const { kacRewardsApr, kacRewardApy } = getFarmApr(
    //   new BigNumber(perBlock[i]),
    //   new BigNumber(poolWeight[i]),
    //   new BigNumber(priceVsBusdMap[priceAddress] ?? '1'),
    //   new BigNumber(liquidity[i]),
    //   item.lpDetail.address[chainId],
    // );
    // const feeApr: number = vault_fee_apr[`${item.vault.symbol}`];
    // const feeApy = aprToApy(feeApr);
    const _liquidity = new BigNumber(wantLockedTotal[i])
      .div(BIG_TEN.pow(new BigNumber(item.vault.decimals)))
      .times(Number(priceVsBusdMap[item.vault.wantAddress]))
      .toNumber();

    _total = _total.plus(_liquidity);
    const _scale = item.type === 0 ? '1' : scale[i];
    const _lpToCLpRate =
      wantLockedTotal[i] && vaultTotalSupply[i] && wantLockedTotal[i] > 0 && vaultTotalSupply[i] > 0
        ? new BigNumber(wantLockedTotal[i]).div(vaultTotalSupply[i]).toFixed(18)
        : '1';
    obj[i] = {
      ...item,
      vault: {
        ...item.vault,
        apr: _apyItem.apr,
        apy: _apyItem.apy,
        farmApr: _apyItem.farmApr,
        farmApy: _apyItem.farmApy,
        feeApr: _apyItem.aprFee,
        feeApy: _apyItem.apyFee,
        wantLockedTotal: wantLockedTotal[i],
        totalSupply: vaultTotalSupply[i],
        scale: _scale,
        liquidity: _liquidity.toLocaleString('en-US', {
          maximumFractionDigits: 2,
        }),
        lpToCLpRate: _lpToCLpRate,
      },
      farm: {
        ...item.farm,
        // poolWeight: poolWeight[i],
        // multiplier: multiplier[i],

        // tokenAmountMc: tokenAmountMc[i],
        // tokenAmountTotal: tokenAmountTotal[i],
        // quoteTokenAmountMc: quoteTokenAmountMc[i],
        // quoteTokenAmountTotal: quoteTokenAmountTotal[i],
        // lpTotalSupply: lpTotalSupply[i],
        // lpTotalInQuoteToken: lpTotalInQuoteToken[i],
        // liquidity: liquidity[i],
        // tokenPriceVsQuote: tokenPriceVsQuote[i],
        // lpTokenPrice: lpTokenPrice[i],
      },
    };
  }
  const total = isNaNString(_total.toString());
  return [obj, total];
};

export default fetchVaultsV2;
