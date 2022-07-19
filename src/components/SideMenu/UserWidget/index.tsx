import styled from 'styled-components';
import { Flex, useMatchBreakpoints } from '@my/ui';
import WalletAccountInfo from './WalletAccount';
import { useVaultAllTotal } from 'state/vault/hooks';
// import Balance from 'components/Balance';
import CountUp from 'react-countup';
import { useEffect, useMemo, useRef } from 'react';
const TextLinerStyle = styled(Flex)`
  font-size: 18px;
  background: linear-gradient(270deg, #00f4b9 0%, #ff4afb 100%);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 600;
  margin-bottom: 0;
  margin-top: 0;
  align-items: center;
  justify-content: start;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 10px;
    margin-top: 30px;
  }
`;
const UserWidget = () => {
  const { isMd, isSm, isXs } = useMatchBreakpoints();
  const isMobile = isMd || isSm || isXs;
  const allTotal = useVaultAllTotal();
  const previousValue = useRef(0);

  useEffect(() => {
    previousValue.current = Number(allTotal);
  }, [allTotal]);
  return useMemo(() => {
    return (
      <User>
        {/* <SwitchChain /> */}
        {/* <Flex alignItems="center" justifyContent="start"> */}
        <TextLinerStyle>
          <p>TVL: $</p>
          <CountUp
            useEasing={true}
            // formattingFn={(d: number) =>
            //   `${Number(
            //     `${new BigNumber(`${previousValue.current}`).toFixed(decimals, BigNumber.ROUND_DOWN)}`,
            //   ).toLocaleString('en-US', {
            //     maximumFractionDigits: decimals,
            //   })}`
            // }
            start={previousValue.current}
            end={Number(allTotal)}
            decimals={2}
            duration={10}
            separator=","
          />
          {/* <Balance color="none" fontSize="18px" fontWeight="600" decimals={2} value={Number(allTotal)} /> */}
        </TextLinerStyle>
        {/* </Flex> */}
        {isMobile ? null : <WalletAccountInfo />}
      </User>
    );
  }, [allTotal, isMobile]);
};
const User = styled(Flex)`
  flex-direction: column;
  align-items: end;
`;

export default UserWidget;
