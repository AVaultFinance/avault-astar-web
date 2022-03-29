import { ETHER } from '@avault/sdk';
import {
  Heading,
  InjectedModalProps,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContainer,
  ModalHeader,
  ModalTitle,
} from '@avault/ui';
import { chainId } from 'config/constants/tokens';
import useDebounce from 'hooks/useDebounce';
import { useCallback, KeyboardEvent, RefObject, useEffect, useRef, useState } from 'react';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';
import { isAddress } from 'utils';
import { lpTokenAll, tokenAll } from '../utils/constants';
import { IToken } from '../utils/types';
import ZapCurrencyList from './ZapCurrencyList';
const ModalContainerStyled = styled(ModalContainer)`
  min-width: 468px;
  max-width: 500px;
  padding-bottom: 43px;
  position: relative;
  &:after {
    content: '';
    box-shadow: 0 0px 20px ${({ theme }) => theme.colors.backgroundAlt};
    width: 100%;
    height: 49px;
    position: absolute;
    bottom: -6px;
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;
interface IZapSearchModalProps extends InjectedModalProps {
  selectedCurrency?: IToken | null;
  onCurrencySelect: (currency: IToken) => void;
  otherSelectedCurrency?: IToken | null;
  isTo: boolean;
}
const ZapSearchModal = ({
  selectedCurrency,
  onCurrencySelect,
  otherSelectedCurrency,
  isTo,
  onDismiss = () => null,
}: IZapSearchModalProps) => {
  const fixedList = useRef<FixedSizeList>();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>();

  const debouncedQuery = useDebounce(searchQuery, 200);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleInput = useCallback((event) => {
    const input = event.target.value;
    const checksummedInput = isAddress(input);
    setSearchQuery(checksummedInput || input);
    fixedList.current?.scrollTo(0);
  }, []);

  const handleCurrencySelect = (currency) => {};
  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const s = debouncedQuery.toLowerCase().trim();
        if (s === 'bnb') {
          handleCurrencySelect(ETHER[chainId]);
        }
      }
    },
    [debouncedQuery],
  );

  const currencies = isTo ? lpTokenAll : tokenAll;
  return (
    <ModalContainerStyled>
      <ModalHeader>
        <ModalTitle>
          <Heading>Select Token</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody>
        <InputWrapStyled>
          <Input
            id="token-search-input_22"
            placeholder="Search or enter token adress"
            scale="lg"
            autoComplete="off"
            value={searchQuery}
            ref={inputRef as RefObject<HTMLInputElement>}
            onChange={handleInput}
            onKeyDown={handleEnter}
          />
        </InputWrapStyled>
        <ZapCurrencyList
          height={380}
          currencies={currencies}
          fixedListRef={fixedList}
          selectedCurrency={selectedCurrency}
          otherCurrency={otherSelectedCurrency}
          onCurrencySelect={handleCurrencySelect}
        />
      </ModalBody>
    </ModalContainerStyled>
  );
};
const InputWrapStyled = styled.div`
  margin: 0 30px 24px;
`;
export default ZapSearchModal;
