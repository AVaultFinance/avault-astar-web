import { useCallback } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { NoBscProviderError } from '@binance-chain/bsc-connector';
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import {
  NoEthereumProviderError as NoTalismanProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorTalisman,
} from '@talismn/web3react-v6-connector';
import { ConnectorNames, connectorLocalStorageKey } from '@my/ui';
import { connectorsByName } from 'utils/web3React';
import { setupNetwork } from 'utils/wallet';
import useToast from 'hooks/useToast';
import { profileClear } from 'state/profile';
import { useAppDispatch } from 'state';
import { useTranslation } from 'contexts/Localization';
import { chainId as myChainId } from 'config/constants/tokens';
import { UAuthConnector } from '@uauth/web3-react';
import { SubWalletConnector } from '@subwallet/web3-react-subwallet-connector-v6';
import { wait } from 'state/multicall/retry';
const useAuth = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { activate, deactivate } = useWeb3React();
  const { toastError } = useToast();

  const login = useCallback(
    (connectorID: ConnectorNames, clickBtn: boolean) => {
      const connector = connectorsByName[connectorID];

      if (connector) {
        (async () => {
          const chainId = window?.ethereum?.networkVersion ?? '';
          if (connector instanceof InjectedConnector) {
            if (!window?.ethereum?.networkVersion) {
              if (clickBtn) {
                window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn');
              }
              return;
            }
          }
          if (connector instanceof UAuthConnector) {
            if (!window?.ethereum?.networkVersion) {
              if (clickBtn) {
                window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn');
              }
              return;
            }
            if (chainId && Number(chainId) !== myChainId) {
              const hasSetup = await setupNetwork(connector);
              if (hasSetup && Number(chainId) === myChainId) {
              } else {
                return;
              }
            }
          }
          if (connector instanceof SubWalletConnector) {
            if (window?.injectedWeb3 && window.injectedWeb3['subwallet-js']) {
            } else {
              if (clickBtn) {
                window.open(
                  'https://chrome.google.com/webstore/detail/subwallet-polkadot-extens/onhogfjeacnfoofkfgppdlbmlmnplgbn',
                );
              }
              return;
            }
            const activate = await connector.activate();
            if (!activate) {
              await wait(5000);
            }
            const isAuthorized = await connector.isAuthorized();
            if (!isAuthorized) {
              await wait(5000);
            }
          }
          activate(connector, async (error: Error) => {
            if (error instanceof UnsupportedChainIdError) {
              const hasSetup = await setupNetwork(connector);
              if (hasSetup) {
                activate(connector);
              }
            } else {
              window.localStorage.removeItem(connectorLocalStorageKey);
              if (
                error instanceof NoEthereumProviderError ||
                error instanceof NoTalismanProviderError ||
                error instanceof NoBscProviderError
              ) {
                if (error instanceof NoTalismanProviderError) {
                  window.open(
                    'https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld',
                  );
                }
                toastError(t('Provider Error'), t('No provider was found'));
              } else if (
                error instanceof UserRejectedRequestErrorInjected ||
                error instanceof UserRejectedRequestErrorTalisman ||
                error instanceof UserRejectedRequestErrorWalletConnect
              ) {
                if (connector instanceof WalletConnectConnector) {
                  const walletConnector = connector as WalletConnectConnector;
                  walletConnector.walletConnectProvider = null;
                }
                toastError(t('Authorization Error'), t('Please authorize to access your account'));
              } else {
                toastError(error.name, error.message);
              }
            }
          });
        })();
        // }
      } else {
        toastError(t('Unable to find connector'), t('The connector config is wrong'));
      }
    },
    // eslint-disable-next-line
    [t, activate, window?.ethereum?.networkVersion],
  );

  const logout = useCallback(() => {
    dispatch(profileClear());
    deactivate();
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close();
      connectorsByName.walletconnect.walletConnectProvider = null;
    }
    window?.localStorage?.removeItem(connectorLocalStorageKey);
  }, [deactivate, dispatch]);

  return { login, logout };
};

export default useAuth;
