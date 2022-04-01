import styled from 'styled-components';
import React, { useCallback, useState } from 'react';
import { Button, Flex, useMatchBreakpoints, Modal, Input, Heading } from '@avault/ui';
import { tokenIndex } from 'views/Zap/constants/data';
import { IVault } from 'state/vault/types';
import ZapCurrencyLogo from 'views/Zap/components/ZapCurrencyLogo';
import ZapBalance from 'views/Zap/components/ZapBalance';
import Loading from 'components/TransactionConfirmationModal/Loading';
import { MaxButton } from 'style/SmallBorderPageLayout';
import { IToken } from 'views/Zap/utils/types';
import useZapContract, { useApprove, useHandleApproved, zapAddress } from 'views/Zap/constants/contract';
import useToast from 'hooks/useToast';
import useDebounce from 'hooks/useDebounce';
import BigNumber from 'bignumber.js';
interface RemoveLiquidityModalProps {
  vault: IVault;
  index: number;
  account: string;
  onDismiss?: () => void;
}
const RemoveLiquidityModal: React.FC<RemoveLiquidityModalProps> = ({ vault, account, index, onDismiss }) => {
  const [val, setVal] = useState('');
  const [fullBalance, setMax] = useState('0');
  const [pendingTx, setPendingTx] = useState(false);
  const valNumber = useDebounce(new BigNumber(val ?? '0'), 100);
  const [isLoaded, setIsLoaded] = useState(false);

  const { isMd, isXl, isLg } = useMatchBreakpoints();
  const isMobile = !(isMd || isXl || isLg);

  const token: IToken = tokenIndex[index][1];
  const fromCurrency = token.token;
  const toCurrency = token.token;

  const { toastSuccess, toastError } = useToast();

  const { handleZapClick } = useZapContract(zapAddress, fromCurrency, toCurrency);
  const { fetchApprove } = useHandleApproved(fromCurrency, account, zapAddress);

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setVal],
  );

  const isApprove = useApprove(isLoaded, setPendingTx, fromCurrency, toCurrency, account, zapAddress);

  const zapComfirm = useCallback(async () => {
    setPendingTx(true);
    try {
      const result = await handleZapClick(val, account);
      // console.log(res);
      if (typeof result === 'boolean' && result) {
        toastSuccess(
          'Successfully claimed!',
          `Your ${fromCurrency.symbol} to ${toCurrency.symbol} Zap Successfully claimed!`,
        );
      } else {
        const message = result ? result : `Your ${fromCurrency.symbol} to ${toCurrency.symbol} Zap failed!`;
        toastError('Error', message);
      }
    } catch (e: any) {
      toastError('Error', e.message ? e.message : `Your ${fromCurrency.symbol} to ${toCurrency.symbol} Zap failed!`);
    } finally {
      setVal('');
      setPendingTx(false);
    }
  }, [account, fromCurrency, toCurrency, val, handleZapClick, toastSuccess, toastError]);

  const zapApprove = useCallback(async () => {
    try {
      setPendingTx(true);
      const result = await fetchApprove();
      if (typeof result === 'boolean' && result) {
        setIsLoaded(true);
        toastSuccess('Approve!', 'Your are Approved');
        setIsLoaded(false);
      } else {
        const message = result ? result : 'Your approved failed';
        toastError('Approve!', message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPendingTx(false);
    }
  }, [fetchApprove, toastError, toastSuccess]);
  return (
    <Modal
      title={`Remove LP`}
      minWidth={isMobile ? '343px' : '480px'}
      headerPadding={isMobile ? '0 16px' : '20px 30px 6px'}
      bodyPadding={isMobile ? '0 16px' : '0 30px 30px'}
      onDismiss={onDismiss}
    >
      <TitleStyled>
        {vault.lpDetail.symbol}
        {' > '}
        {fromCurrency.symbol}+{toCurrency.symbol}
      </TitleStyled>
      <Flex alignItems="center" justifyContent="end" paddingTop="4px">
        <ZapBalance account={account} currency={token} setMax={setMax} />
        <MaxButtonStyled variant="text" onClick={handleSelectMax}>
          Max
        </MaxButtonStyled>
      </Flex>
      <InnerStyled border={Number(`${val}`) > 0}>
        <FlexCol>
          <FlexCol>
            <ZapCurrencyLogo currency={token} />
            <TokenStyled>{vault.lpDetail.symbol}</TokenStyled>
          </FlexCol>
          <Flex alignItems="end" justifyContent="center" flexDirection="column">
            <StyledInput
              pattern={`^[0-9]*[.,]?[0-9]{0,8}$`}
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="0"
              value={val}
              onChange={handleChange}
            />
          </Flex>
        </FlexCol>
      </InnerStyled>
      <Button
        onClick={() => {
          if (isApprove) {
            zapComfirm();
          } else {
            zapApprove();
          }
        }}
        isLoading={pendingTx}
        disabled={
          account &&
          isApprove &&
          (pendingTx ||
            !valNumber.isFinite() ||
            valNumber.eq(0) ||
            valNumber.gt(fullBalance) ||
            fromCurrency.symbol === toCurrency.symbol)
        }
      >
        {isApprove ? 'Confirm' : 'Approve'}
        <Loading isLoading={pendingTx} success={true} />
      </Button>
    </Modal>
  );
};
const StyledInput = styled(Input)`
  box-shadow: none;
  padding: 0;
  border-width: 0px;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  text-align: right;
  font-size: 18px;
`;

const MaxButtonStyled = styled(MaxButton)`
  font-size: 12px;
  height: 30px;
`;
const FlexCol = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;
const TokenStyled = styled(Heading)`
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
`;
const InnerStyled = styled.div<{ border: boolean }>`
  background: ${({ theme }) => theme.colors.background};
  transition: all 0.3s ease;
  border-radius: 12px;
  position: relative;
  margin-bottom: 30px;
  border: 1px solid ${({ theme, border }) => (border ? theme.colors.text : theme.colors.borderColor)};
  padding: 10px 20px;
`;
const TitleStyled = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: 600;
`;
export default RemoveLiquidityModal;
