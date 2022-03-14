import React, { FC } from 'react';
import styled from 'styled-components';
const Logo: FC<{ collapsed: boolean }> = ({ collapsed }) => {
  return (
    <LogoStyle>
      <img src={collapsed ? '/images/logo_small.svg' : '/images/logo.svg'} alt="" />
    </LogoStyle>
  );
};
const LogoStyle = styled.div`
  height: 40px;
  margin-right: 0;
  margin-top: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 26px;
    margin-top: 0;
    margin-right: 48px;
  }
  img {
    display: block;
    margin-top: -4px;
    height: 34px;
    width: 34px;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 134px;
    }
  }
`;
export default Logo;
