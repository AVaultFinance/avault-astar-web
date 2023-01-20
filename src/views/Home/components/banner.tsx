import { STATIC_BASE_URL } from 'config';
import styled, { keyframes } from 'styled-components';
import ScrollBanner from './scroll_banner';

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
const Banner = () => {
  return (
    <Bg>
      <BannerStyled className="animate animate__animated" data-animate="animate__show">
        <div className="banner_inner">
          <div className="img">
            <div className="dapp">
              <img src={`${STATIC_BASE_URL}/images/home/banner/banner_c_01.svg`} alt="" className="banner_c_01" />
              <img src={`${STATIC_BASE_URL}/images/home/banner/banner_c_abt.svg`} alt="" className="banner_c_abt" />
              <img src={`${STATIC_BASE_URL}/images/home/banner/banner_c_ast.svg`} alt="" className="banner_c_ast" />
              <img src={`${STATIC_BASE_URL}/images/home/banner/banner_c_bsc.svg`} alt="" className="banner_c_bsc" />
              <img src={`${STATIC_BASE_URL}/images/home/banner/banner_c_eth.svg`} alt="" className="banner_c_eth" />
              <div className="liner01"></div>
              <div className="liner02"></div>
              <div className="liner03"></div>
              <div className="liner04"></div>
              <div className="liner05"></div>
            </div>
            <div className="center">
              <img
                src={`${STATIC_BASE_URL}/images/home/banner/banner_center_bottom.svg`}
                alt=""
                className="banner_center_bottom"
              />
              <img
                src={`${STATIC_BASE_URL}/images/home/banner/banner_center_middle.svg`}
                alt=""
                className="banner_center_middle"
              />

              <img
                src={`${STATIC_BASE_URL}/images/home/banner/banner_center_top.svg`}
                alt=""
                className="banner_center_top"
              />
            </div>
            <div className="circle">
              <img
                src={`${STATIC_BASE_URL}/images/home/banner/banner_circle_bottom.svg`}
                alt=""
                className="banner_circle_bottom"
              />
              <img
                src={`${STATIC_BASE_URL}/images/home/banner/banner_circle_middle.svg`}
                alt=""
                className="banner_circle_middle"
              />
              <img
                src={`${STATIC_BASE_URL}/images/home/banner/banner_circle_top.svg`}
                alt=""
                className="banner_circle_top"
              />
            </div>
            {/* <img src={`${STATIC_BASE_URL}/images/home/banner_v2/banner_middle.svg`} className="banner_middle" alt="" />
        <img src={`${STATIC_BASE_URL}/images/home/banner_v2/banner_avault.svg`} className="banner_avault" alt="" />
        <img src={`${STATIC_BASE_URL}/images/home/banner_v2/banner_top.svg`} className="banner_top" alt="" />

        <img
          src={`${STATIC_BASE_URL}/images/home/banner_v2/banner_circle_green.svg`}
          className="banner_circle_green"
          alt=""
        />
        <img
          src={`${STATIC_BASE_URL}/images/home/banner_v2/banner_circle_red.svg`}
          className="banner_circle_red"
          alt=""
        />
        <img
          src={`${STATIC_BASE_URL}/images/home/banner_v2/banner_circle_yellow.svg`}
          className="banner_circle_yellow"
          alt=""
        /> */}
          </div>

          <div>
            <h1>Avault</h1>
            <h2>
              One-stop Omnichain <br />
              Yield Platform
            </h2>
            <p>Lower the threshold for users to use Web 3.0 DeFi Dapps</p>
          </div>
        </div>
        <ScrollBanner />
      </BannerStyled>
    </Bg>
  );
};
const Bg = styled.div`
  background-image: url('https://static.avault.network/images/home/bannerBg.png');
  background-position: center top;
  background-repeat: no-repeat;
  background-size: 100%;
  max-width: 100vw;
  overflow: hidden;
  margin-top: -120px;
  padding-top: 120px;
`;
const BannerStyled = styled.div`
  ${({ theme }) => theme.mediaQueries.md} {
    position: relative;
    height: calc(100vh - 120px);
    min-height: 700px;
  }
  .banner_inner {
    padding: 430px 30px 60px;
    max-width: 1208px;
    margin: 0 auto;
    position: relative;
    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 100px 20px 200px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      padding: 16vh 20px;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      padding: 16vh 0;
    }
  }

  &.animate__show {
    h1 {
      animation: slide-up 0.4s ease-in-out;
      animation-fill-mode: forwards;
    }
    h2 {
      animation: slide-up 0.4s ease-in-out;
      animation-fill-mode: forwards;
      animation-delay: 0.4s;
    }
    p {
      animation: slide-up 0.4s ease-in-out;
      animation-fill-mode: forwards;
      animation-delay: 0.8s;
    }
  }
  h1 {
    font-size: 40px;
    background: linear-gradient(90deg, #ffd8fe 0%, #c5fff1 100%);
    -webkit-background-clip: text;
    color: transparent;
    display: inline-block;
    padding-bottom: 40px;
    opacity: 0;
    width: 100%;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 66px;
      padding-bottom: 30px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 96px;
    }
  }
  h2 {
    opacity: 0;
    max-width: 70%;
    display: inline-block;
    line-height: 26px;
    font-size: 16px;
    margin-bottom: 30px;
    font-weight: 700;
    background: linear-gradient(90deg, #da78ff 0%, #02f2bc 100%);
    -webkit-background-clip: text;
    color: transparent;
    text-transform: uppercase;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 50px;
      line-height: 55px;
    }
  }
  p {
    font-size: 12px;
    line-height: 22px;
    color: #ffffff;
    opacity: 0;
    font-weight: 600;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 14px;
      line-height: 16px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 20px;
      line-height: 20px;
    }
  }
  .img {
    position: absolute;
    top: 0;
    height: 380px;
    width: 75%;
    left: 20%;
    right: auto;
    z-index: 999;
    transform: rotateZ(-30deg);
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
      top: 0;
      height: 450px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      right: -50px;
      height: 610px;
      width: 40%;
      max-width: 663px;
      left: auto;
    }
    // .banner_avault,
    // .banner_circle_green,
    // .banner_circle_red,
    // .banner_circle_yellow,
    // .banner_middle,
    // .banner_top {
    //   position: absolute;
    // }
    // .banner_avault {
    //   animation: ${floatingAnim('0px', '10px')} 3s ease-in-out infinite;
    // }
    // .banner_middle {
    //   animation: ${floatingAnim('0px', '10px')} 3s ease-in-out infinite;
    // }
    // .banner_top {
    //   animation: ${floatingAnim('0px', '10px')} 3s ease-in-out infinite;
    // }
    // .banner_circle_green {
    //   animation: ${floatingAnim('0px', '10px')} 3s ease-in-out infinite;
    // }
    // .banner_circle_red {
    //   animation: ${floatingAnim('0px', '10px')} 3s ease-in-out infinite;
    // }
    // .banner_circle_yellow {
    //   animation: ${floatingAnim('0px', '10px')} 3s ease-in-out infinite;
    // }
    // .banner_top {
    //   width: 38%;
    // }

    // .banner_avault {
    //   top: 19%;
    //   left: 16.5%;
    //   width: 27%;
    // }
    // .banner_middle {
    //   width: 61%;
    //   top: 20%;
    //   left: 16%;
    // }
    // .banner_circle_green {
    //   width: 38%;
    //   top: 30%;
    //   left: 24%;
    // }
    // .banner_circle_red {
    //   width: 32%;
    //   top: 42%;
    //   left: 36%;
    // }
    // .banner_circle_yellow {
    //   width: 30%;
    //   top: 26%;
    //   left: 22%;
    // }

    .banner_circle_top {
      animation: ${floatingAnim('0px', '10px')} 3s ease-in-out infinite;
    }
    .banner_circle_middle {
      animation: ${floatingAnim('1px', '8px')} 3s ease-in-out infinite;
    }
    .banner_circle_bottom {
      animation: ${floatingAnim('1px', '10px')} 3s ease-in-out infinite;
    }
    .banner_c_01 {
      animation: ${floatingAnim('1px', '12px')} 2s ease-in-out infinite;
    }
    .banner_c_abt {
      animation: ${floatingAnim('1px', '12px')} 2.4s ease-in-out infinite;
    }
    .banner_c_ast {
      animation: ${floatingAnim('1px', '18px')} 2.5s ease-in-out infinite;
    }
    .banner_c_bsc {
      animation: ${floatingAnim('1px', '14px')} 2.2s ease-in-out infinite;
    }
    .banner_c_eth {
      animation: ${floatingAnim('1px', '20px')} 1.8s ease-in-out infinite;
    }
    .liner01,
    .liner03,
    .liner05 {
      animation: ${floatingAnim('1px', '16px')} 3s ease-in-out infinite;
    }
    .liner02,
    .liner04,
    .liner06 {
      animation: ${floatingAnim('1px', '12px')} 2s ease-in-out infinite;
    }
    .banner_center_top {
      animation: ${floatingAnim('1px', '12px')} 3s ease-in-out infinite;
    }
    .banner_center_middle {
      animation: ${floatingAnim('1px', '10px')} 3s ease-in-out infinite;
    }
    .banner_center_bottom {
      animation: ${floatingAnim('1px', '8px')} 3s ease-in-out infinite;
    }
    .circle {
      position: absolute;
      top: 0;
      width: 80%;
      height: 80%;
      left: 10%;
      img {
        position: absolute;
      }
      .banner_circle_top {
        width: 46%;
        left: 28%;
        top: 50%;
      }
      .banner_circle_middle {
        width: 58%;
        left: 20%;
        top: 65%;
      }
      .banner_circle_bottom {
        width: 94%;
        top: 60%;
        left: 3%;
        opacity: 0.3;
      }
    }
    .dapp {
      position: absolute;
      top: 0;
      width: 80%;
      height: 80%;
      left: 10%;
      img {
        position: absolute;
        max-width: 70px;
      }
      .banner_c_01 {
        width: 4%;
        left: 40%;
        top: 26%;
      }
      .banner_c_abt {
        width: 8%;
        left: 33%;
        top: 13%;
      }
      .banner_c_ast {
        width: 8%;
        left: 39%;
        top: 0;
      }
      .banner_c_bsc {
        width: 9%;
        left: 60%;
        top: 4%;
      }
      .banner_c_eth {
        width: 12%;
        left: 54%;
        top: 21%;
      }
      & > div {
        position: absolute;
        border-radius: 50%;
      }
      .liner01 {
        width: 7px;
        height: 7px;
        left: 55%;
        top: 5%;
        background-image: linear-gradient(45deg, #a428d0 0%, #20d4a9 100%);
      }
      .liner02 {
        width: 33px;
        height: 33px;
        left: 45%;
        top: 12%;
        opacity: 0.3;
        background-image: linear-gradient(90deg, #cc64f2 0%, #20d4a9 100%);
      }
      .liner03 {
        width: 20px;
        height: 20px;
        left: 67%;
        top: 15%;
        opacity: 0.1;
        background-color: #20d4a9;
      }
      .liner04 {
        width: 12px;
        height: 12px;
        left: 65%;
        top: 32%;
        opacity: 0.3;
        background-image: linear-gradient(90deg, #cc64f2 0%, #20d4a9 100%);
      }
      .liner05 {
        width: 7px;
        height: 7px;
        left: 30%;
        top: 7%;
        opacity: 0.7;
        background-image: linear-gradient(45deg, #a428d0 0%, #20d4a9 100%);
      }
    }
    .center {
      position: absolute;
      top: 0;
      width: 50%;
      height: 50%;
      left: 25%;
      img {
        position: absolute;
      }
      .banner_center_top {
        width: 100%;
        top: 0;
      }
      .banner_center_middle {
        width: 70%;
        left: 15%;
        top: 60%;
      }
      .banner_center_bottom {
        width: 78%;
        left: 11%;
        top: 80%;
      }
    }
  }
`;
export default Banner;
