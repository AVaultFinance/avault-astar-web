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
    <HomeTvlStyled className="animate animate__animated" data-animate="animate__show">
      <div className="text">
        <h2>0.00+</h2>
        <h3>AVAT TVL Amount</h3>
      </div>
      <div className="scroll">
        <ul>
          {avaultArr.map((v: IVaultConfigItem) => {
            return (
              <li
                key={v.contractAddress[chainId]}
                className="animate animate__animated"
                data-animate="animate__fadeInUp"
              >
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
      </div>
    </HomeTvlStyled>
  );
};

const HomeTvlStyled = styled.div`
  padding: 60px 0 0;
  max-width: 1208px;
  margin: 0 auto;
  border-bottom: 1px solid #2e2d5b;
  ${({ theme }) => theme.mediaQueries.md} {
    border-bottom: none;
    padding: 130px 20px 0;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 130px 0 0;
  }
  &.animate__show {
    ul {
      li {
        &:nth-child(1) {
          animation: slide-up 1s ease-in-out;
          animation-fill-mode: forwards;
        }
        &:nth-child(2) {
          animation: slide-up 0.4s ease-in-out;
          animation-fill-mode: forwards;
          animation-delay: 0.4s;
        }
        &:nth-child(3) {
          animation: slide-up 0.4s ease-in-out;
          animation-fill-mode: forwards;
          animation-delay: 1s;
        }
      }
    }
  }
  //
  .text {
    padding: 0 40px;
    h2 {
      font-size: 48px;
      padding-bottom: 12px;
      ${({ theme }) => theme.mediaQueries.md} {
        font-size: 80px;
        padding-bottom: 8px;
      }
    }
    h3 {
      font-size: 16px;
      ${({ theme }) => theme.mediaQueries.md} {
        font-size: 20px;
      }
    }
  }
  .scroll {
    overflow-x: auto;
    padding-left: 20px;
    ${({ theme }) => theme.mediaQueries.md} {
      overflow-x: inherit;
      padding-left: 0;
    }
  }
  ul {
    height: 180px;
    margin-top: 40px;
    margin-bottom: 60px;
    width: 770px;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 100%;
      height: 108px;
      margin-top: 110px;
      margin-bottom: 150px;
    }
    li {
      opacity: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      width: 240px;
      height: 180px;
      background: #030222;
      border: 1px solid #2e2d5b;
      box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
      border-radius: 20px;
      transition: all 0.2s ease;
      background-repeat: no-repeat;
      float: left;
      background-image: radial-gradient(circle at 50% 0%, #3e255b 0%, #181733 100%);
      background-position: 0 0;
      margin-right: 12px;
      flex-wrap: wrap;
      ${({ theme }) => theme.mediaQueries.md} {
        float: right;
        width: 480px;
        height: 108px;
        background-image: radial-gradient(circle at 50% 0%, #040222 0%, #040222 100%);
        background-position: 0 -120px;
        padding: 0 30px;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        &:hover {
          background-image: radial-gradient(circle at 50% 0%, #3e255b 0%, #040222 100%);
          background-position: 0 0;
        }
        &:nth-child(1) {
          margin-top: -160px;
          margin-right: 160px;
        }
        &:nth-child(2) {
          margin-right: 0;
        }
        &:nth-child(3) {
          margin-right: 60px;
        }
      }
      .flex-middle {
        width: 60%;
        display: line-block;
        ${({ theme }) => theme.mediaQueries.md} {
          margin-left: 12px;
          flex: 2;
        }
        h3 {
          font-size: 16px;
          ${({ theme }) => theme.mediaQueries.md} {
            font-size: 20px;
          }
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
  margin-top: -40px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0;
  }
  i {
    font-size: 12px;
    font-style: normal;
    padding-top: 2px;
    padding-left: 6px;
  }
`;
export default HomeTvl;
