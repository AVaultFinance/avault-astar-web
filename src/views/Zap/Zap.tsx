import { Heading, Text, Flex, Input, Button, useWalletModal } from '@avault/ui';
import PageLayout from 'components/Layout/Page';
import { BgGlobalStyle } from 'style/Global';
import styled from 'styled-components';
import { W480BorderPageLayout, PageContainerWrap, MaxButton, TableContent } from 'style/SmallBorderPageLayout';
import ZapBg from './components/ZapBg';
import {
  fromCurrency as _fromCurrency,
  toCurrency as _toCurrency,
  zapLocalFromCurrency,
  zapLocalToCurrency,
} from './constants/data';
import { useCallback, useState } from 'react';
import ZapCurrencyInputPanel from './components/ZapCurrencyInputPanel';
import { IToken, ITokenType } from './utils/types';
import ZapBalance from './components/ZapBalance';
import BigNumber from 'bignumber.js';
import useToast from 'hooks/useToast';
import { useEstimatedPrice } from './utils/utils';
import useZapContract, { useApprove, useHandleApproved, zapAddress } from './constants/contract';
import Loading from 'components/TransactionConfirmationModal/Loading';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { DEFAULT_GAS_LIMIT } from 'config';
import useDebounce from 'hooks/useDebounce';
import useAuth from 'hooks/useAuth';
import ArrowDown from 'views/Stake/components/svg/arrow_down';
const Zap = () => {
  const { account } = useActiveWeb3React();
  const [fromCurrency, setFromCurrency] = useState(_fromCurrency);
  const [toCurrency, setToCurrency] = useState(_toCurrency);
  const [fullBalance, setMax] = useState('0');
  const [val, setVal] = useState('');
  const { handleZapClick } = useZapContract(zapAddress, fromCurrency, toCurrency);
  const [pendingTx, setPendingTx] = useState(false);
  const [pendingTxSuccess, setPendingTxSuccess] = useState(true);
  const valNumber = useDebounce(new BigNumber(val ?? '0'), 200);
  const { toastSuccess, toastError, toastWarning } = useToast();
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setVal],
  );
  // console.log({
  //   aa: getCodec(
  //     hexToUint8Array(
  //       '0x00200040000100000000400080000000000000000000000000000000000011000000000000000000000000000000000000100000000002000000000000000000000000000000000000000008000000200000000000880000000000008000000a00000000020000000000000000000800000000000008800000000012000000000000000000000000000004000000000040000001000000090000004000000000000000800100000000000000000000000000000000000008000000000000000000000002000000000000000000020042000000000000001040000000000020000000000000000000000000000000000000000000100000400000000100000000',
  //     ) as Buffer,
  //   ),
  // });
  const handleSelectMax = useCallback(() => {
    if (fromCurrency.type === ITokenType.MAIN) {
      // console.log(fullBalance, (DEFAULT_GAS_LIMIT * 1000000000) / Math.pow(10, 18));
      if (fullBalance && Number(fullBalance) <= (DEFAULT_GAS_LIMIT * 1000000000) / Math.pow(10, 18)) {
        toastWarning('Warn', `Your ${fromCurrency.symbol} balance is insufficient!`);
        return;
      }
      setVal(
        new BigNumber(`${Number(fullBalance) - (DEFAULT_GAS_LIMIT * 1000000000) / Math.pow(10, 18)}`).toFixed(
          5,
          BigNumber.ROUND_DOWN,
        ),
      );
    } else {
      // console.log(fullBalance);
      setVal(fullBalance);
    }
  }, [fullBalance, toastWarning, setVal, fromCurrency]);
  const EstimatedPrice = useEstimatedPrice(val, fromCurrency, toCurrency, valNumber);
  const zapComfirm = useCallback(async () => {
    setPendingTx(true);
    try {
      const res = await handleZapClick(val, account);
      // console.log(res);
      if (res) {
        toastSuccess('Staked!', 'Your funds have been staked in the farm');
        setTimeout(() => {
          setPendingTxSuccess(true);
        }, 10000);
      } else {
        toastError('Error', `Your ${fromCurrency.symbol} to ${toCurrency.symbol} Zap failed!`);
        setPendingTxSuccess(false);
        setTimeout(() => {
          setPendingTxSuccess(true);
        }, 1500);
      }
    } catch (e) {
      toastError('Error', `Your ${fromCurrency.symbol} to ${toCurrency.symbol} Zap failed!`);
      setPendingTxSuccess(false);
      setTimeout(() => {
        setPendingTxSuccess(true);
      }, 1500);
    } finally {
      setVal('');

      setPendingTx(false);
    }
  }, [account, fromCurrency, toCurrency, val, handleZapClick, toastSuccess, toastError]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);
  const { fetchApprove } = useHandleApproved(fromCurrency, account, zapAddress);
  const isApprove = useApprove(isLoaded, setPendingTx, fromCurrency, account, zapAddress);
  const zapApprove = useCallback(async () => {
    if (!account) {
      onPresentConnectModal();
      return;
    }
    try {
      setPendingTx(true);
      const result = await fetchApprove();
      if (result) {
        setIsLoaded(true);
        toastSuccess('Approve!', 'Your are Approved');
        setIsLoaded(false);
        setTimeout(() => {
          setPendingTxSuccess(true);
        }, 10000);
      } else {
        toastError('Approve!', 'Your approved failed');
        setPendingTxSuccess(false);
        setTimeout(() => {
          setPendingTxSuccess(true);
        }, 1500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPendingTx(false);
    }
  }, [account, fetchApprove, onPresentConnectModal, toastError, toastSuccess]);
  // console.log({ isApprove });
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
                    <ZapBalance account={account} currency={fromCurrency} setMax={setMax} />
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
                      localStorage.setItem(zapLocalFromCurrency, JSON.stringify(currency));
                      setVal('');
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
                  {/* <ZapBalance currency={toCurrency} /> */}
                </TextCol>

                <TextCol>
                  <ZapCurrencyInputPanel
                    currency={toCurrency}
                    otherCurrency={fromCurrency}
                    setCurrency={(currency: IToken) => {
                      localStorage.setItem(zapLocalToCurrency, JSON.stringify(currency));
                      setVal('');
                      setToCurrency(currency);
                    }}
                    isTo={true}
                  />
                  <HeadingStyled isSmall={EstimatedPrice === '0'} isLong={EstimatedPrice.length > 16}>
                    {EstimatedPrice}
                  </HeadingStyled>
                </TextCol>
              </PaddingStyled>
              <ArrowDown />
            </InnerStyled>
            <Button
              isLoading={pendingTx}
              disabled={
                isApprove &&
                (pendingTx ||
                  !valNumber.isFinite() ||
                  valNumber.eq(0) ||
                  valNumber.gt(fullBalance) ||
                  fromCurrency.symbol === toCurrency.symbol)
              }
              width="100%"
              padding="0"
              onClick={() => {
                if (isApprove) {
                  zapComfirm();
                } else {
                  zapApprove();
                }
              }}
            >
              {isApprove ? 'Confirm' : 'Approve'}
              <Loading isLoading={pendingTx} success={pendingTxSuccess} />
            </Button>
          </TableContent>
          <ZapBgStyled />
        </W480BorderPageLayout>
      </PageContainerWrap>
    </PageLayout>
  );
};
const HeadingStyled = styled(Heading)<{ isSmall: boolean; isLong: boolean }>`
  font-size: ${({ isLong }) => (isLong ? '14px' : '18px')};
  color: ${({ theme, isSmall }) => (isSmall ? theme.colors.textSubtle : theme.colors.text)};
`;
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
  position: relative;
`;
const StyledInput = styled(Input)`
  box-shadow: none;
  padding: 0;
  border-width: 0px;
  background-color: rgba(0, 0, 0, 0);
  width: 80%;
  text-align: right;
  font-size: 18px;
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
  font-weight: 600;
  width: 60%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
  }
`;
export default Zap;
