import { Button, Flex } from '@my/ui';
import HeaderLogo from 'components/SideMenu/Logo';
import styled from 'styled-components';
import { Link } from '..';
interface IProps {
  collapsed: boolean;
}
const HomeHeader = ({ collapsed }: IProps) => {
  return (
    <HomeHeaderStyled>
      <HeaderLogo collapsed={collapsed} />
      <div className="fr">
        <UlStyled>
          {Link.map((v, index) => (
            <li key={index}>
              <a href={v.link} target="_blank" rel="noreferrer">
                <img src={`/images/${v.name.toLowerCase()}.svg`} alt={v.name} />
              </a>
            </li>
          ))}
        </UlStyled>
        <ButtonStyled>
          <a href="/vault">Launch Dapp</a>
        </ButtonStyled>
      </div>
    </HomeHeaderStyled>
  );
};
export default HomeHeader;
const HomeHeaderStyled = styled(Flex)`
  padding: 40px 0;
  max-width: 1208px;
  margin: 0 auto;
  align-content: center;
  justify-content: space-between;
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
  background-image: linear-gradient(90deg, #a428d0 0%, #20d4a9 100%);
  width: 136px;
  padding: 0;
  cursor: pointer;
  a {
    display: block;
    height: 36px;
    width: 200px;
    line-height: 36px;
  }
`;

const UlStyled = styled.ul`
  list-style: none;
  margin-right: 40px;
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
