import { chainId } from 'config/constants/tokens';
import vaultsConfig from './vaultsConfig';

export const fetchApy = async () => {
  try {
    const contractStr = vaultsConfig.map((v) => v.contractAddress[chainId].toLowerCase()).join(',');
    const apiUrl = `https://www.avault.network/api/v0/update/netValue?data=6&&contract=${contractStr}`;
    const r = await fetch(apiUrl);
    const body = await r.json();
    return body.data;
  } catch (e: any) {
    return {};
  }
};

export const nowDate = () => {
  const dateNow = new Date().valueOf();
  const date = new Date(dateNow);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const time = `${year}-${month + 1}-${day}`;
  return time;
};
export interface INetValueKey {
  [key: string]: INetValueKeyItem;
}
interface INetValueKeyItem {
  [key: string]: INetValueKeyItemItem;
}
export interface INetValueKeyItemItem {
  aprFee: string;
  apr: string;
  apyFee: string;
  apy: string;
  timestamp: number;
  lpToCLpRate: string;
}
