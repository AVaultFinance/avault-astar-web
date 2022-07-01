import { ChainId } from '@my/sdk';
import { IFarmProject, IABIType, IVaultConfigItem } from 'state/vault/types';
const vault: IVaultConfigItem[] = [
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x6D88aE7C2b7117F065E5c3B641f2B1D0B23e8d1F',
      [ChainId.ASTR_TESTNET]: '0x6D88aE7C2b7117F065E5c3B641f2B1D0B23e8d1F',
    },
    // 2022-03-28 00:00:00
    fromSource: IFarmProject.arthswap, // from which swap
    abiType: IABIType.AVaultPCS, // use which abi
    swapLink:
      'https://app.arthswap.org/#/add/0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678/0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    online_at: 1648396800,
    lpDetail: {
      symbol: 'ARSW-wASTR LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0x50497E7181eB9e8CcD70a9c44FB997742149482a',
        [ChainId.ASTR_TESTNET]: '0x50497E7181eB9e8CcD70a9c44FB997742149482a',
      },
      decimals: 18,
    },
  },
];
// aAAA deployed to: 0xaD1a40d5EB5626359DF566a22cE2440E58C7d2AC

export default vault;
