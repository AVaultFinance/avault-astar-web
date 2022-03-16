import { ChainId, CHAINKEY } from '@avault/sdk';
import { chainKey } from 'config';
import { IFarmProject, IABIType, ICompoundingConfigItem } from 'state/compounding/types';
const compounding: ICompoundingConfigItem[] =
  chainKey === CHAINKEY.SDN
    ? [
        {
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0xFB6Ae2A33e95C21d06A583D762BAfEC0F4967403',
            [ChainId.SDN_MAINNET]: '0xFB6Ae2A33e95C21d06A583D762BAfEC0F4967403',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink: 'https://shiden.kaco.finance',
        },
      ]
    : [];

export default compounding;
