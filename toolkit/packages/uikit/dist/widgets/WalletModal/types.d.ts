import { FC } from "react";
import { SvgProps } from "../../components/Svg/types";
export declare enum ConnectorNames {
    Injected = "injected",
    UAuthMoralis = "UAuthMoralis",
    SubWallet = "SubWallet",
    WalletConnect = "walletconnect",
    BSC = "bsc",
    Talisman = "talismanEth"
}
export declare type Login = (connectorId: ConnectorNames, clickBtn: boolean, installUrl?: string) => void;
export interface Config {
    title: string;
    icon: FC<SvgProps>;
    connectorId: ConnectorNames;
    priority: number;
    showInstall: boolean;
    installUrl?: string;
}
