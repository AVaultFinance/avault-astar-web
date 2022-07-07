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
      const value = new BigNumber(`${amount}`).times(BIG_TEN.pow(decimal)).toFixed(0);
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

  const onDepositWithPermit = useCallback(
    async (amount: string, deadline: number, v: number, r: string, s: string) => {
      const value = new BigNumber(amount).times(BIG_TEN.pow(decimal)).toFixed(0);
      const res = await callWithEstimateGas(
        contractAddressContract,
        'depositWithPermit',
        [account, `${value}`, deadline, v, r, s],
        {
          gasLimit: DEFAULT_GAS_LIMIT,
        },
      );
      if (res && res.isOk) {
        return true;
      } else {
        return res.message;
      }
    },
    [contractAddressContract, account, decimal],
  );

  return { onDeposit: handleDeposit, onDepositWithPermit };
};

export default useVaultDeposit;
