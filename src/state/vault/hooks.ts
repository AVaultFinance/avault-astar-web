import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { chainId } from 'config/constants/tokens';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state';
import { usePrice } from 'state/price/hooks';
import { VaultState, State } from 'state/types';
import { BIG_ZERO } from 'utils/bigNumber';
import { fetchVaultsPublicDataAsync, fetchVaultFarmUserDataAsync, changeLoading, changeVaultLoading } from './index';
import { IVault } from './types';
import { initialState } from 'state/vault/index';
import { useBlock } from 'state/block/hooks';
import vaultsConfig from 'state/vault/vaultsConfig';

export const usePollVaultData = () => {
  const dispatch = useAppDispatch();
  const { priceVsBusdMap } = usePrice();
  const { data: vaults } = useVault();
  const { account = '' } = useWeb3React();
  const { currentBlock } = useBlock();
  useEffect(() => {
    let _vaults = vaults;
    if (vaults.length !== vaultsConfig.length) {
      _vaults = initialState.data;
    }
    if (dispatch && priceVsBusdMap && Object.keys(priceVsBusdMap).length && currentBlock) {
      dispatch(fetchVaultsPublicDataAsync({ currentBlock, account, priceVsBusdMap, vaultsData: _vaults }));
    }
    // eslint-disable-next-line
  }, [dispatch, priceVsBusdMap, currentBlock]);
};
export const useVaultUserData = (vaults: IVault[]) => {
  // const { data: vaults } = useVault();
  const { account } = useWeb3React();
  const [length, setLength] = useState(0);
  const vaultData = useSelector((state: State) => {
    return state.vault.data;
  });
  const userData = (vaultData ?? [{}])[0]?.farm?.userData ?? {};
  const _userDataKey = `${account}-${chainId}`;
  const _userData = userData[_userDataKey] ?? {
    account: '',
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (account && length !== vaults.length) {
      dispatch(changeLoading());
      dispatch(fetchVaultFarmUserDataAsync({ account, vaults }));
      setLength(vaults.length);
    }
  }, [length, dispatch, account, vaults]);
  useEffect(() => {
    if (account && account !== _userData.account) {
      dispatch(changeVaultLoading({ isLoading: true }));
    }
  }, [_userData.account, account, dispatch]);
};
export const useVault = (): VaultState => {
  const vault = useSelector((state: State) => {
    return state.vault;
  });
  return vault;
};

export const useVaultAllTotal = () => {
  const vault = useSelector((state: State) => state.vault);
  return vault.tvlTotal;
};
export const useVaultFarmUser = (account: string, vaultAccount: string) => {
  try {
    const vault = useSelector((state: State) =>
      state.vault.data.find((f) => f.contractAddress[chainId].toLowerCase() === vaultAccount.toLowerCase()),
    );
    const { farm } = vault;

    const userData = farm.userData ?? {};
    const _userDataKey = `${account}-${chainId}`;
    const _userData = userData[_userDataKey] ?? {
      account: '',
      allowance: '0',
      stakingTokenBalance: '0',
      // stakedBalance: '0',
      // pendingReward: '0',
      avaultAddressBalance: '0',
    };
    return {
      allowance: new BigNumber(_userData.allowance),
      stakingTokenBalance: new BigNumber(_userData.stakingTokenBalance),
      // stakedBalance: new BigNumber(_userData.stakedBalance),
      // pendingReward: new BigNumber(_userData.pendingReward),
      avaultAddressBalance: new BigNumber(_userData.avaultAddressBalance),
    };
  } catch (e) {
    return {
      allowance: BIG_ZERO,
      stakingTokenBalance: BIG_ZERO,
      // stakedBalance: BIG_ZERO,
      // pendingReward: BIG_ZERO,
      avaultAddressBalance: BIG_ZERO,
    };
  }
};
export const useVaultData = () => {
  const vaultData = useSelector((state: State) => state.vault.data);
  return vaultData;
};
