import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state';
import { usePrice } from 'state/price/hooks';
import { CompoundingState, State } from 'state/types';
import { BIG_ZERO } from 'utils/bigNumber';
import {
  fetchCompoundingsPublicDataAsync,
  fetchCompoundingFarmUserDataAsync,
  changeLoading,
  changeVaultLoading,
} from './index';
import { ICompounding } from './types';
export const usePollCompoundingData = () => {
  const dispatch = useAppDispatch();
  const { priceVsBusdMap } = usePrice();
  const { data: compoundings } = useCompounding();
  useEffect(() => {
    dispatch(fetchCompoundingsPublicDataAsync({ priceVsBusdMap, compoundingsData: compoundings }));
    // eslint-disable-next-line
  }, [dispatch, priceVsBusdMap]);
};
export const useCompoundingUserData = (compoundings: ICompounding[]) => {
  // const { data: compoundings } = useCompounding();
  const { account } = useWeb3React();
  const [length, setLength] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (account && length !== compoundings.length) {
      dispatch(changeLoading());
      dispatch(changeVaultLoading());
      dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings }));
      setLength(compoundings.length);
    }
  }, [dispatch, account, compoundings]);
};
export const useCompounding = (): CompoundingState => {
  const compounding = useSelector((state: State) => state.compounding);
  return compounding;
};
// const useCompoundingPid = (pid: number) => {
//   const compounding = useSelector((state: State) => state.compounding.data.find((f) => f.farm.pid === pid));
//   return compounding;
// };
export const useCompoundingAllTotal = () => {
  const compounding = useSelector((state: State) => state.compounding);
  return compounding.allLiquidity;
};
export const useCompoundingFarmUser = (pid?: number) => {
  try {
    const compounding = useSelector((state: State) => state.compounding.data.find((f) => f.farm.pid === pid));
    // const { farm } = useCompoundingPid(pid);
    const { farm } = compounding;
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
