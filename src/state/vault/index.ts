import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VaultState } from 'state/types';
import vaultsConfig from 'config/constants/vault';
import fetchVaults from './fetchVaults';
import { IVault, IVaultConfigItem, IVaultUserData } from './types';
import {
  fetchVaultsFarmEarnings,
  fetchVaultsFarmStakedBalances,
  fetchVaultsFarmUserAllowances,
  fetchVaultsFarmUserTokenBalances,
  fetchVaultsUsers,
} from './fetchVaultUser';
import { haveNumber } from 'utils';
const initialState: VaultState = {
  data: vaultsConfig.map((v: IVaultConfigItem) => {
    return {
      ...v,
      vault: {
        symbol: '',
        name: '',
        masterChef: '',
        AVAAddress: '',
        token0Address: '',
        token1Address: '',
        fromSource: v.fromSource,
        wantAddress: '',
        earnedAddress: '',
        wantLockedTotal: '',
        totalSupply: '',
        decimals: 18,
      },
      farm: {
        pid: 0,
        lpSymbol: '',
        lpAddresses: '',
        tokenAmountMc: '',
        token: '',
        quoteToken: '',
        quoteTokenAmountMc: '',
        tokenAmountTotal: '',
        quoteTokenAmountTotal: '',
        lpTotalInQuoteToken: '',
        lpTotalSupply: '',
        tokenPriceVsQuote: '',
        poolWeight: '',
        multiplier: '',
        quoteTokenDecimals: 18,
        lpAddressDecimals: 18,
      },
      isLoading: false,
    };
  }),
  allLiquidity: '',
  isUserLoaded: false,
  userDataLoaded: false,
};
export const fetchVaultsPublicDataAsync = createAsyncThunk<
  [IVault[], string],
  {
    priceVsBusdMap: Record<string, string>;
    vaultsData: IVault[];
  }
>('vault/fetchVaultsPublicDataAsync', async ({ priceVsBusdMap, vaultsData }) => {
  const vaults = await fetchVaults(vaultsConfig, priceVsBusdMap, vaultsData);
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
  const userVaultsFarmAllowances = await fetchVaultsFarmUserAllowances(account, vaults, index);
  const userVaultsFarmTokenBalances = await fetchVaultsFarmUserTokenBalances(account, vaults, index);
  const userVaultsStakedBalances = await fetchVaultsFarmStakedBalances(account, vaults, index);
  const userVaultEarnings = await fetchVaultsFarmEarnings(account, vaults, index);
  const [userVaultUsers, userVaultSupply, vaultWantLockedTotal] = await fetchVaultsUsers(account, vaults, index);
  return userVaultsFarmAllowances.map((farmAllowance, _index) => {
    return {
      index: index,
      pid: vaults[_index].farm.pid,
      allowance: farmAllowance,
      stakingTokenBalance: userVaultsFarmTokenBalances[_index],
      stakedBalance: userVaultsStakedBalances[_index],
      pendingReward: userVaultEarnings[_index],
      avaultAddressBalance: userVaultUsers[_index],
      userVaultSupply: userVaultSupply[_index],
      vaultWantLockedTotal: vaultWantLockedTotal[_index],
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
      console.log(action.payload.index);
      try {
        const index = action.payload.index;
        state.data[index].isLoading = true;
      } catch (e) {
        console.log(e);
      }
    },
    changeVaultLoading: (state) => {
      if (state.isUserLoaded) {
        return;
      }
      for (let i = 0; i < state.data.length; i++) {
        state.data[i].isLoading = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVaultsPublicDataAsync.fulfilled, (state, action) => {
      state.userDataLoaded = true;
      state.data = action.payload[0];
      state.allLiquidity = action.payload[1];
    });
    builder.addCase(fetchVaultFarmUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid, index: _index } = userDataEl;
        const index = haveNumber(_index) ? _index : state.data.findIndex((vault: IVault) => vault.farm.pid === pid);
        const vaultWantLockedTotal = userDataEl.vaultWantLockedTotal
          ? userDataEl.vaultWantLockedTotal
          : state.data[index]?.vault?.wantLockedTotal;
        const userVaultSupply = userDataEl.userVaultSupply
          ? userDataEl.userVaultSupply
          : state.data[index]?.vault?.totalSupply;
        const lpToCLpRate =
          vaultWantLockedTotal && userVaultSupply && Number(vaultWantLockedTotal) > 0 && Number(userVaultSupply) > 0
            ? (Number(vaultWantLockedTotal) / Number(userVaultSupply)).toFixed(4)
            : '1';

        state.data[index] = {
          ...state.data[index],
          vault: {
            ...state.data[index].vault,
            totalSupply: userDataEl.userVaultSupply,
            wantLockedTotal: userDataEl.vaultWantLockedTotal,
            lpToCLpRate: lpToCLpRate,
          },
          farm: {
            ...state.data[index].farm,
            userData: userDataEl,
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
