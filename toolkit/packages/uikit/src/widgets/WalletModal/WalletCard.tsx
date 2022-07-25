import React from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import MoreHorizontal from "../../components/Svg/Icons/MoreHorizontal";
import { ButtonProps } from "../../components/Button";
import { connectorLocalStorageKey, walletLocalStorageKey } from "./config";
import { Login, Config, ConnectorNames } from "./types";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
  showInstall: boolean;
}

const WalletButton = styled(Button).attrs({ width: "100%", variant: "text", padding: "10px 20px" })`
  align-items: center;
  display: flex;
  height: auto;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffa14e;
  height: 60px;
  &.wallet-connect-unstoppabledomains {
    background-color: #6966db;
  }
  &.wallet-connect-subwallet {
    background-color: #46a8b4;
  }
  &.wallet-connect-talisman {
    background-color: #89a143;
  }
  .smallText {
    font-size: 12px;
    font-weight: bold;
    color: #490000;
    font-style: normal;
    padding: 0 10px;
    border-radius: 10px;
    border: 1px solid #490000;
    margin-left: 10px;
  }
`;

export const MoreWalletCard: React.FC<ButtonProps> = (props) => {
  return (
    <WalletButton variant="tertiary" {...props}>
      <MoreHorizontal width="40px" mb="8px" color="textSubtle" />
      <Text fontSize="14px">More</Text>
    </WalletButton>
  );
};

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss, showInstall }) => {
  const { title, icon: Icon } = walletConfig;

  return (
    <WalletButton
      variant="tertiary"
      onClick={() => {
        // const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        // const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        // Since iOS does not support Trust Wallet we fall back to WalletConnect
        // if (walletConfig.title === "Trust Wallet" && isIOS) {
        //   login(ConnectorNames.WalletConnect);
        // } else {
        login(walletConfig.connectorId, true, walletConfig.installUrl);
        // login(walletConfig.connectorId, true);
        // }

        localStorage.setItem(walletLocalStorageKey, walletConfig.title);
        localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId);
        onDismiss();
      }}
      className={`wallet-connect-${title.toLocaleLowerCase()}`}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Icon width="40px" />
      <Text fontSize="15px" fontWeight="bold">
        {title}
        {showInstall ? <i className="smallText">Install</i> : null}
      </Text>
    </WalletButton>
  );
};

export default WalletCard;
