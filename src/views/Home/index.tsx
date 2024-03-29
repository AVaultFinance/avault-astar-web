import { useMatchBreakpoints } from '@my/ui';
import BackTop from 'components/BackTop';
import { useEffect, useMemo, useState } from 'react';
import HomeGlobalStyle from 'style/HomeGlobal';
import styled from 'styled-components';
import Banner from './components/banner';
import Data from './components/data';
import HomeFooter from './components/footer';
import HomeHeader from './components/header';
import HomeModules from './components/modules';
import HomePartners from './components/partners';
// import Sign from './Sign';
// import HomeTvl from './components/tvl';
export const Link = [
  { name: 'Discord', link: 'https://discord.gg/WcARFMy2t8' },
  { name: 'Github', link: 'https://github.com/AVaultFinance ' },
  { name: 'Twitter', link: 'https://twitter.com/Avaultomni ' },
  { name: 'Medium', link: 'https://medium.com/@avault ' },
  { name: 'doc', link: 'https://co-go.gitbook.io/avault/ ' },
];

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isXs, isSm, isMd } = useMatchBreakpoints();
  useEffect(() => {
    doScroll();
    window.addEventListener('scroll', doScroll);
    return () => window.removeEventListener('scroll', doScroll);
    // eslint-disable-next-line
  }, []);
  const doScroll = () => {
    const animates: NodeListOf<Element> = document.querySelectorAll('.animate');
    for (const dom of animates as any) {
      const top = dom.offsetTop;
      const scrollTop = window.scrollY;
      const innerHeight = window.innerHeight;

      if (scrollTop + innerHeight - innerHeight / 10 > top) {
        dom.className = dom.className.replace('animate', dom.dataset.animate);
      }
    }
  };

  useEffect(() => {
    if ([isXs, isSm, isMd].some(Boolean)) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isXs, isSm, isMd]);

  return useMemo(
    () => (
      <HomeStyled>
        {/* <Sign /> */}
        <HomeGlobalStyle />
        <HomeHeader collapsed={collapsed} />
        <Banner />
        <Data />
        {/* <Line /> */}
        {/* <HomeTvl /> */}
        {/* <Line /> */}
        <HomeModules />
        <HomePartners />
        <Line />
        <HomeFooter collapsed={collapsed} />
        <BackTop />
      </HomeStyled>
    ),
    [collapsed],
  );
};
const HomeStyled = styled.div`
  background-color: #161528;
  h2,
  h3 {
    // color: #fff;
  }
`;
const Line = styled.div`
  height: 1px;
  background-color: #2e2d50;
  // max-width: 1208px;
  margin: 0 auto;
  position: relative;

  // &:after {
  //   content: '';
  //   position: absolute;
  //   width: 40%;
  //   height: 1px;
  //   background-color: #2e2d50;
  //   top: 0;
  //   right: -40%;
  // }
`;
export default Home;
