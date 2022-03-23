import { useCallback } from 'react';
import { useAVaultPCSContract } from 'hooks/useContract';
import { withdrawCompoundingUtil } from '../utils';

const useCompoundingWithdraw = (account: string, contractAddress: string, decimal: number) => {
  const contractAddressContract = useAVaultPCSContract(contractAddress);

  const handleWithdraw = useCallback(
    async (amount: string) => {
      // const txHash =
      try {
        return await withdrawCompoundingUtil(contractAddressContract, account, amount, decimal);
      } catch (e) {
        return false;
      }
    },
    [contractAddressContract, account, decimal],
  );

  return { onWithdraw: handleWithdraw };
};

export default useCompoundingWithdraw;
