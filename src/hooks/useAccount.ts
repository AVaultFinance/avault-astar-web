import { UAuthConnector } from '@uauth/web3-react';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';

export function useAccount() {
  const { account, connector } = useWeb3React();

  const callAccount = useCallback(async (): Promise<{ account: string }> => {
    if (connector instanceof UAuthConnector) {
      const user = await connector.uauth.user();
      return { account: user.sub };
    }

    return { account: `${account.substring(0, 5)}...${account.substring(account.length - 4)}` };
  }, [account, connector]);

  return { callAccount };
}

export default useAccount;
