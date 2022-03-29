import { chainId } from 'config/constants/tokens';
import { IToken } from './types';

export const isCurrencyEquals = (selectedCurrency: IToken, currency: IToken) => {
  if (!selectedCurrency.address && !currency.address) {
    // console.log(111);
    return true;
  }
  // console.log(selectedCurrency.address, currency.address);
  if (selectedCurrency.address && currency.address) {
    if (selectedCurrency.address[chainId].toLowerCase() === currency.address[chainId].toLowerCase()) {
      return true;
    }
  }
  return false;
};

export function currencyKey(currency: IToken): string {
  // console.log(currency);
  return !currency.address || !currency.address[chainId] ? 'ETHER' : currency.address[chainId] ?? '';
}
