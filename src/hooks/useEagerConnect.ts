import { useEffect } from 'react';
import { connectorLocalStorageKey, ConnectorNames } from '@my/ui';
import useAuth from 'hooks/useAuth';

const waitWalletInjected = (property: string, timeout = 1000) =>
  new Promise<void>((resolve) => {
    // if property is already defined, exit
    if (Reflect.has(window, property)) resolve();
    else {
      // if not defined, wait for value to be injected
      Object.defineProperty(window, property, {
        set(value) {
          // replace the property with the provided value, then resolve the promise
          Object.defineProperty(window, property, { value, configurable: true, writable: true });
          resolve();
        },
        // allows property to be reinjected
        configurable: true,
      });
    }

    // exit after 1 second, browser extension may have been deactivated by the user
    setTimeout(resolve, timeout);
  });

const useEagerConnect = () => {
  const { login } = useAuth();

  useEffect(() => {
    // home
    if (window.location.href !== 'https://www.avault.network/') {
      const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames;
      if (connectorId) {
        // Currently BSC & Talisman extensions don't always inject in time.
        // We must check to see if provider exists, and if not, wait for it before proceeding.
        if (connectorId === ConnectorNames.BSC) {
          waitWalletInjected('BinanceChain').then(() => login(connectorId, false));
        } else if (connectorId === ConnectorNames.Talisman) {
          waitWalletInjected('talismanEth').then(() => login(connectorId, false));
        } else {
          login(connectorId, false);
        }
      }
    }
  }, [login]);
};

export default useEagerConnect;
