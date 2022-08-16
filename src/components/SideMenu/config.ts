import IconMarkets from './imgs/iconMarkets';
import IconMyWallet from './imgs/iconMyWallet';

export interface IMenu {
  text: string;
  link?: string;
  collapsed?: boolean;
  children?: IMenuDetail[] | undefined;
}
export interface IMenuDetail {
  text: string;
  link: string;
  img: any;
  detail: string;
}
export const NFTPathConfig: IMenuDetail[] = [
  {
    text: 'Markets',
    img: IconMarkets,
    link: '/nft/pools',
    detail: 'You can buy and sell your NFT at our KACO platform',
  },
  {
    text: 'My Wallet',
    img: IconMyWallet,
    link: '/nft/wallet',
    detail: 'All of your NFT assets are in your KACO wallet',
  },
];
export const MorePathConfig: IMenuDetail[] = [
  {
    text: 'Audited By Certik',
    img: IconMarkets,
    link: 'https://www.certik.com/projects/kaco',
    detail: 'The KACO platform has been officially audited by Certik',
  },
  {
    text: 'Receive NFT in Galaxy',
    img: IconMyWallet,
    link: 'https://galaxy.eco/KACO',
    detail: 'All KACO NFT works can be freely traded on the Galaxy platform at the same time',
  },
];
export const ALPPathConfig: IMenuDetail[] = [
  {
    text: 'Sirius Finance',
    img: '/images/Sirius.svg',
    link: 'https://pre-production-siriusfi.vercel.app/#/pools',
    detail: 'Stable swap AMM',
  },
  {
    text: 'Kagla Finance',
    img: '/images/Kagla.svg',
    link: 'https://kagla.finance/app/pools',
    detail: 'Stable swap AMM',
  },
];
const avaultMenuItems: IMenu[] = [
  {
    text: 'Vault',
    link: '/vault',
  },
  {
    text: 'Zap',
    link: '/zap',
  },
  // {
  //   text: 'aLP/aToken',
  //   collapsed: true,
  //   link: '#',
  //   children: ALPPathConfig,
  // },
  // {
  //   text: 'NFT',
  //   link: '/zap',
  // },
  // {
  //   text: 'Farm',
  //   link: '/farms',
  // },
  // {
  //   text: 'Stake',
  //   link: '/stake',
  // },
];
export const menuItemsDefault = avaultMenuItems;
