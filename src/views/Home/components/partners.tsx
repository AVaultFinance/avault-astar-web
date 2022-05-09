import { Flex } from '@my/ui';
import styled from 'styled-components';

const partnersArr = [
  {
    icon: '/images/home/partner/Astar.svg',
    name: 'Astar',
  },
  {
    icon: '/images/home/partner/Astriddao.svg',
    name: 'Astriddao',
  },
  {
    icon: '/images/home/partner/AU21.svg',
    name: 'AU21',
  },
  {
    icon: '/images/home/partner/Libra.svg',
    name: 'Libra',
  },
  {
    icon: '/images/home/partner/Next Web.svg',
    name: 'Next Web',
  },
  {
    icon: '/images/home/partner/Sirius.svg',
    name: 'Sirius',
  },
  {
    icon: '/images/home/partner/Starbank.svg',
    name: 'Starbank',
  },
];
const HomePartners = () => {
  return (
    <HomePartnersStyled>
      <h3>Partners</h3>
      <ul className="animate animate__animated" data-animate="animate__show">
        {partnersArr.map((v, index) => {
          return (
            <li key={index}>
              {/* <img src={v.icon} alt={v.name} /> */}
              <IconBg name={v.name} />
            </li>
          );
        })}
      </ul>
      <h2>Partners</h2>
    </HomePartnersStyled>
  );
};
const IconBg = styled.div<{ name: string }>`
  width: 100%;
  height: 100%;
  background-image: url('/images/home/partner/${({ name }) => name}.svg');
  &:hover {
    background-image: url('/images/home/partner_on/${({ name }) => name}.svg');
  }
`;
const HomePartnersStyled = styled(Flex)`
  display: block;
  padding: 0 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    max-width: 1208px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 0;
  }
  .animate__show {
    li {
      animation: slide-up 1s ease-in-out;
      animation-fill-mode: forwards;
    }
  }
  h3 {
    font-size: 48px;
    text-align: center;
    padding-top: 60px;
    display: block;
    ${({ theme }) => theme.mediaQueries.md} {
      display: none;
    }
  }
  h2 {
    font-size: 80px;
    display: none;
    ${({ theme }) => theme.mediaQueries.md} {
      display: block;
    }
  }
  ul {
    clear: both;
    overflow: hidden;
    padding: 60px 0;
    text-align: center;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 700px;
      margin: 200px 0 170px;
    }
    li {
      opacity: 0;
      width: 46%;
      height: 60px;
      border: 1px solid #2e2d5b;
      border-radius: 12px;
      display: inline-block;
      margin-bottom: 15px;
      background-image: radial-gradient(circle at 50% 0%, #181733 0%, #181733 100%);
      transition: all 0.2s ease;
      background-position: 0 -60px;
      &:nth-child(2n + 1) {
        margin-right: 15px;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        float: left;
        width: 320px;
        height: 120px;
        margin-right: 30px;
        margin-bottom: 30px;
        border-radius: 20px;
        background-position: 0 -120px;

        &:nth-child(2n + 1) {
          margin-right: 30px;
        }
      }
      &:hover {
        background-image: radial-gradient(circle at 50% 0%, #3e255b 0%, #040222 100%);
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