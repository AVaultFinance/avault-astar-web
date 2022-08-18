import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VaultState } from 'state/types';
import { IVault, IVaultConfigItem, IVaultUserData } from './types';

import { haveNumber } from 'utils';
import { chainId } from 'config/constants/tokens';
// import fetchVaults from './fetchVaults';
import fetchVaultsV2 from './fetchVaultsV2';
import vaultsConfig from 'state/vault/vaultsConfig';
import {
  fetchVaultsFarmEarnings,
  fetchVaultsFarmStakedBalances,
  fetchVaultsFarmUserAllowances,
  fetchVaultsFarmUserTokenBalances,
  fetchVaultsUsersV2,
} from './fetchVaultUserV2';

export const initialState: VaultState = {
  data: vaultsConfig.map((v: IVaultConfigItem) => {
    return {
      ...v,
      vault: {
        ...v.vault,
        wantLockedTotal: '',
        totalSupply: '',
      },
      farm: {
        ...v.farm,
        tokenAmountMc: '',
        quoteTokenAmountMc: '',
        tokenAmountTotal: '',
        quoteTokenAmountTotal: '',
        lpTotalInQuoteToken: '',
        lpTotalSupply: '',
        tokenPriceVsQuote: '',
        poolWeight: '',
        multiplier: '',
      },
      isLoading: false,
    };
  }),
  tvlTotal: '',
  isUserLoaded: false,
  userDataLoaded: false,
};
export const fetchVaultsPublicDataAsync = createAsyncThunk<
  [IVault[], string],
  {
    currentBlock: number;
    account: string;
    priceVsBusdMap: Record<string, string>;
    vaultsData: IVault[];
  }
>('vault/fetchVaultsPublicDataAsync', async ({ currentBlock, priceVsBusdMap, vaultsData }) => {
  const vaults = await fetchVaultsV2(currentBlock, priceVsBusdMap, vaultsData);
  return vaults;
});
export const fetchVaultFarmUserDataAsync = createAsyncThunk<
  IVaultUserData[],
  {
    account: string;
    vaults: IVault[];
    index?: number;
  }
>('vault/fetchVaultFarmUserDataAsync', async ({ account, vaults, index }) => {
  console.log(1);
  const userVaultsFarmAllowances = await fetchVaultsFarmUserAllowances(account, vaults, index);
  console.log(2);
  const userVaultsFarmTokenBalances = await fetchVaultsFarmUserTokenBalances(account, vaults, index);
  console.log(3);
  const userVaultsStakedBalances = await fetchVaultsFarmStakedBalances(account, vaults, index);
  console.log(4);
  const userVaultEarnings = await fetchVaultsFarmEarnings(account, vaults, index);
  console.log(5);
  const [userVaultUsers] = await fetchVaultsUsersV2(account, vaults, index);
  console.log(6);
  return userVaultsFarmAllowances.map((farmAllowance, _index) => {
    return {
      vaultAccount: vaults[_index].contractAddress[chainId],
      index: index,
      account: account,
      allowance: farmAllowance,
      stakingTokenBalance: userVaultsFarmTokenBalances[_index],
      stakedBalance: userVaultsStakedBalances[_index],
      pendingReward: userVaultEarnings[_index],
      avaultAddressBalance: userVaultUsers[_index],
    };
  });
});
export const vaultSlice = createSlice({
  name: 'Vault',
  initialState,
  reducers: {
    changeLoading: (state) => {
      state.userDataLoaded = false;
    },
    changeVaultItemLoading: (state, action) => {
      // state.userDataLoaded = false;
      try {
        const index = action.payload.index;
        state.data[index].isLoading = true;
      } catch (e) {
        console.log(e);
      }
    },
    changeVaultLoading: (state, action) => {
      if (action.payload.isLoading) {
        for (let i = 0; i < state.data.length; i++) {
          state.data[i].isLoading = true;
        }
      } else {
        if (state.isUserLoaded) {
          return;
        }
        for (let i = 0; i < state.data.length; i++) {
          state.data[i].isLoading = true;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVaultsPublicDataAsync.fulfilled, (state, action) => {
      state.userDataLoaded = true;
      state.data = action.payload[0].map((v) => {
        return {
          ...v,
          isLoading: false,
        };
      });
      state.tvlTotal = action.payload[1];
    });
    builder.addCase(fetchVaultFarmUserDataAsync.pending, (state, action) => {
      // changeLoading();
    });
    builder.addCase(fetchVaultFarmUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { vaultAccount, index: _index, account } = userDataEl;
        const index = haveNumber(_index)
          ? _index
          : state.data.findIndex(
              (vault: IVault) => vault.contractAddress[chainId].toLowerCase() === vaultAccount.toLowerCase(),
            );
        state.data[index] = {
          ...state.data[index],
          vault: {
            ...state.data[index]?.vault,
          },
          farm: {
            ...state.data[index].farm,
            userData: {
              ...state.data[index].farm.userData,
              [`${account}-${chainId}`]: userDataEl,
            },
          },
          isLoading: false,
        };
      });
      state.userDataLoaded = true;
      state.isUserLoaded = true;
    });
  },
});
// Actions
export const { changeLoading, changeVaultItemLoading, changeVaultLoading } = vaultSlice.actions;

export default vaultSlice.reducer;
