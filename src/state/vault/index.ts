import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VaultState } from 'state/types';
import { IVault, IVaultConfigItem, IVaultUserData } from './types';
import {
  fetchVaultsFarmEarnings,
  fetchVaultsFarmStakedBalances,
  fetchVaultsFarmUserAllowances,
  fetchVaultsFarmUserTokenBalances,
  fetchVaultsUsers,
} from './fetchVaultUser';
import { haveNumber } from 'utils';
import { chainId } from 'config/constants/tokens';
import fetchVaultsV2 from './fetchVaultsV2';
import vaultsConfig from 'state/vault/vaultsConfig';

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
>('vault/fetchVaultsPublicDataAsync', async ({ currentBlock, account, priceVsBusdMap, vaultsData }) => {
  const vaults = await fetchVaultsV2(currentBlock, account, vaultsConfig, priceVsBusdMap, vaultsData);
  // const vaults = await fetchVaults(currentBlock, account, vaultsConfig, priceVsBusdMap, vaultsData);
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
      account: account,
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
        const { pid, index: _index, account } = userDataEl;
        const index = haveNumber(_index) ? _index : state.data.findIndex((vault: IVault) => vault.farm.pid === pid);
        const vaultWantLockedTotal = userDataEl.vaultWantLockedTotal
          ? userDataEl.vaultWantLockedTotal
          : state.data[index]?.vault?.wantLockedTotal;
        const userVaultSupply = userDataEl.userVaultSupply
          ? userDataEl.userVaultSupply
          : state.data[index]?.vault?.totalSupply;
        const lpToCLpRate =
          vaultWantLockedTotal && userVaultSupply && Number(vaultWantLockedTotal) > 0 && Number(userVaultSupply) > 0
            ? (Number(vaultWantLockedTotal) / Number(userVaultSupply)).toFixed(18)
            : '1';
        // const currentSeconds = Math.floor(Date.now() / 1000);
        // 86400s/day
        // const data = Math.ceil((currentSeconds - state.data[index]?.online_at) / 86400) - 1;
        // state.data[index]?.online_at
        // const kacRewardsApr = (Number(lpToCLpRate) - 1) / data + 1;
        // const kacRewardApy = new BigNumber(kacRewardsApr).pow(365).times(100).minus(100).toFixed(2);

        // const kacRewardsApr = (Number(lpToCLpRate) - 1) / data;
        // const kacRewardApy = new BigNumber(kacRewardsApr).times(365).times(100).toFixed(2);

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
