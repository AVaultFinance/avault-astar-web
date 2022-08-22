export const fetchTokenPrice = async () => {
  try {
    const apiUrl = `https://www.avault.network/api/v0/token/price`;
    const r = await fetch(apiUrl);
    const body = await r.json();
    return body.data;
  } catch (e: any) {
    return {};
  }
};
