import { Button, Flex } from '@my/ui';
import HeaderLogoWhite from 'components/SideMenu/Logo/HeaderLogoWhite';
import { STATIC_BASE_URL } from 'config';
import { routePath } from 'config/constants/meta';
import { memo } from 'react';
import styled from 'styled-components';
import { Link } from '..';
import { UlStyled } from './UlStyled';
interface IProps {
  collapsed: boolean;
}
const HomeHeader = ({ collapsed }: IProps) => {
  return (
    <HomeHeaderStyled>
      {/* <HomeLogo collapsed={collapsed} /> */}
      <HeaderLogoWhite collapsed={collapsed} />
      <div className="fr">
        <ButtonStyled>
          <a href={routePath.vault.path}>Launch Dapp (Astar)</a>
        </ButtonStyled>
        <ButtonStyled>
          <a href="https://pre.avault.network/multi/vault">Launch Dapp (Omni)</a>
        </ButtonStyled>
      </div>
    </HomeHeaderStyled>
  );
};

export default memo(HomeHeader);
const HomeHeaderStyled = styled(Flex)`
  padding: 13px 16px;
  max-width: 1208px;
  margin: 0 auto;
  align-content: center;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 40px 20px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 40px 0;
  }
  .fr {
    display: flex;
    align-content: center;
    justify-content: center;
  }
`;
const ButtonStyled = styled(Button)`
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  height: 36px;
  background-image: linear-gradient(90deg, #9733c9 0%, #65d1ab 100%);
  width: 193px;
  padding: 0;
  cursor: pointer;
  margin-left: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 3px;
  }
  a {
    display: block;
    height: 36px;
    width: 200px;
    line-height: 36px;
  }
`;
