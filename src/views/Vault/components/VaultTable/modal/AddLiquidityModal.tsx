import styled from 'styled-components';
import React, { useCallback, useState } from 'react';
import { Button, Flex, useMatchBreakpoints, Modal, Input, Heading } from '@avault/ui';
import { chainKey } from 'config';
import tokens, { chainId } from 'config/constants/tokens';
import { useDerivedMintInfo } from 'state/mint/hooks';
import { useCurrency } from 'hooks/Tokens';
import { tokenIndex } from 'views/Zap/constants/data';
import { IVault } from 'state/vault/types';
import ZapCurrencyLogo from 'views/Zap/components/ZapCurrencyLogo';
import ZapBalance from 'views/Zap/components/ZapBalance';
import IconAdd from 'components/svg/IconAdd';
import Loading from 'components/TransactionConfirmationModal/Loading';
import { MaxButton } from 'style/SmallBorderPageLayout';
interface AddLiquidityModalProps {
  vault: IVault;
  index: number;
  account: string;
  onDismiss?: () => void;
}
const AddLiquidityModal: React.FC<AddLiquidityModalProps> = ({ vault, account, index, onDismiss }) => {
  const [val, setVal] = useState('');
  const [fullBalance, setMax] = useState('0');

  const { isMd, isXl, isLg } = useMatchBreakpoints();
  const isMobile = !(isMd || isXl || isLg);

  const token = tokenIndex[index][0];

  const fromCurrency = tokens[chainKey][token[0]];
  const toCurrency = tokens[chainKey][token[1]];

  const currencyIdA = fromCurrency.address[chainId];
  const currencyIdB = toCurrency.address[chainId];

  const currencyA = useCurrency(currencyIdA);
  const currencyB = useCurrency(currencyIdB);
  const { price } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined);

  console.log(`${fromCurrency.symbol} per ${toCurrency.symbol}`, price?.toSignificant(6) ?? '-');
  console.log(`${toCurrency.symbol} per ${fromCurrency.symbol}`, price?.invert()?.toSignificant(6) ?? '-');

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
  return (
    <Modal
      title={`Add Liquidity`}
      minWidth={isMobile ? '343px' : '480px'}
      headerPadding={isMobile ? '0 16px' : '20px 30px 6px'}
      bodyPadding={isMobile ? '0 16px' : '0 30px 30px'}
      onDismiss={onDismiss}
    >
      <TitleStyled>
        {fromCurrency.symbol}+{toCurrency.symbol} {' > '}
        {vault.lpDetail.symbol}
      </TitleStyled>
      <InnerStyled>
        <PaddingStyled>
          <FlexCol>
            <FlexCol>
              <ZapCurrencyLogo currency={fromCurrency} />
              <TokenStyled>{fromCurrency.symbol}</TokenStyled>
            </FlexCol>
            <Flex alignItems="end" justifyContent="center" flexDirection="column">
              <Flex alignItems="center" justifyContent="center" paddingTop="4px">
                <ZapBalance account={account} currency={fromCurrency} setMax={setMax} />
                <MaxButtonStyled variant="text" onClick={handleSelectMax}>
                  Max
                </MaxButtonStyled>
              </Flex>
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
        </PaddingStyled>
        <PaddingStyled>
          <FlexCol>
            <FlexCol>
              <ZapCurrencyLogo currency={toCurrency} />
              <TokenStyled>{toCurrency.symbol}</TokenStyled>
            </FlexCol>
            <Flex alignItems="end" justifyContent="center" flexDirection="column">
              <Flex alignItems="center" justifyContent="center" paddingTop="4px">
                <ZapBalance account={account} currency={toCurrency} setMax={setMax} />
                <MaxButtonStyled variant="text" onClick={handleSelectMax}>
                  Max
                </MaxButtonStyled>
              </Flex>
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
        </PaddingStyled>
        <IconAdd />
      </InnerStyled>
      <FlexCol>
        <SubtleBtnStyled variant="subtle">
          Approve {fromCurrency.symbol}
          <Loading isLoading={false} success={true} />
        </SubtleBtnStyled>
        <SubtleBtnStyled variant="subtle">
          Approve {toCurrency.symbol}
          <Loading isLoading={false} success={true} />
        </SubtleBtnStyled>
      </FlexCol>
      <Button marginTop="20px">
        {!account ? 'Connect Wallet' : `Add Liquidity`}
        <Loading isLoading={false} success={true} />
      </Button>
    </Modal>
  );
};
const SubtleBtnStyled = styled(Button)`
  height: 36px;
  width: 46%;
  font-weight: 600;
`;
const StyledInput = styled(Input)`
  box-shadow: none;
  padding: 0;
  border-width: 0px;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  text-align: right;
  font-size: 18px;
`;
const PaddingStyled = styled.div`
  padding: 10px 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBackground};
  &:last-child {
    border-bottom: none;
  }
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
const InnerStyled = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  margin-bottom: 30px;
  position: relative;
  margin: 20px 0;
`;
const TitleStyled = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-weight: 600;
`;
export default AddLiquidityModal;
