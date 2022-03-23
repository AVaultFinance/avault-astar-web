import { ChainId, CHAINKEY } from '@avault/sdk';
import { chainKey } from 'config';
import { IFarmProject, IABIType, ICompoundingConfigItem } from 'state/vault/types';
const compounding: ICompoundingConfigItem[] =
  chainKey === CHAINKEY.SDN
    ? [
        {
          lpSymbol: 'KAC-wSDN LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
            [ChainId.SDN_MAINNET]: '0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink: 'https://shiden.kaco.finance/add/SDN/0xb12c13e66AdE1F72f71834f2FC5082Db8C091358',
        },

        {
          lpSymbol: 'wSDN-USDC LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0xBb6F40E8739cC5b89A247AA54C612D7E3cc9AD2a',
            [ChainId.SDN_MAINNET]: '0xBb6F40E8739cC5b89A247AA54C612D7E3cc9AD2a',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink: 'https://shiden.kaco.finance/add/0xfa9343c3897324496a05fc75abed6bac29f8a40f/SDN',
        },

        {
          lpSymbol: 'ETH-wSDN LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0x3937C6f8120c206646bf616FF62eB2631D0D9d6A',
            [ChainId.SDN_MAINNET]: '0x3937C6f8120c206646bf616FF62eB2631D0D9d6A',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink: 'https://shiden.kaco.finance/add/SDN/0x765277eebeca2e31912c9946eae1021199b39c61',
        },

        {
          lpSymbol: 'ETH-USDC LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0x38325f901a698aF88D855f061d0FEA70825856c5',
            [ChainId.SDN_MAINNET]: '0x38325f901a698aF88D855f061d0FEA70825856c5',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink:
            'https://shiden.kaco.finance/add/0xfa9343c3897324496a05fc75abed6bac29f8a40f/0x765277eebeca2e31912c9946eae1021199b39c61',
        },

        {
          lpSymbol: 'BUSD-USDC LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0x85599937c68fD72D2eac2170009Bda288A79758a',
            [ChainId.SDN_MAINNET]: '0x85599937c68fD72D2eac2170009Bda288A79758a',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink:
            'https://shiden.kaco.finance/add/0xfa9343c3897324496a05fc75abed6bac29f8a40f/0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a',
        },

        {
          lpSymbol: 'wSDN-JPYC LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0x477033fD6A020c3D09AFE0B6341F813247AF70fa',
            [ChainId.SDN_MAINNET]: '0x477033fD6A020c3D09AFE0B6341F813247AF70fa',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink: 'https://shiden.kaco.finance/add/SDN/0x735abe48e8782948a37c7765ecb76b98cde97b0f',
        },

        {
          lpSymbol: 'JPYC-USDC LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0x7745d489DC858D07313Bc18Ba48930066C019590',
            [ChainId.SDN_MAINNET]: '0x7745d489DC858D07313Bc18Ba48930066C019590',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink:
            'https://shiden.kaco.finance/add/0xfa9343c3897324496a05fc75abed6bac29f8a40f/0x735abe48e8782948a37c7765ecb76b98cde97b0f',
        },
      ]
    : [];

// aKKS deployed to: 0x03065E84748a9e4a1AEbef15AC89da1Cdf18B202
// aKSU deployed to: 0xBb6F40E8739cC5b89A247AA54C612D7E3cc9AD2a
// aKES deployed to: 0x3937C6f8120c206646bf616FF62eB2631D0D9d6A
// aKEU deployed to: 0x38325f901a698aF88D855f061d0FEA70825856c5
// aKBU deployed to: 0x85599937c68fD72D2eac2170009Bda288A79758a
// aKSJ deployed to: 0x477033fD6A020c3D09AFE0B6341F813247AF70fa
// aKJU deployed to: 0x7745d489DC858D07313Bc18Ba48930066C019590

export default compounding;
