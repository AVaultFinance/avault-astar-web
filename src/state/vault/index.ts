import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CompoundingState } from 'state/types';
import compoundingsConfig from 'config/constants/compounding';
import fetchCompoundings from './fetchCompoundings';
import { ICompounding, ICompoundingUserData } from './types';
import {
  fetchCompoundingsFarmEarnings,
  fetchCompoundingsFarmStakedBalances,
  fetchCompoundingsFarmUserAllowances,
  fetchCompoundingsFarmUserTokenBalances,
  fetchCompoundingsUsers,
} from './fetchCompoundingUser';
import { haveNumber } from 'utils';
const initialState: CompoundingState = {
  data: [],
  allLiquidity: '',
  isUserLoaded: false,
  userDataLoaded: false,
};
export const fetchCompoundingsPublicDataAsync = createAsyncThunk<
  [ICompounding[], string],
  { priceVsBusdMap: Record<string, string> }
>('compounding/fetchCompoundingsPublicDataAsync', async ({ priceVsBusdMap }) => {
  const compoundings = await fetchCompoundings(compoundingsConfig, priceVsBusdMap);
  return compoundings;
});
export const fetchCompoundingFarmUserDataAsync = createAsyncThunk<
  ICompoundingUserData[],
  {
    account: string;
    compoundings: ICompounding[];
    index?: number;
  }
>('compounding/fetchCompoundingFarmUserDataAsync', async ({ account, compoundings, index }) => {
  const userCompoundingsFarmAllowances = await fetchCompoundingsFarmUserAllowances(account, compoundings, index);
  const userCompoundingsFarmTokenBalances = await fetchCompoundingsFarmUserTokenBalances(account, compoundings, index);
  const userCompoundingsStakedBalances = await fetchCompoundingsFarmStakedBalances(account, compoundings, index);
  const userCompoundingEarnings = await fetchCompoundingsFarmEarnings(account, compoundings, index);
  const [userCompoundingUsers, userCompoundingSupply, compoundingWantLockedTotal] = await fetchCompoundingsUsers(
    account,
    compoundings,
    index,
  );
  return userCompoundingsFarmAllowances.map((farmAllowance, _index) => {
    return {
      index: index,
      pid: compoundings[_index].farm.pid,
      allowance: farmAllowance,
      stakingTokenBalance: userCompoundingsFarmTokenBalances[_index],
      stakedBalance: userCompoundingsStakedBalances[_index],
      pendingReward: userCompoundingEarnings[_index],
      avaultAddressBalance: userCompoundingUsers[_index],
      userCompoundingSupply: userCompoundingSupply[_index],
      compoundingWantLockedTotal: compoundingWantLockedTotal[_index],
    };
  });
});
export const compoundingSlice = createSlice({
  name: 'Compounding',
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
    builder.addCase(fetchCompoundingsPublicDataAsync.fulfilled, (state, action) => {
      state.userDataLoaded = true;
      state.data = action.payload[0];
      state.allLiquidity = action.payload[1];
    });
    builder.addCase(fetchCompoundingFarmUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid, index: _index } = userDataEl;
        const index = haveNumber(_index)
          ? _index
          : state.data.findIndex((compounding: ICompounding) => compounding.farm.pid === pid);

        const lpToCLpRate =
          userDataEl.compoundingWantLockedTotal &&
          userDataEl.userCompoundingSupply &&
          Number(userDataEl.compoundingWantLockedTotal) > 0 &&
          Number(userDataEl.userCompoundingSupply) > 0
            ? (Number(userDataEl.compoundingWantLockedTotal) / Number(userDataEl.userCompoundingSupply)).toFixed(4)
            : '1';

        state.data[index] = {
          ...state.data[index],
          compounding: {
            ...state.data[index].compounding,
            totalSupply: userDataEl.userCompoundingSupply,
            wantLockedTotal: userDataEl.compoundingWantLockedTotal,
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
export const { changeLoading, changeVaultItemLoading, changeVaultLoading } = compoundingSlice.actions;

export default compoundingSlice.reducer;
