import BigNumber from 'bignumber.js';
import { DEFAULT_GAS_LIMIT } from 'config';
import { chainId } from 'config/constants/tokens';
import { Contract } from 'ethers';
import { useContract } from 'hooks/useContract';
import { useCallback } from 'react';
import { BIG_TEN } from 'utils/bigNumber';
import { IToken, ITokenType } from 'views/Zap/utils/types';
import zapAbi from './zapAbi.json';
function useZapContractFn(zapAddress: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(zapAddress, zapAbi, withSignerIfPossible);
}
const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
};
const useZapContract = (zapAddress: string, fromCurrency: IToken, toCurrency: IToken) => {
  const contract = useZapContractFn(zapAddress);
  const Zap = useCallback(
    async (val: string) => {
      const value = parseInt(new BigNumber(val).times(BIG_TEN.pow(fromCurrency.decimals)).toString());
      let tx = null;
      if (fromCurrency.type === ITokenType.TOKEN && toCurrency.type === ITokenType.LP) {
        // ERC20 -> LP
        tx = await contract.zapInToken(fromCurrency.address[chainId], value, toCurrency.address[chainId], options);
      } else if (fromCurrency.type === ITokenType.MAIN && toCurrency.type === ITokenType.TOKEN) {
        tx = await contract.zapInToken(toCurrency.address[chainId], options);
      }
    },
    [contract],
  );
};
export default useZapContract;
