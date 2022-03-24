import { Heading, Text, Flex, Input, Button } from '@avault/ui';
import { TokenPairImage } from 'components/TokenImage';
import PageLayout from 'components/Layout/Page';
import { BgGlobalStyle } from 'style/Global';
import styled from 'styled-components';
import { W480BorderPageLayout, PageContainerWrap, MaxButton, ArrowIcon } from 'style/SmallBorderPageLayout';
const InnerStyled = styled.div`
  background: ${({ theme }) => theme.colors.background};
`;
const StyledInput = styled(Input)`
  box-shadow: none;
  padding: 0;
  border-width: 0px;
  background-color: rgba(0, 0, 0, 0);
  width: 80%;
  text-align: right;
`;
const TextCol = styled(Flex)``;
const Zap = () => {
  return (
    <PageLayout>
      <BgGlobalStyle />
      <PageContainerWrap>
        <W480BorderPageLayout>
          <Heading>Zap</Heading>
          <Text>Convert single tokens to LP tokens directly</Text>
          <InnerStyled>
            <TextCol>
              <Text>From</Text>
              <div>
                <Text>Balance:198211BNB</Text>
                <MaxButton variant="text">Max</MaxButton>
              </div>
            </TextCol>

            <TextCol>
              <div>
                <img src="./images/tokens/SDN/0xAD6cAEb32CD2c308980a548bD0Bc5AA4306c6c18.png" alt="" />
                <Heading>BNB</Heading>
                <ArrowIcon color="primary" toggled={false} />
              </div>
              <div>
                <StyledInput
                  pattern={`^[0-9]*[.,]?[0-9]{0,8}$`}
                  inputMode="decimal"
                  step="any"
                  min="0"
                  // onChange={handleChange}
                  placeholder="0"
                  // value={val}
                />
              </div>
            </TextCol>
            <TextCol>
              <Text>TO LP</Text>
              <div>
                <Text>Balance:198211 LP</Text>
              </div>
            </TextCol>

            <TextCol>
              <div>
                <TokenPairImage
                  variant="inverted"
                  primaryToken="0xAD6cAEb32CD2c308980a548bD0Bc5AA4306c6c18"
                  secondaryToken="0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f"
                  width={60}
                  height={60}
                />
                <Heading>BNB/USDC</Heading>
                <ArrowIcon color="primary" toggled={false} />
              </div>
              <div>
                <StyledInput
                  pattern={`^[0-9]*[.,]?[0-9]{0,8}$`}
                  inputMode="decimal"
                  step="any"
                  min="0"
                  // onChange={handleChange}
                  placeholder="0"
                  // value={val}
                />
              </div>
            </TextCol>
          </InnerStyled>
          <Button
            width="100%"
            padding="0"
            // disabled={pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(balance)}
            // onClick={async () => {
            //   setPendingTx(true);
            //   try {
            //     await UseStakeDApp(contract, account, val);
            //     toastSuccess('Staked!', 'Your funds have been staked in the App');
            //   } catch (e) {
            //     toastError(
            //       'Error',
            //       'Please try again. Confirm the transaction and make sure you are paying enough gas!',
            //     );
            //     console.error(e);
            //   } finally {
            //     setPendingTx(false);
            //   }
            // }}
          >
            Confirm
            {/* {pendingTx ? 'Confirming' : ''} */}
          </Button>
        </W480BorderPageLayout>
      </PageContainerWrap>
    </PageLayout>
  );
};
export default Zap;
