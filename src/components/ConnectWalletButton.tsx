import React from 'react';
import { Button, useWalletModal } from '@avault/ui';
import useAuth from 'hooks/useAuth';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
const ButtonStyled = styled(Button)`
  background-image: linear-gradient(270deg, #fc00ff 0%, #7d49ff 100%);
  border: none;
  height: 36px;
  width: 150px;
  border-radius: 12px;
`;
const ConnectWalletButton = (props) => {
  const { t } = useTranslation();
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);

  return (
    <ButtonStyled variant="tertiary" onClick={onPresentConnectModal} width="140px" padding="0" {...props}>
      {t('Connect Wallet')}
    </ButtonStyled>
  );
};

export default ConnectWalletButton;
