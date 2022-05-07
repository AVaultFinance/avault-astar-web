import { ChainId } from '@my/sdk';
import { IABIType, IFarmProject, IVaultConfigItem } from 'state/vault/types';
import { chainId } from 'config/constants/tokens';
import { TokenPairImage } from 'components/TokenImage';
import { Button } from '@my/ui';
import styled from 'styled-components';

const avaultArr: IVaultConfigItem[] = [
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x9A6080753a35dCd8e77102aE83A93170A831393e',
      [ChainId.ASTR_TESTNET]: '0x9A6080753a35dCd8e77102aE83A93170A831393e',
    },
    fromSource: IFarmProject.kaco, // from which swap
    abiType: IABIType.AVaultPCS, // use which abi
    swapLink: 'https://shiden.kaco.finance/add/SDN/0xb12c13e66AdE1F72f71834f2FC5082Db8C091358',
    online_at: 1648396800,
    lpDetail: {
      symbol: 'KAC-wSDN LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
        [ChainId.ASTR_TESTNET]: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
      },
      decimals: 18,
    },
  },
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0xc5b8D0eC15984653A7554878eE9b4212EA059Fd2',
      [ChainId.ASTR_TESTNET]: '0xc5b8D0eC15984653A7554878eE9b4212EA059Fd2',
    },
    fromSource: IFarmProject.kaco, // from which swap
    abiType: IABIType.AVaultPCS, // use which abi
    swapLink: 'https://shiden.kaco.finance/add/0xfa9343c3897324496a05fc75abed6bac29f8a40f/SDN',
    online_at: 1648396800,
    lpDetail: {
      symbol: 'wSDN-USDC LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xdB9a42E1165bA2fc479e1f2C1ce939807dbe6020',
        [ChainId.ASTR_TESTNET]: '0xdB9a42E1165bA2fc479e1f2C1ce939807dbe6020',
      },
      decimals: 18,
    },
  },
  {
    contractAddress: {
      [ChainId.ASTR_MAINNET]: '0x0Aaf347F50b766cA85dB70f9e2B0E178E9a16F4D',
      [ChainId.ASTR_TESTNET]: '0x0Aaf347F50b766cA85dB70f9e2B0E178E9a16F4D',
    },
    fromSource: IFarmProject.kaco, // from which swap
    abiType: IABIType.AVaultPCS, // use which abi
    swapLink: 'https://shiden.kaco.finance/add/SDN/0x765277eebeca2e31912c9946eae1021199b39c61',
    online_at: 1648396800,
    lpDetail: {
      symbol: 'ETH-wSDN LP',
      address: {
        [ChainId.ASTR_MAINNET]: '0xeb2C6d3F1bbe9DA50A0272E80fAA89354630DE88',
        [ChainId.ASTR_TESTNET]: '0xeb2C6d3F1bbe9DA50A0272E80fAA89354630DE88',
      },
      decimals: 18,
    },
  },
];
const HomeTvl = () => {
  return (
    <HomeTvlStyled>
      <div className="text">
        <h2>0.00+</h2>
        <h3>AVAT TVL Amount</h3>
      </div>
      <ul>
        {avaultArr.map((v: IVaultConfigItem) => {
          return (
            <li key={v.contractAddress[chainId]} className="animate animate__animated" data-animate="animate__fadeInUp">
              <TokenPairImage
                variant="inverted"
                primaryToken={'0x3bfcae71e7d5ebc1e18313cecebcad8239aa386c'}
                secondaryToken={'0x65e66a61d0a8f1e686c2d6083ad611a10d84d97a'}
                width={60}
                height={60}
              />
              <div className="flex-middle">
                <h3>{v.lpDetail.symbol}</h3>
                <h4>{v.fromSource}</h4>
              </div>
              <ButtonStyled>
                0.00%
                <i>APY</i>
              </ButtonStyled>
            </li>
          );
        })}
      </ul>
    </HomeTvlStyled>
  );
};
const HomeTvlStyled = styled.div`
  padding: 130px 20px 0;
  max-width: 1208px;
  margin: 0 auto;
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 130px 0 0;
  }
  //
  .text {
    h2 {
      font-size: 80px;
      padding-bottom: 8px;
    }
    h3 {
      font-size: 20px;
    }
  }
  ul {
    // position: relative;
    margin-top: 110px;
    height: 108px;
    margin-bottom: 150px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      width: 480px;
      height: 108px;
      background: #030222;
      border: 1px solid #2e2d5b;
      box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
      border-radius: 20px;
      transition: all 0.2s ease;
      background-image: radial-gradient(circle at 50% 0%, #040222 0%, #040222 100%);
      background-position: 0 -120px;
      background-repeat: no-repeat;
      float: right;
      &:hover {
        background-image: radial-gradient(circle at 50% 0%, #3e255b 0%, #040222 100%);
        background-position: 0 0;
      }
      &:nth-child(1) {
        margin-top: -160px;
        margin-right: 160px;
      }

      &:nth-child(2) {
        // margin-left: 180px;
      }
      &:nth-child(3) {
        margin-right: 60px;
      }
      .flex-middle {
        margin-left: 12px;
        flex: 2;
        h3 {
          font-size: 20px;
        }
        h4 {
          font-size: 14px;
          color: #6a6991;
          line-height: 28px;
          font-weight: 600;
        }
      }
    }
  }
`;
const ButtonStyled = styled(Button)`
  font-size: 20px;
  background-image: linear-gradient(90deg, #a428d0 0%, #20d4a9 100%);
  i {
    font-size: 12px;
    font-style: normal;
    padding-top: 2px;
    padding-left: 6px;
  }
`;
export default HomeTvl;
