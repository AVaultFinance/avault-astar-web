import styled from 'styled-components';

const ComingSoon = () => {
  return (
    <ComingSoonStyled>
      <img src="./images/ComingSoon.svg" alt="" />
      {/* <h2>Coming Soon</h2> */}
    </ComingSoonStyled>
  );
};
const ComingSoonStyled = styled.div`
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 20px 40px;
  border-radius: 20px;
  text-align: center;
  h2 {
    padding-top: 20px;
    padding-bottom: 20px;
    color: ${({ theme }) => theme.colors.text};
  }
  img {
    width: 180px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 40px 80px;
    img {
      width: 220px;
    }
  }
`;
export default ComingSoon;
