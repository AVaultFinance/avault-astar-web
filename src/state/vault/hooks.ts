import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state';
import { usePrice } from 'state/price/hooks';
import { VaultState, State } from 'state/types';
import { BIG_ZERO } from 'utils/bigNumber';
import { fetchVaultsPublicDataAsync, fetchVaultFarmUserDataAsync, changeLoading, changeVaultLoading } from './index';
import { IVault } from './types';
export const usePollVaultData = () => {
  const dispatch = useAppDispatch();
  const { priceVsBusdMap } = usePrice();
  const { data: vaults } = useVault();
  useEffect(() => {
    dispatch(fetchVaultsPublicDataAsync({ priceVsBusdMap, vaultsData: vaults }));
    // eslint-disable-next-line
  }, [dispatch, priceVsBusdMap]);
};
export const useVaultUserData = (vaults: IVault[]) => {
  // const { data: vaults } = useVault();
  const { account } = useWeb3React();
  const [length, setLength] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (account && length !== vaults.length) {
      dispatch(changeLoading());
      dispatch(changeVaultLoading());
      dispatch(fetchVaultFarmUserDataAsync({ account, vaults }));
      setLength(vaults.length);
    }
  }, [length, dispatch, account, vaults]);
};
export const useVault = (): VaultState => {
  const vault = useSelector((state: State) => {
    return state.vault;
  });
  return vault;
};
// const useVaultPid = (pid: number) => {
//   const vault = useSelector((state: State) => state.vault.data.find((f) => f.farm.pid === pid));
//   return vault;
// };
export const useVaultAllTotal = () => {
  const vault = useSelector((state: State) => state.vault);
  return vault.allLiquidity;
};
export const useVaultFarmUser = (pid?: number) => {
  try {
    const vault = useSelector((state: State) => state.vault.data.find((f) => f.farm.pid === pid));
    // const { farm } = useVaultPid(pid);
    const { farm } = vault;
    return {
      allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
      stakingTokenBalance: farm.userData ? new BigNumber(farm.userData.stakingTokenBalance) : BIG_ZERO,
      stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
      pendingReward: farm.userData ? new BigNumber(farm.userData.pendingReward) : BIG_ZERO,
      avaultAddressBalance: farm.userData ? new BigNumber(farm.userData.avaultAddressBalance) : BIG_ZERO,
    };
  } catch (e) {
    return {
      allowance: BIG_ZERO,
      stakingTokenBalance: BIG_ZERO,
      stakedBalance: BIG_ZERO,
      pendingReward: BIG_ZERO,
      avaultAddressBalance: BIG_ZERO,
    };
  }
};
