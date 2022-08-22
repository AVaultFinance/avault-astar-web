import React from 'react';
import DEFAULT_TOKEN_LIST from 'config/constants/tokenLists/pancake-default.tokenlist.json';
import { usePollPrice } from 'state/price/hooks';
import { chainKey } from 'config';
import { fetchPriceAsync } from 'state/price';

// export const PriceProvider = React.memo(() => {
//   // DEFAULT_TOKEN_LIST[chainKey].tokens.map((v) => GetCurrencyExact(v.address));
//   return null;
// });

const GetCurrencyExact = (): React.ReactElement => {
  usePollPrice();
  return null;
};
