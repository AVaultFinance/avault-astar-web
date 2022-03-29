import compounding from 'config/constants/compounding';
import tokens, { chainId } from 'config/constants/tokens';
import { ICompoundingConfigItem } from 'state/vault/types';
import { IToken, ITokenType } from '../utils/types';
import { chainKey } from 'config';
import { CHAINKEY, Currency } from '@avault/sdk';
export const zapAddress = '';
const _TokenALL = compounding.map((v: ICompoundingConfigItem) => {
  const [symbol0, symbol1] = v.lpDetail.symbol.replace(' LP', '').split('-');
  const _v0 = symbol0.toLowerCase() === 'kac' ? 'kaco' : symbol0.toLowerCase();
  const _v1 = symbol1.toLowerCase() === 'kac' ? 'kaco' : symbol1.toLowerCase();
  return [
    [_v0, _v1],
    {
      type: ITokenType.LP,
      ...v.lpDetail,
      token: tokens[chainKey][_v0],
      quoteToken: tokens[chainKey][_v1],
    },
  ];
});
const _Token = _TokenALL.map((v: any[]) => v[0]);
const tokenSingle = [...new Set(_Token.flat())];
export const tokenAll: IToken[] =
  chainKey === CHAINKEY.SDN
    ? tokenSingle.map((v: string) => {
        // console.log(v, tokens[chainKey][v]);
        return {
          ...tokens[chainKey][v],
          type: ITokenType.TOKEN,
        };
      })
    : [];
export const lpTokenAll = [..._TokenALL.map((v: any[]) => v[1])].concat(tokenAll);

export const fromCurrency: IToken = {
  ...Currency.ETHER[chainId],
  type: ITokenType.MAIN,
  decimals: 18,
};
export const toCurrency: IToken = lpTokenAll[0];
