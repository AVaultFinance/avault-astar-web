import styled from 'styled-components';

const partnersArr = [
  {
    icon: `./images/home/partner_on/Astar.svg`,
    name: 'Astar',
    link: 'https://astar.network/',
  },
  {
    icon: `./images/home/partner_on/Next Web.svg`,
    name: 'Next Web',
    link: 'https://nextweb.capital/',
  },

  {
    icon: `./images/home/partner_on/Cogitent.svg`,
    name: 'Cogitent',
    link: 'https://cogitent.ventures/',
  },
  {
    icon: `./images/home/partner_on/Astriddao.svg`,
    name: 'Astriddao',
    link: 'https://astriddao.xyz/',
  },
  {
    icon: `./images/home/partner_on/Sirius.svg`,
    name: 'Sirius',
    link: 'https://www.sirius.finance/',
  },
  {
    icon: `./images/home/partner_on/Starbank.svg`,
    name: 'Starbank',
    link: 'https://test.starbank.finance/#/',
  },
  {
    icon: `./images/home/partner_on/Libra.svg`,
    name: 'Libra',
    link: 'https://drive.google.com/drive/folders/1Ydb2tV67qafHo3Er6fitaUmk9KihPg0v',
  },

  {
    icon: `./images/home/partner_on/Astar Sign Witch.svg`,
    name: 'Astar Sign Witch',
    link: 'https://sign-witch.vercel.app/',
  },
  {
    icon: `./images/home/partner_on/Peckshield.svg`,
    name: 'Peckshield',
    link: 'https://peckshield.com/',
  },
  {
    icon: `./images/home/partner_on/Astar Domain.svg`,
    name: 'Astar Domain',
    link: 'https://astr.domains/',
  },
  {
    icon: `./images/home/partner_on/GTS VENTURES.svg`,
    name: 'GTS VENTURES',
    link: 'https://gts.ventures/',
  },
  {
    icon: `./images/home/partner_on/Microsoft.svg`,
    name: 'Microsoft',
    link: '',
  },
];

const HomePartners = () => {
  return (
    <HomePartnersStyled className="partner animate animate__animated" data-animate="animate__show">
      <h2>Partners</h2>
      <ul>
        {partnersArr.map((v, index) => {
          return (
            <LiStyled key={index} index={index}>
              <a href={v.link} target="_blank" rel="noreferrer" title={v.name}>
                <img src={v.icon} alt={v.name} />
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
    font-size: 48px;
    text-align: center;
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
      border: 1px solid #2e2d5b;
      border-radius: 12px;
      display: inline-block;
      margin-bottom: 16px;
      background-position: 0 -60px;
      background-color: #181733;
      background-image: radial-gradient(circle at 50% 0%, #3e255b 0%, #040222 100%);
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
