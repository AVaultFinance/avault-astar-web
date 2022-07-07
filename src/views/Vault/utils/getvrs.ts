import { chainId } from 'config/constants/tokens';
import { Web3Provider } from '@ethersproject/providers';
import { Contract, ethers } from 'ethers';
import { splitSignature } from 'ethers/lib/utils';
export const avaultApprove = async ({
  pairContract,
  paitAddress,
  vaultContractAddress,
  deadline,
  library,
  account,
}: {
  pairContract: Contract;
  paitAddress: string;
  vaultContractAddress: string;
  deadline: number;
  library: Web3Provider;
  account: string;
}) => {
  const nonce = await pairContract.nonces(account);
  const EIP712Domain = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ];
  const domain = {
    name: 'Arthswap LPs',
    version: '1',
    chainId: chainId,
    verifyingContract: paitAddress,
  };
  const Permit = [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
  ];
  const message = {
    owner: account,
    spender: vaultContractAddress,
    value: ethers.constants.MaxUint256.toString(),
    nonce: nonce.toHexString(),
    deadline: deadline,
  };
  const data = JSON.stringify({
    types: {
      EIP712Domain,
      Permit,
    },
    domain,
    primaryType: 'Permit',
    message,
  });
  // _signTypedData is the ethers function name, once the official release will be ready _ will be dropped
  // eslint-disable-next-line no-underscore-dangle

  const signature = await library.send('eth_signTypedData_v3', [account, data]).then(splitSignature);
  const { r, s, v } = signature;
  return {
    r,
    s,
    v,
    deadline: deadline,
  };
};
