import { configureStore } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import { useDispatch } from 'react-redux';
import farmsReducer from './farms';
import vault from './vault';
import poolsReducer from './pools';
import predictionsReducer from './predictions';
import profileReducer from './profile';
import teamsReducer from './teams';
import achievementsReducer from './achievements';
import priceReducer from './price';
import blockReducer from './block';
import collectiblesReducer from './collectibles';
import votingReducer from './voting';
import lotteryReducer from './lottery';
import application from './application/reducer';
import { updateVersion } from './global/actions';
import user from './user/reducer';
import transactions from './transactions/reducer';
import swap from './swap/reducer';
import mint from './mint/reducer';
import lists from './lists/reducer';
import burn from './burn/reducer';
import multicall from './multicall/reducer';

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'price', 'lists', 'vault'];
// const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists'];
if (window.localStorage.getItem('redux_localstorage_simple_user')) {
  for (let i = 0; i < PERSISTED_KEYS.length; i++) {
    // DELET LOCAL
    // redux_localstorage_simple
    window.localStorage.removeItem(`redux_localstorage_simple_${PERSISTED_KEYS[i]}`);
  }
}

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    achievements: achievementsReducer,
    block: blockReducer,
    price: priceReducer,
    farms: farmsReducer,
    vault: vault,
    pools: poolsReducer,
    predictions: predictionsReducer,
    profile: profileReducer,
    teams: teamsReducer,
    collectibles: collectiblesReducer,
    voting: votingReducer,
    lottery: lotteryReducer,

    // Exchange
    application,
    user,
    transactions,
    swap,
    mint,
    burn,
    multicall,
    lists,
  },
  // middleware: [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS, namespace: 'v1' })],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(save({ states: PERSISTED_KEYS, namespace: 'v1' })),
  preloadedState: load({ states: PERSISTED_KEYS, namespace: 'v1.00' }),
});

store.dispatch(updateVersion());

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();

export default store;
