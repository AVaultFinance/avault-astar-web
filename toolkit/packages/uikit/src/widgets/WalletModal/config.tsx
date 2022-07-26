import Metamask from "../../components/Svg/Icons/Metamask";
// import WalletConnect from "../../components/Svg/Icons/WalletConnect";
// import TrustWallet from "../../components/Svg/Icons/TrustWallet";
// import MathWallet from "../../components/Svg/Icons/MathWallet";
// import TokenPocket from "../../components/Svg/Icons/TokenPocket";
// import BinanceChain from "../../components/Svg/Icons/BinanceChain";
// import SafePal from "../../components/Svg/Icons/SafePal";
// import Coin98 from "../../components/Svg/Icons/Coin98";
import UnstoppableDomains from "../../components/Svg/Icons/UnstoppableDomains";
import SubWallet from "../../components/Svg/Icons/SubWallet";
import Talisman from "../../components/Svg/Icons/Talisman";
import { Config, ConnectorNames } from "./types";

const connectors: Config[] = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    priority: 1,
    showInstall: false,
  },
  {
    title: "UnstoppableDomains",
    icon: UnstoppableDomains,
    connectorId: ConnectorNames.UAuthMoralis,
    priority: 2,
    showInstall: false,
  },
  {
    title: "SubWallet",
    icon: SubWallet,
    connectorId: ConnectorNames.SubWallet,
    priority: 3,
    showInstall: false,
  },
  {
    title: "Talisman",
    icon: Talisman,
    connectorId: ConnectorNames.Talisman,
    priority: 4,
    showInstall: false,
  },
];

export default connectors;
export const connectorLocalStorageKey = "connectorIdv2";
export const walletLocalStorageKey = "wallet";
