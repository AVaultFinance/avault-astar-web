import { FC } from "react";
import { SvgProps } from "../../components/Svg/types";

export enum ConnectorNames {
  Injected = "injected",
  UAuthMoralis = "UAuthMoralis",
  WalletConnect = "walletconnect",
  BSC = "bsc",
  Talisman = "talismanEth",
}

export type Login = (connectorId: ConnectorNames, installUrl?: string) => void;

export interface Config {
  title: string;
  icon: FC<SvgProps>;
  connectorId: ConnectorNames;
  priority: number;
  installUrl?: string;
}
