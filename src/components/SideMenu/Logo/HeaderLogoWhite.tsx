import { STATIC_BASE_URL } from 'config';
import { FC, memo } from 'react';
import styled from 'styled-components';

const HeaderLogoWhite: FC<{ collapsed: boolean }> = ({ collapsed }) => {
  return (
    <LogoStyle href="/" title="Logo">
      <img src={collapsed ? '/images/logo_small.svg' : '/images/logo.svg'} alt="" />
    </LogoStyle>
  );
};

const LogoStyle = styled.a`
  display: block;
  margin-right: 0;
  margin-top: 0;
  height: 34px;
  width: 34px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 120px;
    margin-top: 0;
    margin-right: 48px;
  }
  img {
    display: block;
    height: 34px;
    width: 34px;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 120px;
      // height: 40px;
    }
  }
`;

export default memo(HeaderLogoWhite);
