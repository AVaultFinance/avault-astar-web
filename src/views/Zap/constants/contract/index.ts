import BigNumber from 'bignumber.js';
import { chainId } from 'config/constants/tokens';
import { Contract } from 'ethers';
import { useContract } from 'hooks/useContract';
import { useCallback } from 'react';
import { BIG_TEN } from 'utils/bigNumber';
import { callWithEstimateGas } from 'utils/calls';
import { IToken, ITokenType } from 'views/Zap/utils/types';
import zapAbi from './zapAbi.json';

export const zapAddress = '0x5Af88505CF2cE57bb5e36816d7853A221F6Fc981';

function useZapContractFn(zapAddress: string): Contract | null {
  return useContract(zapAddress, zapAbi, true);
}

const useZapContract = (zapAddress: string, fromCurrency: IToken, toCurrency: IToken) => {
  const contract = useZapContractFn(zapAddress);
  const handleZapClick = useCallback(
    async (val: string, account: string) => {
      try {
        const value = parseInt(new BigNumber(val).times(BIG_TEN.pow(fromCurrency.decimals)).toString());
        if (
          fromCurrency.type === ITokenType.TOKEN &&
          (toCurrency.type === ITokenType.LP || toCurrency.type === ITokenType.TOKEN)
        ) {
          // ERC20 -> LP
          // ERC20 -> ERC20
          return await callWithEstimateGas(contract, 'zapInToken', [
            fromCurrency.address[chainId],
            value,
            toCurrency.address[chainId],
          ]);
        } else if (
          fromCurrency.type === ITokenType.MAIN &&
          (toCurrency.type === ITokenType.LP || toCurrency.type === ITokenType.TOKEN)
        ) {
          // ETH -> LP
          // ETH -> ERC20
          return await callWithEstimateGas(contract, 'zapIn', [toCurrency.address[chainId]], { value, from: account });
        } else if (
          (fromCurrency.type === ITokenType.LP || fromCurrency.type === ITokenType.TOKEN) &&
          (toCurrency.type === ITokenType.TOKEN || toCurrency.type === ITokenType.MAIN)
        ) {
          // LP -> ERC20
          // ERC20 -> ETH
          return await callWithEstimateGas(contract, 'zapOut', [fromCurrency.address[chainId], value]);
        }
      } catch (e) {
        return false;
      }
    },
    [contract, fromCurrency, toCurrency],
  );
  return {
    handleZapClick,
  };
};
export default useZapContract;
