import { createSlice } from '@reduxjs/toolkit';
import { PriceState } from 'state/types';
const initialState: PriceState = {
  priceVsBusdMap: {},
};

export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setPrice: (state, action) => {
      // if (action.payload.address === '0xcdb32eed99aa19d39e5d6ec45ba74dc4afec549f') {
      //   console.log('oru: ', action.payload.num);
      // } else if (action.payload.address === '0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA'.toLocaleLowerCase()) {
      //   console.log('btc: ', action.payload.num);
      // }
      state.priceVsBusdMap[action.payload.address] = action.payload.num;
    },
  },
});

export const { setPrice } = priceSlice.actions;

export default priceSlice.reducer;
