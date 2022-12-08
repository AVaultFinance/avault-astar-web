import { STATIC_BASE_URL } from 'config';
import styled, { keyframes } from 'styled-components';
import { partnersArr } from './partners';

const marquee = keyframes`
0% {
  -webkit-transform: translateX(0);
  transform: translateX(0)
}
to {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%)
}
`;
const ScrollBannerStyle = styled.div<{ len: number }>`
  display: inline-block;
  vertical-align: middle;
  width: calc(2vw * ${({ len }) => len} + 2vw * 2 * ${({ len }) => len});
  max-width: calc(590px * ${({ len }) => len} + 2vw * 2 * ${({ len }) => len});
  min-width: calc(270px * ${({ len }) => len} + 2vw * 2 * ${({ len }) => len});
  animation: ${marquee} 25s linear infinite;

  a {
    display: inline-block;
    vertical-align: middle;
    width: 2vw;
    max-width: 590px;
    min-width: 270px;
    opacity: 0.4;
    transition: all 0.3s ease;
    margin: 0 2vw;
    &:hover {
      opacity: 1;
    }
  }
`;
const ScrollBannerStyledInner = styled.div<{ len: number }>`
  width: calc(
    2vw * ${({ len }) => len} + 2vw * 2 * ${({ len }) => len} + 2vw * ${({ len }) => len} + 2vw * 2 *
      ${({ len }) => len}
  );
  max-width: calc(
    590px * ${({ len }) => len} + 2vw * 2 * ${({ len }) => len} + 590px * ${({ len }) => len} + 2vw * 2 *
      ${({ len }) => len}
  );
  min-width: calc(
    270px * ${({ len }) => len} + 2vw * 2 * ${({ len }) => len} + 270px * ${({ len }) => len} + 2vw * 2 *
      ${({ len }) => len}
  );
  padding: 24px 0;
  // ${({ theme }) => theme.mediaQueries.md} {
  //   padding: 30px 0;
  // }
  &:hover > div {
    animation-play-state: paused;
  }
`;
const ScrollBannerStyledWrap = styled.div`
  max-width: 100vw;
  // overflow: hidden;
  border-top: 1px solid rgba(35, 34, 55, 0.3);
  border-bottom: 1px solid rgba(35, 34, 55, 0.6);
  box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
  position: absolute;
  bottom: 0;
  left: 0;
  display: none;
  // border-bottom: 1px solid #232237;
  box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
  background-image: linear-gradient(269deg, rgba(1, 0, 17, 0.1) 0%, rgba(22, 21, 40, 0.1) 100%);
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`;
const ScrollBanner = () => {
  return (
    <ScrollBannerStyledWrap>
      <ScrollBannerStyledInner len={partnersArr.length}>
        <ScrollBannerStyle len={partnersArr.length}>
          {partnersArr.map((v, index) => {
            return (
              <a key={index} href={v.link} target="_blank" rel="noreferrer" title={v.name}>
                <img src={`${STATIC_BASE_URL}/images/home/partner_on/${v.icon}`} alt={v.name} />
              </a>
            );
          })}
          {/* <img src="/images/home/scroll_banner_01.svg" alt="web3go" />
          <img src="/images/home/scroll_banner_02.svg" alt="web3go" />
          <img src="/images/home/scroll_banner_01.svg" alt="web3go" />
          <img src="/images/home/scroll_banner_02.svg" alt="web3go" /> */}
        </ScrollBannerStyle>
        <ScrollBannerStyle len={partnersArr.length}>
          {partnersArr.map((v, index) => {
            return (
              <a key={index} href={v.link} target="_blank" rel="noreferrer" title={v.name}>
                <img src={`${STATIC_BASE_URL}/images/home/partner_on/${v.icon}`} alt={v.name} />
              </a>
            );
          })}
          {/* <img src="/images/home/scroll_banner_01.svg" alt="web3go" />
          <img src="/images/home/scroll_banner_02.svg" alt="web3go" />
          <img src="/images/home/scroll_banner_01.svg" alt="web3go" />
          <img src="/images/home/scroll_banner_02.svg" alt="web3go" /> */}
        </ScrollBannerStyle>
      </ScrollBannerStyledInner>
    </ScrollBannerStyledWrap>
  );
};

export default ScrollBanner;
