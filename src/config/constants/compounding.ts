import { ChainId, CHAINKEY } from '@avault/sdk';
import { chainKey } from 'config';
import { IFarmProject, IABIType, ICompoundingConfigItem } from 'state/compounding/types';
const compounding: ICompoundingConfigItem[] =
  chainKey === CHAINKEY.SDN
    ? [
        {
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0xcd6b723AFF8F57D01FE2FFD17B72f27c2A8398D7',
            [ChainId.SDN_MAINNET]: '0xcd6b723AFF8F57D01FE2FFD17B72f27c2A8398D7',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
        },
      ]
    : [];

export default compounding;
