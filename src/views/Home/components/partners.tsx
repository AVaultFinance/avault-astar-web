import { STATIC_BASE_URL } from 'config';
import styled from 'styled-components';

export const partnersArr = [
  {
    icon: 'Astar.svg',
    name: 'astar'.toUpperCase(),
    link: 'https://astar.network/',
  },
  {
    icon: 'Next Web.svg',
    name: 'Next Web'.toUpperCase(),
    link: 'https://nextweb.capital/',
  },
  {
    icon: 'Cogitent.svg',
    name: 'Cogitent'.toUpperCase(),
    link: 'https://cogitent.ventures/',
  },
  {
    icon: 'GTS VENTURES.svg',
    name: 'GTS VENTURES'.toUpperCase(),
    link: 'https://gts.ventures/',
  },
  {
    icon: 'Microsoft.svg',
    name: 'Microsoft'.toUpperCase(),
    link: '',
  },
  {
    icon: 'Stargate_Logo_Full.svg',
    name: 'Stargate'.toUpperCase(),
    link: 'https://stargate.finance/',
  },
  {
    icon: 'Peckshield.svg',
    name: 'Peckshield'.toUpperCase(),
    link: 'https://peckshield.com/',
  },
  // {
  //   icon: 'Bwarelabs.svg',
  //   name: 'BwareLabs'.toUpperCase(),
  //   link: 'https://bwarelabs.com/',
  // },
  {
    icon: 'Arthswap_wh.svg',
    name: 'Arthswap'.toUpperCase(),
    link: 'https://app.arthswap.org/#/swap',
  },
  {
    icon: 'Unstoppabledomain.svg',
    name: 'Unstoppabledomain'.toUpperCase(),
    link: 'https://unstoppabledomains.com/',
  },
  {
    icon: 'Talisman.svg',
    name: 'Talisman'.toUpperCase(),
    link: 'https://talisman.xyz/',
  },

  // Arthswap: https://app.arthswap.org/#/swap
  // BwareLabs: https://bwarelabs.com/
  // Stargate: https://stargate.finance/
  // Unstoppabledomain: https://unstoppabledomains.com/
  // Talisman: https://talisman.xyz/

  {
    icon: `Sirius.svg`,
    name: 'Sirius'.toUpperCase(),
    link: 'https://www.sirius.finance/',
  },

  {
    icon: `Astriddao.svg`,
    name: 'Astriddao'.toUpperCase(),
    link: 'https://astriddao.xyz/',
  },
];

const HomePartners = () => {
  return (
    <HomePartnersStyled className="partner animate animate__animated" data-animate="animate__show">
      <h2>Partners</h2>
      <ul>
        {partnersArr.map((v, index) => {
          return (
            <LiStyled key={index} index={index} className={v.name === 'BwareLabs'.toUpperCase() ? 'BwareLabs' : ''}>
              <a href={v.link} target="_blank" rel="noreferrer" title={v.name}>
                <img src={`${STATIC_BASE_URL}/images/home/partner_on/${v.icon}`} alt={v.name} />
              </a>
            </LiStyled>
          );
        })}
        <li className="null"></li>
        <li className="null"></li>
      </ul>
    </HomePartnersStyled>
  );
};
const LiStyled = styled.li<{ index: number }>`
  animation-delay: ${({ index }) => 0.2 * index}s;
  &.BwareLabs {
    padding: 2.5%;
  }
`;
const HomePartnersStyled = styled.div`
  padding: 0 20px;
  ${({ theme }) => theme.mediaQueries.xl} {
    max-width: 1208px;
    margin: 0 auto;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 20px 0 100px;
  }
  &.animate__show {
    li {
      animation-duration: 1s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: 1;
      animation-direction: normal;
      animation-fill-mode: forwards;
      animation-play-state: running;
      animation-name: slide-up;
      animation-fill-mode: forwards;
    }
  }

  h2 {
    padding: 60px 20px;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
    ${({ theme }) => theme.mediaQueries.md} {
      padding: 160px 120px;
      font-size: 80px;
    }
  }

  ul {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    li {
      opacity: 0;
      width: 40%;
      height: 60px;
      border: 1px solid #2e2d50;
      border-radius: 12px;
      display: inline-block;
      margin-bottom: 16px;
      background-position: 0 -60px;
      background-color: #161528;
      background-image: radial-gradient(circle at 50% 0%, #3e255b 0%, #161528 100%);
      transition: background-position 0.5s ease;
      background-repeat: no-repeat;
      margin-right: 8px;
      margin-left: 8px;
      &.null {
        background: none;
        border: none;
        &:hover {
          background: none;
          border: none;
        }
      }
      ${({ theme }) => theme.mediaQueries.sm} {
        background-position: 0 -80px;
        height: 80px;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        width: 30%;
        background-position: 0 -100px;
        height: 100px;
      }
      ${({ theme }) => theme.mediaQueries.xl} {
        width: 320px;
        height: 120px;
        margin-right: 15px;
        margin-left: 15px;
        margin-bottom: 30px;
        border-radius: 20px;
        background-position: 0 -120px;
      }

      &:hover {
        background-position: 0 0;
      }

      img {
        height: 100%;
        margin: 0 auto;
        display: block;
      }
    }
  }
`;
export default HomePartners;
