import { ContextApi } from 'contexts/Localization/types';
import { PageMeta } from './types';

export const DEFAULT_META: PageMeta = {
  title: 'Avault',
  description:
    'The most popular AMM on BSC by user count! Earn KAC through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by Avault), NFTs, and more, on a platform you can trust.',
  image: 'https://kaco.finance/images/hero.png',
};

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `Vault | Avault`,
      };
    case '/vault':
      return {
        title: `Vault | Avault`,
      };
    case '/farms':
      return {
        title: `Farms | Avault`,
      };
    case '/stake':
      return {
        title: `Stake | Avault`,
      };
    case '/zap':
      return {
        title: `Zap | Avault`,
      };
    default:
      return null;
  }
};
export const routePath = {
  home: {
    path: '/',
    text: '',
    title: 'Avault | Avault',
  },
  vault: {
    path: '/multi/vault',
    text: 'Vault',
    title: 'Multi Vault | Avault',
  },
  vault_trade_deposit: {
    pathPre: '/multi/vault/trade/deposit',
    path: '/multi/vault/trade/deposit/:vaultChain/:contract_address',
    text: 'Vault Trade',
    title: 'Multi Vault Trade | Avault',
  },
  vault_trade_withdraw: {
    pathPre: '/multi/vault/trade/withdraw',
    path: '/multi/vault/trade/withdraw/:vaultChain/:contract_address',
    text: 'Vault Trade',
    title: 'Multi Vault Trade | Avault',
  },
  trade_withdraw: {
    pathPre: '/trade/withdraw',
    path: '/trade/withdraw/:safeContractAddress/:fromchain/:fromtoken',
    text: 'Trade Withdraw',
    title: 'Trade Withdraw | Avault',
  },
  claim: {
    pathPre: '/multi/vault/trade/claim',
    path: '/multi/vault/trade/claim/:vaultChain/:contract_address',
    text: 'Trade Claim',
    title: 'Trade Claim | Avault',
  },

  airdrop: {
    path: '/multi/airdrop',
    text: 'Airdrop',
    title: 'Trade Airdrop | Avault',
  },
  airdrop_arbitrum: {
    pathPre: '/multi/airdrop',
    path: '/multi/airdrop/:id',
    text: 'Trade Airdrop Arbitrum',
    title: 'Trade Airdrop Arbitrum| Avault',
  },

  vault_transaction_list: {
    path: '/multi/transaction/list',
    text: 'Vault Transaction List',
    title: 'Transaction List | Avault',
  },

  // vault_transaction_list_detail: {
  //   pathPre: '/multi/transaction/list',
  //   path: '/multi/transaction/list/:fromtx',
  //   text: 'Vault Transaction List Detail',
  //   title: 'Transaction List | Avault',
  // },
};
