import { ChainId, CHAINKEY } from '@avault/sdk';
import { chainKey } from 'config';
import { IFarmProject, IABIType, ICompoundingConfigItem } from 'state/vault/types';
const compounding: ICompoundingConfigItem[] =
  chainKey === CHAINKEY.SDN
    ? [
        {
          lpSymbol: 'KAC-wSDN LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0x9A6080753a35dCd8e77102aE83A93170A831393e',
            [ChainId.SDN_MAINNET]: '0x9A6080753a35dCd8e77102aE83A93170A831393e',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink: 'https://shiden.kaco.finance/add/SDN/0xb12c13e66AdE1F72f71834f2FC5082Db8C091358',
        },

        {
          lpSymbol: 'wSDN-USDC LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0xc5b8D0eC15984653A7554878eE9b4212EA059Fd2',
            [ChainId.SDN_MAINNET]: '0xc5b8D0eC15984653A7554878eE9b4212EA059Fd2',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink: 'https://shiden.kaco.finance/add/0xfa9343c3897324496a05fc75abed6bac29f8a40f/SDN',
        },

        {
          lpSymbol: 'ETH-wSDN LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0x0Aaf347F50b766cA85dB70f9e2B0E178E9a16F4D',
            [ChainId.SDN_MAINNET]: '0x0Aaf347F50b766cA85dB70f9e2B0E178E9a16F4D',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink: 'https://shiden.kaco.finance/add/SDN/0x765277eebeca2e31912c9946eae1021199b39c61',
        },

        {
          lpSymbol: 'ETH-USDC LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0xCA9b609b7a0Bc46CcF744B2e0261B9Afd14f81C0',
            [ChainId.SDN_MAINNET]: '0xCA9b609b7a0Bc46CcF744B2e0261B9Afd14f81C0',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink:
            'https://shiden.kaco.finance/add/0xfa9343c3897324496a05fc75abed6bac29f8a40f/0x765277eebeca2e31912c9946eae1021199b39c61',
        },

        {
          lpSymbol: 'BUSD-USDC LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0x8fcbe72710185dd34a8bBBA1Cc05eB2628945FEC',
            [ChainId.SDN_MAINNET]: '0x8fcbe72710185dd34a8bBBA1Cc05eB2628945FEC',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink:
            'https://shiden.kaco.finance/add/0xfa9343c3897324496a05fc75abed6bac29f8a40f/0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a',
        },

        {
          lpSymbol: 'wSDN-JPYC LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0x5167E12139Ee4b2F6590F3C95E56B29d408a9048',
            [ChainId.SDN_MAINNET]: '0x5167E12139Ee4b2F6590F3C95E56B29d408a9048',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink: 'https://shiden.kaco.finance/add/SDN/0x735abe48e8782948a37c7765ecb76b98cde97b0f',
        },

        {
          lpSymbol: 'JPYC-USDC LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0x9d03BfE2e0BEDA103f1961A8595bF5d8b1F6FD18',
            [ChainId.SDN_MAINNET]: '0x9d03BfE2e0BEDA103f1961A8595bF5d8b1F6FD18',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink:
            'https://shiden.kaco.finance/add/0xfa9343c3897324496a05fc75abed6bac29f8a40f/0x735abe48e8782948a37c7765ecb76b98cde97b0f',
        },
      ]
    : [];
// aKKS deployed to: 0x9A6080753a35dCd8e77102aE83A93170A831393e
// aKSU deployed to: 0xc5b8D0eC15984653A7554878eE9b4212EA059Fd2
// aKES deployed to: 0x0Aaf347F50b766cA85dB70f9e2B0E178E9a16F4D
// aKEU deployed to: 0xCA9b609b7a0Bc46CcF744B2e0261B9Afd14f81C0
// aKBU deployed to: 0x8fcbe72710185dd34a8bBBA1Cc05eB2628945FEC
// aKSJ deployed to: 0x5167E12139Ee4b2F6590F3C95E56B29d408a9048
// aKJU deployed to: 0x9d03BfE2e0BEDA103f1961A8595bF5d8b1F6FD18

export default compounding;
