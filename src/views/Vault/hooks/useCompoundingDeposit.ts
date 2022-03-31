import { useCallback } from 'react';
import { useAVaultPCSContract } from 'hooks/useContract';
import BigNumber from 'bignumber.js';
import { BIG_TEN } from 'utils/bigNumber';
import { callWithEstimateGas } from 'utils/calls';
import { DEFAULT_GAS_LIMIT } from 'config';
const useCompoundingDeposit = (account: string, contractAddress: string, decimal: number) => {
  const contractAddressContract = useAVaultPCSContract(contractAddress);

  const handleDeposit = useCallback(
    async (amount: string) => {
      // const txHash =
      // try {
      //   return await depositCompoundingUtil(contractAddressContract, account, amount, decimal);
      // } catch (e) {
      //   return false;
      // }
      const value = new BigNumber(amount).times(BIG_TEN.pow(decimal)).toString();
      const res = await callWithEstimateGas(contractAddressContract, 'deposit', [`${value}`], {
        gasLimit: DEFAULT_GAS_LIMIT,
      });
      if (res.isOk) {
        return true;
      } else {
        return res.message;
      }
    },
    [contractAddressContract, decimal],
  );

  return { onDeposit: handleDeposit };
};

export default useCompoundingDeposit;
