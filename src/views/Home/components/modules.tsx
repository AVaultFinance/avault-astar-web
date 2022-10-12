import styled from 'styled-components';

const modulesArr = [
  {
    logo: './images/home/icon_cross.webp',
    title: 'Cross-chain Protocol Interoperate',
    content:
      "Users can use different chain's dapp and manage their assets in Avault without switch the network and different gas fee required",
  },
  {
    logo: './images/home/icon_vault.webp',
    title: 'Vault',
    content:
      'Helping users to cross-chain auto-compounding their revenue and providing interest-bearing asset(aLP/aToken) to the users to unlock their asset liquidity.',
  },
  {
    logo: './images/home/icon_farm.webp',
    title: 'Farm',
    content:
      'The biggest difference between cross-chain farm and traditional farm is that one emission rate can be used for multiple chains; while traditional farm is one emission rate that can only be used for one chain. Then, if we want to support 10 chains based on the traditional multichain requirements, we have to divide the rewards into 10 parts, and then formulate a corresponding rule for each chain.',
  },

  {
    logo: './images/home/icon_zap.webp',
    title: 'Zap',
    content:
      'Allow a user to directly switch from single asset to an LP token in one click without the chain limit. e.g: User A can directly switch his USDC on BNB chain to USDT-ETH LP on Arbitrum in one click',
  },
  {
    logo: './images/home/icon_governance.webp',
    title: 'Governance',
    content:
      'You can stake your $AVAT to get veAVAT. The number of veAVAT you get will depend on how long you choose to lock. Longer will be more. veAVAT will represent your share in the governance reward pool and your voting rights on upcoming governance features.',
  },
];
const HomeModules = () => {
  return (
    <HomeModulesStyled>
      <HomeModulesStyledInner>
        <h2>Main Cross-chain Modules</h2>
        <ul className="animate animate__animated" data-animate="animate__show">
          {modulesArr.map((v) => {
            return (
              <li key={v.logo} className="animate animate__animated" data-animate="animate__fadeInUp">
                <img src={v.logo} alt={v.title} />
                <h4>{v.title}</h4>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </HomeModulesStyledInner>
    </HomeModulesStyled>
  );
};
const HomeModulesStyledInner = styled.div`
  max-width: 1208px;
  background-image: url('./images/stake/bg_element.svg');
  background-repeat: no-repeat;
  background-size: 220px;
  background-position: right 60px;
  margin: 0 auto;
  padding: 0 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    background-size: 420px;
    background-position: right 120px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 0;
  }
`;
const HomeModulesStyled = styled.div`
  background-image: url('./images/home/modules_bg.webp');
  background-size: 100% 120%;
  background-position: top center;
  background-repeat: no-repeat;
  ${({ theme }) => theme.mediaQueries.md} {
    background-size: 100% 138%;
  }
  .animate__show {
    li {
      &:nth-child(1) {
        animation: slide-left 1s ease-in-out;
        animation-fill-mode: forwards;
        ${({ theme }) => theme.mediaQueries.md} {
          width: 34%;
        }
      }
      &:nth-child(2) {
        animation: slide-left 0.4s ease-in-out;
        animation-fill-mode: forwards;
        animation-delay: 0.5s;
      }
      &:nth-child(3) {
        animation: slide-left 0.4s ease-in-out;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }
      &:nth-child(4) {
        animation: slide-left 0.4s ease-in-out;
        animation-fill-mode: forwards;
        animation-delay: 1.5s;
      }
      &:nth-child(5) {
        animation: slide-left 0.4s ease-in-out;
        animation-fill-mode: forwards;
        animation-delay: 2s;
      }
    }
  }
  h2 {
    font-size: 48px;
    text-align: center;
    padding: 60px 0 25px;
    position: relative;
    z-index: 2;
    font-weight: 800;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 80px;
      line-height: 84px;
      text-align: left;
      width: 80%;
      padding: 200px 0 120px;
    }
  }
  ul {
    padding-bottom: 80px;
    clear: both;
    overflow: hidden;
    max-width: 1200px;
    li {
      opacity: 0;
      border-radius: 20px;
      width: 100%;
      margin-top: 16px;
      float: left;
      color: #fff;
      ${({ theme }) => theme.mediaQueries.sm} {
        width: 48%;
        height: 400px;
        &:nth-child(2n + 1) {
          margin-right: 2%;
        }
      }
      ${({ theme }) => theme.mediaQueries.md} {
        margin-top: 40px;
        justify-content: space-between;
        width: 31%;
        transition: all 0.5s ease;
        height: 500px;
      }

      img {
        width: 50px;
        display: block;
        margin: 20px auto 0;

        ${({ theme }) => theme.mediaQueries.sm} {
          margin: 0;
          width: 60px;
        }
      }
      div {
        margin-left: 0;
        width: 100%;
        ${({ theme }) => theme.mediaQueries.md} {
          width: 95%;
        }
      }
      h4 {
        display: block;
        font-size: 30px;
        margin-top: 40px;
        margin-bottom: 30px;
        text-align: center;
        ${({ theme }) => theme.mediaQueries.sm} {
          text-align: left;
          margin-top: 60px;
          margin-bottom: 40px;
        }
        ${({ theme }) => theme.mediaQueries.md} {
          margin-top: 80px;
          margin-bottom: 50px;
          display: none;
        }
      }
      h3 {
        transition: all 0.2s ease;
        font-size: 24px;
        display: none;
        margin-top: 80px;
        margin-bottom: 50px;
        font-weight: 700;
        ${({ theme }) => theme.mediaQueries.md} {
          display: block;
        }
        ${({ theme }) => theme.mediaQueries.lg} {
          font-size: 36px;
        }
      }
      p {
        transition: all 0.2s ease;
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        ${({ theme }) => theme.mediaQueries.sm} {
          text-align: left;
        }
      }
      &:nth-child(1) {
        h3 {
          margin-bottom: 15px;
        }
        div {
          width: 100%;
        }
      }
    }
  }
`;
export default HomeModules;
