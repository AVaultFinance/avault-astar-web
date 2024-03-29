import BigNumber from 'bignumber.js';
import { DEFAULT_TOKEN_DECIMAL } from 'config';
import { IABIType } from 'state/vault/types';
import { BIG_TEN } from 'utils/bigNumber';

export const isNaNString = (num: string | number) => {
  if (`${num}` === 'NaN') {
    return '';
  }
  return `${num}`;
};
export const depositVaultUtil = async (contract, account: string, amount, decimal: number) => {
  const value = new BigNumber(amount).times(BIG_TEN.pow(decimal)).toString();
  const tx = await contract.deposit(account, `${value}`);
  const receipt = await tx.wait();
  return receipt.status;
};

export const withdrawVaultUtil = async (contract, account: string, amount, decimal: number) => {
  const value = parseInt(new BigNumber(amount).times(BIG_TEN.pow(decimal)).toString());
  // console.log({ amount, account, value, , decimal });
  const tx = await contract.withdraw(account, `${value}`);
  const receipt = await tx.wait();
  return receipt.status;
};

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString();
  const tx = await masterChefContract.withdraw(pid, value);
  const receipt = await tx.wait();
  return receipt.status;
};

export const harvestFarm = async (masterChefContract, pid) => {
  if (pid === 0) {
    const tx = await await masterChefContract.leaveStaking('0');
    const receipt = await tx.wait();
    return receipt.status;
  }

  const tx = await masterChefContract.deposit(pid, '0');
  const receipt = await tx.wait();
  return receipt.status;
};

const isSpecialLp = (lpSymbol: string): boolean => {
  return `${lpSymbol}`.indexOf('USD') > -1 || `${lpSymbol}`.indexOf('DOT') > -1 || `${lpSymbol}`.indexOf('BTC') > -1;
};

export const showDecimals = (lpSymbol: string, abiType?: IABIType): number => {
  if (abiType && abiType === IABIType.AVaultForStarlay) {
    if (
      lpSymbol.toLowerCase().indexOf('btc') > -1 ||
      lpSymbol.toLowerCase().indexOf('eth') > -1 ||
      lpSymbol.toLowerCase().indexOf('bnb') > -1
    ) {
      return 4;
    } else {
      return 2;
    }
  }
  if (isSpecialLp(lpSymbol)) {
    return 15;
  } else {
    return 6;
  }
};
export const showDecimalsWithType = (lpSymbol: string, abiType: IABIType, type: number): number => {
  if (type === 0) {
    return showDecimals(lpSymbol, abiType);
  } else {
    return 2;
  }
};
