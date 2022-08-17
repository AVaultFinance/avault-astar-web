export const fetchApy = async () => {
  try {
    const apiUrl = `https://www.avault.network/api/v0/netValue`;
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
export const preDate = (preDay: number) => {
  const dateNow = new Date().valueOf() - 86400 * 1000 * preDay;
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
  farmApr: string;
  farmApy: string;
  apyFee: string;
  apy: string;
  timestamp: number;
  lpToCLpRate: string;
}
