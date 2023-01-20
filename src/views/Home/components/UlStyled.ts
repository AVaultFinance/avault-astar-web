import styled from 'styled-components';
export const UlStyled = styled.ul`
  display: none;
  list-style: none;
  margin-right: 40px;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
    height: 40px;
    line-height: 40px;
  }
  li {
    margin: 0 10px;
    display: inline-block;
    vertical-align: middle;
    &:last-child {
      img {
        width: 25px;
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
