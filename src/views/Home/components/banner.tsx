import styled, { keyframes } from 'styled-components';
const Banner = () => {
  return (
    <BannerStyled>
      <div className="img">
        <img src="./images/home/banner_avat.svg" alt="banner_avat" />
        <img src="./images/home/banner_astr.svg" alt="banner_astr" />
        <div className="bg"></div>
      </div>
      <h1>Avault</h1>
      <p>
        The Best Yield Aggregator on Astar Network
        <br />
        Compounding your revenue and unlocking your asset liquidity by using aLP/aToken
      </p>
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
  padding: 270px 20px 300px;
  max-width: 1208px;
  margin: 0 auto;
  position: relative;
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 270px 0 300px;
  }
  h1 {
    font-size: 96px;
    background: linear-gradient(90deg, #ffd8fe 0%, #c5fff1 100%);
    -webkit-background-clip: text;
    color: transparent;
    display: inline-block;
    padding-bottom: 30px;
  }
  p {
    font-size: 20px;
    color: #ffffff;
    line-height: 32px;
    max-width: 522px;
  }
  .img {
    width: 600px;
    height: 710px;
    position: absolute;
    top: 0;
    right: -40px;
    .bg {
      width: 420px;
      height: 150px;
      background-image: url('/images/stake/bg_element.svg');
      background-size: 100%;
      position: absolute;
      background-repeat: no-repeat;
      top: 400px;
      left: 0;
    }
    img {
      position: absolute;
      width: 350px;
      z-index: 2;
      &:nth-child(1) {
        top: 0;
        left: 0;
        animation: ${floatingAnim('1px', '14px')} 3s ease-in-out infinite;
      }
      &:nth-child(2) {
        bottom: 0;
        right: 0;
        animation: ${floatingAnim('5px', '20px')} 3s ease-in-out infinite;
      }
    }
  }
`;
export default Banner;
