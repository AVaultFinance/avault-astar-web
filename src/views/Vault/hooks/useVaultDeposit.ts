import { useCallback } from 'react';
import { useAVaultPCSContract } from 'hooks/useContract';
import BigNumber from 'bignumber.js';
import { BIG_TEN } from 'utils/bigNumber';
import { callWithEstimateGas } from 'utils/calls';
import { DEFAULT_GAS_LIMIT } from 'config';
import { IABIType } from 'state/vault/types';
const useVaultDeposit = (abiType: IABIType, account: string, contractAddress: string, decimal: number) => {
  const contractAddressContract = useAVaultPCSContract(contractAddress, abiType);

  const handleDeposit = useCallback(
    async (amount: string) => {
      // const txHash =
      // try {
      //   return await depositVaultUtil(contractAddressContract, account, amount, decimal);
      // } catch (e) {
      //   return false;
      // }
      const value = new BigNumber(amount).times(BIG_TEN.pow(decimal)).toString();
      const res = await callWithEstimateGas(contractAddressContract, 'deposit', [account, `${value}`], {
        gasLimit: DEFAULT_GAS_LIMIT,
      });
      if (res && res.isOk) {
        return true;
      } else {
        return res.message;
      }
    },
    [contractAddressContract, account, decimal],
  );

  return { onDeposit: handleDeposit };
};

export default useVaultDeposit;
