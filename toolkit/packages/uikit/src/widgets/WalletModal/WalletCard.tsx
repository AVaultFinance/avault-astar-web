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
    // div {
    //   color: #151433;
    // }
  }
  &.wallet-connect-talisman {
    background-color: #000;
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

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss }) => {
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
        login(walletConfig.connectorId, walletConfig.installUrl);
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
      </Text>
    </WalletButton>
  );
};

export default WalletCard;
