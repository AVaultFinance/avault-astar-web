import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state';
import { fetchPriceAsync } from '.';
import { State } from '../types';
// import { useCurrency } from 'hooks/Tokens';
// import { tryParseAmount } from 'state/swap/hooks';
// import { Currency, CurrencyAmount } from '@my/sdk';
// import { BUSD, chainId } from 'config/constants/tokens';

// import { useAppDispatch } from 'state';
// import DEFAULT_TOKEN_LIST from 'config/constants/tokenLists/pancake-default.tokenlist.json';
// import { useEffect } from 'react';
// import { useTradeExactIn } from 'hooks/Trades';
// import { chainKey } from 'config';
export const usePollPrice = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPriceAsync());
  }, [dispatch]);
};
// export const usePollPrice = (_address: string, _amount?: string) => {
//   const address = _address.toLocaleLowerCase();
//   const amount = _amount ? _amount : address === '0xcdb32eed99aa19d39e5d6ec45ba74dc4afec549f' ? '100' : '1';
//   const dispatch = useAppDispatch();
//   const tokenArr = DEFAULT_TOKEN_LIST[chainKey].tokens.filter((v) => v.address.toLocaleLowerCase() === address);
//   const token = tokenArr[0];
//   const inputCurrency = useCurrency(token?.address);
//   const currencyIn: CurrencyAmount = tryParseAmount(amount, inputCurrency);
//   const currencyOut: Currency = BUSD[chainId];
//   const bestTradeExactIn = useTradeExactIn(false, currencyIn, currencyOut);
//   const { priceVsBusdMap } = usePrice();
//   useEffect(() => {
//     if (priceVsBusdMap[address]) {
//       if (
//         bestTradeExactIn &&
//         bestTradeExactIn.executionPrice &&
//         priceVsBusdMap[address] === bestTradeExactIn.executionPrice.toFixed()
//       ) {
//         return null;
//       }
//     }
//     if (bestTradeExactIn && bestTradeExactIn.executionPrice) {
//       let _bigNum = bestTradeExactIn.executionPrice.toFixed();
//       // oru
//       if (address === '0xcdb32eed99aa19d39e5d6ec45ba74dc4afec549f') {
//         _bigNum = bestTradeExactIn.executionPrice.toSignificant();
//       }
//       dispatch(setPrice({ address: address, num: _bigNum }));
//     } else {
//       // console.log({ address, bestTradeExactIn });
//     }
//   }, [dispatch, address, amount, bestTradeExactIn, bestTradeExactIn?.executionPrice, priceVsBusdMap]);
// };
export const usePrice = () => {
  return useSelector((state: State) => state.price);
};
