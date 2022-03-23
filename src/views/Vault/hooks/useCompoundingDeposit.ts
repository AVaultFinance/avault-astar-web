import { useCallback } from 'react';
import { useAVaultPCSContract } from 'hooks/useContract';
import { depositCompoundingUtil } from '../utils';
const useCompoundingDeposit = (account: string, contractAddress: string, decimal: number) => {
  const contractAddressContract = useAVaultPCSContract(contractAddress);

  const handleDeposit = useCallback(
    async (amount: string) => {
      // const txHash =
      try {
        return await depositCompoundingUtil(contractAddressContract, account, amount, decimal);
      } catch (e) {
        return false;
      }
    },
    [contractAddressContract, account, decimal],
  );

  return { onDeposit: handleDeposit };
};

export default useCompoundingDeposit;
