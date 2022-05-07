import { Flex } from '@my/ui';
import styled from 'styled-components';

const partnersArr = [
  {
    icon: '/images/github.svg',
    name: 'github',
  },
  {
    icon: '/images/github.svg',
    name: 'github',
  },
  {
    icon: '/images/github.svg',
    name: 'github',
  },
  {
    icon: '/images/github.svg',
    name: 'github',
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
              <img src={v.icon} alt={v.name} />
            </li>
          );
        })}
      </ul>
      <h2>Partners</h2>
    </HomePartnersStyled>
  );
};
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
      background: #181733;
      border: 1px solid #2e2d5b;
      border-radius: 12px;
      display: inline-block;
      margin-bottom: 15px;
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
        &:nth-child(2n + 1) {
          margin-right: 30px;
        }
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
