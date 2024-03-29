import { useCallback } from 'react';
import { useAVaultPCSContract } from 'hooks/useContract';
import BigNumber from 'bignumber.js';
import { BIG_TEN } from 'utils/bigNumber';
import { callWithEstimateGas } from 'utils/calls';
import { IABIType } from 'state/vault/types';
import { chainId, main_tokens } from 'config/constants/tokens';
import { chainKey } from 'config';
const useVaultDeposit = (
  wantAddress: string,
  abiType: IABIType,
  account: string,
  contractAddress: string,
  decimal: number,
) => {
  const contractAddressContract = useAVaultPCSContract(contractAddress, abiType);

  const handleDeposit = useCallback(
    async (amount: string) => {
      const value = new BigNumber(`${amount}`).times(BIG_TEN.pow(decimal)).toFixed(0);
      let res;
      if (wantAddress.toLowerCase() === main_tokens[chainKey.toLowerCase()].address[chainId].toLowerCase()) {
        res = await callWithEstimateGas(contractAddressContract, 'depositASTR', [account], {
          value: value,
        });
      } else {
        res = await callWithEstimateGas(contractAddressContract, 'deposit', [account, `${value}`]);
      }
      if (res && res.isOk) {
        return true;
      } else {
        return res.message;
      }
    },
    [contractAddressContract, account, decimal, wantAddress],
  );

  const onDepositWithPermit = useCallback(
    async (amount: string, deadline: number, v: number, r: string, s: string) => {
      const value = new BigNumber(amount).times(BIG_TEN.pow(decimal)).toFixed(0);
      const res = await callWithEstimateGas(contractAddressContract, 'depositWithPermit', [
        account,
        `${value}`,
        deadline,
        v,
        r,
        s,
      ]);
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
