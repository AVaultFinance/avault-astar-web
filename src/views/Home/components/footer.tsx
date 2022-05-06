import HeaderLogo from 'components/SideMenu/Logo';
import { Link } from '..';
import styled from 'styled-components';
import { Flex } from '@my/ui';
interface IProps {
  collapsed: boolean;
}
const HomeFooter = ({ collapsed }: IProps) => {
  return (
    <HomeFooterStyled>
      <UlStyled>
        {Link.map((v, index) => (
          <li key={index}>
            <a href={v.link} target="_blank" rel="noreferrer">
              <img src={`/images/${v.name.toLowerCase()}.svg`} alt={v.name} />
            </a>
          </li>
        ))}
      </UlStyled>
      <HeaderLogo collapsed={collapsed} />
    </HomeFooterStyled>
  );
};
const HomeFooterStyled = styled(Flex)`
  max-width: 1208px;
  margin: 0 auto;
  align-content: center;
  justify-content: space-between;
  padding: 85px 0 65px;
`;
const UlStyled = styled.ul`
  list-style: none;
  li {
    margin: 0 10px;
    display: inline-block;
    &:last-child {
      img {
        width: 28px;
      }
    }
    a {
      display: block;
      cursor: pointer;
      opacity: 1;
      transition: all 0.3s ease;
      &:hover {
        opacity: 0.6;
      }
    }
    img {
      display: block;
      width: 32px;
    }
  }
`;
export default HomeFooter;
