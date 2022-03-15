import React, { useCallback, useState } from 'react';
import { Currency, Token } from '@avault/sdk';
import {
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBackButton,
  ModalCloseButton,
  ModalBody,
  InjectedModalProps,
  Heading,
  Button,
} from '@avault/ui';
import styled from 'styled-components';
import usePrevious from 'hooks/usePreviousValue';
import { TokenList } from '@uniswap/token-lists';
import { useTranslation } from 'contexts/Localization';
import CurrencySearch from './CurrencySearch';
import ImportToken from './ImportToken';
import Manage from './Manage';
import ImportList from './ImportList';
import { CurrencyModalView } from './types';

const Footer = styled.div`
  width: 100%;
  text-align: center;
`;

const StyledModalContainer = styled(ModalContainer)`
  max-width: 420px;
  width: 100%;
  border-radius: 20px;
  border-width: 0;

  > .header {
    background: ${({ theme }) => theme.colors.background02};
  }
`;

const StyledModalBody = styled(ModalBody)`
  padding: 24px;

  .list-token-manage-button {
    width: 200px;
    height: 36px;
    background: ${({ theme }) => theme.colors.background02};
    border-radius: 12px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface CurrencySearchModalProps extends InjectedModalProps {
  selectedCurrency?: Currency | null;
  onCurrencySelect: (currency: Currency) => void;
  otherSelectedCurrency?: Currency | null;
  showCommonBases?: boolean;
}

export default function CurrencySearchModal({
  onDismiss = () => null,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases = false,
}: CurrencySearchModalProps) {
  const [modalView, setModalView] = useState<CurrencyModalView>(CurrencyModalView.search);

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onDismiss();
      onCurrencySelect(currency);
    },
    [onDismiss, onCurrencySelect],
  );

  // for token import view
  const prevView = usePrevious(modalView);

  // used for import token flow
  const [importToken, setImportToken] = useState<Token | undefined>();

  // used for import list
  const [importList, setImportList] = useState<TokenList | undefined>();
  const [listURL, setListUrl] = useState<string | undefined>();

  const { t } = useTranslation();

  const config = {
    [CurrencyModalView.search]: { title: t('Select a Token'), onBack: undefined },
    [CurrencyModalView.manage]: { title: t('Manage'), onBack: () => setModalView(CurrencyModalView.search) },
    [CurrencyModalView.importToken]: {
      title: t('Import Tokens'),
      onBack: () =>
        setModalView(prevView && prevView !== CurrencyModalView.importToken ? prevView : CurrencyModalView.search),
    },
    [CurrencyModalView.importList]: { title: t('Import List'), onBack: () => setModalView(CurrencyModalView.search) },
  };

  return (
    <StyledModalContainer minWidth="320px">
      <ModalHeader className="header">
        <ModalTitle>
          {config[modalView].onBack && <ModalBackButton onBack={config[modalView].onBack} />}
          <Heading>{config[modalView].title}</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <StyledModalBody>
        {modalView === CurrencyModalView.search ? (
          <CurrencySearch
            onCurrencySelect={handleCurrencySelect}
            selectedCurrency={selectedCurrency}
            otherSelectedCurrency={otherSelectedCurrency}
            showCommonBases={showCommonBases}
            showImportView={() => setModalView(CurrencyModalView.importToken)}
            setImportToken={setImportToken}
          />
        ) : modalView === CurrencyModalView.importToken && importToken ? (
          <ImportToken tokens={[importToken]} handleCurrencySelect={handleCurrencySelect} />
        ) : modalView === CurrencyModalView.importList && importList && listURL ? (
          <ImportList list={importList} listURL={listURL} onImport={() => setModalView(CurrencyModalView.manage)} />
        ) : modalView === CurrencyModalView.manage ? (
          <Manage
            setModalView={setModalView}
            setImportToken={setImportToken}
            setImportList={setImportList}
            setListUrl={setListUrl}
          />
        ) : (
          ''
        )}
        {modalView === CurrencyModalView.search && (
          <Footer>
            <Button
              scale="sm"
              variant="text"
              onClick={() => setModalView(CurrencyModalView.manage)}
              className="list-token-manage-button"
            >
              {t('Manage Tokens')}
            </Button>
          </Footer>
        )}
      </StyledModalBody>
    </StyledModalContainer>
  );
}