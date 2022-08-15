import { useMemo } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Text } from '@my/ui';
import { ALPPathConfig, IMenuDetail } from '../config';
export const ALPContentIn = ({ setTooltipVisible }: { setTooltipVisible?: any }) => {
  const { pathname } = useLocation();
  return useMemo(
    () => (
      <ALPContentInStyled>
        {ALPPathConfig.map((item: IMenuDetail, index) => (
          <NavLink
            href={item.link}
            key={index}
            // onClick={() => {
            //   if (item.link.indexOf('https://') > -1) {
            //     window.open(item.link);
            //     return;
            //   }
            //   if (setTooltipVisible) {
            //     setTooltipVisible(false);
            //   }
            // }}
            target="_blank"
            rel="noreferrer"
            isLast={index === ALPPathConfig.length - 1 ? true : false}
            active={pathname.startsWith(item.link) ? 't' : 'f'}
          >
            <div className="icon-holder">
              {typeof item.img === 'string' ? <img src={item.img} alt={item.text} /> : item.img()}
            </div>
            <div className="fr_text">
              <h3>{item.text}</h3>
              <DetailText>{item.detail}</DetailText>
            </div>
            <div className="fr_arr">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                <defs>
                  <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="ori3sxjrja">
                    <stop stopColor="#A428D0" offset="0%" />
                    <stop stopColor="#20D4A9" offset="100%" />
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <rect fill="url(#ori3sxjrja)" width="36" height="24" rx="8" />
                  <path
                    d="M20.4,8 C20.47897,8 20.5561731,8.02337521 20.6218801,8.06717988 L26,11.6525932 L20.6218801,15.2380064 C20.4380686,15.3605474 20.1897209,15.3108779 20.0671799,15.1270664 C20.0233752,15.0613594 20,14.9841563 20,14.9051863 L19.999,12.652 L12,12.6525932 C11.4477153,12.6525932 11,12.2048779 11,11.6525932 C11,11.1003084 11.4477153,10.6525932 12,10.6525932 L20,10.6525932 L20,8.4 C20,8.1790861 20.1790861,8 20.4,8 Z"
                    fill="#FFF"
                  />
                </g>
              </svg>
            </div>
          </NavLink>
        ))}
      </ALPContentInStyled>
    ),
    [pathname],
  );
};
const ALPContentInStyled = styled.div`
  padding-right: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-right: 0;
  }
  .link_noreferrer {
    text-align: center;
    display: block;
    font-size: 12px;
    color: #6a6991;
    padding-top: 20px;
    transition: color 0.3s ease;
    &:hover {
      color: #fff;
      svg {
        fill: #fff;
      }
    }
    svg {
      transition: fill 0.3s ease;
      fill: #6a6991;
      width: 20px;
    }
  }
`;
const DetailText = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 12px;
  font-weight: 500;
`;
const NavLink = styled.a<{ active: 't' | 'f'; isLast: boolean }>`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 336px;
  }
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  transition: all 0.3s ease;
  padding: 16px;
  border-radius: 12px;
  margin-right: ${({ isLast }) => (isLast ? '0' : '34px')};
  margin-top: ${({ isLast }) => (isLast ? '0' : '10px')};
  background-color: #181733;
  border: 1px solid ${({ active }) => (active === 't' ? '#fff' : '#2E2D5B')};
  .fr_text {
    width: 66%;
  }
  .fr_arr {
    width: 14%;
    transition: opacity 0.3s ease;
    opacity: 0;
  }
  .icon-holder {
    width: 30px;
    height: 30px;
    // height: 60px;
    // ${({ theme }) => theme.mediaQueries.sm} {
    //   height: 30px;
    // }
    // ${({ theme }) => theme.mediaQueries.md} {
    //   // height: 60px;
    // }
  }
  h3 {
    padding: 4px 0;
  }
  &:hover {
    border-color: #fff;
    .fr_arr {
      opacity: 1;
    }
  }
`;
const ALPContent = (
  <>
    <ALPContentIn />
  </>
);
export default ALPContent;
