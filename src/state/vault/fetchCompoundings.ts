import fetchCompounding from './fetchCompounding';
import { ICompounding, ICompoundingConfigItem } from './types';
import BigNumber from 'bignumber.js';
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber';
import { isNaNString } from 'views/Vault/utils';

const fetchCompoundings = async (
  compoundings: ICompoundingConfigItem[],
  priceVsBusdMap: Record<string, string>,
  compoundingsData: ICompounding[],
): Promise<[ICompounding[], string]> => {
  const data = await Promise.all(
    compoundings.map(async (compoundingConfig, index) => {
      const compounding = await fetchCompounding(compoundingConfig, priceVsBusdMap, compoundingsData[index]);
      return compounding;
    }),
  );
  let _total = BIG_ZERO;
  const _data = [];
  for (let i = 0; i < data.length; i++) {
    const v = data[i];
    if (v.farm.lpTokenPrice) {
      const _liquidity = new BigNumber(v.compounding.wantLockedTotal)
        .div(BIG_TEN.pow(new BigNumber(v.compounding.decimals)))
        .times(Number(v.farm.lpTokenPrice))
        .toNumber();
      _total = _total.plus(_liquidity);
      _data.push({
        ...v,
        compounding: {
          ...v.compounding,
          liquidity: _liquidity.toLocaleString('en-US', {
            maximumFractionDigits: 2,
          }),
        },
      });
    } else {
      _data.push(v);
    }
  }
  const total = isNaNString(_total.toString());
  return [_data, total];
};
export default fetchCompoundings;
