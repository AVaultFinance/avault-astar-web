import { Currency } from '@avault/sdk';
import { Flex, Heading } from '@avault/ui';
import Balance from 'components/Balance';
import { chainId } from 'config/constants/tokens';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { useCurrencyBalance } from 'state/wallet/hooks';
import styled from 'styled-components';
import { IToken, ITokenType } from '../utils/types';
import { currencyKey, isCurrencyEquals } from '../utils/utils';
import ZapCurrencyLogo from './ZapCurrencyLogo';

const ZapCurrencyList = ({
  height,
  currencies,
  fixedListRef,

  selectedCurrency,
  otherCurrency,
  onCurrencySelect,
  breakIndex,
}: {
  height: number;
  currencies: IToken[];
  fixedListRef: MutableRefObject<FixedSizeList | undefined>;

  selectedCurrency?: IToken | null;
  otherCurrency?: IToken | null;
  onCurrencySelect: (currency: IToken) => void;
  breakIndex?: number | undefined;
}) => {
  const itemData: (IToken | undefined)[] = useMemo(() => {
    const MAIN = {
      ...Currency.ETHER[chainId],
      type: ITokenType.MAIN,
      decimals: 18,
    };
    let formatted: (IToken | undefined)[] = [MAIN, ...currencies];
    if (breakIndex !== undefined) {
      formatted = [...formatted.slice(0, breakIndex), undefined, ...formatted.slice(breakIndex, formatted.length)];
    }
    return formatted;
  }, [breakIndex, currencies]);
  const itemKey = useCallback((index: number, data: any) => currencyKey(data[index]), []);
  const Row = useCallback(
    ({ data, index, style }) => {
      const currency: IToken = data[index];
      const isSelected = Boolean(selectedCurrency && isCurrencyEquals(selectedCurrency, currency));
      const otherSelected = Boolean(otherCurrency && isCurrencyEquals(otherCurrency, currency));
      const handleSelect = () => onCurrencySelect(currency);
      if (index === breakIndex || !data) {
        return null;
      }
      return (
        <CurrencyRow
          style={style}
          currency={currency}
          isSelected={isSelected}
          onSelect={handleSelect}
          otherSelected={otherSelected}
        />
      );
    },
    [breakIndex, onCurrencySelect, otherCurrency, selectedCurrency],
  );
  return (
    <FixedSizeList
      height={height}
      ref={fixedListRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={60}
      itemKey={itemKey}
    >
      {Row}
    </FixedSizeList>
  );
};
function CurrencyRow({
  currency,
  onSelect,
  isSelected,
  otherSelected,
  style,
}: {
  currency: IToken;
  onSelect: () => void;
  isSelected: boolean;
  otherSelected: boolean;
  style: CSSProperties;
}) {
  const { account } = useActiveWeb3React();
  const balance = useCurrencyBalance(account ?? undefined, currency);
  console.log({ balance });

  return (
    <MenuItem
      style={style}
      onClick={() => (isSelected ? null : onSelect())}
      disabled={isSelected}
      selected={otherSelected}
    >
      <FlexCol>
        <ZapCurrencyLogo currency={currency} />
        <HeadingStyled>{currency.symbol}</HeadingStyled>
      </FlexCol>
      <HeadingStyled>{balance ? <Balance value={Number(balance.toFixed(2))} /> : null}</HeadingStyled>
    </MenuItem>
  );
}
const HeadingStyled = styled(Heading)`
  font-size: 14px;
`;
const FlexCol = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;
const MenuItem = styled(Flex)<{ disabled: boolean; selected: boolean }>`
  padding: 4px 30px;
  transition: all 0.3s ease;
  align-items: center;
  justify-content: space-between;
  background-image: ${({ disabled }) => (disabled ? ' linear-gradient(90deg, #8c1ab5 0%, #17b38d 100%)' : 'none')};
  // background-color: ${({ theme, disabled }) => (disabled ? theme.colors.primary : '#000')};
  :hover {
    background-color: ${({ theme, disabled }) => !disabled && theme.colors.secondary};
  }
`;
export default ZapCurrencyList;
