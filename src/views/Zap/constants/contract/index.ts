import BigNumber from 'bignumber.js';
import { chainId } from 'config/constants/tokens';
import { Contract } from 'ethers';
import { useContract } from 'hooks/useContract';
import { useCallback } from 'react';
import { calculateGasMargin } from 'utils';
import { BIG_TEN } from 'utils/bigNumber';
import { IToken, ITokenType } from 'views/Zap/utils/types';
import zapAbi from './zapAbi.json';
function useZapContractFn(zapAddress: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(zapAddress, zapAbi, withSignerIfPossible);
}

const useZapContract = (zapAddress: string, fromCurrency: IToken, toCurrency: IToken) => {
  const contract = useZapContractFn(zapAddress);
  // const gasPrice = useGasPrice()
  const handleZapClick = useCallback(
    async (val: string) => {
      try {
        const value = parseInt(new BigNumber(val).times(BIG_TEN.pow(fromCurrency.decimals)).toString());
        let tx = null;

        if (fromCurrency.type === ITokenType.TOKEN && toCurrency.type === ITokenType.LP) {
          // ERC20 -> LP
          const params = {
            address: fromCurrency.address[chainId],
            value: value,
            toCurrency: toCurrency.address[chainId],
          };
          const estimatedGas = await contract.estimateGas.zapInToken(...Object.values(params)).catch(() => {
            return contract.estimateGas.zapInToken(...Object.values(params));
          });
          tx = await contract.zapInToken(fromCurrency.address[chainId], value, toCurrency.address[chainId], {
            gasLimit: calculateGasMargin(estimatedGas),
          });
        } else if (fromCurrency.type === ITokenType.MAIN && toCurrency.type === ITokenType.TOKEN) {
          const params = {
            address: toCurrency.address[chainId],
          };
          const estimatedGas = await contract.estimateGas.zapInToken(...Object.values(params)).catch(() => {
            return contract.estimateGas.zapInToken(...Object.values(params));
          });
          //ETH -> LP | ERC20
          tx = await contract.zapInToken(params, {
            gasLimit: calculateGasMargin(estimatedGas),
            value: value,
          });
        } else if (fromCurrency.type === ITokenType.TOKEN && toCurrency.type === ITokenType.MAIN) {
          const params = {
            address: toCurrency.address[chainId],
          };
          const estimatedGas = await contract.estimateGas.zapOut(...Object.values(params)).catch(() => {
            return contract.estimateGas.zapOut(...Object.values(params));
          });
          //ETH -> LP | ERC20
          tx = await contract.zapOut(params, {
            gasLimit: calculateGasMargin(estimatedGas),
            value: value,
          });
        }
        return tx;
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
