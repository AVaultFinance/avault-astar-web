import { Heading, Text, Flex, Input, Button } from '@avault/ui';
import PageLayout from 'components/Layout/Page';
import { BgGlobalStyle } from 'style/Global';
import styled from 'styled-components';
import { W480BorderPageLayout, PageContainerWrap, MaxButton, TableContent } from 'style/SmallBorderPageLayout';
import ZapBg from './components/ZapBg';
import { fromCurrency as _fromCurrency, toCurrency as _toCurrency } from './constants/data';
import { useCallback, useState } from 'react';
import ZapCurrencyInputPanel from './components/ZapCurrencyInputPanel';
import { IToken } from './utils/types';
import ZapBalance from './components/ZapBalance';
import { BIG_ZERO } from 'utils/bigNumber';
import BigNumber from 'bignumber.js';
import useToast from 'hooks/useToast';
import { useEstimatedPrice } from './utils/utils';

const Zap = () => {
  const [fromCurrency, setFromCurrency] = useState(_fromCurrency);
  const [toCurrency, setToCurrency] = useState(_toCurrency);
  const [fullBalance, setMax] = useState(BIG_ZERO);
  const [val, setVal] = useState('');
  const [pendingTx, setPendingTx] = useState(false);
  const valNumber = new BigNumber(val);
  const { toastSuccess, toastError } = useToast();
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setVal],
  );
  const handleSelectMax = useCallback(() => {
    setVal(fullBalance.toString());
  }, [fullBalance, setVal]);
  const EstimatedPrice = useEstimatedPrice(fromCurrency, toCurrency, valNumber);
  const zapComfirm = useCallback(async () => {
    setPendingTx(true);
    try {
      // await onConfirm(val);
      toastSuccess('Staked!', 'Your funds have been staked in the farm');
    } catch (e) {
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
      console.error(e);
    } finally {
      setPendingTx(false);
    }
  }, [toastSuccess, toastError]);
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
                    <ZapBalance currency={fromCurrency} setMax={setMax} />
                    <MaxButtonStyled variant="text" onClick={handleSelectMax}>
                      Max
                    </MaxButtonStyled>
                  </TextCol>
                </TextCol>

                <TextCol>
                  <ZapCurrencyInputPanel
                    currency={fromCurrency}
                    otherCurrency={toCurrency}
                    setCurrency={(currency: IToken) => {
                      setFromCurrency(currency);
                    }}
                    isTo={false}
                  />
                  <StyledInput
                    pattern={`^[0-9]*[.,]?[0-9]{0,8}$`}
                    inputMode="decimal"
                    step="any"
                    min="0"
                    placeholder="0"
                    value={val}
                    onChange={handleChange}
                  />
                </TextCol>
              </PaddingStyled>
              <PaddingStyled>
                <TextCol>
                  <BoldStyled>TO LP</BoldStyled>
                  <ZapBalance currency={toCurrency} />
                </TextCol>

                <TextCol>
                  <ZapCurrencyInputPanel
                    currency={toCurrency}
                    otherCurrency={fromCurrency}
                    setCurrency={setToCurrency}
                    isTo={true}
                  />
                  <Heading>{EstimatedPrice}</Heading>
                </TextCol>
              </PaddingStyled>
            </InnerStyled>
            <Button
              // disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalance)}
              width="100%"
              padding="0"
              onClick={zapComfirm}
            >
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
  padding: 10px 20px;
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
