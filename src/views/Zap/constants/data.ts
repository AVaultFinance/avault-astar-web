import tokens, { chainId } from 'config/constants/tokens';
import { IABIType, IVaultConfigItem } from 'state/vault/types';
import { IToken, ITokenType } from '../utils/types';
import { chainKey } from 'config';
import { ChainId, CHAINKEY, Currency } from '@my/sdk';
import vaultsConfig from 'state/vault/vaultsConfig';
export const zapLocalFromCurrency = 'FromCurrency';
export const zapLocalToCurrency = 'ToCurrency';

const _TokenALL = vaultsConfig.map(
  (
    v: IVaultConfigItem,
  ): [
    string[],
    (
      | {
          token: any;
          quoteToken: any;
          symbol: string;
          address: any;
          decimals: number;
          type: ITokenType;
        }
      | undefined
    ),
  ] => {
    if (v.abiType === IABIType.AVaultForStarlay) {
      return [[v.vault.symbol.toLowerCase()], undefined];
    }
    const [symbol0, symbol1] = v.vault.symbol.replace(' LP', '').split('-');
    const _v0 =
      symbol0.toLowerCase() === 'wastr'
        ? 'astr'
        : symbol0.toLowerCase() === 'weth'
        ? 'eth'
        : symbol0.toLowerCase() === 'wsdn'
        ? 'sdn'
        : symbol0.toLowerCase() === 'wbtc'
        ? 'btc'
        : symbol0.toLowerCase();
    const _v1 =
      symbol1.toLowerCase() === 'wastr'
        ? 'astr'
        : symbol1.toLowerCase() === 'weth'
        ? 'eth'
        : symbol1.toLowerCase() === 'wsdn'
        ? 'sdn'
        : symbol1.toLowerCase() === 'wbtc'
        ? 'btc'
        : symbol1.toLowerCase();

    return [
      [_v0, _v1],
      {
        type: ITokenType.LP,
        token: tokens[chainKey][_v0],
        quoteToken: tokens[chainKey][_v1],
        symbol: v.vault.symbol,
        address: {
          [ChainId.ASTR_MAINNET]: v.vault.wantAddress,
          [ChainId.ASTR_TESTNET]: v.vault.wantAddress,
        },
        decimals: 18,
      },
    ];
  },
);
export const tokenIndex = _TokenALL;
const _Token = _TokenALL.map((v: any[]) => v[0]);
const tokenSingle = [...new Set(_Token.flat())];
export const tokenAll: IToken[] =
  chainKey === CHAINKEY.SDN || chainKey === CHAINKEY.ASTR
    ? tokenSingle.map((v: string) => {
        // console.log(v, tokens[chainKey][v]);
        return {
          ...tokens[chainKey][v],
          type: ITokenType.TOKEN,
        };
      })
    : [];

export const lpTokenAll = [..._TokenALL.map((v: any[]) => v[1])]
  .concat(tokenAll)
  .filter((v) => v && v?.symbol !== 'NIKA-WASTR LP');

export const fromCurrency: IToken = localStorage.getItem(zapLocalFromCurrency)
  ? JSON.parse(localStorage.getItem(zapLocalFromCurrency))
  : {
      ...Currency.ETHER[chainId],
      type: ITokenType.MAIN,
      decimals: 18,
    };
export const toCurrency: IToken = localStorage.getItem(zapLocalToCurrency)
  ? JSON.parse(localStorage.getItem(zapLocalToCurrency))
  : lpTokenAll[0];
