import { createGlobalStyle } from 'styled-components';
const HomeGlobalStyle = createGlobalStyle`
  body{
    ${({ theme }) => theme.mediaQueries.md} {
      padding: 0;
    }
  }
`;
export default HomeGlobalStyle;
