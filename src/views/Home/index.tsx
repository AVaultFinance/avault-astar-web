import styled from 'styled-components';

const Home = () => {
  return (
    <HomeInner>
      <HomeInnerInner>
        <img src="./images/home/logo.png" alt="Avault" />
        <h1>The First Native Yield Aggregator</h1>
        <h1>on Astar Network</h1>
        <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12">
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="89188piuaa">
                <stop stop-color="#8C1AB5" offset="0%" />
                <stop stop-color="#17B38D" offset="100%" />
              </linearGradient>
            </defs>
            <path fill="url(#89188piuaa)" transform="rotate(180 6 6)" d="M6 0L12 12 0 12z" fill-rule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="20">
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="89188piuaa">
                <stop stop-color="#8C1AB5" offset="0%" />
                <stop stop-color="#17B38D" offset="100%" />
              </linearGradient>
            </defs>
            <path fill="url(#89188piuaa)" transform="rotate(180 6 6)" d="M6 0L12 12 0 12z" fill-rule="evenodd" />
          </svg>
        </div>
        <h2>Coming&nbsp;&nbsp;Soon</h2>
      </HomeInnerInner>
    </HomeInner>
  );
};

const HomeInnerInner = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  text-align: center;
  img {
    margin-bottom: 30px;
    width: 144px;
    ${({ theme }) => theme.mediaQueries.sm} {
      margin-bottom: 50px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      margin-bottom: 70px;
    }
  }
  h1 {
    color: ${({ theme }) => theme.colors.text};
    line-height: 38px;
    font-size: 18px;
    ${({ theme }) => theme.mediaQueries.sm} {
      line-height: 48px;
      font-size: 30px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      line-height: 68px;
      font-size: 44px;
    }
  }
  .icon {
    svg {
      display: block;
      margin: 10px auto;
    }
  }
  h2 {
    display: inline-block;
    background-image: linear-gradient(270deg, #f94ef9 0%, #05e9b5 100%);
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 600;
    font-size: 14px;
    margin-top: 20px;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 20px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 28px;
    }
  }
`;
const HomeInner = styled.div`
  background-image: url('./images/home/bg.png');
  background-size: 105%;
  background-position: center;
  min-height: 100vh;
  background-repeat: no-repeat;
  @media screen and (min-width: 1500px) {
    background-size: 1840px;
  }
`;

export default Home;
