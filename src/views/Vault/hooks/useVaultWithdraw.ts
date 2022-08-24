import { useCallback } from 'react';
import { useAVaultPCSContract } from 'hooks/useContract';
import BigNumber from 'bignumber.js';
import { BIG_TEN } from 'utils/bigNumber';
import { callWithEstimateGas } from 'utils/calls';
import { IABIType } from 'state/vault/types';
import { chainId, main_tokens } from 'config/constants/tokens';
import { chainKey } from 'config';

const useVaultWithdraw = (
  wantAddress: string,
  abiType: IABIType,
  account: string,
  contractAddress: string,
  decimal: number,
) => {
  const contractAddressContract = useAVaultPCSContract(contractAddress, abiType);

  const handleWithdraw = useCallback(
    async (amount: string) => {
      // const txHash =
      try {
        // const tx = await contract.withdraw(account, `${value}`, options);
        // const receipt = await tx.wait();
        // return receipt.status;
        // console.log({ amount });
        const value = new BigNumber(amount).times(BIG_TEN.pow(decimal)).toFixed(0);
        // console.log({ value });
        // const tx = await contract.withdraw(account, `${value}`, options);
        let res;
        if (wantAddress.toLowerCase() === main_tokens[chainKey.toLowerCase()].address[chainId].toLowerCase()) {
          res = await callWithEstimateGas(contractAddressContract, 'withdrawASTR', [account, `${value}`]);
        } else {
          res = await callWithEstimateGas(contractAddressContract, 'withdraw', [account, `${value}`]);
        }
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
    [contractAddressContract, account, decimal, wantAddress],
  );

  return { onWithdraw: handleWithdraw };
};

export default useVaultWithdraw;
