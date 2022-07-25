import { useWeb3React } from '@web3-react/core';
import { registerToken as walletRegisterToken } from 'utils/wallet';
import { useCallback, useMemo } from 'react';

export const useRegisterToken = (address: string, symbol: string, decimals: number) => {
  const { library } = useWeb3React();
  const provider: Window['ethereum'] = useMemo(() => library?.provider, [library?.provider]);

  const canRegisterToken = useMemo(
    () => (provider?.isMetaMask || provider?.isTalisman) && address && symbol && typeof decimals === 'number',
    [provider, address, decimals, symbol],
  );

  const registerToken = useCallback(async () => {
    try {
      await walletRegisterToken(address, symbol, decimals, provider);
    } catch (err) {
      console.error('could not register token', err);
    }
  }, [provider, address, decimals, symbol]);

  return { canRegisterToken, registerToken };
};
