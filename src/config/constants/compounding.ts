import { ChainId, CHAINKEY } from '@avault/sdk';
import { chainKey } from 'config';
import { IFarmProject, IABIType, ICompoundingConfigItem } from 'state/compounding/types';
const compounding: ICompoundingConfigItem[] =
  chainKey === CHAINKEY.SDN
    ? [
        {
          lpSymbol: 'KAC-wSDN LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0xABf1F913097e0d72a0BBF605d16DE22a6bBA4491',
            [ChainId.SDN_MAINNET]: '0xABf1F913097e0d72a0BBF605d16DE22a6bBA4491',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink: 'https://shiden.kaco.finance/add/SDN/0xb12c13e66AdE1F72f71834f2FC5082Db8C091358',
        },
      ]
    : [];

export default compounding;
