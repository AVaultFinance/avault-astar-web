import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Flex, Heading } from '@my/ui';

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

const WagmiSoullyBannerStyle = styled(Flex)`
  justify-content: space-between;
  height: 44px;
  padding: 8px 0;
  animation: ${marquee} 15s linear infinite;
  ${({ theme }) => theme.mediaQueries.xl} {
    height: 64px;
    padding: 14px 0;
  }
`;
const TextHeading = styled(Heading)`
  width: 80px;
  text-align: center;
  line-height: 28px;
  font-size: 16px;
  font-wight: 900px;
  ${({ theme }) => theme.mediaQueries.xl} {
    line-height: 36px;
    width: 120px;
    font-size: 24px;
  }
`;
const SOULLYHeading = styled(TextHeading)`
  background-color: ${({ theme }) => `${theme.colors.text}`};
  color: ${({ theme }) => `${theme.colors.background}`};
`;
const WAGMIHeading = styled(TextHeading)`
  margin: 0 8px;
`;
const WagmiSoullyBanner = () => {
  return (
    <Flex maxWidth={'100vw'} overflow="hidden">
      <WagmiSoullyBannerStyle>
        {new Array(10).fill('').map((v, index) => (
          <Flex flexDirection="row" justifyContent="space-between" key={index}>
            <SOULLYHeading scale="md">SOULLY</SOULLYHeading>
            <WAGMIHeading scale="md">#WAGMI</WAGMIHeading>
          </Flex>
        ))}
      </WagmiSoullyBannerStyle>
      <WagmiSoullyBannerStyle>
        {new Array(10).fill('').map((v, index) => (
          <Flex flexDirection="row" justifyContent="space-between" key={index}>
            <SOULLYHeading scale="md">SOULLY</SOULLYHeading>
            <WAGMIHeading scale="md">#WAGMI</WAGMIHeading>
          </Flex>
        ))}
      </WagmiSoullyBannerStyle>
    </Flex>
  );
};

export default WagmiSoullyBanner;
