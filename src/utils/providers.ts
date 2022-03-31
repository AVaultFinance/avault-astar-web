import { ethers } from 'ethers';
import getRpcUrl from 'utils/getRpcUrl';

const RPC_URL = getRpcUrl();
console.log({ RPC_URL });

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

// eslint-disable-next-line import/no-anonymous-default-export
export default null;
