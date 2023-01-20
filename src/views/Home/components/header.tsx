import { Button, Flex, useTooltip } from '@my/ui';
import HeaderLogoWhite from 'components/SideMenu/Logo/HeaderLogoWhite';
import { STATIC_BASE_URL } from 'config';
import { routePath } from 'config/constants/meta';
import { memo } from 'react';
import styled from 'styled-components';
interface IProps {
  collapsed: boolean;
}
const HomeHeader = ({ collapsed }: IProps) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <LinkWrapStyled>
      <a href={routePath.vault.path}>Launch Dapp (Astar)</a>
      <a href="https://pre.avault.network/multi/vault">Launch Dapp (Omni)</a>
    </LinkWrapStyled>,
    {
      trigger: 'click',
      tootipStyle: { padding: '20px', backgroundColor: '#161527', borderRadius: '20px' },
      placement: 'top-end',
      hideArrow: false,
      tooltipOffset: [20, 10],
    },
  );
  return (
    <HomeHeaderStyled>
      {/* {tooltip} */}
      {tooltipVisible && tooltip}
      {/* <HomeLogo collapsed={collapsed} /> */}
      <HeaderLogoWhite collapsed={collapsed} />
      <div className="fr">
        {collapsed ? (
          <ButtonStyled ref={targetRef}>
            Dapp
            <img src={STATIC_BASE_URL + '/images/icon_arr02.svg'} />
          </ButtonStyled>
        ) : (
          <>
            <ButtonStyled>
              <a href={routePath.vault.path}>Launch Dapp (Astar)</a>
            </ButtonStyled>
            <ButtonStyled>
              <a href="https://pre.avault.network/multi/vault">Launch Dapp (Omni)</a>
            </ButtonStyled>
          </>
        )}
      </div>
    </HomeHeaderStyled>
  );
};

export default memo(HomeHeader);
const LinkWrapStyled = styled.div`
  a {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    height: 36px;
    line-height: 36px;
    background-image: linear-gradient(90deg, #9733c9 0%, #65d1ab 100%);
    margin-top: 20px;
    border-radius: 12px;
    padding: 0 12px;
    &:first-child {
      margin-top: 0;
    }
  }
`;
const HomeHeaderStyled = styled(Flex)`
  position: relative;
  padding: 13px 16px;
  max-width: 1208px;
  margin: 0 auto;
  align-content: center;
  justify-content: space-between;
  z-index: 9999;
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
const ButtonStyled = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  height: 36px;
  line-height: 36px;
  background-image: linear-gradient(90deg, #9733c9 0%, #65d1ab 100%);
  width: 100px;
  padding: 0;
  cursor: pointer;
  margin-left: 12px;
  border-radius: 12px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 3px;
    width: 193px;
  }
  img {
    width: 14px;
    margin-left: 4px;
  }
  a {
    display: block;
    height: 36px;
    width: 200px;
    line-height: 36px;
  }
`;
