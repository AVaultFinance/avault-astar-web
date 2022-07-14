import React, { useCallback } from 'react';
import { Button, connectorLocalStorageKey, ConnectorNames, useWalletModal } from '@my/ui';
import useAuth from 'hooks/useAuth';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
import useToast from 'hooks/useToast';
import { chainId as myChainId } from 'config/constants/tokens';
const ButtonStyled = styled(Button)`
  border: none;
  height: 36px;
  width: 150px;
  background-image: linear-gradient(90deg, #a428d0 0%, #20d4a9 100%);
  color: ${({ theme }) => theme.colors.text};
`;
const ConnectWalletButton = (props) => {
  const { t } = useTranslation();
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);
  const { toastError } = useToast();
  const ConnectWallet = useCallback(() => {
    const chainId = window.ethereum.networkVersion;
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames;
    if (!connectorId) {
      if (chainId && Number(chainId) !== myChainId) {
        toastError('Wrong Network', 'Please change to Astar Network');
        return;
      }
      onPresentConnectModal();
    }
    // eslint-disable-next-line
  }, [onPresentConnectModal]);
  return (
    <ButtonStyled variant="tertiary" onClick={ConnectWallet} width="140px" padding="0" {...props}>
      {t('Connect Wallet')}
    </ButtonStyled>
  );
};

export default ConnectWalletButton;
