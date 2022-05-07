import styled, { keyframes } from 'styled-components';

const Banner = () => {
  return (
    <BannerStyled className="animate animate__animated" data-animate="animate__show">
      <div className="img">
        <img src="./images/home/banner_avat.svg" alt="banner_avat" />
        <img src="./images/home/banner_astr.svg" alt="banner_astr" />
        <div className="bg"></div>
      </div>
      <div>
        <h1>Avault</h1>
        <p>
          The Best Yield Aggregator on Astar Network
          <br />
          Compounding your revenue and unlocking your asset liquidity by using aLP/aToken
        </p>
      </div>
    </BannerStyled>
  );
};

const floatingAnim = (x: string, y: string) => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(${x}, ${y});
  }
  to {
    transform: translate(0, 0px);
  }
`;

const BannerStyled = styled.div`
  padding: 430px 30px 60px;
  max-width: 1208px;
  margin: 0 auto;
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 100px 20px 200px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 150px 20px 200px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 270px 20px 300px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 270px 0 300px;
  }
  &.animate__show {
    h1 {
      animation: slide-up 0.4s ease-in-out;
      animation-fill-mode: forwards;
    }
    p {
      animation: slide-up 0.4s ease-in-out;
      animation-delay: 0.4s;
      animation-fill-mode: forwards;
    }
  }
  h1 {
    font-size: 48px;
    background: linear-gradient(90deg, #ffd8fe 0%, #c5fff1 100%);
    -webkit-background-clip: text;
    color: transparent;
    display: inline-block;
    padding-bottom: 40px;
    opacity: 0;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 66px;
      padding-bottom: 30px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 96px;
    }
  }
  p {
    font-size: 15px;
    line-height: 22px;
    color: #ffffff;
    max-width: 522px;
    opacity: 0;
    font-weight: 600;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 16px;
      line-height: 26px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 20px;
      line-height: 32px;
    }
  }
  .img {
    position: absolute;
    top: 0;
    height: 380px;
    width: 75%;
    left: 20%;
    right: auto;
    ${({ theme }) => theme.mediaQueries.xs} {
      height: 420px;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 40%;
      right: 20px;
      height: 300px;
      left: auto;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      height: 450px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      right: -40px;
      height: 710px;
      width: 50%;
      max-width: 600px;
      left: auto;
    }
    .bg {
      width: 70%;
      height: 200px;
      background-image: url('/images/stake/bg_element.svg');
      background-size: 100%;
      position: absolute;
      background-repeat: no-repeat;
      top: 240px;
      left: auto;
      right: -20px;
      ${({ theme }) => theme.mediaQueries.sm} {
        height: 150px;
        top: 220px;
        left: 0;
        right: auto;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        top: 430px;
      }
    }
    img {
      position: absolute;
      width: 70%;
      z-index: 2;
      ${({ theme }) => theme.mediaQueries.sm} {
        width: 58%;
      }
      &:nth-child(1) {
        top: 0;
        right: 0;
        left: auto;
        animation: ${floatingAnim('1px', '14px')} 3s ease-in-out infinite;
        ${({ theme }) => theme.mediaQueries.sm} {
          left: 0;
          right: auto;
        }
      }
      &:nth-child(2) {
        bottom: 0;
        left: 0;
        right: auto;
        animation: ${floatingAnim('5px', '20px')} 3s ease-in-out infinite;
        ${({ theme }) => theme.mediaQueries.sm} {
          left: auto;
          right: 0;
        }
      }
    }
  }
`;
export default Banner;
