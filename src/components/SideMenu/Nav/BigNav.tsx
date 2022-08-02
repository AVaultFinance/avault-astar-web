import { FC } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { IMenu } from '../config';
import { Flex, useTooltip } from '@my/ui';
import CollapseSvg from '../imgs/collapse';
import IconLink from 'components/svg/IconLink';
import ALPContent from './ALPContent';
const BigNav: FC<{ menuItems: IMenu[] }> = ({ menuItems }) => {
  const { pathname } = useLocation();
  const {
    targetRef: ALPTargetRef,
    tooltip: ALPTooltip,
    tooltipVisible: ALPTooltipVisible,
    setTooltipVisible: ALPSetTooltipVisible,
  } = useTooltip(ALPContent, {
    trigger: 'hover',
    tootipStyle: { padding: '30px 30px 20px', backgroundColor: '#030222', maxWidth: '748px', minWidth: '400px' },
    placement: 'top-end',
    hideArrow: false,
    tooltipOffset: [20, 10],
    arrowBackground: '#030222',
  });
  return (
    <>
      <div
        onClick={() => {
          if (ALPTooltipVisible) {
            ALPSetTooltipVisible(false);
          }
        }}
      >
        {/* {ALPTooltip} */}
        {ALPTooltipVisible && ALPTooltip}
      </div>
      <NavWrap>
        {menuItems.map((item: IMenu, index) => (
          <NavLink
            to={item.link}
            key={index}
            ref={item.text === 'aLP/aToken' ? ALPTargetRef : undefined}
            onClick={() => {
              if (item.link.indexOf('https://') > -1) {
                window.open(item.link);
                return;
              }
            }}
            active={
              (
                item.link === '/'
                  ? pathname === item.link
                  : ['/add', '/remove', '/liquidity'].find((p) => pathname.startsWith(p))
                  ? item.link === '/swap'
                  : ['/nft/pools', '/nft/wallet/mint', '/nft/wallet/burn'].find((p) => pathname.startsWith(p))
                  ? item.link === '/nft/pools/'
                  : ['/stake', '/unbind', '/unstake'].find((p) => pathname.startsWith(p))
                  ? item.link === '/stake'
                  : pathname.startsWith(item.link)
              )
                ? 't'
                : 'f'
            }
          >
            {item.text}
            {item.children?.length && <CollapseSvg />}
          </NavLink>
        ))}
        {/* <IconMoreStyle ref={MoreTargetRef}>
          <IconMore />
        </IconMoreStyle> */}
        {/* <NavLinkA href="https://cbridge.celer.network/#/transfer" target="_blank" rel="noreferrer" title="">
          Bridge
          <IconLink />
        </NavLinkA> */}
        {/* <NavLinkA href="https://portal.astar.network/#/balance/wallet" target="_blank" rel="noreferrer" title="">
          Faucet
          <IconLink />
        </NavLinkA> */}
        <NavLinkA href="https://co-go.gitbook.io/avault/" target="_blank" rel="noreferrer" title="">
          Doc
          <IconLink />
        </NavLinkA>
      </NavWrap>
    </>
  );
};

const NavWrap = styled(Flex)`
  align-items: center;
  justify-content: flex-start;
  a:hover {
    color: ${({ theme }) => theme.colors.text};
    svg {
      fill: ${({ theme }) => theme.colors.text};
      transform: rotateZ(180deg);
    }
  }
`;
const NavLink = styled(Link)<{ active: 't' | 'f' }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme, active }) => (active === 't' ? theme.colors.text : theme.colors.textSubtle)};
  height: 40px;
  transition: all 0.3s ease;
  font-weight: 600;
  margin-right: 34px;
  svg {
    width: 24px;
    fill: ${({ theme, active }) => (active === 't' ? theme.colors.text : theme.colors.textSubtle)};
    transform: ${({ active }) => (active === 't' ? 'rotateZ(180deg)' : '')};
  }
`;

const NavLinkA = styled.a`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSubtle};
  height: 40px;
  transition: all 0.3s ease;
  font-weight: 600;
  margin-right: 34px;
  img {
    width: 20px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    svg {
      fill: ${({ theme }) => theme.colors.text};
      transform: rotateZ(180deg);
      path {
        stroke: #fff;
      }
    }
  }
`;

export default BigNav;
