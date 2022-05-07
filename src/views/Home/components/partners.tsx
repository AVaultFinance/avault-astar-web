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
  max-width: 1208px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 0;
  }
  .animate__show {
    li {
      animation: slide-up 1s ease-in-out;
      animation-fill-mode: forwards;
    }
  }
  h2 {
    font-size: 80px;
  }
  ul {
    width: 700px;
    clear: both;
    overflow: hidden;
    margin: 200px 0 170px;
    li {
      opacity: 0;
      float: left;
      width: 320px;
      height: 120px;
      margin-right: 30px;
      margin-bottom: 30px;
      background: #181733;
      border: 1px solid #2e2d5b;
      border-radius: 20px;
      img {
        height: 100%;
        margin: 0 auto;
        display: block;
      }
    }
  }
`;
export default HomePartners;
