/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true;
    isTalisman?: false;
    networkVersion?: string;
    request?: (...args: any[]) => Promise<void>;
  };
  injectedWeb3?: any;
  BinanceChain?: {
    bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>;
  };
}
