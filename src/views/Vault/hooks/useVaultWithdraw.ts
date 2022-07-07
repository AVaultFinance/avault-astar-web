import { useCallback } from 'react';
import { useAVaultPCSContract } from 'hooks/useContract';
import BigNumber from 'bignumber.js';
import { BIG_TEN } from 'utils/bigNumber';
import { callWithEstimateGas } from 'utils/calls';
import { DEFAULT_GAS_LIMIT } from 'config';
import { IABIType } from 'state/vault/types';

const useVaultWithdraw = (abiType: IABIType, account: string, contractAddress: string, decimal: number) => {
  const contractAddressContract = useAVaultPCSContract(contractAddress, abiType);

  const handleWithdraw = useCallback(
    async (amount: string) => {
      // const txHash =
      try {
        // const tx = await contract.withdraw(account, `${value}`, options);
        // const receipt = await tx.wait();
        // return receipt.status;
        const value = new BigNumber(amount).times(BIG_TEN.pow(decimal)).toFixed(0);
        // const tx = await contract.withdraw(account, `${value}`, options);
        const res = await callWithEstimateGas(contractAddressContract, 'withdraw', [account, `${value}`], {
          gasLimit: DEFAULT_GAS_LIMIT,
        });
        if (res && res.isOk) {
          return true;
        } else {
          return res.message;
        }
        // return await withdrawVaultUtil(contractAddressContract, account, amount, decimal);
      } catch (e) {
        return false;
      }
    },
    [contractAddressContract, account, decimal],
  );

  return { onWithdraw: handleWithdraw };
};

export default useVaultWithdraw;
