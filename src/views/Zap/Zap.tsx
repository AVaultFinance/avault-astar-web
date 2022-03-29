import { Heading, Text, Flex, Input, Button } from '@avault/ui';
import PageLayout from 'components/Layout/Page';
import { BgGlobalStyle } from 'style/Global';
import styled from 'styled-components';
import { W480BorderPageLayout, PageContainerWrap, MaxButton, TableContent } from 'style/SmallBorderPageLayout';
import ZapBg from './components/ZapBg';
import { fromCurrency as _fromCurrency, toCurrency as _toCurrency } from './utils/constants';
import { useState } from 'react';
import ZapCurrencyInputPanel from './components/ZapCurrencyInputPanel';

const Zap = () => {
  const [fromCurrency, setFromCurrency] = useState(_fromCurrency);
  const [toCurrency, setToCurrency] = useState(_toCurrency);
  return (
    <PageLayout>
      <BgGlobalStyle />
      <PageContainerWrap>
        <W480BorderPageLayout>
          <TableContent>
            <TitleStyled>Zap</TitleStyled>
            <TextStyled>Convert single tokens to LP tokens directly</TextStyled>
            <InnerStyled>
              <PaddingStyled>
                <TextCol>
                  <BoldStyled>From</BoldStyled>
                  <TextCol>
                    <BalanceStyled>Balance:198211BNB</BalanceStyled>
                    <MaxButtonStyled variant="text">Max</MaxButtonStyled>
                  </TextCol>
                </TextCol>

                <TextCol>
                  <ZapCurrencyInputPanel
                    currency={fromCurrency}
                    otherCurrency={toCurrency}
                    setCurrency={setFromCurrency}
                    isTo={false}
                  />
                  <StyledInput
                    pattern={`^[0-9]*[.,]?[0-9]{0,8}$`}
                    inputMode="decimal"
                    step="any"
                    min="0"
                    // onChange={handleChange}
                    placeholder="0"
                    // value={val}
                  />
                </TextCol>
              </PaddingStyled>
              <PaddingStyled>
                <TextCol>
                  <BoldStyled>TO LP</BoldStyled>
                  <BalanceStyled>Balance:198211 LP</BalanceStyled>
                </TextCol>

                <TextCol>
                  <ZapCurrencyInputPanel
                    currency={toCurrency}
                    otherCurrency={fromCurrency}
                    setCurrency={setToCurrency}
                    isTo={true}
                  />
                  <Heading>0</Heading>
                </TextCol>
              </PaddingStyled>
            </InnerStyled>
            <Button width="100%" padding="0">
              Confirm
            </Button>
          </TableContent>
          <ZapBgStyled />
        </W480BorderPageLayout>
      </PageContainerWrap>
    </PageLayout>
  );
};
const ZapBgStyled = styled(ZapBg)`
  position: absolute;
  width: 210px;
  top: 0;
  right: 8px;
`;

const MaxButtonStyled = styled(MaxButton)`
  font-size: 12px;
`;
const BoldStyled = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSubtle};
`;
const BalanceStyled = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSubtle};
`;
const InnerStyled = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  margin-bottom: 30px;
`;
const StyledInput = styled(Input)`
  box-shadow: none;
  padding: 0;
  border-width: 0px;
  background-color: rgba(0, 0, 0, 0);
  width: 80%;
  text-align: right;
`;
const TextCol = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;
const PaddingStyled = styled.div`
  padding: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBackground};
  &:last-child {
    border-bottom: none;
  }
`;

const TitleStyled = styled(Heading)`
  font-size: 20px;
  padding-bottom: 12px;
`;
const TextStyled = styled(Text)`
  font-size: 14px;
  padding-bottom: 30px;
`;
export default Zap;
