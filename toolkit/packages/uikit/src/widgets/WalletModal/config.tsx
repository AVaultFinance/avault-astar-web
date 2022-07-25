import Metamask from "../../components/Svg/Icons/Metamask";
import Talisman from "../../components/Svg/Icons/Talisman";
// import WalletConnect from "../../components/Svg/Icons/WalletConnect";
// import TrustWallet from "../../components/Svg/Icons/TrustWallet";
// import MathWallet from "../../components/Svg/Icons/MathWallet";
// import TokenPocket from "../../components/Svg/Icons/TokenPocket";
// import BinanceChain from "../../components/Svg/Icons/BinanceChain";
// import SafePal from "../../components/Svg/Icons/SafePal";
// import Coin98 from "../../components/Svg/Icons/Coin98";
import UnstoppableDomains from "../../components/Svg/Icons/UnstoppableDomains";

import { Config, ConnectorNames } from "./types";

const connectors: Config[] = [
  {
    title: "Talisman",
    icon: Talisman,
    connectorId: ConnectorNames.Talisman,
    priority: 1,
    installUrl: "https://talisman.xyz/",
  },
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    priority: 2,
    installUrl: "https://metamask.io/download/",
  },
  {
    title: "UnstoppableDomains",
    icon: UnstoppableDomains,
    connectorId: ConnectorNames.UAuthMoralis,
    priority: 3,
  },
];

export default connectors;
export const connectorLocalStorageKey = "connectorIdv2";
export const walletLocalStorageKey = "wallet";
