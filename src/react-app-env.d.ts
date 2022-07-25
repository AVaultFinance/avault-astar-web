/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true;
    isTalisman?: true;
    networkVersion?: string;
    request?: (...args: any[]) => Promise<void>;
  };
  BinanceChain?: {
    bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>;
  };
}
